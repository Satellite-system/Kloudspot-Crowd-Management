import React, { useState } from 'react'
// import { Eye, EyeOff } from "lucide-react";
import { FiEye, FiEyeOff } from 'react-icons/fi';

function InputBoxComponent({ label, placeholder, value, onChange, type = 'text', required = false,password=false }) {
   const [showPass, setShowPass] = useState(false);
   
  return (
    <div className="relative w-full max-w-sm">

      {/* Label/Placeholder that stays on top */}
      <label
        htmlFor={label.replace(/\s/g, '_')} // Creates a valid ID/For attribute
        className="absolute top-0 left-3 -mt-3 px-1 text-lg font-medium text-gray-600 bg-white z-10"
      >
        {label} {required && <span className="text-gray-600">*</span>}
      </label>

      {/* The actual input field */}
      {password ? <div className="flex flex-row justify-center border border-gray-300 rounded-lg px-4 py-5 pr-12 focus:ring-2 focus:ring-teal-500">
        <input
          type={showPass ? "text" : "password"}
          className="w-full border-none  text-black focus:outline-none "
        />

        {/* Eye Icon */}
        <button
          type="button"
          onClick={() => setShowPass(!showPass)}
          className="absolute right-4 text-gray-500 p-0 m-0 border-none outline-none focus:outline-none cursor-pointer"
        >
          {showPass ? <FiEyeOff className="h-5 w-5" color='black'/> : <FiEye className="h-5 w-5" color='black'/>}
        </button>
      </div>
      :
      <input
        type={type}
        id={label.replace(/\s/g, '_')}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="block w-full px-4 py-5 text-base text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white focus:outline-none"
      />}
    </div>
  )
}

export default InputBoxComponent