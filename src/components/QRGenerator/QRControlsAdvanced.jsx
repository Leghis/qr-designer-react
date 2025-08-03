import { useState } from 'react';
import { 
  Square, 
  Circle, 
  Sparkles, 
  Upload,
  Settings,
  ChevronDown,
  ChevronUp,
  Trash2,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QRControlsAdvanced = ({ qrData, setQrData, qrOptions, onOptionsChange }) => {
  const [mode, setMode] = useState('simple'); // 'simple' or 'advanced'
  const [showAdvancedSections, setShowAdvancedSections] = useState({
    dots: true,
    corners: false,
    background: false,
    shape: false,
    image: false
  });

  // Gradient types
  const gradientTypes = ['solid', 'linear', 'radial'];
  
  // Dot types
  const dotTypes = [
    { value: 'square', label: 'Carré' },
    { value: 'dots', label: 'Points' },
    { value: 'rounded', label: 'Arrondi' },
    { value: 'extra-rounded', label: 'Très arrondi' },
    { value: 'classy', label: 'Élégant' },
    { value: 'classy-rounded', label: 'Élégant arrondi' }
  ];

  // Corner types
  const cornerTypes = [
    { value: 'square', label: 'Carré' },
    { value: 'dot', label: 'Point' },
    { value: 'extra-rounded', label: 'Arrondi' }
  ];

  // Shape types
  const shapeTypes = [
    { value: 'square', label: 'Carré', icon: Square },
    { value: 'circle', label: 'Cercle', icon: Circle }
  ];

  // Handle gradient color stop changes
  const handleGradientStopChange = (section, stopIndex, field, value) => {
    const newOptions = { ...qrOptions };
    if (!newOptions[section]) newOptions[section] = {};
    if (!newOptions[section].gradient) newOptions[section].gradient = { type: 'linear', colorStops: [] };
    if (!newOptions[section].gradient.colorStops) newOptions[section].gradient.colorStops = [];
    
    newOptions[section].gradient.colorStops[stopIndex] = {
      ...newOptions[section].gradient.colorStops[stopIndex],
      [field]: field === 'offset' ? parseFloat(value) : value
    };
    
    onOptionsChange(newOptions);
  };

  // Add gradient stop
  const addGradientStop = (section) => {
    const newOptions = { ...qrOptions };
    if (!newOptions[section]) newOptions[section] = {};
    if (!newOptions[section].gradient) newOptions[section].gradient = { type: 'linear', colorStops: [] };
    
    const lastStop = newOptions[section].gradient.colorStops[newOptions[section].gradient.colorStops.length - 1];
    const newOffset = lastStop ? Math.min(lastStop.offset + 0.2, 1) : 0;
    
    newOptions[section].gradient.colorStops.push({
      offset: newOffset,
      color: '#000000'
    });
    
    onOptionsChange(newOptions);
  };

  // Remove gradient stop
  const removeGradientStop = (section, stopIndex) => {
    const newOptions = { ...qrOptions };
    if (newOptions[section]?.gradient?.colorStops) {
      newOptions[section].gradient.colorStops.splice(stopIndex, 1);
      onOptionsChange(newOptions);
    }
  };

  // Toggle section
  const toggleSection = (section) => {
    setShowAdvancedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Render gradient controls
  const renderGradientControls = (section, label) => {
    const sectionOptions = qrOptions[section] || {};
    const gradientType = sectionOptions.gradientType || 'solid';
    
    return (
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Type de {label}
        </label>
        
        <div className="flex gap-2">
          {gradientTypes.map(type => (
            <button
              key={type}
              onClick={() => {
                const newOptions = { ...qrOptions };
                if (!newOptions[section]) newOptions[section] = {};
                newOptions[section].gradientType = type;
                
                if (type !== 'solid' && !newOptions[section].gradient) {
                  newOptions[section].gradient = {
                    type: type === 'linear' ? 'linear' : 'radial',
                    rotation: 0,
                    colorStops: [
                      { offset: 0, color: sectionOptions.color || '#000000' },
                      { offset: 1, color: '#666666' }
                    ]
                  };
                }
                
                onOptionsChange(newOptions);
              }}
              className={`flex-1 px-3 py-2 rounded-lg border-2 transition-all ${
                gradientType === type
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
              }`}
            >
              {type === 'solid' ? 'Couleur unie' : type === 'linear' ? 'Dégradé linéaire' : 'Dégradé radial'}
            </button>
          ))}
        </div>

        {gradientType === 'solid' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Couleur
            </label>
            <input
              type="color"
              value={sectionOptions.color || '#000000'}
              onChange={(e) => {
                const newOptions = { ...qrOptions };
                if (!newOptions[section]) newOptions[section] = {};
                newOptions[section].color = e.target.value;
                onOptionsChange(newOptions);
              }}
              className="w-full h-12 border-2 border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer"
            />
          </div>
        ) : (
          <div className="space-y-4">
            {gradientType === 'linear' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Angle (degrés)
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={sectionOptions.gradient?.rotation || 0}
                  onChange={(e) => {
                    const newOptions = { ...qrOptions };
                    newOptions[section].gradient.rotation = parseInt(e.target.value);
                    onOptionsChange(newOptions);
                  }}
                  className="w-full"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {sectionOptions.gradient?.rotation || 0}°
                </span>
              </div>
            )}

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Points de couleur
                </label>
                <button
                  onClick={() => addGradientStop(section)}
                  className="p-1 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-2">
                {(sectionOptions.gradient?.colorStops || []).map((stop, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="color"
                      value={stop.color}
                      onChange={(e) => handleGradientStopChange(section, index, 'color', e.target.value)}
                      className="w-12 h-8 border-2 border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                    />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={stop.offset}
                      onChange={(e) => handleGradientStopChange(section, index, 'offset', e.target.value)}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
                      {Math.round(stop.offset * 100)}%
                    </span>
                    {sectionOptions.gradient?.colorStops?.length > 2 && (
                      <button
                        onClick={() => removeGradientStop(section, index)}
                        className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Personnalisation</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setMode('simple')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              mode === 'simple'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Simple
          </button>
          <button
            onClick={() => setMode('advanced')}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              mode === 'advanced'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Avancé
          </button>
        </div>
      </div>

      {/* QR Data Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Contenu du QR Code
        </label>
        <input
          type="text"
          value={qrData}
          onChange={(e) => setQrData(e.target.value)}
          placeholder="Entrez votre URL, texte ou données..."
          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all"
        />
      </div>

      {mode === 'simple' ? (
        // Simple Mode
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Couleur principale
              </label>
              <input
                type="color"
                value={qrOptions.dotsOptions?.color || '#000000'}
                onChange={(e) => {
                  const newOptions = { ...qrOptions };
                  if (!newOptions.dotsOptions) newOptions.dotsOptions = {};
                  newOptions.dotsOptions.color = e.target.value;
                  newOptions.dotsOptions.gradientType = 'solid';
                  delete newOptions.dotsOptions.gradient;
                  onOptionsChange(newOptions);
                }}
                className="w-full h-12 border-2 border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Couleur de fond
              </label>
              <input
                type="color"
                value={qrOptions.backgroundOptions?.color || '#ffffff'}
                onChange={(e) => {
                  const newOptions = { ...qrOptions };
                  if (!newOptions.backgroundOptions) newOptions.backgroundOptions = {};
                  newOptions.backgroundOptions.color = e.target.value;
                  newOptions.backgroundOptions.gradientType = 'solid';
                  delete newOptions.backgroundOptions.gradient;
                  onOptionsChange(newOptions);
                }}
                className="w-full h-12 border-2 border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Style des points
            </label>
            <select
              value={qrOptions.dotsOptions?.type || 'square'}
              onChange={(e) => {
                const newOptions = { ...qrOptions };
                if (!newOptions.dotsOptions) newOptions.dotsOptions = {};
                newOptions.dotsOptions.type = e.target.value;
                onOptionsChange(newOptions);
              }}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white"
            >
              {dotTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </>
      ) : (
        // Advanced Mode
        <div className="space-y-4">
          {/* Shape Section */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleSection('shape')}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-800 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
            >
              <span className="font-medium">Forme du QR Code</span>
              {showAdvancedSections.shape ? <ChevronUp /> : <ChevronDown />}
            </button>
            
            <AnimatePresence>
              {showAdvancedSections.shape && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex gap-3">
                      {shapeTypes.map(shape => (
                        <button
                          key={shape.value}
                          onClick={() => {
                            const newOptions = { ...qrOptions };
                            newOptions.shape = shape.value;
                            onOptionsChange(newOptions);
                          }}
                          className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                            (qrOptions.shape || 'square') === shape.value
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                          }`}
                        >
                          <shape.icon className="w-6 h-6" />
                          <span>{shape.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Dots Section */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleSection('dots')}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-800 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
            >
              <span className="font-medium">Points du QR Code</span>
              {showAdvancedSections.dots ? <ChevronUp /> : <ChevronDown />}
            </button>
            
            <AnimatePresence>
              {showAdvancedSections.dots && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Style des points
                      </label>
                      <select
                        value={qrOptions.dotsOptions?.type || 'square'}
                        onChange={(e) => {
                          const newOptions = { ...qrOptions };
                          if (!newOptions.dotsOptions) newOptions.dotsOptions = {};
                          newOptions.dotsOptions.type = e.target.value;
                          onOptionsChange(newOptions);
                        }}
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white"
                      >
                        {dotTypes.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                    
                    {renderGradientControls('dotsOptions', 'couleur des points')}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Corners Section */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleSection('corners')}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-800 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
            >
              <span className="font-medium">Coins du QR Code</span>
              {showAdvancedSections.corners ? <ChevronUp /> : <ChevronDown />}
            </button>
            
            <AnimatePresence>
              {showAdvancedSections.corners && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Style des coins
                      </label>
                      <select
                        value={qrOptions.cornersSquareOptions?.type || 'square'}
                        onChange={(e) => {
                          const newOptions = { ...qrOptions };
                          if (!newOptions.cornersSquareOptions) newOptions.cornersSquareOptions = {};
                          if (!newOptions.cornersDotOptions) newOptions.cornersDotOptions = {};
                          newOptions.cornersSquareOptions.type = e.target.value;
                          newOptions.cornersDotOptions.type = e.target.value;
                          onOptionsChange(newOptions);
                        }}
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white"
                      >
                        {cornerTypes.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                    
                    {renderGradientControls('cornersSquareOptions', 'couleur des coins')}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Background Section */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleSection('background')}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-800 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
            >
              <span className="font-medium">Arrière-plan</span>
              {showAdvancedSections.background ? <ChevronUp /> : <ChevronDown />}
            </button>
            
            <AnimatePresence>
              {showAdvancedSections.background && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4">
                    {renderGradientControls('backgroundOptions', 'couleur de fond')}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Logo/Image Section */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleSection('image')}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-800 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
            >
              <span className="font-medium">Logo / Image</span>
              {showAdvancedSections.image ? <ChevronUp /> : <ChevronDown />}
            </button>
            
            <AnimatePresence>
              {showAdvancedSections.image && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Télécharger un logo
                      </label>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 dark:bg-dark-900 hover:bg-gray-100 dark:hover:bg-dark-800">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Cliquez pour télécharger</span>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PNG, JPG ou SVG (MAX. 2MB)
                            </p>
                          </div>
                          <input type="file" className="hidden" accept="image/*" />
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Taille du logo
                      </label>
                      <input
                        type="range"
                        min="0.2"
                        max="0.6"
                        step="0.05"
                        value={qrOptions.imageOptions?.imageSize || 0.4}
                        onChange={(e) => {
                          const newOptions = { ...qrOptions };
                          if (!newOptions.imageOptions) newOptions.imageOptions = {};
                          newOptions.imageOptions.imageSize = parseFloat(e.target.value);
                          onOptionsChange(newOptions);
                        }}
                        className="w-full"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {Math.round((qrOptions.imageOptions?.imageSize || 0.4) * 100)}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Additional Settings */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h4 className="font-medium mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Paramètres supplémentaires
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Marge (pixels)
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={qrOptions.margin || 10}
                  onChange={(e) => {
                    const newOptions = { ...qrOptions };
                    newOptions.margin = parseInt(e.target.value);
                    onOptionsChange(newOptions);
                  }}
                  className="w-full"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {qrOptions.margin || 10}px
                </span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Niveau de correction d'erreur
                </label>
                <select
                  value={qrOptions.qrOptions?.errorCorrectionLevel || 'M'}
                  onChange={(e) => {
                    const newOptions = { ...qrOptions };
                    if (!newOptions.qrOptions) newOptions.qrOptions = {};
                    newOptions.qrOptions.errorCorrectionLevel = e.target.value;
                    onOptionsChange(newOptions);
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white"
                >
                  <option value="L">Faible (7%)</option>
                  <option value="M">Moyen (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">Élevé (30%)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRControlsAdvanced;