import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 contain mx-auto p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
