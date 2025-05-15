<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Komentar;

class KomentarController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->query('status');
        $query = Komentar::with('berita');

        if ($status) {
            $query->where('status', $status);
        }

        return $query->paginate(10);
    }

    public function update(Request $request, $id)
    {
        $komentar = Komentar::findOrFail($id);
        $komentar->status = $request->input('status');
        $komentar->save();

        return response()->json(['message' => 'Status komentar diperbarui.']);
    }

    public function destroy($id)
    {
        $komentar = Komentar::findOrFail($id);
        $komentar->delete();

        return response()->json(['message' => 'Komentar dihapus.']);
    }
}