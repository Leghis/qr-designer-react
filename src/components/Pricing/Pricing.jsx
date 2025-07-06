import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSubscription } from '../../hooks/useSubscription.jsx';
import { useNotification } from '../../context/NotificationContext';

const plans = [
  {
    name: 'Gratuit',
    planId: 'free',
    price: '0€',
    period: 'Pour toujours',
    features: [
      '10 QR codes par jour',
      'Personnalisation basique',
      'Export PNG & SVG',
      'QR codes statiques',
      '6 templates gratuits'
    ],
    buttonText: 'Commencer gratuitement',
    buttonStyle: 'border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary-500',
    popular: false
  },
  {
    name: 'Premium',
    planId: 'premium',
    price: '9,99€',
    period: 'par mois',
    features: [
      'QR codes illimités',
      'QR codes dynamiques',
      'Analytics avancées',
      'Logo personnalisé',
      '40+ templates premium'
    ],
    buttonText: 'Essai gratuit 7 jours',
    buttonStyle: 'bg-white text-primary-600 hover:bg-gray-100',
    popular: true,
    cardStyle: 'bg-gradient-to-br from-primary-500 to-purple-600 text-white transform scale-105 shadow-2xl'
  },
  {
    name: 'Entreprise',
    planId: 'enterprise',
    price: '29,99€',
    period: 'par mois',
    features: [
      'Tout du plan Premium',
      'API complète',
      'Équipe collaborative',
      'Génération en masse',
      'Support prioritaire'
    ],
    buttonText: 'Nous contacter',
    buttonStyle: 'border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary-500',
    popular: false
  }
];

const Pricing = () => {
  const { updateSubscription, plan: currentPlan } = useSubscription();
  const { showNotification } = useNotification();

  const handlePlanSelect = (planId) => {
    if (planId === 'enterprise') {
      showNotification('Contactez notre équipe commerciale pour le plan Entreprise', 'info');
      return;
    }

    if (planId === currentPlan) {
      showNotification('Vous êtes déjà sur ce plan', 'info');
      return;
    }

    updateSubscription(planId);
    showNotification(
      planId === 'premium' 
        ? 'Félicitations ! Vous avez maintenant accès à tous les templates premium 🎉' 
        : 'Plan mis à jour avec succès',
      'success'
    );
  };

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-dark-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Tarifs Transparents</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Choisissez le plan qui vous convient
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`
                relative rounded-2xl p-8
                ${plan.cardStyle || 'bg-gray-50 dark:bg-dark-800'}
                ${plan.popular ? '' : 'hover-lift'}
              `}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Le plus populaire
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-5xl font-bold mb-2">{plan.price}</div>
                <p className={plan.popular ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'}>
                  {plan.period}
                </p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className={`w-5 h-5 mt-0.5 ${
                      plan.popular ? 'text-white' : 'text-green-500'
                    }`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => handlePlanSelect(plan.planId)}
                className={`w-full px-6 py-3 rounded-xl font-medium transition-all ${plan.buttonStyle}`}
              >
                {plan.buttonText}
                {currentPlan === plan.planId && (
                  <span className="ml-2 text-sm">(Actuel)</span>
                )}
              </button>
              
              {plan.name === 'Premium' && (
                <Link
                  to="/premium"
                  className="block w-full mt-3 text-center text-white/90 hover:text-white text-sm font-medium transition-colors"
                >
                  Voir les templates premium
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;