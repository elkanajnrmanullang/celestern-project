import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaSearch } from "react-icons/fa";
import logoTCT from "../../assets/logo_TCT_PortalBerita (2).png"; // sesuaikan path

const kategori = [
  { label: "Beranda", path: "/" },
  { label: "Politik", path: "/kategori/politik" },
  { label: "Ekonomi & Bisnis", path: "/kategori/ekonomi-bisnis" },
  { label: "Teknologi", path: "/kategori/teknologi" },
  { label: "Gaya Hidup", path: "/kategori/gaya-hidup" },
  { label: "Internasional", path: "/kategori/internasional" },
  { label: "Seni", path: "/kategori/seni" },
];

const PublicHeader = () => {
  return (
    <header className="bg-white border-b border-gray-300">
      {/* Logo + Profil */}
      <div className="flex justify-between items-center px-4 py-6 border-b border-gray-300">
        <div className="flex-1 text-center">
          <img
            src={logoTCT}
            alt="The Celestern Times"
            className="mx-auto h-20 object-contain"
          />
        </div>
        <div className="text-right">
          <button className="text-2xl text-gray-700 hover:text-black">
            <FaUser />
          </button>
        </div>
      </div>

      {/* Navbar */}
      <div className="border-t border-gray-400">
        <div className="border-t border-b mt-1 border-gray-400">
          <nav
            className="flex justify-center gap-6 py-3 text-xl font-semibold"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            {kategori.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "underline text-black-700"
                    : "text-gray-800 hover:underline"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Search */}
      <div className="border-b py-4 px-4 md:px-16 flex justify-center">
        <div className="relative w-full max-w">
          <input
            type="text"
            placeholder="Cari topik yang anda inginkan disini ..."
            className="w-full border-1 rounded-full py-2 pl-5 pr-10 text-sm shadow-inner bg-[#F3F3F3] focus:outline-none focus:ring-2 focus:ring-black"
          />
          <FaSearch className="absolute top-2.5 right-3 text-gray-500 text-sm" />
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
