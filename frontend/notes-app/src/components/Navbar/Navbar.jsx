import React, { useState } from "react";
import ProfileInfo from "../cards/ProfileInfo";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { FaRegStickyNote } from "react-icons/fa";

const Navbar = ({ userInfo, searchNote, handleClearSearch }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("token");
  const isLoginPage = location.pathname === "/login";
  const isSignUpPage = location.pathname === "/signUp";

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (search) {
      searchNote(search);
    }
  };

  const onClearSearch = () => {
    setSearch("");
    handleClearSearch();
  };

  return (
    <nav className="bg-gradient-to-r from-blue-50 to-green-50 shadow-lg rounded-xl mx-4 mt-4 mb-6 px-6 py-3 flex items-center justify-between transition-all duration-300">
      <div
        className="flex items-center gap-3 cursor-pointer select-none"
        onClick={() => navigate(isAuthenticated ? "/dashboard" : "/")}
      >
        <FaRegStickyNote className="text-3xl text-blue-500 drop-shadow-sm" />
        <span className="text-2xl font-extrabold text-gray-800 tracking-tight logo-text hover:text-green-600 transition-colors duration-200">
          NoteNest
        </span>
      </div>
      {isAuthenticated && !isLoginPage && !isSignUpPage && (
        <div className="flex-1 flex justify-center">
          <SearchBar
            value={search}
            onChange={({ target }) => setSearch(target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
        </div>
      )}
      {isAuthenticated && !isLoginPage && !isSignUpPage && (
        <div className="flex items-center gap-4">
          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
