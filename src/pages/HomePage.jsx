import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import QRGenerator from '../components/QRGenerator/QRGenerator';
import Features from '../components/Features/Features';
import Templates from '../components/Templates/Templates';
import Pricing from '../components/Pricing/Pricing';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import Testimonials from '../components/Testimonials/Testimonials';
import CTA from '../components/CTA/CTA';

const HomePage = () => {
  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden">
        {/* Background animé */}
        <div className="absolute inset-0 animated-gradient-bg opacity-10 dark:opacity-20"></div>
        
        {/* Floating shapes */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Créez des <span className="gradient-text">QR Codes</span><br/>
              qui <span className="relative inline-block">
                impressionnent
                <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10">
                  <path d="M0,5 Q50,0 100,5 T200,5" stroke="url(#gradient)" strokeWidth="3" fill="none"/>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor:'#667eea', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#764ba2', stopOpacity:1}} />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Le générateur de QR codes le plus moderne et intuitif. 
              Personnalisez, créez et téléchargez en quelques secondes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={scrollToGenerator}
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-xl"
              >
                Créer maintenant
                <ArrowRight className="inline w-5 h-5 ml-2" />
              </button>
              <Link
                to="/demo"
                className="px-8 py-4 bg-white dark:bg-dark-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary-500 rounded-xl font-semibold text-lg transition-all hover-lift flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-5 h-5" />
                Voir la démo
              </Link>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="text-3xl font-bold gradient-text">1M+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">QR Codes créés</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-3xl font-bold gradient-text">50K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Utilisateurs actifs</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-3xl font-bold gradient-text">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Gratuit</div>
              </motion.div>
            </div>
          </motion.div>

          {/* QR Generator */}
          <motion.div
            id="generator"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <QRGenerator />
          </motion.div>
        </div>
      </section>

      {/* Templates Section */}
      <Templates />

      {/* Features Section */}
      <Features />

      {/* How it Works */}
      <HowItWorks />

      {/* Pricing Section */}
      <Pricing />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <CTA />
    </>
  );
};

export default HomePage;