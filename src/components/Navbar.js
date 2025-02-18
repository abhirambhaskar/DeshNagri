// src/components/Navbar.js
import React from 'react';

const Navbar = ({ activeTab, setActiveTab, setIsAboutOpen }) => {
  return (
    <nav className="fixed top-0 right-0 nav_full bg-white z-20 border-b">
      <div className="w-full px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img src="/logo.jpg" alt="Logo" className="h-10 w-auto" />

          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab('search')}
              className={`px-3 py-2 text-sm font-medium ${
                activeTab === 'search' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
              }`}
            >
              Location Search
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className={`px-3 py-2 text-sm font-medium ${
                activeTab === 'api' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
              }`}
            >
              API Docs
            </button>
            <button
              onClick={() => setIsAboutOpen(true)}
              className="px-3 py-2 text-sm font-medium text-gray-500"
            >
              About
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;