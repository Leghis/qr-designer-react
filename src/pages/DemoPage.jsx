import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Check, Zap, Palette, Download } from 'lucide-react';

const demoSteps = [
  {
    id: 'enter-data',
    title: 'Entrez votre contenu',
    description: 'Tapez une URL, du texte ou toute information',
    icon: <Zap className="w-6 h-6" />,
    duration: 3000
  },
  {
    id: 'customize',
    title: 'Personnalisez le design',
    description: 'Choisissez les couleurs et le style',
    icon: <Palette className="w-6 h-6" />,
    duration: 4000
  },
  {
    id: 'download',
    title: 'Téléchargez votre QR Code',
    description: 'Exportez en PNG ou SVG haute qualité',
    icon: <Download className="w-6 h-6" />,
    duration: 2000
  }
];

const DemoPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const startDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setProgress(0);
    runDemoStep(0);
  };

  const runDemoStep = (stepIndex) => {
    if (stepIndex >= demoSteps.length) {
      setIsPlaying(false);
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    const step = demoSteps[stepIndex];
    const duration = step.duration;
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const stepProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(stepProgress);

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setCurrentStep(stepIndex + 1);
          runDemoStep(stepIndex + 1);
        }, 500);
      }
    };

    setCurrentStep(stepIndex);
    updateProgress();
  };

  const pauseDemo = () => {
    setIsPlaying(false);
  };

  const resetDemo = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-dark-900 dark:to-purple-900/20 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Découvrez QR Designer en action
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Regardez comment créer un QR code personnalisé en quelques secondes
            </p>
            
            {/* Demo Controls */}
            <div className="flex gap-4 justify-center mb-8">
              {!isPlaying ? (
                <button
                  onClick={startDemo}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Lancer la démo
                </button>
              ) : (
                <button
                  onClick={pauseDemo}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <Pause className="w-5 h-5" />
                  Pause
                </button>
              )}
              <button
                onClick={resetDemo}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Recommencer
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-8">
                {demoSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex flex-col items-center flex-1 ${
                      index < demoSteps.length - 1 ? 'relative' : ''
                    }`}
                  >
                    {/* Connection Line */}
                    {index < demoSteps.length - 1 && (
                      <div
                        className={`absolute top-10 left-1/2 w-full h-0.5 transition-all duration-500 ${
                          currentStep > index 
                            ? 'bg-primary-600' 
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                        style={{
                          transform: 'translateX(50%)',
                          width: 'calc(100% - 80px)'
                        }}
                      />
                    )}
                    
                    {/* Step Circle */}
                    <motion.div
                      animate={{
                        scale: currentStep === index ? 1.2 : 1,
                        backgroundColor: currentStep >= index ? '#3b82f6' : '#e5e7eb'
                      }}
                      className={`w-20 h-20 rounded-full flex items-center justify-center mb-3 relative z-10 ${
                        currentStep >= index 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {currentStep > index ? (
                        <Check className="w-8 h-8" />
                      ) : (
                        step.icon
                      )}
                    </motion.div>
                    
                    {/* Step Title */}
                    <h3 className={`font-semibold text-center ${
                      currentStep >= index 
                        ? 'text-gray-900 dark:text-white' 
                        : 'text-gray-500 dark:text-gray-500'
                    }`}>
                      {step.title}
                    </h3>
                  </div>
                ))}
              </div>

              {/* Progress Bar for Current Step */}
              {isPlaying && currentStep < demoSteps.length && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-primary-600 h-full rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              )}
            </div>

            {/* Current Step Details */}
            {currentStep < demoSteps.length && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-8 text-center"
              >
                <div className="mb-6">
                  {demoSteps[currentStep].icon}
                </div>
                <h2 className="text-2xl font-bold mb-4">
                  {demoSteps[currentStep].title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {demoSteps[currentStep].description}
                </p>
              </motion.div>
            )}

            {/* Demo Complete */}
            {!isPlaying && currentStep >= demoSteps.length && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-primary-600 to-purple-700 text-white rounded-xl p-8 text-center"
              >
                <Check className="w-16 h-16 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">Démo terminée !</h2>
                <p className="text-xl mb-6">
                  Vous avez vu comme c'est simple de créer un QR code avec QR Designer
                </p>
                <div className="flex gap-4 justify-center">
                  <a
                    href="/"
                    className="px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Créer mon QR code
                  </a>
                  <button
                    onClick={startDemo}
                    className="px-6 py-3 bg-transparent border-2 border-white rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors"
                  >
                    Revoir la démo
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50 dark:bg-dark-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pourquoi choisir QR Designer ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-dark-900 rounded-lg p-6 text-center"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Ultra rapide</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Génération instantanée de vos QR codes
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-dark-900 rounded-lg p-6 text-center"
            >
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">100% personnalisable</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Adaptez chaque détail à votre image
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-dark-900 rounded-lg p-6 text-center"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Qualité professionnelle</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Export haute résolution pour tous supports
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DemoPage;