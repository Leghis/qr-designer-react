import historyService from './historyService';

class AnalyticsService {
  getUsageOverTime(days = 7) {
    const history = historyService.getHistory();
    const data = [];
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const count = history.filter(item => {
        const itemDate = new Date(item.createdAt);
        return itemDate >= date && itemDate < nextDate;
      }).length;

      data.push({
        date: date.toISOString().split('T')[0],
        count,
        dayName: date.toLocaleDateString('fr-FR', { weekday: 'short' })
      });
    }

    return data;
  }

  getHourlyDistribution() {
    const history = historyService.getHistory();
    const hourlyData = Array(24).fill(0);

    history.forEach(item => {
      const hour = new Date(item.createdAt).getHours();
      hourlyData[hour]++;
    });

    return hourlyData.map((count, hour) => ({
      hour: `${hour}h`,
      count
    }));
  }

  getTemplateUsage() {
    const stats = historyService.getStatistics();
    const templateData = Object.entries(stats.byTemplate)
      .map(([template, count]) => ({
        template,
        count,
        percentage: ((count / stats.total) * 100).toFixed(1)
      }))
      .sort((a, b) => b.count - a.count);

    return templateData;
  }

  getMostPopularContent() {
    const history = historyService.getHistory();
    const contentMap = new Map();

    history.forEach(item => {
      if (item.data) {
        const key = item.data.substring(0, 50); // Truncate for grouping
        if (contentMap.has(key)) {
          contentMap.set(key, contentMap.get(key) + 1);
        } else {
          contentMap.set(key, 1);
        }
      }
    });

    return Array.from(contentMap.entries())
      .map(([content, count]) => ({ content, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  getUsageTrends() {
    const thisWeek = this.getUsageOverTime(7);
    const lastWeek = this.getUsageOverTime(14).slice(0, 7);

    const thisWeekTotal = thisWeek.reduce((sum, day) => sum + day.count, 0);
    const lastWeekTotal = lastWeek.reduce((sum, day) => sum + day.count, 0);

    const growth = lastWeekTotal === 0 
      ? (thisWeekTotal > 0 ? 100 : 0)
      : ((thisWeekTotal - lastWeekTotal) / lastWeekTotal * 100).toFixed(1);

    return {
      thisWeekTotal,
      lastWeekTotal,
      growth: parseFloat(growth),
      isPositive: parseFloat(growth) >= 0
    };
  }

  getPeakUsageTimes() {
    const hourlyData = this.getHourlyDistribution();
    const sorted = [...hourlyData].sort((a, b) => b.count - a.count);
    
    return {
      peakHours: sorted.slice(0, 3),
      quietHours: sorted.slice(-3).reverse()
    };
  }
}

export default new AnalyticsService();