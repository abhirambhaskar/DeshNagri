// MainContent.js
import React from 'react';
import { motion } from 'framer-motion';
import SelectBox from './SelectBox';  
import ApiDocs from './ApiDocs';    

const MainContent = ({
  activeTab,
  selectedState,
  selectedDistrict,
  selectedSubDistrict,
  states,
  districts,
  subDistricts,
  villages,
  loading,
  error,
  fetchDistricts,
  fetchSubDistricts,
  fetchVillages
}) => {
  return (
    <main className="flex-1 px-8 py-6 mt-16">
      {activeTab === 'search' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8"
        >
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                India Location Database
              </h1>
              <p className="mt-2 text-gray-600">
                Access comprehensive data for Indian locations
              </p>
            </div>

            <div className="space-y-4">
              <SelectBox
                value={selectedState}
                options={states}
                onChange={fetchDistricts}
                placeholder="Select State"
              />

              <SelectBox
                value={selectedDistrict}
                options={districts}
                onChange={fetchSubDistricts}
                placeholder="Select District"
                disabled={!selectedState}
              />

              <SelectBox
                value={selectedSubDistrict}
                options={subDistricts}
                onChange={fetchVillages}
                placeholder="Select Sub-District"
                disabled={!selectedDistrict}
              />

              {loading && (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                  {error}
                </div>
              )}

              {villages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Villages in {selectedSubDistrict}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {villages.map((village, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
                      >
                        {village}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {selectedState && (
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">Selected Location Info</h4>
                  <div className="space-y-1 text-sm text-blue-800">
                    <p>State: {selectedState}</p>
                    {selectedDistrict && <p>District: {selectedDistrict}</p>}
                    {selectedSubDistrict && <p>Sub-District: {selectedSubDistrict}</p>}
                    {villages.length > 0 && <p>Total Villages: {villages.length}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <ApiDocs />
        </div>
      )}
    </main>
  );
};

export default MainContent;