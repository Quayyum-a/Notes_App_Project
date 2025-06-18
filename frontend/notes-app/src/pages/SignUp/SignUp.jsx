import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { validateEmail, validatePassword } from '../../utils/helper'
import { Link } from 'react-router-dom'
import PasswordInput from '../../components/input/PasswordInput'

const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = (e) => {
    e.preventDefault();

    if(!name.trim()) {
      setError("Name is required");
      return;
    }

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
    return (
      <>
        <Navbar />

        <div className="flex justify-center items-center mt-28">
          <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <form onSubmit={handleSignUp}>
              <h4 className="text-2xl mb-7">SignUp</h4>
              <input
                type="text"
                placeholder="Name"
                className="input-box"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
                Create Account
              </button> 
              <p className="text-sm text-center mt-4">
                Already registered?{" "}
                <Link
                  to="/login"
                  className="text-blue-500 hover:underline font-medium "
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </>
    );
}

export default SignUp;