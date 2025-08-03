import { Eye, Copy, Download, Trash2, Calendar, Hash, Palette } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

const QRHistoryCard = ({ item, isSelected, onToggleSelect, onDelete }) => {
  const { showNotification } = useNotification();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(item.data);
    showNotification('Contenu copié !', 'success');
  };

  const handleDownload = () => {
    // In real implementation, would regenerate QR code and download
    showNotification('Téléchargement du QR code...', 'info');
  };

  const handleView = () => {
    // In real implementation, would open modal with QR code preview
    window.location.href = `/?data=${encodeURIComponent(item.data)}&template=${item.template}`;
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return 'QR Code';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`relative bg-gray-50 dark:bg-dark-800 rounded-xl p-4 border-2 transition-all ${
        isSelected 
          ? 'border-primary-500 shadow-lg' 
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      }`}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-3 left-3 z-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          className="w-4 h-4 rounded cursor-pointer"
        />
      </div>

      {/* QR Preview */}
      <div className="mb-4 flex justify-center">
        <div className="w-32 h-32 bg-white dark:bg-gray-900 rounded-lg p-2 shadow-inner">
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded flex items-center justify-center">
            <Hash className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {truncateText(item.data)}
        </h3>
        
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="w-3 h-3" />
          {formatDate(item.createdAt)}
        </div>

        {item.template && (
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Palette className="w-3 h-3" />
            Template: {item.template}
          </div>
        )}

        {item.usageCount > 1 && (
          <div className="text-xs text-primary-600 dark:text-primary-400">
            Utilisé {item.usageCount} fois
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-1 mt-4">
        <button
          onClick={handleView}
          className="flex-1 p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-700 rounded-lg transition-colors"
          title="Voir"
        >
          <Eye className="w-4 h-4 mx-auto" />
        </button>
        <button
          onClick={handleCopy}
          className="flex-1 p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-700 rounded-lg transition-colors"
          title="Copier"
        >
          <Copy className="w-4 h-4 mx-auto" />
        </button>
        <button
          onClick={handleDownload}
          className="flex-1 p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-700 rounded-lg transition-colors"
          title="Télécharger"
        >
          <Download className="w-4 h-4 mx-auto" />
        </button>
        <button
          onClick={onDelete}
          className="flex-1 p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          title="Supprimer"
        >
          <Trash2 className="w-4 h-4 mx-auto" />
        </button>
      </div>
    </motion.div>
  );
};

export default QRHistoryCard;