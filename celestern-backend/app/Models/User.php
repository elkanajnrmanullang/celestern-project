<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

// ✅ Tambahkan ini
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    // ✅ Tambahkan HasApiTokens agar bisa pakai createToken(), tokens(), dll
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'username',     // ✅ pastikan ini ditambahkan jika belum
        'email',
        'password',     // ✅ penting: agar bisa mass assignment kalau seeding
        'role',         // ✅ kalau kamu pakai kolom ini
        'picture',
        'login_type',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function beritas()
    {
        return $this->hasMany(Berita::class);
    }
}
