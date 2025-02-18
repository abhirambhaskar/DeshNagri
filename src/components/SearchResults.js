import React from 'react';

const SearchResults = ({ results }) => {
  if (!results) return null;

  const { states, districts, subDistricts, villages } = results;
  
  const renderSection = (title, items) => {
    if (!items || items.length === 0) return null;
    
    return (
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <ul className="space-y-1">
          {items.map((item, index) => (
            <li key={index} className="p-2 bg-gray-50 rounded">
              {typeof item === 'string' ? item : (
                <>
                  {item.village || item.subDistrict || item.district}
                  <span className="text-gray-500 text-sm">
                    {item.state && ` in ${item.state}`}
                    {item.district && `, ${item.district}`}
                    {item.subDistrict && `, ${item.subDistrict}`}
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="mt-4">
      {renderSection('States', states)}
      {renderSection('Districts', districts)}
      {renderSection('Sub-Districts', subDistricts)}
      {renderSection('Villages', villages)}
    </div>
  );
};

export default SearchResults;