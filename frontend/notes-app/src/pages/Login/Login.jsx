import React from "react";
import Navbar from "../../components/navbar";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/input/PasswordInput";

const Login = () => {
  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center mt-28">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <form onSubmit={() => {}}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input type="text" placeholder="Email" className="input-box" />
            <PasswordInput />
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
