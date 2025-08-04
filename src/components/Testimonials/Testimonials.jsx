import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const getTestimonials = (t) => [
  {
    name: t('testimonials.list.ecommerce.author'),
    role: t('testimonials.list.ecommerce.role'),
    content: t('testimonials.list.ecommerce.text'),
    avatar: 'from-blue-500 to-purple-600'
  },
  {
    name: t('testimonials.list.restaurant.author'),
    role: t('testimonials.list.restaurant.role'),
    content: t('testimonials.list.restaurant.text'),
    avatar: 'from-green-500 to-teal-600'
  },
  {
    name: t('testimonials.list.startup.author'),
    role: t('testimonials.list.startup.role'),
    content: t('testimonials.list.startup.text'),
    avatar: 'from-orange-500 to-red-600'
  }
];

const Testimonials = () => {
  const { t } = useTranslation();
  const testimonials = getTestimonials(t);
  
  return (
    <section className="py-20 bg-gray-50 dark:bg-dark-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-dark-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${testimonial.avatar} rounded-full`}></div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
