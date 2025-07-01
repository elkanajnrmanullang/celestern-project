<?php

namespace App\Http\Controllers;

use App\Models\IpRule;
use Illuminate\Http\Request;

class IpRuleController extends Controller
{
    /**
     * Menampilkan semua IP yang diblokir
     */
    public function index()
    {
        return IpRule::where('type', 'block')->orderBy('created_at', 'desc')->get();
    }

    /**
     * Menambahkan IP ke daftar blokir
     */
    public function store(Request $request)
    {
        $request->validate([
            'ip' => 'required|ip',
        ]);

        // Cegah duplikasi berdasarkan IP (tidak berdasarkan type)
        $existing = IpRule::where('ip_address', $request->ip)->first();

        if (!$existing) {
            IpRule::create([
                'ip_address' => $request->ip,
                'type' => 'block'
            ]);
            return response()->json(['message' => 'IP berhasil diblokir'], 201);
        }

        return response()->json(['message' => 'IP sudah ada di daftar'], 200);
    }

    /**
     * Menghapus IP dari daftar blokir
     */
    public function destroy($id)
    {
        $ip = IpRule::findOrFail($id);
        $ip->delete();

        return response()->json(['message' => 'IP berhasil dihapus']);
    }
}
