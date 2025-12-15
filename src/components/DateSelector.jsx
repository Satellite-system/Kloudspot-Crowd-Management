import React, { useState } from "react";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker"; // Third-party library for the calendar UI

const DateSelector = ({ selectedDate, setSelectedDate }) => {
  // State to manage the date currently selected in the calendar
  // const [selectedDate, setSelectedDate] = useState(new Date());

  // State to manage the visibility of the calendar dropdown/modal
  const [isOpen, setIsOpen] = useState(false);

  // Function to format the display text of the button
  const getDisplayText = () => {
    // If the selected date is today, show "Today"
    const today = new Date().toDateString();
    if (selectedDate && selectedDate.toDateString() === today) {
      return "Today";
    }
    // Otherwise, show the selected date in a readable format
    return selectedDate
      ? selectedDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "Select Date";
  };

  // Function to handle the date selection change
  const handleChange = (date) => {
    setSelectedDate(date);
    setIsOpen(false); // Close the calendar after selection
  };

  // Function to handle the button click (toggles visibility)
  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  // Function for the "Today" button behavior (sets date to today)
  const handleTodayClick = (e) => {
    e.stopPropagation(); // Prevents the main toggle from firing twice
    setSelectedDate(new Date());
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      {/* The Button (Toggle) - Based on your original component image */}
      <div
        onClick={toggleCalendar}
        className="cursor-pointer
          flex items-center space-x-2 
          px-4 py-2 
          bg-white 
          border border-gray-300 
          rounded-xl 
          shadow-sm 
          text-lg font-medium text-gray-700 
          hover:bg-gray-50 
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          transition duration-150 ease-in-out
        "
        aria-expanded={isOpen}
        aria-controls="date-picker-calendar"
      >
        <Calendar className="w-5 h-5 text-gray-600" aria-hidden="true" />
        <span>{getDisplayText()}</span>
      </div>

      {/* The Calendar Dropdown/Modal */}
      {isOpen && (
        <div
          id="date-picker-calendar"
          className="absolute z-10 mt-2 p-1 pb-0 bg-white border border-gray-300 rounded-lg shadow-xl right-0"
        >
          {/* Using the third-party DatePicker component */}
          <DatePicker
            selected={selectedDate}
            onChange={handleChange}
            inline // Renders the calendar directly, not as an input field
          />
        </div>
      )}
    </div>
  );
};

export default DateSelector;
