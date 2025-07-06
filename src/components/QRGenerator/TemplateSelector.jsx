import { useState } from 'react';
import { Layout, Briefcase, Palette, Crown, Sparkles, Zap, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import qrService, { qrTemplates } from '../../services/qrService';
import { useNotification } from '../../context/NotificationContext';
import { useSubscription } from '../../hooks/useSubscription.jsx';

const templateIcons = {
  basic: Layout,
  business: Briefcase,
  colorful: Palette,
  modern: Sparkles,
  minimal: Zap,
  gradient: Crown
};

const templateColors = {
  basic: 'bg-gray-100 dark:bg-gray-700',
  business: 'bg-blue-100 dark:bg-blue-900/20',
  colorful: 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20',
  modern: 'bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20',
  minimal: 'bg-slate-100 dark:bg-slate-900/20',
  gradient: 'bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20'
};

const TemplateSelector = ({ onSelectTemplate }) => {
  const [activeTemplate, setActiveTemplate] = useState(null);
  const { showNotification } = useNotification();
  const { isPremium } = useSubscription();
  const navigate = useNavigate();

  const handleTemplateSelect = (templateKey) => {
    const templateOptions = qrService.applyTemplate(templateKey);
    if (templateOptions) {
      setActiveTemplate(templateKey);
      onSelectTemplate(templateOptions);
      showNotification(`Template "${qrTemplates[templateKey].name}" appliqué !`, 'success');
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Templates Rapides
      </label>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(qrTemplates).map(([key, template]) => {
          const Icon = templateIcons[key];
          const isActive = activeTemplate === key;
          
          return (
            <button
              key={key}
              type="button"
              onClick={() => handleTemplateSelect(key)}
              className={`
                p-3 border-2 rounded-lg transition-all text-left relative overflow-hidden
                ${isActive 
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-primary-500'
                }
              `}
            >
              {/* Free badge for free templates */}
              <div className="absolute top-1 right-1">
                <span className="bg-gradient-to-r from-green-400 to-green-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                  GRATUIT
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 ${templateColors[key]} rounded flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${
                    key === 'basic' ? 'text-gray-600 dark:text-gray-400' :
                    key === 'business' ? 'text-blue-600' :
                    key === 'colorful' ? 'text-purple-600' :
                    key === 'modern' ? 'text-cyan-600' :
                    key === 'minimal' ? 'text-slate-600' :
                    'text-violet-600'
                  }`} />
                </div>
                <div>
                  <div className="font-medium text-sm">{template.name}</div>
                  <div className="text-xs text-gray-500">
                    {key === 'basic' ? 'Style simple' :
                     key === 'business' ? 'Professionnel' :
                     key === 'colorful' ? 'Créatif' :
                     key === 'modern' ? 'Contemporain' :
                     key === 'minimal' ? 'Minimaliste' :
                     'Dégradé'}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Premium Unlock Button */}
      {!isPremium && (
        <button
          onClick={() => navigate('/#pricing')}
          className="mt-4 w-full bg-gradient-to-r from-primary-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-primary-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          <Lock className="w-4 h-4" />
          Débloquer 40+ Templates Premium
        </button>
      )}
      
      <div className="mt-3 text-center">
        <Link
          to="/premium"
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Parcourir la galerie complète →
        </Link>
      </div>
    </div>
  );
};

export default TemplateSelector;