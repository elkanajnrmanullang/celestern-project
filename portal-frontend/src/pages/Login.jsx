import React from "react";
import background from "../assets/login_bg.jpg";
import logo from "../assets/logo.png";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Auth/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login: loginContext } = useAuth(); 

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // 1. Ambil data user dari Google
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const profile = res.data;

        // 2. Kirim ke backend Laravel
        const backendRes = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/user-login`,
          {
            name: profile.name,
            email: profile.email,
            picture: profile.picture,
          }
        );

        const userData = backendRes.data?.user;

        // 3. Simpan ke context + localStorage
        if (backendRes.status === 200 && userData) {
          loginContext(userData); // ✅ simpan ke context
          toast.success("Login berhasil!");
          setTimeout(() => {
            navigate("/"); // ✅ Tidak perlu reload, Header akan update otomatis
          }, 1000);
        } else {
          toast.error("Login gagal: respons server tidak sesuai.");
          console.error("Login Backend Response:", backendRes);
        }
      } catch (err) {
        console.error("Login Error:", err);
        toast.error("Gagal mengambil atau menyimpan data user.");
      }
    },
    onError: () => {
      toast.error("Login gagal. Silakan coba lagi.");
    },
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />
      <div className="z-10 text-center px-6 py-10 w-full flex flex-col items-center">
        <img src={logo} alt="TCT Logo" style={{ width: "233px", height: "189px" }} className="mb-3" />
        <div style={{ width: "881px", height: "135px" }} className="mb-8">
          <h1
            style={{
              fontFamily: "'Odor Mean Chey', serif",
              fontSize: "98px",
              color: "#000",
              marginBottom: "0.3rem",
              lineHeight: 1.1,
            }}
          >
            The Celestern Times
          </h1>
          <p
            style={{
              fontFamily: "'Times New Roman', serif",
              fontSize: "39px",
              letterSpacing: "8%",
              color: "#000",
              marginTop: 0,
            }}
          >
            From Nusantara to The Globe, Without Limits
          </p>
        </div>
        <h2 className="text-4xl font-bold mt-4 mb-2 text-white">Sign Into Your TCT Account</h2>
        <p className="text-base italic mb-6 text-white">
          "Stay informed. Stay ahead. The Celestern Times."
        </p>
        <button
          onClick={() => login()}
          className="bg-white hover:bg-black text-black hover:text-white transition flex items-center justify-center gap-3 px-6 py-3 rounded-full border shadow-md"
        >
          <FcGoogle className="text-xl" />
          <span className="font-medium text-base">Login dengan Google</span>
        </button>
        <p className="text-xs mt-12 opacity-70 text-white">
          Powered by Altavara Group | © 2025 The Celestern Times.
        </p>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
