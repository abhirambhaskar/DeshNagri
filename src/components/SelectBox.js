// src/components/SelectBox.js
const SelectBox = ({ value, options, onChange, placeholder, disabled }) => (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full p-3 pr-10 border rounded-lg bg-white appearance-none cursor-pointer
                 disabled:bg-gray-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2
                 focus:ring-blue-500 transition-all"
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      <svg
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  );
  
  export default SelectBox;