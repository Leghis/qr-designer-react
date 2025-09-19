import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ThemeSelector from '../UI/ThemeSelector';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface-base text-primary-color">
      <Header />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
      <ThemeSelector variant="floating" />
    </div>
  );
};

export default Layout;
