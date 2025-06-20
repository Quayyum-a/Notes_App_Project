import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordStrength = (password) => {
    if (!password) return { label: '', color: '', score: 0 };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (password.length >= 12) score++;
    if (score <= 1) return { label: 'Weak', color: 'bg-red-400', score };
    if (score === 2 || score === 3) return { label: 'Medium', color: 'bg-yellow-400', score };
    if (score >= 4) return { label: 'Strong', color: 'bg-green-500', score };
    return { label: '', color: '', score };
  };

  return (
    <div className="w-full">
      <div className="flex items-center bg-transparent border border-gray-300 rounded mb-2 outline-none">
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
      {/* Password strength meter */}
      {value && (
        <div className="flex items-center gap-2 mt-1">
          <div className={`h-2 w-20 rounded ${getPasswordStrength(value).color}`}></div>
          <span className={`text-xs font-medium ${getPasswordStrength(value).color.replace('bg', 'text')}`}>{getPasswordStrength(value).label}</span>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
