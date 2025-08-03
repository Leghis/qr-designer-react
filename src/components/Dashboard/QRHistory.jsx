import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Download, Trash2, Eye, Copy, Calendar, MoreVertical } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useQRHistory } from '../../hooks/useQRHistory';
import { useNotification } from '../../context/NotificationContext';
import Button from '../UI/Button';
import Input from '../UI/Input';
import QRHistoryCard from './QRHistoryCard';

const QRHistory = ({ limit }) => {
  const { t } = useTranslation();
  const { history, loading, filters, updateFilters, deleteItem, deleteMultiple, exportHistory } = useQRHistory();
  const { showNotification } = useNotification();
  const [selectedItems, setSelectedItems] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const displayHistory = limit ? history.slice(0, limit) : history;

  const handleDelete = (id) => {
    deleteItem(id);
    showNotification(t('dashboard.history.notifications.deleted'), 'success');
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) return;
    
    if (window.confirm(t('dashboard.history.confirmDelete', { count: selectedItems.length }))) {
      deleteMultiple(selectedItems);
      setSelectedItems([]);
      showNotification(t('dashboard.history.notifications.multipleDeleted', { count: selectedItems.length }), 'success');
    }
  };

  const handleExport = (format) => {
    exportHistory(format);
    showNotification(t('dashboard.history.notifications.exported', { format: format.toUpperCase() }), 'success');
  };

  const toggleSelect = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedItems.length === displayHistory.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(displayHistory.map(item => item.id));
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-dark-900 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-900 rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('dashboard.history.title')}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {t('dashboard.history.subtitle', { count: history.length })}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedItems.length > 0 && (
              <Button
                variant="danger"
                size="sm"
                onClick={handleDeleteSelected}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                {t('dashboard.history.deleteSelected', { count: selectedItems.length })}
              </Button>
            )}
            
            <div className="relative group">
              <Button
                variant="secondary"
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                {t('dashboard.history.export')}
              </Button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <button
                  onClick={() => handleExport('json')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                >
                  {t('dashboard.history.exportJSON')}
                </button>
                <button
                  onClick={() => handleExport('csv')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                >
                  {t('dashboard.history.exportCSV')}
                </button>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              {t('dashboard.history.filters')}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4">
          <Input
            type="text"
            placeholder={t('dashboard.history.searchPlaceholder')}
            icon={Search}
            value={filters.search || ''}
            onChange={(e) => updateFilters({ search: e.target.value })}
          />
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  value={filters.sortBy || 'newest'}
                  onChange={(e) => updateFilters({ sortBy: e.target.value })}
                >
                  <option value="newest">{t('dashboard.history.filterOptions.newest')}</option>
                  <option value="oldest">{t('dashboard.history.filterOptions.oldest')}</option>
                  <option value="mostUsed">{t('dashboard.history.filterOptions.mostUsed')}</option>
                  <option value="lastUsed">{t('dashboard.history.filterOptions.lastUsed')}</option>
                </select>

                <select
                  className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  value={filters.template || ''}
                  onChange={(e) => updateFilters({ template: e.target.value || undefined })}
                >
                  <option value="">{t('dashboard.history.filterOptions.allTemplates')}</option>
                  <option value="default">{t('dashboard.history.filterOptions.default')}</option>
                  <option value="modern">{t('dashboard.history.filterOptions.modern')}</option>
                  <option value="minimalist">{t('dashboard.history.filterOptions.minimalist')}</option>
                  <option value="business">{t('dashboard.history.filterOptions.business')}</option>
                </select>

                <input
                  type="date"
                  className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  value={filters.startDate || ''}
                  onChange={(e) => updateFilters({ startDate: e.target.value || undefined })}
                  placeholder={t('dashboard.history.filterOptions.startDate')}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-6">
        {displayHistory.length === 0 ? (
          <div className="text-center py-12">
            <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('dashboard.history.noQRCodes.title')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {filters.search 
                ? t('dashboard.history.noQRCodes.searchSubtitle')
                : t('dashboard.history.noQRCodes.emptySubtitle')}
            </p>
          </div>
        ) : (
          <>
            {/* Select All */}
            <div className="flex items-center gap-4 mb-4">
              <input
                type="checkbox"
                checked={selectedItems.length === displayHistory.length}
                onChange={selectAll}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t('dashboard.history.selectAll')}
              </span>
            </div>

            {/* History Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayHistory.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <QRHistoryCard
                    item={item}
                    isSelected={selectedItems.includes(item.id)}
                    onToggleSelect={() => toggleSelect(item.id)}
                    onDelete={() => handleDelete(item.id)}
                  />
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* View All Link */}
        {limit && history.length > limit && (
          <div className="text-center mt-6">
            <Button
              variant="ghost"
              onClick={() => window.location.href = '/dashboard?tab=history'}
            >
              {t('dashboard.history.viewAll', { count: history.length })}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRHistory;