// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t">
      <div className="w-full px-8 py-6">
        <div className="text-center">
          <p className="text-gray-600 flex items-center justify-center">
            © {new Date().getFullYear()} Made with 
            <span className="mx-1">❤️</span> 
            in India by Abhiram
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Data last updated: April 2024
          </p>
        </div>
       
      </div>
    </footer>
  );
};

export default Footer;