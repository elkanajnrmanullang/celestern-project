<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminBeritaController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'isi' => 'required|string',
            'kategori_id' => 'required|exists:kategoris,id',
            'status' => 'required|in:published,draft',
            'jadwal_terbit' => 'required|date',
            'cover_image' => 'nullable|image|max:2048',
            'gambar_detail.*' => 'nullable|image|max:2048',
        ]);

        // Simpan cover image
        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')->store('berita/covers', 'public');
        }

        $validated['user_id'] = auth()->id();

        $berita = Berita::create($validated);

        // Simpan gambar detail
        if ($request->hasFile('gambar_detail')) {
            foreach ($request->file('gambar_detail') as $gambar) {
                $path = $gambar->store('berita/detail', 'public');
                $berita->gambar()->create(['path' => $path]); // pastikan relasi sudah dibuat
            }
        }

        return response()->json([
            'message' => 'Berita berhasil disimpan',
            'berita' => $berita
        ], 201);
    }
}
