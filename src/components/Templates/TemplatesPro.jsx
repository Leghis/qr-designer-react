import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, Check, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { premiumTemplates } from '../../services/qrService';
import { useSubscription } from '../../hooks/useSubscription.jsx';
import QRCodeStyling from 'qr-code-styling';

// Categories with beautiful gradients
const CATEGORIES = [
  { id: 'all', name: 'Tous', gradient: 'from-gray-500 to-gray-600' },
  { id: 'spectacular', name: 'Spectaculaire', gradient: 'from-purple-500 to-pink-600' },
  { id: 'professional', name: 'Professionnel', gradient: 'from-blue-500 to-blue-700' },
  { id: 'creative', name: 'Créatif', gradient: 'from-orange-500 to-red-600' },
  { id: 'event', name: 'Événement', gradient: 'from-green-500 to-teal-600' },
  { id: 'hospitality', name: 'Hospitalité', gradient: 'from-amber-500 to-orange-600' },
  { id: 'retail', name: 'Commerce', gradient: 'from-pink-500 to-rose-600' },
  { id: 'health', name: 'Santé', gradient: 'from-cyan-500 to-blue-600' },
  { id: 'education', name: 'Éducation', gradient: 'from-indigo-500 to-purple-600' },
  { id: 'social', name: 'Réseaux sociaux', gradient: 'from-red-500 to-pink-600' }
];

const TemplatesPro = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isPremium, canUsePremiumTemplate } = useSubscription();
  const [usedPremiumTemplates, setUsedPremiumTemplates] = useState([]);
  
  // Filter templates by category
  const filteredTemplates = selectedCategory === 'all' 
    ? premiumTemplates 
    : premiumTemplates.filter(t => t.category === selectedCategory);
  
  return (
    <div>
      {/* Header Section */}
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Galerie de <span className="gradient-text">Templates Premium</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        >
          Plus de 40 designs exclusifs créés par des professionnels. 
          Trouvez le template parfait pour votre marque.
        </motion.p>
      </div>
      
      {/* Category Filter - Mobile Dropdown */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 md:hidden"
      >
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full px-6 py-3 bg-white dark:bg-dark-800 rounded-xl shadow-lg flex items-center justify-between"
          >
            <span className="font-medium">
              {CATEGORIES.find(c => c.id === selectedCategory)?.name}
            </span>
            <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-800 rounded-xl shadow-xl overflow-hidden z-20"
            >
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`
                    w-full px-6 py-3 text-left hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors
                    ${selectedCategory === category.id ? 'bg-gray-50 dark:bg-dark-700' : ''}
                  `}
                >
                  <span className={`bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent font-medium`}>
                    {category.name}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
      
      {/* Category Filter - Desktop */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="hidden md:flex flex-wrap justify-center gap-3 mb-12"
      >
        {CATEGORIES.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category.id)}
            className={`
              px-6 py-3 rounded-full font-medium transition-all
              ${selectedCategory === category.id 
                ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg transform scale-105` 
                : 'bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:shadow-md hover:scale-105'
              }
            `}
          >
            {category.name}
            {category.id !== 'all' && (
              <span className="ml-2 opacity-60">
                ({premiumTemplates.filter(t => t.category === category.id).length})
              </span>
            )}
          </motion.button>
        ))}
      </motion.div>
      
      {/* Templates Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredTemplates.map((template, index) => (
          <TemplateCard 
            key={template.id} 
            template={template} 
            index={index}
            isPremium={isPremium}
            canUse={isPremium || canUsePremiumTemplate(template.id)}
            isUsed={usedPremiumTemplates && usedPremiumTemplates.includes(template.id)}
          />
        ))}
      </motion.div>
      
      {/* Premium CTA */}
      {!isPremium && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 max-w-3xl mx-auto">
            <Crown className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">
              Débloquez tous les templates Premium
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Accédez à plus de 40 designs exclusifs et créez des QR codes qui se démarquent
            </p>
            <Link
              to="/premium"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
            >
              <Crown className="w-5 h-5" />
              Passer Premium
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Template Card Component
const TemplateCard = ({ template, index, isPremium, canUse, isUsed }) => {
  const [isHovered, setIsHovered] = useState(false);
  const qrRef = useRef(null);
  const qrContainerRef = useRef(null);
  
  // Generate QR preview
  useEffect(() => {
    if (!qrContainerRef.current) return;
    
    // Clear existing QR
    qrContainerRef.current.innerHTML = '';
    
    // Create QR with template options
    const qrOptions = {
      width: 200,
      height: 200,
      type: "svg",
      data: "https://qr-designer.com",
      margin: 10,
      ...template.options
    };
    
    qrRef.current = new QRCodeStyling(qrOptions);
    qrRef.current.append(qrContainerRef.current);
  }, [template]);
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div className={`
        relative bg-white dark:bg-dark-800 rounded-2xl overflow-hidden transition-all duration-300
        ${isHovered ? 'shadow-2xl transform -translate-y-2' : 'shadow-lg'}
      `}>
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className={`
            px-3 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-dark-900/90 backdrop-blur-sm
            bg-gradient-to-r ${CATEGORIES.find(c => c.id === template.category)?.gradient || 'from-gray-500 to-gray-600'}
            bg-clip-text text-transparent
          `}>
            {template.category}
          </span>
        </div>
        
        {/* Used/Premium Badge */}
        {isUsed && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1 bg-green-500 text-white text-xs rounded-full flex items-center gap-1">
              <Check className="w-3 h-3" />
              Utilisé
            </span>
          </div>
        )}
        
        {/* QR Preview */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-white/5"></div>
          <div 
            ref={qrContainerRef}
            className="w-full h-full flex items-center justify-center"
          />
          
          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center p-6"
          >
            <Link
              to={`/templates/${template.id}`}
              className="px-6 py-3 bg-white/90 dark:bg-dark-900/90 backdrop-blur-sm rounded-xl font-medium hover:bg-white dark:hover:bg-dark-900 transition-all transform hover:scale-105"
            >
              {canUse ? 'Personnaliser' : 'Voir le template'}
            </Link>
          </motion.div>
        </div>
        
        {/* Template Info */}
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            {template.name}
            {template.isPremium && !isPremium && (
              <Crown className="w-4 h-4 text-yellow-500" />
            )}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {template.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TemplatesPro;