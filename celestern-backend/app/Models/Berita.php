<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    use HasFactory;

    protected $table = 'beritas';

    protected $fillable = [
        'judul',
        'slug',
        'isi',
        'kategori_id',
        'user_id',
        'cover_image',
        'status',
        'jadwal_terbit',
        'views'
    ];

    protected $casts = [
        'jadwal_terbit' => 'datetime',
    ];

    public function kategori()
    {
        return $this->belongsTo(Kategori::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function komentars()
    {
        return $this->hasMany(Komentar::class);
    }

    // Hapus fungsi gambar karena salah asosiasi.
    // Jika ingin menyimpan banyak gambar, gunakan relasi ke model BeritaImage atau sejenis.
}
