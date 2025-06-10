<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\BackupLog;
use Illuminate\Support\Facades\Artisan;
use Carbon\Carbon;

class BackupController extends Controller
{
    /**
     * Backup database ke penyimpanan lokal dan unggah ke Google Cloud Storage
     */
    public function backupNow()
    {
        try {
            // 1. Jalankan backup database (hanya DB)
            Artisan::call('backup:run --only-db');

            // 2. Ambil file backup terbaru dari disk lokal
            $disk = Storage::disk('local');
            $files = $disk->allFiles('Laravel');
            $latestFile = collect($files)->last();
            $size = $disk->size($latestFile);

            // 3. Upload ke Google Cloud Storage (GCS)
            $gcs = Storage::disk('gcs');
            $stream = $disk->readStream($latestFile);
            $gcs->writeStream($latestFile, $stream);
            if (is_resource($stream)) fclose($stream);

            // 4. Simpan log ke database
            BackupLog::create([
                'filename' => $latestFile,
                'size' => number_format($size / 1024 / 1024, 2) . ' MB',
                'status' => 'Berhasil',
            ]);

            return response()->json(['message' => 'Backup berhasil'], 200);
        } catch (\Exception $e) {
            BackupLog::create([
                'filename' => '-',
                'size' => '-',
                'status' => 'Gagal',
            ]);
            return response()->json([
                'message' => 'Backup gagal',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mengambil log backup dari database
     */
    public function getLogs()
    {
        return BackupLog::orderBy('created_at', 'desc')->get();
    }

    /**
     * Dummy untuk restore backup (belum implementasi real)
     */
    public function restore()
    {
        return response()->json(['message' => 'Restore dummy dijalankan'], 200);
    }

    /**
     * Menghasilkan URL download untuk file backup terbaru dari GCS
     */
    public function downloadLatest()
    {
        $latest = BackupLog::orderBy('created_at', 'desc')->first();

        if (!$latest || !$latest->filename) {
            return response()->json(['message' => 'Tidak ada file cadangan tersedia'], 404);
        }

        $gcs = Storage::disk('gcs');

        if (!$gcs->exists($latest->filename)) {
            return response()->json(['message' => 'File tidak ditemukan di GCS'], 404);
        }

        $url = 'https://storage.googleapis.com/' . env('GOOGLE_CLOUD_BUCKET') . '/' . $latest->filename;
        return response()->json(['url' => $url]);
    }
}
