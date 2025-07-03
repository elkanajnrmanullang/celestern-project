import React, { useEffect, useState } from "react";
import axios from "axios";

// Fungsi warna perubahan
const getColor = (value) => {
  if (!value) return "";
  return value.startsWith("+") ? "text-green-600" : "text-red-600";
};

export default function RingkasanHarga() {
  const [indeks, setIndeks] = useState({
    IHSG: { nilai: "-", perubahan: "" },
    LQ45: { nilai: "-", perubahan: "" },
    USDIDR: { nilai: "-", perubahan: "" },
    BTCUSD: { nilai: "-", perubahan: "" },
    Gold: { nilai: "-", perubahan: "" },
    Oil: { nilai: "-", perubahan: "" },
    SP500: { nilai: "-", perubahan: "" },
  });

  const [waktu, setWaktu] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Jakarta",
      };
      const formatter = new Intl.DateTimeFormat("id-ID", options);
      const formatted = formatter.format(now);
      setWaktu(`Update: ${formatted}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("API KEY TEST:", process.env.REACT_APP_RAPIDAPI_KEY);

        const headers = {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
          "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
        };

        const resYahoo = await axios.get(
          "https://yh-finance.p.rapidapi.com/market/v2/get-quotes?symbols=^JKSE,^JKLQ45,USDIDR=X,^GSPC,GC=F,BZ=F",
          { headers }
        );

        const resBTC = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        );

        const quotes = resYahoo.data.quoteResponse.result;
        const getQuote = (symbol) =>
          quotes.find((q) => q.symbol === symbol) || {};
      

        setIndeks({
          IHSG: {
            nilai: getQuote("^JKSE").regularMarketPrice?.toLocaleString() || "-",
            perubahan:
              (getQuote("^JKSE").regularMarketChangePercent?.toFixed(2) || "") +
              "%",
          },
          LQ45: {
            nilai: getQuote("^JKLQ45").regularMarketPrice?.toLocaleString() || "-",
            perubahan:
              (getQuote("^JKLQ45").regularMarketChangePercent?.toFixed(2) || "") +
              "%",
          },
          USDIDR: {
            nilai: getQuote("USDIDR=X").regularMarketPrice?.toLocaleString() || "-",
            perubahan:
              (getQuote("USDIDR=X").regularMarketChangePercent?.toFixed(2) || "") +
              "%",
          },
          BTCUSD: {
            nilai: resBTC.data.bitcoin.usd?.toLocaleString() || "-",
            perubahan: "",
          },
          Gold: {
            nilai: getQuote("GC=F").regularMarketPrice?.toLocaleString() || "-",
            perubahan:
              (getQuote("GC=F").regularMarketChangePercent?.toFixed(2) || "") +
              "%",
          },
          Oil: {
            nilai: getQuote("BZ=F").regularMarketPrice?.toLocaleString() || "-",
            perubahan:
              (getQuote("BZ=F").regularMarketChangePercent?.toFixed(2) || "") + "%",
          },
          SP500: {
            nilai: getQuote("^GSPC").regularMarketPrice?.toLocaleString() || "-",
            perubahan:
              (getQuote("^GSPC").regularMarketChangePercent?.toFixed(2) || "") +
              "%",
          },
        });
      } catch (error) {
        console.error("❌ Gagal memuat data indeks:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-t border-b border-black py-3 mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm italic text-black">{waktu}</div>
        <a
          href="https://www.tradingview.com/"
          className="text-sm hover:text-blue-900"
          target="_blank"
          rel="noopener noreferrer"
        >
          Selengkapnya...
        </a>
      </div>
      <div className="flex flex-wrap justify-between gap-6 font-medium text-[15px]">
        <span>
          <b>IHSG</b> {indeks.IHSG.nilai}{" "}
          <span className={getColor(indeks.IHSG.perubahan)}>{indeks.IHSG.perubahan}</span>
        </span>
        <span>
          <b>LQ45</b> {indeks.LQ45.nilai}{" "}
          <span className={getColor(indeks.LQ45.perubahan)}>{indeks.LQ45.perubahan}</span>
        </span>
        <span>
          <b>USD/IDR</b> {indeks.USDIDR.nilai}{" "}
          <span className={getColor(indeks.USDIDR.perubahan)}>{indeks.USDIDR.perubahan}</span>
        </span>
        <span>
          <b>BTC/USD</b> {indeks.BTCUSD.nilai}{" "}
          <span className="text-gray-500">{indeks.BTCUSD.perubahan}</span>
        </span>
        <span>
          <b>Gold</b> {indeks.Gold.nilai}{" "}
          <span className={getColor(indeks.Gold.perubahan)}>{indeks.Gold.perubahan}</span>
        </span>
        <span>
          <b>Oil</b> {indeks.Oil.nilai}{" "}
          <span className={getColor(indeks.Oil.perubahan)}>{indeks.Oil.perubahan}</span>
        </span>
        <span>
          <b>S&P 500</b> {indeks.SP500.nilai}{" "}
          <span className={getColor(indeks.SP500.perubahan)}>{indeks.SP500.perubahan}</span>
        </span>
      </div>
    </div>
  );
}
