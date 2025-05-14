<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        if ($request->hasFile('gambar')) {
            $path = $request->file('gambar')->store('uploads', 'public');

            return response()->json([
                'message' => 'Upload berhasil',
                'path' => $path,
                'url' => asset('storage/' . $path),
            ]);
        }

        return response()->json(['message' => 'Tidak ada file'], 400);
    }
}