import React from 'react'
import headerImg from "./../assets/images/bgLoginFormHeader.png"
import InputBoxComponent from './InputBoxComponent';


function LoginFormBox() {
  const [userName, setuserName] = React.useState('Parking_solutions');
  const [password, setPassword] = React.useState('Parking_solutions');

  return (
    <div className='bg-white w-md'>
      <img src={headerImg} alt="form-header" className='w-full' />

    <div className="w-full max-w-md mx-auto p-4 mt-5 gap-8 flex flex-col items-center">

      {/* Username */}
      <InputBoxComponent
        label="Log In"
        placeholder="Enter your solution name"
        value={userName}
        onChange={(e) => setuserName(e.target.value)}
        required={true}
        password={false}
      />

      {/* Password */}
      <InputBoxComponent
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required={true}
        password={true}
      />

      {/* Login Button */}
      <button className="w-full bg-teal-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-teal-700">
        Login
      </button>
    </div>

    </div>
  )
}


export default LoginFormBox