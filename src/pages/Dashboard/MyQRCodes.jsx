import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Grid3X3,
  List,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQRHistory } from '../../hooks/useQRHistory';
import { useSubscription } from '../../hooks/useSubscription';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import QRCodeCard from '../../components/Dashboard/QRCodeCard';
import qrTypesService from '../../services/qrTypesService';

const MyQRCodes = () => {
  const { history, loading, filters, updateFilters, deleteItem, exportHistory } = useQRHistory();
  const { isPremium } = useSubscription();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState('all');

  // Get available QR types
  const qrTypes = qrTypesService.getAllTypes();

  // Filter QR codes
  const filteredQRCodes = useMemo(() => {
    let filtered = [...history];

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(qr => qr.type === selectedType);
    }

    // Apply search filter (already handled by useQRHistory)
    return filtered;
  }, [history, selectedType]);

  // Group QR codes by date
  const groupedQRCodes = useMemo(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const thisWeek = new Date(today);
    thisWeek.setDate(thisWeek.getDate() - 7);

    const groups = {
      today: [],
      yesterday: [],
      thisWeek: [],
      older: []
    };

    filteredQRCodes.forEach(qr => {
      const qrDate = new Date(qr.createdAt);
      if (qrDate.toDateString() === today.toDateString()) {
        groups.today.push(qr);
      } else if (qrDate.toDateString() === yesterday.toDateString()) {
        groups.yesterday.push(qr);
      } else if (qrDate > thisWeek) {
        groups.thisWeek.push(qr);
      } else {
        groups.older.push(qr);
      }
    });

    return groups;
  }, [filteredQRCodes]);

  const handleExport = (format) => {
    exportHistory(format);
  };

  const renderQRCards = (qrCodes) => {
    return qrCodes.map((qr, index) => (
      <motion.div
        key={qr.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        layout
      >
        <QRCodeCard
          qrCode={qr}
          onDelete={() => deleteItem(qr.id)}
          viewMode={viewMode}
        />
      </motion.div>
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Mes QR Codes
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {history.length} QR code{history.length > 1 ? 's' : ''} créé{history.length > 1 ? 's' : ''}
          </p>
        </div>
        <Link
          to="/dashboard/qr-codes/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Créer un QR Code
        </Link>
      </div>

      {/* Controls Bar */}
      <div className="bg-white dark:bg-dark-900 rounded-xl p-4 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Rechercher un QR code..."
              icon={Search}
              value={filters.search || ''}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="w-full"
            />
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-3 bg-white dark:bg-dark-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all"
          >
            <option value="all">Tous les types</option>
            {qrTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.icon} {type.name}
              </option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-dark-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-dark-700 shadow text-primary-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-dark-700 shadow text-primary-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* More Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-800 transition-all"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
            <div className="relative group">
              <button className="p-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-800 transition-all">
                <Download className="w-5 h-5" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <button
                  onClick={() => handleExport('json')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                >
                  Exporter en JSON
                </button>
                <button
                  onClick={() => handleExport('csv')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                >
                  Exporter en CSV
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  value={filters.sortBy || 'newest'}
                  onChange={(e) => updateFilters({ sortBy: e.target.value })}
                >
                  <option value="newest">Plus récents</option>
                  <option value="oldest">Plus anciens</option>
                  <option value="mostUsed">Plus utilisés</option>
                  <option value="lastUsed">Dernière utilisation</option>
                </select>

                <input
                  type="date"
                  className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  value={filters.startDate || ''}
                  onChange={(e) => updateFilters({ startDate: e.target.value || undefined })}
                  placeholder="Date de début"
                />

                <input
                  type="date"
                  className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  value={filters.endDate || ''}
                  onChange={(e) => updateFilters({ endDate: e.target.value || undefined })}
                  placeholder="Date de fin"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* QR Codes Display */}
      {filteredQRCodes.length === 0 ? (
        <div className="bg-white dark:bg-dark-900 rounded-2xl p-16 text-center shadow-lg">
          <div className="w-24 h-24 bg-gray-100 dark:bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Aucun QR code trouvé
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {filters.search || selectedType !== 'all'
              ? 'Essayez de modifier vos critères de recherche'
              : 'Créez votre premier QR code pour commencer'}
          </p>
          {!filters.search && selectedType === 'all' && (
            <Link
              to="/dashboard/qr-codes/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              Créer un QR Code
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Today */}
          {groupedQRCodes.today.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Aujourd'hui
              </h2>
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-4'
              }>
                {renderQRCards(groupedQRCodes.today)}
              </div>
            </div>
          )}

          {/* Yesterday */}
          {groupedQRCodes.yesterday.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Hier
              </h2>
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-4'
              }>
                {renderQRCards(groupedQRCodes.yesterday)}
              </div>
            </div>
          )}

          {/* This Week */}
          {groupedQRCodes.thisWeek.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Cette semaine
              </h2>
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-4'
              }>
                {renderQRCards(groupedQRCodes.thisWeek)}
              </div>
            </div>
          )}

          {/* Older */}
          {groupedQRCodes.older.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Plus ancien
              </h2>
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-4'
              }>
                {renderQRCards(groupedQRCodes.older)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyQRCodes;