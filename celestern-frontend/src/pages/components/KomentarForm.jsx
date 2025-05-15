import React, { useState } from 'react';
import axios from 'axios';

export default function KomentarForm({ beritaId, onSucceed }) {
  const [nama, setNama] = useState('');
  const [komentar, setKomentar] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/komentar', {
        nama_user: nama,
        komentar,
        berita_id: beritaId,
      });
      setNama('');
      setKomentar('');
      onSucceed();
    } catch (err) {
      alert('Gagal mengirim komentar');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
      <input
        value={nama}
        onChange={e => setNama(e.target.value)}
        placeholder="Nama"
        required
        style={{ marginBottom: 8, display: 'block' }}
      />
      <textarea
        value={komentar}
        onChange={e => setKomentar(e.target.value)}
        placeholder="Komentar"
        required
        style={{ marginBottom: 8, width: '100%' }}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Mengirim...' : 'Kirim Komentar'}
      </button>
    </form>
  );
}
