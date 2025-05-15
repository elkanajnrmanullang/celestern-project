import React, { useEffect, useState, useCallback } from "react";
import KomentarList from "../components/KomentarList";
import KomentarForm from "../components/KomentarForm";
import RelatedNews from "../components/RelatedNews";
import axios from "axios";

export default function DetailBerita({ beritaId }) {
  const [berita, setBerita] = useState(null);
  const [komentars, setKomentars] = useState([]);
  const [related, setRelated] = useState([]);

  const fetchData = useCallback(async () => {
    const res = await axios.get(`/api/berita/${beritaId}`);
    setBerita(res.data.berita);
    setKomentars(res.data.komentars);
    setRelated(res.data.related_news);
  }, [beritaId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!berita) return <div>Loading...</div>;

  return (
    <div>
      <h1>{berita.judul}</h1>
      <div>
        <b>{berita.penulis}</b> -{" "}
        {new Date(berita.tanggal).toLocaleDateString()}
      </div>
      <img
        src={berita.gambar}
        alt={berita.judul}
        style={{ maxWidth: "100%" }}
      />
      <div dangerouslySetInnerHTML={{ __html: berita.isi }} />
      {/* Section AdSense */}
      <div
        style={{
          background: "yellow",
          padding: 24,
          margin: "24px 0",
          textAlign: "center",
        }}
      >
        AdSense
      </div>
      {/* Related News */}
      <RelatedNews berita={related} />
      {/* Komentar Section */}
      <KomentarList komentars={komentars} />
      <KomentarForm beritaId={beritaId} onSucceed={fetchData} />
    </div>
  );
}
