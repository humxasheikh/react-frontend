import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '../store/store';

function Header() {
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide transition-colors duration-300 hover:text-gray-200"
        >
          My Awesome Store
        </Link>
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <Link
                to="/"
                className="text-lg font-medium transition-colors duration-300 hover:text-gray-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="relative text-lg font-medium transition-colors duration-300 hover:text-gray-300 flex items-center"
              >
                Cart
                <span role="img" aria-label="shopping cart" className="ml-2">
                  🛒
                </span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
