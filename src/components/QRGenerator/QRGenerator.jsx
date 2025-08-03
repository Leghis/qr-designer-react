import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Edit3, Plus } from 'lucide-react';
import QRGeneratorPro from './QRGeneratorPro';
import QRGeneratorTemplateEditor from './QRGeneratorTemplateEditor';

const QRGenerator = ({ preSelectedTemplate, templateOptions, onDataChange, mode = 'create' }) => {
  const [generatorMode, setGeneratorMode] = useState(mode);
  
  // If template is provided, use template editor mode
  if (preSelectedTemplate && templateOptions) {
    return (
      <QRGeneratorTemplateEditor
        template={{ id: preSelectedTemplate, options: templateOptions }}
        templateOptions={templateOptions}
        onDataChange={onDataChange}
      />
    );
  }
  
  // Otherwise show mode selector and appropriate generator
  return (
    <div>
      {/* Mode Selector */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-xl bg-gray-100 dark:bg-dark-800 p-1">
          <button
            onClick={() => setGeneratorMode('create')}
            className={`
              px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2
              ${generatorMode === 'create'
                ? 'bg-white dark:bg-dark-900 text-primary-600 dark:text-primary-400 shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }
            `}
          >
            <Plus className="w-5 h-5" />
            Créer un QR Code
          </button>
          <button
            onClick={() => setGeneratorMode('advanced')}
            className={`
              px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2
              ${generatorMode === 'advanced'
                ? 'bg-white dark:bg-dark-900 text-primary-600 dark:text-primary-400 shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }
            `}
          >
            <Sparkles className="w-5 h-5" />
            Mode Avancé
          </button>
        </div>
      </div>
      
      {/* Generator Content */}
      <motion.div
        key={generatorMode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {generatorMode === 'create' ? (
          <QRGeneratorPro />
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <Edit3 className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Mode Édition Avancé
                  </h3>
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    Créez des QR codes personnalisés avec un contrôle total sur chaque aspect du design.
                    Parfait pour reproduire ou modifier des templates existants.
                  </p>
                </div>
              </div>
            </div>
            
            <QRGeneratorTemplateEditor
              template={null}
              templateOptions={null}
              onDataChange={onDataChange}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default QRGenerator;