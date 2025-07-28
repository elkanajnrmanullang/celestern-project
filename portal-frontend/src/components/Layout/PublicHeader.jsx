import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo_TCT_PortalBerita.png";
import { useAuth } from "../../Auth/AuthContext";

export default function PublicHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const kategori = [
    "Beranda",
    "Politik",
    "Ekonomi & Bisnis",
    "Teknologi",
    "Gaya Hidup",
    "Internasional",
    "Seni",
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="pb-4 relative">
      {/* Logo dan Tagline */}
      <div className="flex items-center justify-between px-8 pt-6 relative">
        <div className="text-center w-full">
          <img src={logo} alt="TCT Logo" className="h-16 mx-auto mb-2" />
        </div>

        {/* Icon Profil */}
        <div className="absolute right-8 top-6 z-40" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="focus:outline-none"
          >
            {user?.picture ? (
              <img
                src={user.picture}
                alt="User"
                className="w-10 h-10 rounded-full border border-gray-400"
              />
            ) : (
              <FaUserCircle className="w-10 h-10 text-gray-800" />
            )}
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-3 px-4 text-left z-50">
              {user ? (
                <>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                  <button
                    onClick={logout}
                    className="w-full bg-red-600 text-white py-1.5 rounded hover:bg-red-700 mt-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="w-full text-center text-neutral-600 hover:underline"
                >
                  Login dengan Google
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navbar */}
      <nav className="flex justify-center space-x-6 font-semibold text-lg mt-6">
        {kategori.map((item, index) => {
          const path =
            item.toLowerCase() === "beranda"
              ? "/"
              : `/kategori/${item
                  .toLowerCase()
                  .replace(/ & /g, "-and-")
                  .replace(/\s+/g, "-")}`;
          const isActive = location.pathname === path;

          return (
            <Link
              key={index}
              to={path}
              className={`relative px-1 ${
                isActive
                  ? "border-b-2 border-black text-black"
                  : "text-black hover:border-b-2 hover:border-black"
              }`}
            >
              {item}
            </Link>
          );
        })}
      </nav>

      <hr className="border-gray-900 mt-4" />
      <hr className="border-gray-900 mt-2" />

      {/* Search Bar */}
      <div className="w-full px-8 mt-4">
        <div className="flex items-center w-full border border-gray-900 rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="Cari topik yang anda inginkan di sini ..."
            className="flex-1 outline-none text-gray-700 text-base bg-transparent"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 15z"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}
