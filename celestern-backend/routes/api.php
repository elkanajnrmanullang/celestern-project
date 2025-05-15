use App\Http\Controllers\BeritaController;
use App\Http\Controllers\KategoriController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\KomentarController;

Route::prefix('berita')->group(function () {
Route::get('/', [BeritaController::class, 'index']);
Route::get('/{id}', [BeritaController::class, 'show']);
Route::post('/', [BeritaController::class, 'store']);
Route::put('/{id}', [BeritaController::class, 'update']);
Route::delete('/{id}', [BeritaController::class, 'destroy']);
Route::patch('/{id}/view', [BeritaController::class, 'incrementView']);
Route::patch('/{id}/publish', [BeritaController::class, 'publishNow']);
});

Route::get('/kategori', [KategoriController::class, 'index']);
Route::post('/kategori', [KategoriController::class, 'store']);
Route::put('/kategori/{id}', [KategoriController::class, 'update']);
Route::delete('/kategori/{id}', [KategoriController::class, 'destroy']);
Route::post('/upload-gambar', [UploadController::class, 'upload']);Route::middleware(['auth:sanctum',
'admin'])->prefix('komentar')->group(function () {
Route::get('/komentar', [KomentarController::class, 'index']);
Route::patch('/komentar/{id}', [KomentarController::class, 'update']);
Route::delete('/komentar/{id}', [KomentarController::class, 'destroy']);
Route::post('/komentar', [KomentarController::class, 'store']);
});
