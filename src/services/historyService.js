const HISTORY_KEY = 'qr-designer-history';
const MAX_HISTORY_ITEMS = 100;

class HistoryService {
  constructor() {
    this.history = this.loadHistory();
  }

  loadHistory() {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading history:', error);
      return [];
    }
  }

  saveHistory() {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(this.history));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  }

  addQRCode(qrData) {
    const qrEntry = {
      id: Date.now().toString(),
      ...qrData,
      type: qrData.type || 'url',
      name: qrData.name || null,
      scans: 0,
      isDynamic: qrData.isDynamic || false,
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString(),
      usageCount: 1
    };

    // Add to beginning of array
    this.history.unshift(qrEntry);

    // Keep only the last MAX_HISTORY_ITEMS
    if (this.history.length > MAX_HISTORY_ITEMS) {
      this.history = this.history.slice(0, MAX_HISTORY_ITEMS);
    }

    this.saveHistory();
    return qrEntry;
  }

  updateUsage(id) {
    const index = this.history.findIndex(item => item.id === id);
    if (index !== -1) {
      this.history[index].lastUsed = new Date().toISOString();
      this.history[index].usageCount = (this.history[index].usageCount || 0) + 1;
      
      // Move to front
      const item = this.history.splice(index, 1)[0];
      this.history.unshift(item);
      
      this.saveHistory();
    }
  }

  getHistory(filters = {}) {
    let filtered = [...this.history];

    // Filter by search term
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(item => 
        item.data?.toLowerCase().includes(searchLower) ||
        item.template?.toLowerCase().includes(searchLower)
      );
    }

    // Filter by date range
    if (filters.startDate) {
      filtered = filtered.filter(item => 
        new Date(item.createdAt) >= new Date(filters.startDate)
      );
    }

    if (filters.endDate) {
      filtered = filtered.filter(item => 
        new Date(item.createdAt) <= new Date(filters.endDate)
      );
    }

    // Filter by template
    if (filters.template) {
      filtered = filtered.filter(item => item.template === filters.template);
    }

    // Sort
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case 'newest':
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 'oldest':
            return new Date(a.createdAt) - new Date(b.createdAt);
          case 'mostUsed':
            return (b.usageCount || 0) - (a.usageCount || 0);
          case 'lastUsed':
            return new Date(b.lastUsed) - new Date(a.lastUsed);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }

  deleteQRCode(id) {
    this.history = this.history.filter(item => item.id !== id);
    this.saveHistory();
  }

  deleteMultiple(ids) {
    this.history = this.history.filter(item => !ids.includes(item.id));
    this.saveHistory();
  }

  clearHistory() {
    this.history = [];
    this.saveHistory();
  }

  getStatistics() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(today);
    thisWeek.setDate(thisWeek.getDate() - 7);
    const thisMonth = new Date(today);
    thisMonth.setMonth(thisMonth.getMonth() - 1);

    const stats = {
      total: this.history.length,
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
      byTemplate: {},
      recentlyUsed: []
    };

    this.history.forEach(item => {
      const createdDate = new Date(item.createdAt);
      
      if (createdDate >= today) stats.today++;
      if (createdDate >= thisWeek) stats.thisWeek++;
      if (createdDate >= thisMonth) stats.thisMonth++;

      // Count by template
      const template = item.template || 'default';
      stats.byTemplate[template] = (stats.byTemplate[template] || 0) + 1;
    });

    // Get recently used (last 5)
    stats.recentlyUsed = this.history
      .sort((a, b) => new Date(b.lastUsed) - new Date(a.lastUsed))
      .slice(0, 5);

    return stats;
  }

  exportHistory(format = 'json') {
    if (format === 'json') {
      return JSON.stringify(this.history, null, 2);
    } else if (format === 'csv') {
      const headers = ['ID', 'Data', 'Template', 'Created At', 'Last Used', 'Usage Count'];
      const rows = this.history.map(item => [
        item.id,
        item.data || '',
        item.template || 'default',
        item.createdAt,
        item.lastUsed,
        item.usageCount || 0
      ]);
      
      const csv = [headers, ...rows]
        .map(row => row.map(cell => `"${cell}"`).join(','))
        .join('\n');
      
      return csv;
    }
  }
}

export default new HistoryService();