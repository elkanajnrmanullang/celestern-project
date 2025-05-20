import React, { useEffect, useState } from "react";
// import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function StatistikBerita() {
  const [beritas, setBeritas] = useState([]);
  const [grafik, setGrafik] = useState([]);

  //REAL - TIME DATA
  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:8000/api/statistik/berita")
  //       .then((res) => {
  //         setBeritas(res.data.beritas);
  //         setGrafik(res.data.grafik);
  //       })
  //       .catch((err) => console.error(err));
  //   }, []);

  //DUMMY DATA
useEffect(() => {
  setBeritas([
    {
      id: 1,
      judul: "AI dan Masa Depan",
      view: 5200,
      share: 210,
      komentar_count: 12,
    },
    {
      id: 2,
      judul: "Ekonomi Kreatif 2025",
      view: 4300,
      share: 130,
      komentar_count: 8,
    },
  ]);

  setGrafik([
    { tanggal: "01 Mei", view: 200 },
    { tanggal: "02 Mei", view: 500 },
    { tanggal: "03 Mei", view: 400 },
    { tanggal: "04 Mei", view: 650 },
    { tanggal: "05 Mei", view: 900 },
    { tanggal: "06 Mei", view: 1100 },
    { tanggal: "07 Mei", view: 800 },
  ]);
}, []);


  const chartData = {
    labels: grafik.map((g) => g.tanggal),
    datasets: [
      {
        label: "Jumlah View",
        data: grafik.map((g) => g.view),
        backgroundColor: "#4A90E2",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="pt-20 px-6">
          <h1 className="text-xl font-semibold mb-4">Statistik Berita</h1>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border text-sm text-left border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-2">Judul Berita</th>
                  <th className="border px-4 py-2">View</th>
                  <th className="border px-4 py-2">Share</th>
                  <th className="border px-4 py-2">Avg. Time Read (Min)</th>
                  <th className="border px-4 py-2">Komentar</th>
                </tr>
              </thead>
              <tbody>
                {beritas.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{item.judul}</td>
                    <td className="border px-4 py-2">{item.view}</td>
                    <td className="border px-4 py-2">{item.share ?? 0}</td>
                    <td className="border px-4 py-2">5</td>
                    <td className="border px-4 py-2">{item.komentar_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">
              Grafik Total View Per Hari
            </h2>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </main>
      </div>
    </div>
  );
}
