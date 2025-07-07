import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTA = () => {
  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-purple-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à créer des QR codes exceptionnels ?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Rejoignez plus de 50 000 entreprises qui utilisent QR Designer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToGenerator}
              className="px-8 py-4 bg-white dark:bg-gray-800 text-primary-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl font-semibold text-lg transition-all transform hover:scale-105"
            >
              Commencer gratuitement
            </button>
            <Link
              to="/premium"
              className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 rounded-xl font-semibold text-lg transition-all"
            >
              Voir les templates premium
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;