import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function CommentBox({ beritaSlug }) {
  const navigate = useNavigate();
  const [komentar, setKomentar] = useState("");
  const [semuaKomentar, setSemuaKomentar] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) setUser(userData);

    // Dummy: komentar awal (bisa diganti fetch ke backend nantinya)
    setSemuaKomentar([
      {
        nama: "Reynold Jnr Eternio",
        komentar:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.",
        foto: null,
      },
    ]);
  }, []);

  const handleKirim = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!komentar.trim()) return;

    const newKomentar = {
      nama: user.name,
      komentar,
      foto: user.profile_picture,
    };

    setSemuaKomentar([newKomentar, ...semuaKomentar]);
    setKomentar("");
  };

  return (
    <div className="border-t pt-10 mt-14">
      <h3 className="text-2xl font-semibold text-center mb-4">Komentarmu</h3>
      <textarea
        value={komentar}
        onChange={(e) => setKomentar(e.target.value)}
        placeholder="Berikan komentarmu dan pendapatmu terhadap berita tersebut"
        className="w-full border px-4 py-3 rounded-md mb-4 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-black"
      />
      <div className="flex justify-center">
        <button
          onClick={handleKirim}
          className="border border-black text-black font-bold px-6 py-2 rounded-full hover:bg-black hover:text-white transition duration-200"
        >
          KIRIM
        </button>
      </div>

      <hr className="my-10" />
      <h3 className="text-xl font-semibold mb-6">Komentar</h3>

      {semuaKomentar.map((kom, idx) => (
        <div key={idx} className="mb-6 border-b pb-4 flex items-start gap-4">
          {kom.foto ? (
            <img
              src={kom.foto}
              alt={kom.nama}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-3xl mt-1" />
          )}
          <div>
            <p className="font-semibold">{kom.nama}</p>
            <p className="text-sm text-gray-800 mt-1">{kom.komentar}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
