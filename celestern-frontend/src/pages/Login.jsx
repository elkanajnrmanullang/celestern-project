import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoTCT from "../assets/logo.png";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/admin-login", {
        username,
        password,
      });

      const authData = {
        token: response.data.token,
        username: response.data.username,
        role: response.data.role,
        id: response.data.id,
      };

      console.log("✅ Login berhasil, menyimpan ke localStorage:", authData); 

      localStorage.setItem("auth_user", JSON.stringify(authData));

      window.location.replace("/dashboard");
    } catch (error) {
      alert(
        "Login gagal: " + (error?.response?.data?.message || "Server error")
      );
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        background:
          "linear-gradient(rgb(32, 45, 212) 0%, rgb(0, 51, 102) 67%, #000 100%)",
      }}
    >
      <div className="flex items-center mb-6">
        <img src={LogoTCT} alt="Logo TCT" className="w-30 h-20 mr-4" />
        <h1
          className="text-[65px] font-bold text-black drop-shadow-[0_4px_4px_rgba(255,255,255,0.6)]"
          style={{ fontFamily: "Odor Mean Chey, sans-serif" }}
        >
          The Celestern Times
        </h1>
      </div>

      <h2 className="text-white text-2xl mb-8">- Welcome to Admin Panel -</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 p-8 rounded-lg shadow-md w-80"
      >
        <div className="flex justify-center mb-6">
          <svg
            className="w-10 h-10 text-black"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
          </svg>
        </div>

        <div className="flex items-center border-b-2 border-black bg-transparent mb-4">
          <FaUser className="text-black mr-2" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 bg-transparent focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center border-b-2 border-black bg-transparent mb-6">
          <FaLock className="text-black mr-2" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-transparent focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-full hover:bg-white hover:text-black transition font-bold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
