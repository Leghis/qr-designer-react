import { useState, useEffect } from 'react';
import { CreditCard, DollarSign, FileText } from 'lucide-react';
import Input from '../../UI/Input';

const PaymentEditor = ({ data, onChange, onPreviewUpdate }) => {
  const [payment, setPayment] = useState({
    provider: data.provider || 'paypal',
    amount: data.amount || '',
    currency: data.currency || 'EUR',
    description: data.description || '',
    paypalEmail: data.paypalEmail || '',
    stripeAccount: data.stripeAccount || ''
  });

  useEffect(() => {
    // Generate payment URL based on provider
    let paymentUrl = '';
    
    if (payment.provider === 'paypal' && payment.paypalEmail && payment.amount) {
      paymentUrl = `https://paypal.me/${payment.paypalEmail}/${payment.amount}${payment.currency}`;
    } else if (payment.provider === 'stripe' && payment.amount) {
      // For demo purposes - in real app, would use Stripe API
      paymentUrl = `https://checkout.stripe.com/demo/${payment.amount}${payment.currency}`;
    }

    onPreviewUpdate(paymentUrl);
    onChange(payment);
  }, [payment, onChange, onPreviewUpdate]);

  const handleChange = (field, value) => {
    setPayment(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const currencies = [
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'USD', symbol: '$', name: 'Dollar US' },
    { code: 'GBP', symbol: '£', name: 'Livre Sterling' },
    { code: 'CHF', symbol: 'CHF', name: 'Franc Suisse' }
  ];

  return (
    <div className="space-y-6">
      {/* Provider Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Méthode de paiement
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleChange('provider', 'paypal')}
            className={`p-4 rounded-xl border-2 transition-all ${
              payment.provider === 'paypal'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
            }`}
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PP</span>
              </div>
              <p className="font-medium text-gray-900 dark:text-white">PayPal</p>
            </div>
          </button>
          
          <button
            onClick={() => handleChange('provider', 'stripe')}
            className={`p-4 rounded-xl border-2 transition-all ${
              payment.provider === 'stripe'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
            }`}
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-purple-600 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <p className="font-medium text-gray-900 dark:text-white">Stripe</p>
            </div>
          </button>
        </div>
      </div>

      {/* Provider-specific fields */}
      {payment.provider === 'paypal' && (
        <Input
          type="email"
          label="Email PayPal"
          placeholder="votre.email@paypal.com"
          value={payment.paypalEmail}
          onChange={(e) => handleChange('paypalEmail', e.target.value)}
          required
        />
      )}

      {payment.provider === 'stripe' && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            ⚠️ L'intégration Stripe nécessite une configuration supplémentaire. Contactez le support pour activer cette fonctionnalité.
          </p>
        </div>
      )}

      {/* Amount and Currency */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Montant *
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={payment.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
              placeholder="10.00"
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-dark-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Devise
          </label>
          <select
            value={payment.currency}
            onChange={(e) => handleChange('currency', e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-dark-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
          >
            {currencies.map(currency => (
              <option key={currency.code} value={currency.code}>
                {currency.symbol} - {currency.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description du paiement *
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <textarea
            value={payment.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Paiement pour service de consultation..."
            rows={3}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-dark-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
            required
          />
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Récapitulatif du paiement
        </h4>
        <div className="bg-white dark:bg-dark-800 rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Montant :</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {payment.amount || '0.00'} {currencies.find(c => c.code === payment.currency)?.symbol}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Méthode :</span>
            <span className="font-medium text-gray-900 dark:text-white capitalize">
              {payment.provider}
            </span>
          </div>
          {payment.description && (
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {payment.description}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          💡 Le QR code généré redirigera directement vers la page de paiement sécurisée.
        </p>
      </div>
    </div>
  );
};

export default PaymentEditor;