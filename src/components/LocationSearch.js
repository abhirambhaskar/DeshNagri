// src/components/LocationSearch.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import GlobeBackground from './GlobeBackground';
import Navbar from './Navbar';
import Footer from './Footer';
import MainContent from './MainContent';
import AboutModal from './AboutModal';

const API_BASE_URL = 'https://india-data.vercel.app/api';

const LocationSearch = () => {
  // State management
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('search');
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSubDistrict, setSelectedSubDistrict] = useState('');

  // Fetch initial states data
  useEffect(() => {
    fetchStates();
  }, []);

  // API calls
  const fetchStates = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/states`);
      setStates(response.data);
      clearError();
    } catch (err) {
      handleError('Failed to fetch states');
    } finally {
      setLoading(false);
    }
  };

  const fetchDistricts = async (state) => {
    try {
      setLoading(true);
      resetSelection('state', state);
      const response = await axios.get(`${API_BASE_URL}/districts/${state}`);
      setDistricts(response.data);
      clearError();
    } catch (err) {
      handleError('Failed to fetch districts');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubDistricts = async (district) => {
    try {
      setLoading(true);
      resetSelection('district', district);
      const response = await axios.get(
        `${API_BASE_URL}/subdistricts/${selectedState}/${district}`
      );
      setSubDistricts(response.data);
      clearError();
    } catch (err) {
      handleError('Failed to fetch sub-districts');
    } finally {
      setLoading(false);
    }
  };

  const fetchVillages = async (subDistrict) => {
    try {
      setLoading(true);
      setSelectedSubDistrict(subDistrict);
      const response = await axios.get(
        `${API_BASE_URL}/villages/${selectedState}/${selectedDistrict}/${subDistrict}`
      );
      setVillages(response.data);
      clearError();
    } catch (err) {
      handleError('Failed to fetch villages');
    } finally {
      setLoading(false);
    }
  };

  // Helper functions
  const resetSelection = (level, value) => {
    switch (level) {
      case 'state':
        setSelectedState(value);
        setSelectedDistrict('');
        setSelectedSubDistrict('');
        setDistricts([]);
        setSubDistricts([]);
        setVillages([]);
        break;
      case 'district':
        setSelectedDistrict(value);
        setSelectedSubDistrict('');
        setSubDistricts([]);
        setVillages([]);
        break;
      default:
        break;
    }
  };

  const clearError = () => setError('');
  const handleError = (message) => {
    setError(message);
    console.error(message);
  };

  return (
    <div className="min-h-screen bg-[#000014] overflow-hidden">
      {/* Left Side - Globe Animation */}
      <div className="fixed right-0 top-0 w-1/3 h-screen">
        <GlobeBackground />
      </div>

      {/* Right Side - Content */}
      <div className="fixed left-0 top-0 w-2/2 h-screen scrollable-content">
        {/* Navigation */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          setIsAboutOpen={setIsAboutOpen}
        />

        {/* Main Content Area */}
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            <MainContent 
              activeTab={activeTab}
              selectedState={selectedState}
              selectedDistrict={selectedDistrict}
              selectedSubDistrict={selectedSubDistrict}
              states={states}
              districts={districts}
              subDistricts={subDistricts}
              villages={villages}
              loading={loading}
              error={error}
              fetchDistricts={fetchDistricts}
              fetchSubDistricts={fetchSubDistricts}
              fetchVillages={fetchVillages}
            />
          </main>

          {/* Footer */}
          <Footer />
        </div>
        
      </div>
      

      {/* Modals and Overlays */}
      <AboutModal 
        isOpen={isAboutOpen} 
        onClose={() => setIsAboutOpen(false)} 
      />

      {/* Toast Messages */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
        >
          {error}
        </motion.div>
      )}
    </div>
  );
};

export default LocationSearch;
