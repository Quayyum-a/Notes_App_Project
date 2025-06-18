import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/input/PasswordInput";
import { validateEmail, validatePassword } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
  

  if(!validateEmail(email)) {
    setError("Invalid email, please enter a valid email");
    return;
  }

  if(!validatePassword(password)) {
    setError("Invalid password, please enter a valid password");
    return;
  }

  setError("");
}

try{
const response = await axiosInstance.post("/login",{
  email: email,
  password : password,
});
if(response.data && response.data.accessToken){
  localStorage.setItem("token", response.data.accessToken
    navigate('/dashboard');
  )
}
}catch (error){
  if(error.response && error.response.data && error.response.data.message){
    setError(error.response.data.message)
  }else {
    setError("An unexpected error occurred. Please try again.")
  }
}





  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center mt-28">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input type="text" placeholder="Email" className="input-box" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not registered yet? {" "}
              <Link to="/signUp" className="text-blue-500 hover:underline font-medium ">
              Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
