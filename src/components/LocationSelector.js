import React from 'react';

const LocationSelector = ({ label, value, options, onChange, disabled }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}:</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="w-full p-2 border rounded bg-white disabled:bg-gray-100"
    >
      <option value="">Select {label}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default LocationSelector;