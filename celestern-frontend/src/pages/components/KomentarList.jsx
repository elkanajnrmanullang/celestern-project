import React from 'react';

export default function KomentarList({ komentars }) {
  return (
    <div>
      <h4>Komentar</h4>
      {komentars.length === 0 && <div>Belum ada komentar.</div>}
      {komentars.map(k => (
        <div key={k.id} style={{ borderBottom: '1px solid #eee', marginBottom: 8 }}>
          <b>{k.nama_user}</b> <span style={{ fontSize: 12, color: '#666' }}>{new Date(k.tanggal_komentar).toLocaleDateString()}</span>
          <div>{k.komentar}</div>
        </div>
      ))}
    </div>
  );
}
