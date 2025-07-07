import { useState, useEffect, useCallback } from 'react';
import historyService from '../services/historyService';

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

  const exportHistory = useCallback((format = 'json') => {
    const data = historyService.exportHistory(format);
    const blob = new Blob([data], { 
      type: format === 'json' ? 'application/json' : 'text/csv' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qr-history-${new Date().toISOString().split('T')[0]}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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