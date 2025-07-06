import { motion } from 'framer-motion';

const steps = [
  {
    number: '1',
    title: 'Entrez votre contenu',
    description: 'URL, texte, email, téléphone... tout est possible'
  },
  {
    number: '2',
    title: 'Personnalisez le design',
    description: 'Couleurs, formes et styles à votre image'
  },
  {
    number: '3',
    title: 'Téléchargez',
    description: 'PNG ou SVG, prêt à utiliser partout'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-dark-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Comment ça marche ?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Créez votre QR code en 3 étapes simples
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl"
              >
                {step.number}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;