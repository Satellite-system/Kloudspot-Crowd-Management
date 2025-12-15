import React, { useEffect, useState } from "react";
import logo from "./../assets/icons/logo.png";
import { FiHome } from "react-icons/fi";
import cowdIcon from "./../assets/icons/crowdEntries.png";
import hamburgerIcon from "./../assets/icons/hamburgerIcon.png";
import logoutIcon from "./../assets/icons/logout.png";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, MapPin } from "lucide-react"; // Using lucide-react for icons
import { FiBell } from "react-icons/fi";
import Profile from "./../assets/icons/Profile.png";
import CustomDropdownComponent from "../components/CustomDropdownComponent";
import { useAuth } from "../context/AuthContext";
import { useDataCache } from "../context/DataCacheContext";
import { useApi } from "../hooks/useApi";
import { useGlobal } from "../context/GlobalContext";

function MainLayout() {
  // console.log("Inside MainLayout");
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const { getCache, setCache, clearCache } = useDataCache();
  const { stateVal, setSelectedSite, clearAll } = useGlobal();
  const { getApi } = useApi();
  const [site, setSite] = useState([]);

  // alert(JSON.stringify(location.pathname));
  const isActive = () => location.pathname === "/";

  const logoutHandler = () => {
    logout();
    clearAll();
    clearCache();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const CACHE_KEY = "SITES";

    const cachedData = getCache(CACHE_KEY);

    // Cache valid for 5 minutes
    if (cachedData && Date.now() - cachedData.timestamp < 5 * 60 * 1000) {
      console.log("Using cached SITES: ", cachedData);
      setSite(cachedData.data);
      console.log("Selected Cache:: ", cachedData.data);
      setSelectedSite(cachedData.data[0]);
      return;
    } else {
      getApi("/sites").then((res) => {
        setSite(res);
        setCache(CACHE_KEY, {
          data: res,
          timestamp: Date.now(),
        });
        setSelectedSite(res[0]);
      });
    }
  }, []);

  return (
    <div className="w-screen h-screen flex flex-row">
      {/* Left Side Navigation */}
      <div
        className="w-[17%] h-screen bg-cover p-4 overflow-y-hidden flex flex-col justify-between"
        style={{ backgroundImage: "url('/sideBarBg.png')" }}
      >
        <div>
          <div className="flex flex-row items-center justify-between pr-4">
            <img src={logo} alt="logo" className="w-30 h-auto" />
            <img
              src={hamburgerIcon}
              alt="menu btn"
              className="h-3 w-auto cursor-pointer"
            />
          </div>

          <div className="mt-10 flex flex-col gap-2">
            <div
              className={`flex flex-row items-center gap-3 ${
                isActive("/")
                  ? "bg-[#656E6F] pl-0 py-2"
                  : "hover:bg-[#656E6F] py-4"
              } p-5   cursor-pointer rounded-md`}
              onClick={() => navigate("/")}
            >
              {isActive("/") && (
                <div className="bg-white h-12 w-2 rounded-3xl"></div>
              )}
              <FiHome color="white" size={30} />
              <span className="text-[#FFFFFF] font-ibm font-normal text-[20px] leading-[14.63px] tracking-[-0.27px] align-middle capitalize">
                Overview
              </span>
            </div>

            <div
              className={`flex flex-row items-center gap-3 ${
                isActive("/")
                  ? "hover:bg-[#656E6F] py-4"
                  : "bg-[#656E6F] pl-0 py-2"
              } p-5 cursor-pointer rounded-md`}
              onClick={() => navigate("/crowd-entries")}
            >
              {!isActive("/") && (
                <div className="bg-white h-12 w-2 rounded-3xl"></div>
              )}
              <img src={cowdIcon} alt="nav2" className="w-7" />
              <span className="text-[#FFFFFF] font-ibm font-normal text-[20px] leading-[14.63px] tracking-[-0.27px] align-middle capitalize">
                Crowd Entries
              </span>
            </div>
          </div>
        </div>

        {/* logout btn */}
        <div
          className="flex items-center gap-4 mt-auto cursor-pointer"
          onClick={() => logoutHandler()}
        >
          <img src={logoutIcon} alt="logout btn" className="w-4 h-4" />
          <span className="text-white text-lg">Logout</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="h-screen w-full overflow-y-scroll">
        {/* Top Header (for global actions/context) */}
        <div className="flex flex-row justify-between">
          {/* Header Left Section */}
          <div className="flex items-center space-x-4 h-16 px-4 bg-white border-b border-gray-200">
            {/* 1. Company/Main Label */}
            <div className="text-xl font-semibold text-gray-800">
              Crowd Solutions
            </div>

            {/* Separator Line */}
            <div className="h-6 w-0.5 bg-gray-300"></div>

            {site && site.length > 0 && (
              <CustomDropdownComponent
                locations={site}
                currLocation={stateVal.selectedSite || site[0]}
              />
            )}
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
  );
}

export default MainLayout;
