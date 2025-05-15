<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    use HasFactory;

    protected $fillable = [
        'judul',
        'slug',
        'tag',
        'penulis',
        'kategori',
        'gambar',
        'isi',
        'status',
        'tanggal_terbit',
        'views',
    ];

    /**
     * Relasi: Satu berita memiliki banyak komentar.
     */
    public function komentars()
    {
        return $this->hasMany(Komentar::class);
    }

    /**
     * (Optional) Relasi ke kategori, jika ada tabel dan model kategori.
     * public function kategori()
     * {
     *     return $this->belongsTo(Kategori::class, 'kategori', 'id');
     * }
     */
}