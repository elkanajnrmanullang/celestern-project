<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Komentar extends Model
{
    protected $fillable = [
        'nama', 'isi', 'berita_id', 'tanggal', 'status'
    ];

    public function berita()
    {
        return $this->belongsTo(Berita::class);
    }
}
