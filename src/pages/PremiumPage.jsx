import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ComingSoonModal from '../components/UI/ComingSoonModal';

const PremiumPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
    // Redirect to home page when modal is closed
    navigate('/');
  };

  useEffect(() => {
    // Show modal immediately when page loads
    setShowModal(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ComingSoonModal
        isOpen={showModal}
        onClose={handleCloseModal}
        type="premium"
        title={t('comingSoon.premium.title')}
        description={t('comingSoon.premium.description')}
      />
    </div>
  );
};

export default PremiumPage;
