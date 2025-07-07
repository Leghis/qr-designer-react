import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MoreVertical, 
  Eye, 
  Edit2, 
  Copy, 
  Download, 
  Trash2, 
  BarChart3,
  ExternalLink,
  Share2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import { useSubscription } from '../../hooks/useSubscription';
import qrTypesService from '../../services/qrTypesService';

const QRCodeCard = ({ qrCode, onDelete, viewMode = 'grid' }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { isPremium } = useSubscription();

  // Get QR type info
  const qrType = qrTypesService.getTypeById(qrCode.type || 'url');

  const handleCopy = () => {
    navigator.clipboard.writeText(qrCode.data);
    showNotification('Contenu copié !', 'success');
    setShowMenu(false);
  };

  const handleView = () => {
    navigate(`/dashboard/qr-codes/${qrCode.id}`);
  };

  const handleEdit = () => {
    navigate(`/dashboard/qr-codes/edit/${qrCode.id}`);
  };

  const handleDownload = () => {
    // In real implementation, would regenerate and download QR code
    showNotification('Téléchargement du QR code...', 'info');
    setShowMenu(false);
  };

  const handleShare = () => {
    // Share functionality
    showNotification('Fonctionnalité de partage bientôt disponible', 'info');
    setShowMenu(false);
  };

  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce QR code ?')) {
      onDelete();
      showNotification('QR code supprimé', 'success');
    }
    setShowMenu(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) return 'Il y a moins d\'une heure';
    if (diffInHours < 24) return `Il y a ${Math.floor(diffInHours)} heures`;
    if (diffInHours < 48) return 'Hier';
    
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ x: 4 }}
        className="bg-white dark:bg-dark-900 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all flex items-center gap-4"
      >
        {/* QR Preview */}
        <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${qrType?.color || 'from-gray-400 to-gray-600'} flex items-center justify-center text-white flex-shrink-0`}>
          <span className="text-2xl">{qrType?.icon || '🔗'}</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
            {qrCode.name || qrCode.data?.substring(0, 30) || 'QR Code'}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
            <span>{qrType?.name || 'URL'}</span>
            <span>•</span>
            <span>{formatDate(qrCode.createdAt)}</span>
            <span>•</span>
            <span>{qrCode.scans || 0} scans</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleView}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={handleEdit}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    );
  }

  // Grid view (card)
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-dark-900 rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group relative"
    >
      {/* Header with gradient */}
      <div className={`h-32 bg-gradient-to-br ${qrType?.color || 'from-gray-400 to-gray-600'} relative overflow-hidden`}>
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white rounded-full"></div>
        </div>
        
        {/* QR Type Icon */}
        <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <span className="text-2xl">{qrType?.icon || '🔗'}</span>
        </div>

        {/* Menu Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
              <button
                onClick={handleView}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors text-left"
              >
                <Eye className="w-4 h-4" />
                Voir détails
              </button>
              <button
                onClick={handleEdit}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors text-left"
              >
                <Edit2 className="w-4 h-4" />
                Modifier
              </button>
              <button
                onClick={handleCopy}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors text-left"
              >
                <Copy className="w-4 h-4" />
                Copier le lien
              </button>
              <button
                onClick={handleDownload}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors text-left"
              >
                <Download className="w-4 h-4" />
                Télécharger
              </button>
              <button
                onClick={handleShare}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors text-left"
              >
                <Share2 className="w-4 h-4" />
                Partager
              </button>
              <hr className="my-1 border-gray-200 dark:border-gray-700" />
              <button
                onClick={handleDelete}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors text-left"
              >
                <Trash2 className="w-4 h-4" />
                Supprimer
              </button>
            </div>
          )}
        </div>

        {/* Dynamic badge */}
        {qrCode.isDynamic && (
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
              Dynamique
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 truncate">
          {qrCode.name || qrCode.data?.substring(0, 30) || 'QR Code'}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 truncate">
          {qrCode.data || 'Pas de données'}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            {formatDate(qrCode.createdAt)}
          </span>
          <div className="flex items-center gap-1 text-primary-600 dark:text-primary-400">
            <BarChart3 className="w-4 h-4" />
            <span className="font-medium">{qrCode.scans || 0} scans</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
          <button
            onClick={handleView}
            className="flex-1 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            Détails
          </button>
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700"></div>
          <button
            onClick={handleEdit}
            className="flex-1 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            Modifier
          </button>
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700"></div>
          <a
            href={qrCode.data}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center justify-center gap-1"
          >
            <ExternalLink className="w-3 h-3" />
            Ouvrir
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default QRCodeCard;