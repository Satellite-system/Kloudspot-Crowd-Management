import React from 'react'
import logo from "./../assets/icons/logo.png"
import { FiHome } from "react-icons/fi";
import cowdIcon from "./../assets/icons/crowdEntries.png"
import hamburgerIcon from "./../assets/icons/hamburgerIcon.png"
import { Outlet } from "react-router-dom";
import { ChevronDown, MapPin } from 'lucide-react'; // Using lucide-react for icons
    import { FiBell } from "react-icons/fi";
    import Profile from "./../assets/icons/Profile.png"

function MainLayout() {
  return (
    <div className='w-screen h-screen flex flex-row'>

    {/* Left Side Navigation */}
      <div className='w-[17%] h-screen bg-cover p-4 overflow-y-hidden' style={{ backgroundImage: "url('/sideBarBg.png')" }}>

        <div className='flex flex-row items-center justify-between pr-4'>
          <img src={logo} alt="logo" className='w-30 h-auto'/>
          <img src={hamburgerIcon} alt="menu btn" className='h-3 w-auto cursor-pointer' />
        </div>

        <div className='mt-10 flex flex-col gap-2'>
          <div className='flex flex-row items-center gap-3 bg-[#656E6F] p-5 py-2 pl-0 cursor-pointer rounded-md'>
            <div className='bg-white h-12 w-2 rounded-3xl'></div>
            <FiHome color='white' size={30} />
            <span className='text-[#FFFFFF] font-ibm font-normal text-[20px] leading-[14.63px] tracking-[-0.27px] align-middle capitalize'>Overview</span>
          </div>

          <div className='flex flex-row items-center gap-3 hover:bg-[#656E6F] p-5 py-4 cursor-pointer rounded-md'>
            <img src={cowdIcon} alt="nav2" className='w-7' />
            <span className='text-[#FFFFFF] font-ibm font-normal text-[20px] leading-[14.63px] tracking-[-0.27px] align-middle capitalize'>Crowd Entries</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className='h-screen w-full overflow-y-scroll'>
        {/* Top Header (for global actions/context) */}
        <div className='flex flex-row justify-between overflow-hidden'>
          {/* Header Left Section */}
          <div className="flex items-center space-x-4 h-16 px-4 bg-white border-b border-gray-200">
            {/* 1. Company/Main Label */}
            <div className="text-xl font-semibold text-gray-800">
              Crowd Solutions
            </div>

            {/* Separator Line */}
            <div className="h-6 w-px bg-gray-300"></div>

            {/* 2. Location Selector Button */}
            <button
              // Tailwind classes for the button style:
              // - flex items-center: Layout the content (icon and text)
              // - px-4 py-2: Padding
              // - bg-white: White background
              // - border border-gray-300: Light border
              // - rounded-lg: Rounded corners (for the pill shape)
              // - shadow-sm: Subtle shadow
              // - hover:bg-gray-50: Slight hover effect
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition duration-150 ease-in-out"
              aria-label={`Select current location, currently set to AvenueMall`}
            >
              {/* Map Pin Icon */}
              <MapPin className="w-5 h-5 text-red-500" />
              
              {/* Location Text */}
              <span className="text-base font-medium text-gray-800">
                AvenueMall
              </span>
              
              {/* Dropdown Chevron Icon */}
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Header Right Section */}
          <div className="flex items-center gap-6">
            
            {/* Language Switch */}
            <div className="flex items-center border border-gray-300 rounded-full p-1">
              <div className="bg-teal-500 text-white rounded-full px-4 py-2 text-sm font-medium">
                En
              </div>
              <div className="px-4 text-gray-800 font-medium">&</div>
            </div>

            {/* Notification */}
            <div className="relative">
              <FiBell className="w-7 h-7 text-black" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
            </div>

            {/* Profile Image */}
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img
                src={Profile}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

        </div>



        {/* 4. The Content passed from the Router */}
          <Outlet />
      </div>
    </div>
  )
}

export default MainLayout