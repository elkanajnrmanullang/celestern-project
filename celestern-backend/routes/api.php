<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\KomentarController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Semua route di sini akan otomatis diberi prefix "/api"
| karena berada di file routes/api.php
*/

// 📦 Route Berita
Route::prefix('berita')->group(function () {
    Route::get('/', [BeritaController::class, 'index']);
    Route::get('/{id}', [BeritaController::class, 'show']);
    Route::post('/', [BeritaController::class, 'store']);
    Route::put('/{id}', [BeritaController::class, 'update']);
    Route::delete('/{id}', [BeritaController::class, 'destroy']);
    Route::patch('/{id}/view', [BeritaController::class, 'incrementView']);
    Route::patch('/{id}/publish', [BeritaController::class, 'publishNow']);
});

// 📁 Route Kategori
Route::get('/kategori', [KategoriController::class, 'index']);
Route::post('/kategori', [KategoriController::class, 'store']);
Route::put('/kategori/{id}', [KategoriController::class, 'update']);
Route::delete('/kategori/{id}', [KategoriController::class, 'destroy']);

// 🖼️ Route Upload Gambar
Route::post('/upload-gambar', [UploadController::class, 'upload']);

// 💬 Route Komentar (sementara TANPA middleware, agar bisa langsung diuji di frontend)
Route::prefix('komentar')->group(function () {
    Route::get('/', [KomentarController::class, 'index']);
    Route::post('/', [KomentarController::class, 'store']);
    Route::patch('/{id}', [KomentarController::class, 'update']);
    Route::delete('/{id}', [KomentarController::class, 'destroy']);
});