import { useState, useEffect, useCallback } from 'react';
import historyService from '../services/historyService';
import { downloadJSON, downloadCSV } from '../utils/domSafeDownload';

export const useQRHistory = (initialFilters = {}) => {
  const [history, setHistory] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState(null);

  const loadHistory = useCallback(() => {
    setLoading(true);
    try {
      const data = historyService.getHistory(filters);
      setHistory(data);
      const stats = historyService.getStatistics();
      setStatistics(stats);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const addToHistory = useCallback((qrData) => {
    const newEntry = historyService.addQRCode(qrData);
    loadHistory();
    return newEntry;
  }, [loadHistory]);

  const updateUsage = useCallback((id) => {
    historyService.updateUsage(id);
    loadHistory();
  }, [loadHistory]);

  const deleteItem = useCallback((id) => {
    historyService.deleteQRCode(id);
    loadHistory();
  }, [loadHistory]);

  const deleteMultiple = useCallback((ids) => {
    historyService.deleteMultiple(ids);
    loadHistory();
  }, [loadHistory]);

  const clearAll = useCallback(() => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer tout l\'historique ?')) {
      historyService.clearHistory();
      loadHistory();
    }
  }, [loadHistory]);

  const exportHistory = useCallback(async (format = 'json') => {
    try {
      const data = historyService.exportHistory(format);
      const filename = `qr-history-${new Date().toISOString().split('T')[0]}.${format}`;
      
      if (format === 'json') {
        // Parse and re-stringify for proper JSON formatting
        const jsonData = typeof data === 'string' ? JSON.parse(data) : data;
        await downloadJSON(jsonData, filename, {
          onSuccess: () => {
            console.log('History exported successfully as JSON');
          },
          onError: (error) => {
            console.error('JSON export failed:', error);
          }
        });
      } else {
        // CSV format
        await downloadCSV(data, filename, {
          onSuccess: () => {
            console.log('History exported successfully as CSV');
          },
          onError: (error) => {
            console.error('CSV export failed:', error);
          }
        });
      }
    } catch (error) {
      console.error('Export failed:', error);
    }
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  return {
    history,
    statistics,
    loading,
    filters,
    addToHistory,
    updateUsage,
    deleteItem,
    deleteMultiple,
    clearAll,
    exportHistory,
    updateFilters,
    resetFilters,
    refresh: loadHistory
  };
};