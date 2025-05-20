<?php

namespace App\Http\Controllers;

use App\Models\Komentar;
use App\Models\CommentSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class KomentarController extends Controller
{
    // Komentar dari publik (store dari form komentar)
    public function store(Request $request)
    {
        $request->validate([
            'berita_id' => 'required|integer',
            'nama' => 'required|string|max:255',
            'komentar' => 'required|string',
        ]);

        $setting = CommentSetting::first();

        // AI Filter (Perspective API) jika aktif
        if ($setting && $setting->ai_filter) {
            try {
                $response = Http::post('https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=API_KEY_ANDA', [
                    'comment' => ['text' => $request->komentar],
                    'languages' => ['id'],
                    'requestedAttributes' => ['TOXICITY' => new \stdClass()],
                ]);

                $score = $response['attributeScores']['TOXICITY']['summaryScore']['value'] ?? 0;

                if ($score > 0.75) {
                    return response()->json(['message' => 'Komentar dianggap toxic dan ditolak.'], 403);
                }
            } catch (\Exception $e) {
                Log::error('Perspective API gagal: ' . $e->getMessage());
            }
        }

        Komentar::create([
            'berita_id' => $request->artikel_id,
            'nama' => $request->nama,
            'komentar' => $request->komentar,
            'status' => ($setting && $setting->auto_approve) ? 'tampil' : 'pending',
        ]);

        return response()->json(['message' => 'Komentar berhasil dikirim.']);
    }

    // Untuk KomentarList.jsx – ambil komentar tampil per artikel
    public function getByArtikel($id)
    {
        $komentars = Komentar::where('berita_id', $id)
            ->where('status', 'tampil')
            ->latest()
            ->get();

        return response()->json($komentars);
    }

    // Untuk halaman Moderasi Komentar (admin)
    public function index()
    {
        return response()->json(Komentar::latest()->get());
    }

    // Update status komentar: tampil/spam/pending
    public function updateStatus($id, Request $request)
    {
        $request->validate([
            'status' => 'required|in:tampil,spam,pending',
        ]);

        $komentar = Komentar::findOrFail($id);
        $komentar->status = $request->status;
        $komentar->save();

        return response()->json(['message' => 'Status komentar diperbarui.']);
    }

    // Hapus komentar
    public function destroy($id)
    {
        $komentar = Komentar::findOrFail($id);
        $komentar->delete();

        return response()->json(['message' => 'Komentar berhasil dihapus.']);
    }
}
