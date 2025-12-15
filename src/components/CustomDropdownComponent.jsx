import { ChevronDown, MapPin } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useGlobal } from "../context/GlobalContext";

const CustomDropdownComponent = ({ locations, currLocation }) => {
  const { setSelectedSite } = useGlobal();
  const [selectedLocation, setSelectedLocation] = useState(currLocation);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // --- Click Outside Logic using useEffect ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (location) => {
    setSelectedLocation(location);
    setSelectedSite(location);
    setIsOpen(false);
  };

  return (
    // Container: relative positioning for absolute dropdown menu
    <div className="relative inline-block" ref={dropdownRef}>
      {/* The Button/Trigger Element (Matching your image) */}
      <button
        className="
          flex items-center space-x-2 
          py-2 px-4 
          border border-gray-300 
          rounded-lg 
          bg-white 
          text-lg font-semibold text-gray-800 
          shadow-sm hover:bg-gray-50
          focus:outline-none focus:ring-2 focus:ring-gray-300
          transition duration-150 ease-in-out
        "
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={`Select current location, currently set to AvenueMall`}
      >
        {/* Pin Icon (Red) */}
        <MapPin className="w-5 h-5 text-black-500" />

        {/* Location Text */}
        <span className="whitespace-nowrap text-base font-medium text-gray-800">
          {selectedLocation.name}
        </span>

        {/* Chevron Icon (Rotates when open) */}
        <span
          className={`
            text-base ml-2 
            transform transition-transform duration-300
            ${isOpen ? "rotate-180" : ""}
          `}
        >
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </span>
      </button>

      {/* The Dropdown Menu (Conditionally rendered) */}
      {isOpen && (
        <div
          id="dropdown-menu"
          // Positioning and Styling
          className="
            absolute left-0 mt-3 
            w-64 min-w-[100px] max-w-[220px]
            bg-white 
            border border-gray-200 
            rounded-lg 
            shadow-xl 
            z-50 
            
            /* Tailwind Animation */
            origin-top transition ease-out duration-200
            transform opacity-100 scale-100
          "
        >
          {locations.map((location) => (
            <div
              key={location.siteId}
              className={`
                block px-5 py-3 
                text-gray-700 
                hover:bg-gray-50 
                cursor-pointer 
                transition duration-150 ease-in-out
                ${location === selectedLocation ? "font-bold bg-gray-100" : ""}
              `}
              onClick={() => handleSelect(location)}
            >
              {location.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdownComponent;
