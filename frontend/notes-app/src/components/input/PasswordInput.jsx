import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center bg-transparent border border-gray-300 rounded mb-4 outline-none">
      <input
        value={value}
        onChange={onChange}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent px-4 py-3 border border-gray-300 rounded-md mb-4 outline-none"
      />
      {showPassword ? (
        <FaRegEye
          size={20}
          className="text-primary cursor-pointer"
          onClick={() => togglePassword()}
        />
      ) : (
        <FaRegEyeSlash
          size={20}
          className="text-primary cursor-pointer"
          onClick={() => togglePassword()}
        />
      )}
    </div>
  );
};

export default PasswordInput;
