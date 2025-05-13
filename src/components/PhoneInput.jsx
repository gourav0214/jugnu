
import React, { useState } from 'react';

const PhoneInput = ({
  value,
  onChange,
  placeholder = "Phone number"
}) => {
  const [countryCode, setCountryCode] = useState("+91");
  
  const handleValueChange = (e) => {
    const phoneNumber = e.target.value;
    onChange(phoneNumber);
  };

  return (
    <div className="relative flex items-center rounded-md border border-gray-300 bg-white">
      <div className="flex items-center p-2 border-r border-gray-300">
        <span className="text-sm text-gray-700">{countryCode}</span>
        <svg
          className="w-4 h-4 ml-1 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
      <input
        type="tel"
        value={value}
        onChange={handleValueChange}
        className="w-full py-2 px-3 bg-transparent outline-none text-gray-700"
        placeholder={placeholder}
      />
    </div>
  );
};

export default PhoneInput;