<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    use HasFactory;

    protected $table = 'beritas'; // Pastikan nama tabel cocok
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
        'views'
    ];

    public function kategori()
    {
        return $this->belongsTo(Kategori::class, 'kategori', 'id');
    }

    public function komentars()
    {
        return $this->hasMany(Komentar::class);
    }
}