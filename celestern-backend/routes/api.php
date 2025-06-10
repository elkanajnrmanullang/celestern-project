<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// ✅ Import semua controller hanya sekali
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\KomentarController;
use App\Http\Controllers\CommentSettingController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LoginLogController;
use App\Http\Controllers\StatistikController;
use App\Http\Controllers\IklanController;
use App\Http\Controllers\AdsConfigController;
use App\Http\Controllers\BackupController;
use App\Http\Controllers\IpRuleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Semua route di sini akan otomatis diberi prefix "/api"
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

// 🖼️ Upload Gambar
Route::post('/upload-gambar', [UploadController::class, 'upload']);

// 🔐 Login Admin + Middleware IP & Logging
Route::post('/login', [AuthController::class, 'login'])
    ->middleware(['check.ip', 'log.login']);

// 🛡️ Log Login Admin (untuk menu Keamanan)
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::get('/log-login', [LoginLogController::class, 'index']);
});

// 💬 Komentar & Pengaturan Komentar
Route::prefix('komentar')->group(function () {
    Route::get('/', [KomentarController::class, 'index']); // moderasi
    Route::get('/artikel/{id}', [KomentarController::class, 'getByArtikel']); // publik
    Route::post('/', [KomentarController::class, 'store']);
    Route::post('/{id}/status', [KomentarController::class, 'updateStatus']);
    Route::delete('/{id}', [KomentarController::class, 'destroy']);

    // 🛠️ Pengaturan sistem komentar
    Route::get('/pengaturan', [CommentSettingController::class, 'index']);
    Route::post('/pengaturan', [CommentSettingController::class, 'update']);
});

// 📊 Statistik Berita, Jurnalis, Ringkasan
Route::prefix('statistik')->group(function () {
    Route::get('/ringkasan', [StatistikController::class, 'ringkasan']);
    Route::get('/berita', [StatistikController::class, 'statistikBerita']);
    Route::get('/jurnalis', [StatistikController::class, 'statistikJurnalis']);
});

// 💸 Iklan & Monetisasi
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/iklan', [IklanController::class, 'index']);
    Route::post('/iklan', [IklanController::class, 'store']);
    Route::put('/iklan/{id}', [IklanController::class, 'update']);
    Route::delete('/iklan/{id}', [IklanController::class, 'destroy']);
    Route::patch('/iklan/{id}/toggle', [IklanController::class, 'toggleStatus']);
    Route::get('/iklan/tersedia', [IklanController::class, 'lokasiTersedia']);
    Route::get('/iklan/statistik', [IklanController::class, 'statistik']);

    // Config ID Publisher AdSense
    Route::get('/ads-config', [AdsConfigController::class, 'show']);
    Route::post('/ads-config', [AdsConfigController::class, 'store']);
});

// 🔐 Keamanan & Backup
Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
    Route::post('/backup/manual', [BackupController::class, 'backupNow']);
    Route::get('/backup/logs', [BackupController::class, 'getLogs']);
    Route::get('/backup/unduh-terbaru', [BackupController::class, 'downloadLatest']);
    Route::post('/backup/restore', [BackupController::class, 'restore']);
});

Route::middleware('auth:sanctum')->prefix('admin/backup')->group(function () {
    Route::post('/restore', [BackupController::class, 'restore']);
    Route::get('/download', [BackupController::class, 'downloadLatest']);
    Route::get('/logs', [BackupController::class, 'getLogs']);
    Route::post('/now', [BackupController::class, 'backupNow']);
});Route::middleware('auth:sanctum')->prefix('admin/ip')->group(function () {
    Route::get('/', [IpRuleController::class, 'index']);
    Route::post('/', [IpRuleController::class, 'store']);
    Route::delete('/{id}', [IpRuleController::class, 'destroy']);
});
