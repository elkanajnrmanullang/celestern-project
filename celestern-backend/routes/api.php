<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    BeritaController,
    KategoriController,
    UploadController,
    KomentarController,
    CommentSettingController,
    AuthController,
    LoginLogController,
    StatistikController,
    IklanController,
    AdsConfigController,
    BackupController,
    IpRuleController
};
use App\Http\Controllers\Api\GoogleUserController;
use App\Http\Controllers\AdminBeritaController;

// 🔐 Google Login (tanpa middleware)
Route::post('/user-login', [GoogleUserController::class, 'store']);

// 📦 CRUD Berita untuk admin (auth:sanctum)
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::get('/berita', [BeritaController::class, 'index']);
    Route::post('/berita', [BeritaController::class, 'store']);
    Route::delete('/berita/{id}', [BeritaController::class, 'destroy'])->middleware('auth:sanctum');
    Route::patch('/berita/{id}/cancel-schedule', [BeritaController::class, 'cancelSchedule'])->middleware('auth:sanctum');
    
});

// 📦 Berita publik (tidak perlu login)
Route::prefix('berita')->group(function () {
    Route::get('/', [BeritaController::class, 'getPublished']);
    Route::get('/kategori/{kategori}', [BeritaController::class, 'getByKategori']);
    Route::get('/detail/{slug}', [BeritaController::class, 'getBySlug']);

    // API umum (index, show, CRUD raw, patch view & publish)
    Route::get('/{id}', [BeritaController::class, 'show']);
    Route::post('/', [BeritaController::class, 'store'])->middleware('auth:sanctum');
    Route::put('/{id}', [BeritaController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/{id}', [BeritaController::class, 'destroy'])->middleware('auth:sanctum');
    Route::patch('/{id}/view', [BeritaController::class, 'incrementView']);
    Route::patch('/{id}/publish', [BeritaController::class, 'publishNow'])->middleware('auth:sanctum');
});

Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::get('/berita', [BeritaController::class, 'index']);
    Route::post('/berita', [BeritaController::class, 'store']);
});
Route::patch('/berita/{id}/publish', [BeritaController::class, 'publishNow']);


// 📁 Kategori
Route::get('/kategori', [KategoriController::class, 'index']);

Route::get('/kategori', [KategoriController::class, 'index']);
Route::post('/kategori', [KategoriController::class, 'store']);
Route::put('/kategori/{id}', [KategoriController::class, 'update']);
Route::delete('/kategori/{id}', [KategoriController::class, 'destroy']);

// 🖼️ Upload Gambar
Route::post('/upload-gambar', [UploadController::class, 'upload']);

// 💬 Komentar
Route::prefix('komentar')->group(function () {
    Route::get('/', [KomentarController::class, 'index']);
    Route::get('/artikel/{id}', [KomentarController::class, 'getByArtikel']);
    Route::post('/', [KomentarController::class, 'store']);
    Route::post('/{id}/status', [KomentarController::class, 'updateStatus']);
    Route::delete('/{id}', [KomentarController::class, 'destroy']);
    Route::get('/pengaturan', [CommentSettingController::class, 'index']);
    Route::post('/pengaturan', [CommentSettingController::class, 'update']);
});

Route::post('/admin-login', [AuthController::class, 'manualLogin']);


// 📊 Statistik
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
    Route::get('/ads-config', [AdsConfigController::class, 'show']);
    Route::post('/ads-config', [AdsConfigController::class, 'store']);
});

// 🛡️ Admin & Keamanan
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::get('/log-login', [LoginLogController::class, 'index']);
    Route::get('/2fa-status', [AuthController::class, 'get2FA']);
    Route::post('/2fa-toggle', [AuthController::class, 'toggle2FA']);

    // IP Management
    Route::prefix('ip')->group(function () {
        Route::get('/', [IpRuleController::class, 'index']);
        Route::post('/', [IpRuleController::class, 'store']);
        Route::delete('/{id}', [IpRuleController::class, 'destroy']);
    });

    // ☁️ Backup
    Route::prefix('backup')->group(function () {
        Route::post('/now', [BackupController::class, 'backupNow']);
        Route::get('/logs', [BackupController::class, 'getLogs']);
        Route::get('/download', [BackupController::class, 'downloadLatest']);
        Route::post('/restore/{id?}', [BackupController::class, 'restore']);
    });
});

// 🔐 Auth (login manual)
Route::post('/login', [AuthController::class, 'login'])->middleware(['check.ip', 'log.login']);
