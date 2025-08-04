import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Twitter, Linkedin, Github } from 'lucide-react';
import { useTranslationOptimized } from '../../hooks/useTranslationOptimized';
import ComingSoonModal from '../UI/ComingSoonModal';

const Footer = () => {
  const { t, ready } = useTranslationOptimized();
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: 'feature',
    title: '',
    description: ''
  });

  const openModal = (type, title, description) => {
    // Ne pas ouvrir le modal si les traductions ne sont pas prêtes
    if (!ready) {
      return;
    }
    
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
                  onClick={() => openModal('premium', t('comingSoon.premium.title'), t('comingSoon.premium.description'))}
                  className="hover:text-white transition-colors text-left"
                >
                  {t('common.premium')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openModal('api', t('comingSoon.api.title'), t('comingSoon.api.description'))}
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
                  onClick={() => openModal('page', t('comingSoon.about.title'), t('comingSoon.about.description'))}
                  className="hover:text-white transition-colors text-left"
                >
                  {t('footer.links.about')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openModal('page', t('comingSoon.blog.title'), t('comingSoon.blog.description'))}
                  className="hover:text-white transition-colors text-left"
                >
                  {t('footer.links.blog')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openModal('page', t('comingSoon.careers.title'), t('comingSoon.careers.description'))}
                  className="hover:text-white transition-colors text-left"
                >
                  {t('footer.links.careers')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openModal('page', t('comingSoon.contact.title'), t('comingSoon.contact.description'))}
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
                onClick={() => openModal('support', t('comingSoon.twitter.title'), t('comingSoon.twitter.description'))}
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button
                onClick={() => openModal('support', t('comingSoon.linkedin.title'), t('comingSoon.linkedin.description'))}
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </button>
              <button
                onClick={() => openModal('support', t('comingSoon.github.title'), t('comingSoon.github.description'))}
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

export default memo(Footer);