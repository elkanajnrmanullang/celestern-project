<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
    use HasFactory;

    protected $table = 'kategoris'; // Pastikan nama tabel di database cocok
    protected $fillable = ['nama'];

    public function berita()
    {
        return $this->hasMany(Berita::class);
    }
}