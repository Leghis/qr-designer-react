import { useEffect } from 'react';
import TemplatesPro from '../components/Templates/TemplatesPro';

const TemplatesPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <TemplatesPro />
      </div>
    </div>
  );
};

export default TemplatesPage;