import React, { useState } from "react";
import headerImg from "./../assets/images/bgLoginFormHeader.png";
import InputBoxComponent from "./InputBoxComponent";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginFormBox() {
  const navigate = useNavigate();

  const [userName, setuserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const loginBtnHandler = () => {
    setError(null);
    const body = {
      email: userName,
      password: password,
    };

    axios
      .post("https://hiring-dev.internal.kloudspot.com/api/auth/login", body)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        // ✅ Save token + user in context
        login(response.data.token);

        // ✅ Redirect
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.errorMessage);
      });
  };

  return (
    <div className="bg-white w-md text-black">
      <img src={headerImg} alt="form-header" className="w-full" />

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
        <button
          className={`w-full bg-teal-600 text-white py-3 rounded-xl ${
            userName === "" || password === ""
              ? "cursor-not-allowed"
              : "cursor-pointer"
          } text-lg font-medium hover:bg-teal-700`}
          disabled={userName === "" || password === ""}
          onClick={() => loginBtnHandler()}
        >
          Login
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default LoginFormBox;
