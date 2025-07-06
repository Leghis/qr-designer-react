import { motion } from 'framer-motion';
import { Palette, Zap, Smartphone, Image, ShieldCheck, Heart } from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: 'Personnalisation Totale',
    description: 'Couleurs, formes, logos - créez des QR codes uniques qui reflètent votre marque.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Zap,
    title: 'Génération Instantanée',
    description: 'Créez et modifiez vos QR codes en temps réel, sans attente ni rechargement.',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Smartphone,
    title: '100% Responsive',
    description: "Créez vos QR codes sur n'importe quel appareil, où que vous soyez.",
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Image,
    title: 'Export Haute Qualité',
    description: 'Téléchargez en PNG haute résolution ou SVG vectoriel pour tous vos besoins.',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: ShieldCheck,
    title: '100% Sécurisé',
    description: 'Vos données restent privées. Aucun stockage sur nos serveurs.',
    color: 'from-cyan-500 to-cyan-600'
  },
  {
    icon: Heart,
    title: 'Gratuit pour Toujours',
    description: 'Les fonctionnalités essentielles resteront toujours gratuites.',
    color: 'from-red-500 to-red-600'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white dark:bg-dark-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Fonctionnalités Puissantes
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Tout ce dont vous avez besoin pour créer des QR codes parfaits
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-dark-800 rounded-xl p-6 hover-lift"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;