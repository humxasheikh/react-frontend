const TopNavbar = () => {
  return (
    <nav className="bg-blue-500">
      <div className="flex items-center ">
        <div className="text-white text-2xl font-bold px-4 flex-1 ">Site</div>

        <ul className="flex gap-x-8 items-center justify-end p-3 font-bold h-full">
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default TopNavbar;
