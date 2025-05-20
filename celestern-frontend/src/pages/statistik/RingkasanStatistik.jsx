import React, { useEffect, useState } from "react";
// import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function RingkasanStatistik() {
  const [data, setData] = useState({
    hari: 0,
    minggu: 0,
    bulan: 0,
    total_view: 0,
    bounce_rate: 0,
    avg_time: 0,
    top_articles: [],
  });

  //DATA REAL - TIME NANTINYA
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/api/statistik/ringkasan")
  //     .then((res) => setData(res.data))
  //     .catch((err) => console.error(err));
  // }, []);

  // DUMMY DATA
  useEffect(() => {
    setData({
      hari: 240,
      minggu: 812,
      bulan: 198_321,
      total_view: 8621887,
      bounce_rate: 4.7,
      avg_time: 6,
      top_articles: [
        { id: 1, judul: "Ekonomi Dunia Terpuruk", view: 32100, share: 1500 },
        { id: 2, judul: "Teknologi AI di Indonesia", view: 29100, share: 1100 },
        { id: 3, judul: "Pemilu 2025 Semakin Dekat", view: 26500, share: 980 },
        { id: 4, judul: "Tren Wisata Digital", view: 22000, share: 700 },
        { id: 5, judul: "Startup Lokal Melejit", view: 18500, share: 520 },
      ],
    });
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="pt-20 px-6">
          <h1 className="text-xl font-semibold mb-4">Ringkasan Statistik</h1>

          {/* Ringkasan Pengunjung */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <Box title="Hari" value={data.hari} />
            <Box title="Minggu" value={data.minggu} />
            <Box title="Bulan" value={data.bulan} />
            <Box
              title="Total View Berita"
              value={data.total_view.toLocaleString()}
            />
            <Box title="Bounce Rate (%)" value={data.bounce_rate + "%"} />
            <Box
              title="Avg. Time On Page (Min)"
              value={data.avg_time + " Min"}
            />
          </div>

          {/* Artikel Terpopuler */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Artikel Terpopuler</h2>
            <table className="w-full border text-sm text-left border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-2">No.</th>
                  <th className="border px-4 py-2">Judul Berita</th>
                  <th className="border px-4 py-2">Jumlah View</th>
                  <th className="border px-4 py-2">Jumlah Share</th>
                </tr>
              </thead>
              <tbody>
                {data.top_articles.map((item, index) => (
                  <tr key={item.id} className="border hover:bg-gray-50">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{item.judul}</td>
                    <td className="border px-4 py-2">
                      {item.view.toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">
                      {item.share ? item.share.toLocaleString() : "0"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

function Box({ title, value }) {
  return (
    <div className="bg-blue-900 text-white rounded shadow p-4 text-center">
      <h3 className="text-sm mb-1">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
