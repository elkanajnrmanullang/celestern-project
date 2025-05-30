import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./public-pages/Home";
import Detail from "./public-pages/Detail";
import PublicHeader from "./public-pages/components/PublicHeader";
import Footer from "./public-pages/components/Footer";

function App() {
  return (
    <Router>
      <div className="font-sans bg-white text-black">
        <PublicHeader />

        <main className="min-h-screen px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/berita/:id" element={<Detail />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
