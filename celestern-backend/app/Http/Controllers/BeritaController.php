<?php

namespace App\Http\Controllers;

use App\Http\Requests\BeritaStoreRequest;
use Illuminate\Http\Request;
use App\Models\Berita;
use App\Models\User;
use App\Models\Kategori;
use Carbon\Carbon;

class BeritaController extends Controller
{
    public function index()
    {
        return Berita::all();
    }

    public function show($id)
    {
        return Berita::findOrFail($id);
    }

    public function store(BeritaStoreRequest $request)
    {
        $validated = $request->validated();

        $kategori = Kategori::where('nama', $validated['kategori'])->firstOrFail();

        $berita = new Berita();
        $berita->judul = $validated['judul'];
        $berita->slug = $validated['slug'];
        $berita->isi = $validated['isi'];
        $berita->status = $validated['status'];
        $berita->jadwal_terbit = $validated['status'] === 'scheduled'
            ? Carbon::parse($validated['jadwal_terbit'])
            : now();
        $berita->kategori_id = $kategori->id;

        // Mapping dari username ke user ID
        $user = User::where('username', $validated['user_id'])->firstOrFail();
        $berita->user_id = $user->id;

        if ($request->hasFile('cover_image')) {
            $path = $request->file('cover_image')->store('berita', 'public');
            $berita->cover_image = $path;
        }

        $berita->save();

        return response()->json(['message' => 'Berita berhasil disimpan'], 201);
    }

    public function update(Request $request, $id)
    {
        $berita = Berita::findOrFail($id);

        $validated = $request->validate([
            'judul' => 'sometimes|string|max:255',
            'slug' => 'sometimes|string|unique:beritas,slug,' . $id,
            'kategori' => 'sometimes|string',
            'isi' => 'sometimes|string',
            'status' => 'sometimes|in:published,scheduled,draft',
            'jadwal_terbit' => 'nullable|date',
            'cover_image' => 'nullable|image|max:2048',
        ]);

        if (isset($validated['kategori'])) {
            $kategori = Kategori::where('nama', $validated['kategori'])->first();
            if ($kategori) {
                $validated['kategori_id'] = $kategori->id;
            }
            unset($validated['kategori']);
        }

        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')->store('berita', 'public');
        }

        $berita->update($validated);

        return response()->json(['message' => 'Berita berhasil diupdate']);
    }

    public function destroy($id)
    {
        $berita = Berita::findOrFail($id);
        $berita->delete();
        return response()->json(null, 204);
    }

    public function incrementView($id)
    {
        $berita = Berita::findOrFail($id);
        $berita->increment('views');
        return response()->json(['views' => $berita->views]);
    }

    public function getPublished()
    {
        $berita = Berita::with('user', 'kategori')
            ->where('status', 'published')
            ->where('jadwal_terbit', '<=', now())
            ->orderBy('jadwal_terbit', 'desc')
            ->get();

        return response()->json($berita);
    }

    public function getByKategori($kategori)
    {
        $kategoriModel = Kategori::where('nama', $kategori)->firstOrFail();

        $berita = Berita::with('user', 'kategori')
            ->where('status', 'published')
            ->where('kategori_id', $kategoriModel->id)
            ->where('jadwal_terbit', '<=', now())
            ->orderBy('jadwal_terbit', 'desc')
            ->get();

        return response()->json($berita);
    }

    public function getBySlug($slug)
    {
        $berita = Berita::with('user', 'kategori')
            ->where('slug', $slug)
            ->where('status', 'published')
            ->where('jadwal_terbit', '<=', now())
            ->firstOrFail();

        $berita->increment('views');

        return response()->json($berita);
    }

    public function publishNow($id)
    {
        $berita = Berita::findOrFail($id);
        $berita->status = 'published';
        $berita->jadwal_terbit = Carbon::now();
        $berita->save();

        return response()->json(['message' => 'Berita diterbitkan sekarang.']);
    }
}