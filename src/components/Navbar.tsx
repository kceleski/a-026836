
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Building2, 
  CheckSquare, 
  Calendar, 
  BarChart3, 
  Menu, 
  X,
  Sun,
  Moon,
  ChevronRight,
  Settings,
  Phone,
  UserCheck,
  Heart
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  // Handle theme toggle
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const toggleSidebar = () => setIsOpen(!isOpen);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  const navItems = [
    { title: 'Dashboard', path: '/', icon: Home },
    { title: 'Clients', path: '/clients', icon: Users },
    { title: 'Facilities', path: '/facilities', icon: Building2 },
    { title: 'Tasks', path: '/tasks', icon: CheckSquare },
    { title: 'Calendar', path: '/calendar', icon: Calendar },
    { title: 'Analytics', path: '/analytics', icon: BarChart3 },
    { title: 'Contacts', path: '/contacts', icon: Phone },
    { title: 'Settings', path: '/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile Navigation Toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button 
          onClick={toggleSidebar} 
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-all active:scale-95 dark:bg-gray-800 dark:hover:bg-gray-700"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-care-primary/10 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } md:relative md:translate-x-0 flex flex-col h-full overflow-y-auto care-scrollbar`}
      >
        <div className="p-4 border-b border-care-primary/10 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 bg-care-primary/10 rounded-lg">
              <Heart className="h-6 w-6 text-care-primary" />
            </div>
            <div>
              <span className="text-lg font-bold text-care-text">Senior Care</span>
              <p className="text-xs text-care-text-light">Agent Dashboard</p>
            </div>
          </Link>
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`care-nav-link flex items-center space-x-3 py-3 px-4 rounded-lg transition-all ${
                isActive(item.path) 
                  ? 'bg-care-primary/10 text-care-primary font-medium border-l-4 border-care-primary' 
                  : 'hover:bg-care-accent text-care-text-light hover:text-care-primary'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <item.icon className={`h-5 w-5 ${isActive(item.path) ? 'text-care-primary' : ''}`} />
              <span>{item.title}</span>
              
              {isActive(item.path) && (
                <div className="ml-auto flex items-center">
                  <span className="h-2 w-2 rounded-full bg-care-primary animate-pulse-slow"></span>
                  <ChevronRight className="h-4 w-4 text-care-primary ml-1" />
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-care-primary/10">
          <div className="flex items-center space-x-3 px-3 py-2">
            <div className="w-10 h-10 bg-care-primary/10 rounded-full flex items-center justify-center">
              <UserCheck className="h-5 w-5 text-care-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-care-text">Sarah Johnson</p>
              <p className="text-xs text-care-text-light truncate">Senior Care Agent</p>
            </div>
          </div>
          <div className="mt-2 px-3">
            <div className="text-xs text-care-text-light">
              <span className="font-medium">Active Clients:</span> 24
            </div>
            <div className="text-xs text-care-text-light">
              <span className="font-medium">This Month:</span> 12 placements
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
