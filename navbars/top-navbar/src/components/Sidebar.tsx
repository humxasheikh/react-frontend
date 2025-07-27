const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 h-full w-40 bg-gray-800 text-white p-6">
      <div className="text-2xl font-bold mb-8">MyPanel</div>
      <nav className="flex flex-col  space-y-4">
        <a href="#" className="hover:text-gray-300">
          Dashboard
        </a>
        <a href="#" className="hover:text-gray-300">
          Users
        </a>
        <a href="#" className="hover:text-gray-300">
          Reports
        </a>
        <a href="#" className="hover:text-gray-300">
          Settings
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
