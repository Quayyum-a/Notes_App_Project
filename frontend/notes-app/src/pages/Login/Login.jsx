import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/input/PasswordInput";
import { validateEmail, validatePassword } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/Toast Message/Toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      navigate("/dashboard");
    }
  }, [navigate]);
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Invalid email, please enter a valid email");
      setShowToast(true);
      return;
    }

    if (!validatePassword(password)) {
      setError("Invalid password, please enter a valid password");
      setShowToast(true);
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
        setShowToast(true);
      } else {
        setError("An unexpected error occurred. Please try again.");
        setShowToast(true);
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center mt-28">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link
                to="/signUp"
                className="text-blue-500 hover:underline font-medium "
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Toast
        isShown={showToast && !!error}
        message={error}
        type="delete"
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default Login;
