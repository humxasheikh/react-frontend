import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold ">
          E-Commerce
        </Link>
        <nav className="space-x-4">
          <Link
            to="/"
            className=" font-bold hover:underline hover:text-gray-400"
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="font-bold hover:underline hover:text-gray-400"
          >
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
