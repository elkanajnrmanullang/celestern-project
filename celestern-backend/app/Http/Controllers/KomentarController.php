<?php

namespace App\Http\Controllers;

use App\Models\Komentar;
use Illuminate\Http\Request;

class KomentarController extends Controller
{
    // Ambil semua komentar (bisa filter status)
    public function index(Request $request)
    {
        $status = $request->query('status');
        $query = Komentar::with('berita');

        if ($status) {
            $query->where('status', $status);
        }

        $komentars = $query->orderBy('created_at', 'desc')->paginate(10);
        return response()->json($komentars);
    }

    // Tambah komentar publik
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_user' => 'required|string|max:100',
            'komentar' => 'required|string',
            'berita_id' => 'required|exists:beritas,id',
        ]);

        $komentar = Komentar::create([
            'nama_user' => $validated['nama_user'],
            'komentar' => $validated['komentar'],
            'berita_id' => $validated['berita_id'],
            'tanggal_komentar' => now(),
            'status' => 'tampil',
        ]);

        return response()->json($komentar, 201);
    }

    // Update status komentar (tampil, spam, tersembunyi)
    public function update(Request $request, $id)
    {
        $komentar = Komentar::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|in:tampil,spam,tersembunyi',
        ]);

        $komentar->status = $validated['status'];
        $komentar->save();

        return response()->json($komentar);
    }

    // Hapus komentar
    public function destroy($id)
    {
        $komentar = Komentar::findOrFail($id);
        $komentar->delete();

        return response()->json(['message' => 'Komentar berhasil dihapus.']);
    }
}
