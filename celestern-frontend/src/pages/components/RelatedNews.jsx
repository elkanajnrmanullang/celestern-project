import React from 'react';

export default function RelatedNews({ berita }) {
  return (
    <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
      {berita.map(b => (
        <div key={b.id} style={{ border: '1px solid #eee', padding: 8 }}>
          <a href={`/berita/${b.id}`}><img src={b.thumbnail} alt={b.judul} width={80} /></a>
          <div><a href={`/berita/${b.id}`}>{b.judul}</a></div>
        </div>
      ))}
    </div>
  );
}
