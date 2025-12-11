import React from 'react'
import { useNavigate } from 'react-router-dom';
import LoginFormBox from '../components/LoginFormBox';

const LoginPage = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    console.log("Button CLicked")
    navigate("/dashboard");
  };

  return (
    <div className="relative h-screen w-screen">
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url('/bgLoginPage.png')" }}
  ></div>

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Content */}
  <div className="relative h-full w-full z-10 text-white flex justify-between items-center px-40">
      <h3 className='text-[#FFFFFF] font-ibm font-semibold text-[36px] leading-12 tracking-[2%]'>Welcome to the<br></br> Crowd Management System</h3>

      <LoginFormBox />

  </div>
</div>


  )
}

export default LoginPage