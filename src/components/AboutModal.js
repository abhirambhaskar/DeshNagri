import React from 'react';
import { X } from 'lucide-react';

const AboutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">About IndiaLocator</h2>
        <div className="prose">
          <p className="text-gray-600 mb-4">
            IndiaLocator provides comprehensive location data for Indian states, districts, and villages. 
            Our data is collected from various reliable sources including government databases, 
            internet resources, and AI-assisted verification processes.
          </p>
          <p className="text-gray-600 mb-4">
            This tool is designed to help developers easily integrate Indian location data into their 
            applications through our free API. The data structure is hierarchical, making it simple 
            to navigate from states down to individual villages.
          </p>
          <h3 className="text-xl font-semibold mb-2">Data Sources</h3>
          <ul className="list-disc pl-5 mb-4 text-gray-600">
            <li>Government databases</li>
            <li>Public records</li>
            <li>Verified internet resources</li>
            <li>AI-assisted data compilation</li>
          </ul>
          <p className="text-gray-600">
            We're committed to maintaining data accuracy and regularly updating our database. 
            If you find any discrepancies or have suggestions, please feel free to contribute.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;