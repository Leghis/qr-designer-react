import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ComingSoonModal from '../components/UI/ComingSoonModal';

const PremiumPage = () => {
  const navigate = useNavigate();
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
        title="Fonctionnalités Premium"
        description="Découvrez bientôt nos fonctionnalités premium exclusives qui révolutionneront votre expérience QR Designer ! Templates avancés, personnalisation illimitée, analytics détaillés et bien plus encore."
      />
    </div>
  );
};

export default PremiumPage;