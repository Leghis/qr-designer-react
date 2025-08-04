import { useState } from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Twitter, Linkedin, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ComingSoonModal from '../UI/ComingSoonModal';

const Footer = () => {
  const { t } = useTranslation();
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: 'feature',
    title: '',
    description: ''
  });

  const openModal = (type, title, description) => {
    setModalState({
      isOpen: true,
      type,
      title,
      description
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: 'feature',
      title: '',
      description: ''
    });
  };
  
  return (
    <footer className="bg-dark-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
                <QrCode className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold">{t('footer.brand')}</h3>
            </div>
            <p className="text-gray-400">
              {t('footer.tagline')}
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.links.product')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  {t('common.home')}
                </Link>
              </li>
              <li>
                <Link to="/templates" className="hover:text-white transition-colors">
                  {t('footer.links.templates')}
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => openModal('premium', 'Premium Features', 'Découvrez bientôt nos fonctionnalités premium exclusives qui révolutionneront votre expérience QR Designer!')}
                  className="hover:text-white transition-colors text-left"
                >
                  {t('common.premium')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openModal('api', 'API Access', 'Notre API puissante arrive bientôt pour intégrer QR Designer dans vos applications!')}
                  className="hover:text-white transition-colors text-left"
                >
                  {t('footer.links.api')}
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.links.company')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={() => openModal('page', 'À Propos', 'Découvrez bientôt notre histoire, notre mission et les valeurs qui nous animent chez QR Designer.')}
                  className="hover:text-white transition-colors text-left"
                >
                  {t('footer.links.about')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openModal('page', 'Blog', 'Notre blog arrive bientôt avec des articles, tutoriels et conseils pour maximiser l\'usage des QR codes!')}
                  className="hover:text-white transition-colors text-left"
                >
                  {t('footer.links.blog')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openModal('page', 'Carrières', 'Rejoignez bientôt notre équipe dynamique et participez à l\'innovation dans l\'univers des QR codes!')}
                  className="hover:text-white transition-colors text-left"
                >
                  {t('footer.links.careers')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openModal('page', 'Contact', 'Une page de contact complète sera bientôt disponible pour répondre à toutes vos questions!')}
                  className="hover:text-white transition-colors text-left"
                >
                  {t('footer.links.contact')}
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.links.support')}</h4>
            <div className="flex gap-4">
              <button
                onClick={() => openModal('support', 'Support Twitter', 'Suivez-nous bientôt sur Twitter pour les dernières nouveautés et le support communautaire!')}
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button
                onClick={() => openModal('support', 'Support LinkedIn', 'Connectez-vous bientôt avec nous sur LinkedIn pour des insights professionnels!')}
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </button>
              <button
                onClick={() => openModal('support', 'Support GitHub', 'Découvrez bientôt notre code open-source et contribuez au projet sur GitHub!')}
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })} {t('footer.madeWith')} ❤️ {t('footer.in')}.</p>
        </div>
      </div>

      {/* Coming Soon Modal */}
      <ComingSoonModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
        title={modalState.title}
        description={modalState.description}
      />
    </footer>
  );
};

export default Footer;