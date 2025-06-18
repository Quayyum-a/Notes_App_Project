import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { validateEmail, validatePassword } from '../../utils/helper'

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = (e) => {
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
    return (
     <>
      <Navbar />

      <div className="flex justify-center items-center mt-28">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">SignUp</h4>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp;