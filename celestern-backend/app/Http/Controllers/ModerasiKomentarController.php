<?php

namespace App\Http\Controllers;

use App\Models\Komentar;
use Illuminate\Http\Request;

class ModerasiKomentarController extends Controller
{
    public function index()
    {
        return Komentar::with('berita')->orderBy('created_at', 'desc')->get();
    }

    public function updateStatus($id, Request $request)
    {
        $komentar = Komentar::findOrFail($id);
        $komentar->status = $request->status;
        $komentar->save();

        return response()->json(['message' => 'Status komentar diperbarui']);
    }

    public function destroy($id)
    {
        Komentar::destroy($id);
        return response()->json(['message' => 'Komentar dihapus']);
    }
}
