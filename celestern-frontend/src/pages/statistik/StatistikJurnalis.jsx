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

export default function StatistikJurnalis() {
  const [data, setData] = useState([]);

   // REAL - TIME DATA
  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:8000/api/statistik/jurnalis")
  //       .then((res) => setData(res.data.jurnalis))
  //       .catch((err) => console.error(err));
  //   }, []);

  // DATA DUMMY
  useEffect(() => {
    setData([
      {
        nama: "Elkana Manullang",
        artikel_terbaik: { judul: "Ekonomi Global 2025" },
        view: 9200,
        avg_view: 3066,
        avg_time_read: 5,
        komentar: 15,
      },
      {
        nama: "Adelia Putri",
        artikel_terbaik: { judul: "Kecerdasan Buatan dan UMKM" },
        view: 6400,
        avg_view: 3200,
        avg_time_read: 6,
        komentar: 8,
      },
    ]);
  }, []);

  const chartData = {
    labels: data.map((j) => j.nama),
    datasets: [
      {
        label: "Total View",
        data: data.map((j) => j.view),
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
          <h1 className="text-xl font-semibold mb-4">Statistik Jurnalis</h1>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border text-sm text-left border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-2">Nama</th>
                  <th className="border px-4 py-2">Artikel Terbaik</th>
                  <th className="border px-4 py-2">View</th>
                  <th className="border px-4 py-2">Avg. View</th>
                  <th className="border px-4 py-2">Avg. Time Read (Min)</th>
                  <th className="border px-4 py-2">Komentar</th>
                </tr>
              </thead>
              <tbody>
                {data.map((j, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{j.nama}</td>
                    <td className="border px-4 py-2">
                      {j.artikel_terbaik?.judul ?? "-"}
                    </td>
                    <td className="border px-4 py-2">{j.view}</td>
                    <td className="border px-4 py-2">{parseInt(j.avg_view)}</td>
                    <td className="border px-4 py-2">{j.avg_time_read}</td>
                    <td className="border px-4 py-2">{j.komentar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">
              Performa Jurnalis Berdasarkan View
            </h2>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </main>
      </div>
    </div>
  );
}
