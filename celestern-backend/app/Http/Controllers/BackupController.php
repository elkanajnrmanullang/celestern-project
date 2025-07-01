<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\BackupLog;
use Illuminate\Support\Facades\Artisan;

class BackupController extends Controller
{
    /**
     * Backup database dan upload ke Google Cloud Storage (GCS)
     */
    public function backupNow()
    {
        try {
            // Jalankan hanya backup database
            Artisan::call('backup:run --only-db');

            $disk = Storage::disk('local');
            $files = $disk->allFiles('Laravel');
            $latestFile = collect($files)->last();

            if (!$latestFile || !$disk->exists($latestFile)) {
                throw new \Exception('File backup tidak ditemukan.');
            }

            $size = $disk->size($latestFile);

            // Upload ke GCS
            $gcs = Storage::disk('gcs');
            $stream = $disk->readStream($latestFile);
            $gcs->writeStream($latestFile, $stream);
            if (is_resource($stream)) fclose($stream);

            // Simpan ke database
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
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Menampilkan semua log backup
     */
    public function getLogs()
    {
        $bucket = env('GOOGLE_CLOUD_BUCKET');

        $logs = BackupLog::orderBy('created_at', 'desc')->get()->map(function ($log) use ($bucket) {
            $log->download_url = $log->filename && $log->filename !== '-'
                ? 'https://storage.googleapis.com/' . $bucket . '/' . $log->filename
                : null;
            return $log;
        });

        return response()->json($logs);
    }

    /**
     * Download file backup terbaru (URL publik)
     */
    public function downloadLatest()
    {
        $latest = BackupLog::orderBy('created_at', 'desc')->first();

        if (!$latest || !$latest->filename || $latest->filename === '-') {
            return response()->json(['message' => 'Tidak ada file cadangan tersedia'], 404);
        }

        $gcs = Storage::disk('gcs');
        if (!$gcs->exists($latest->filename)) {
            return response()->json(['message' => 'File tidak ditemukan di GCS'], 404);
        }

        $bucket = env('GOOGLE_CLOUD_BUCKET');
        $url = 'https://storage.googleapis.com/' . $bucket . '/' . $latest->filename;

        return response()->json(['url' => $url]);
    }

    /**
     * Dummy endpoint untuk restore
     */
    public function restore($id = null)
    {
        return response()->json(['message' => 'Restore dummy dijalankan'], 200);
    }

    public function list()
    {
        return $this->getLogs();
    }
}