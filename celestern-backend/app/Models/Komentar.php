<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Berita;

class Komentar extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_user', 'komentar', 'berita_id', 'tanggal_komentar', 'status'
    ];

    public function berita()
    {
        return $this->belongsTo(Berita::class);
    }
}
