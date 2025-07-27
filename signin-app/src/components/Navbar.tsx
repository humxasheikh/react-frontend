import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed w-full bg-blue-500 h-13 flex justify-between items-center p-4 text-2xl text-white">
      <div className="pl-10 font-bold hover:text-gray-300 pr-10">
        <Link to={isAuthenticated ? '/todos' : '/'}>Todo App</Link>
      </div>

      <div className="">
        {isAuthenticated ? (
          <>
            <Link
              to="/todos"
              className="hover:text-gray-300 hover:underline pr-10"
            >
              Todo
            </Link>
            <Link
              to="/profile"
              className="hover:text-gray-300 hover:underline pr-10"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-white hover:text-red-600 "
            >
              Logout
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
