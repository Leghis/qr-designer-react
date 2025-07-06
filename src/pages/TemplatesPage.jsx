import { motion } from 'framer-motion';
import QRGenerator from '../components/QRGenerator/QRGenerator';

const TemplatesPage = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Générateur de QR Codes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Créez votre QR code personnalisé en quelques secondes
          </p>
        </motion.div>
        
        <QRGenerator />
      </div>
    </div>
  );
};

export default TemplatesPage;