import React from "react";
import { useAuth } from "../auth/AuthContext";
import logo from "../assets/logo.png";

const Header = () => {
  const { user, logout } = useAuth();

  // Fungsi untuk menampilkan role secara dinamis
  const getRoleTitle = (role) => {
    if (role === "admin") return "Administrator";
    if (role === "jurnalis") return "Jurnalis";
    return "User";
  };

  return (
    <header className="flex items-center justify-between bg-white shadow-md px-8 h-20 fixed top-0 left-0 right-0 z-20">
      {/* Logo + Title */}
      <div className="flex items-center space-x-4">
        <img src={logo} alt="TCT Logo" className="h-14 w-20" />
        <h1
          className="text-4xl font-bold"
          style={{ fontFamily: "Odor Mean Chey, sans-serif" }}
        >
          The Celestern Times
        </h1>
      </div>

      {/* Profile + Logout */}
      <div className="flex items-center space-x-6">
        {/* Bagian Nama & Role */}
        <div className="text-right">
          <div className="font-semibold">
            {user ? user.username : "Guest User"}
          </div>
          <div className="text-sm text-gray-500">
            {user ? getRoleTitle(user.role) : ""}
          </div>
        </div>

        {/* Icon Profile + Logout Button */}
        <div className="flex items-center space-x-2">
          <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-white">
            {/* Dummy Icon Profile */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
          </div>

          {/* Tombol Logout */}
          <button
            onClick={logout}
            className="bg-black hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded-full transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
