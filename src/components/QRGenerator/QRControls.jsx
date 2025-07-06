const QRControls = ({ qrData, setQrData, qrOptions, setQrOptions }) => {
  const handleOptionChange = (optionKey, value) => {
    setQrOptions(prev => ({
      ...prev,
      [optionKey]: value
    }));
  };

  return (
    <div className="space-y-6">
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
      
      {/* Colors */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Couleur principale
          </label>
          <div className="relative">
            <input
              type="color"
              value={qrOptions.dotsColor}
              onChange={(e) => handleOptionChange('dotsColor', e.target.value)}
              className="w-full h-12 border-2 border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Couleur de fond
          </label>
          <div className="relative">
            <input
              type="color"
              value={qrOptions.bgColor}
              onChange={(e) => handleOptionChange('bgColor', e.target.value)}
              className="w-full h-12 border-2 border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer"
            />
          </div>
        </div>
      </div>
      
      {/* Dot Style */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Style des points
        </label>
        <select
          value={qrOptions.dotsType}
          onChange={(e) => {
            const style = e.target.value;
            handleOptionChange('dotsType', style);
            
            // Adjust corner styles based on dot style
            if (style === 'rounded' || style === 'classy-rounded') {
              handleOptionChange('cornersType', 'extra-rounded');
            } else if (style === 'dots') {
              handleOptionChange('cornersType', 'dot');
            } else {
              handleOptionChange('cornersType', 'square');
            }
          }}
          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white"
        >
          <option value="square">Carré</option>
          <option value="dots">Points</option>
          <option value="rounded">Arrondi</option>
          <option value="classy">Élégant</option>
          <option value="classy-rounded">Élégant arrondi</option>
        </select>
      </div>
    </div>
  );
};

export default QRControls;