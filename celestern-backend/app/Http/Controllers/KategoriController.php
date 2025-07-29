<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kategori;
use App\Models\Berita;

class KategoriController extends Controller
{
    // Ambil semua kategori
    public function index()
    {
        // Hitung jumlah berita untuk setiap kategori
        $kategoris = Kategori::withCount(['beritas'])->get();

        // Rename count ke jumlah_berita agar frontend tidak bingung
        $kategoris = $kategoris->map(function ($item) {
            return [
                'id' => $item->id,
                'nama' => $item->nama,
                'jumlah_berita' => $item->beritas_count
            ];
        });

        return response()->json($kategoris);
    }

    // Tambah kategori baru
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255|unique:kategoris,nama',
        ]);

        $kategori = Kategori::create([
            'nama' => $request->nama,
        ]);

        return response()->json([
            'message' => 'Kategori berhasil ditambahkan.',
            'data' => $kategori
        ], 201);
    }

    // Update kategori
    public function update(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|max:255|unique:kategoris,nama,' . $id,
        ]);

        $kategori = Kategori::findOrFail($id);
        $kategori->nama = $request->nama;
        $kategori->save();

        return response()->json([
            'message' => 'Kategori berhasil diperbarui.',
            'data' => $kategori
        ]);
    }

    // Hapus kategori
    public function destroy($id)
    {
        $kategori = Kategori::findOrFail($id);
        $kategori->delete();

        return response()->json([
            'message' => 'Kategori berhasil dihapus.'
        ]);
    }
}