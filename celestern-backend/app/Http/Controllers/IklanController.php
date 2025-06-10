<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Iklan;

class IklanController extends Controller
{
    public function index()
    {
        return Iklan::orderBy('urutan')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_slot' => 'required|string',
            'lokasi' => 'required|string',
            'ukuran' => 'nullable|string',
            'html_embed' => 'required',
        ]);

        $slotTerisi = Iklan::where('lokasi', $request->lokasi)->exists();
        if ($slotTerisi) {
            return response()->json(['error' => 'Slot sudah terisi'], 409);
        }

        return Iklan::create([
            'nama_slot' => $request->nama_slot,
            'lokasi' => $request->lokasi,
            'ukuran' => $request->ukuran,
            'urutan' => $request->urutan ?? 0,
            'html_embed' => $request->html_embed,
            'status' => true,
        ]);
    }

    public function update(Request $request, $id)
    {
        $iklan = Iklan::findOrFail($id);

        $request->validate([
            'nama_slot' => 'required|string',
            'lokasi' => 'required|string',
            'ukuran' => 'nullable|string',
            'html_embed' => 'required',
        ]);

        $iklan->update($request->all());
        return $iklan;
    }

    public function destroy($id)
    {
        $iklan = Iklan::findOrFail($id);
        $iklan->delete();
        return response()->json(['message' => 'Iklan dihapus']);
    }

    public function toggleStatus($id)
    {
        $iklan = Iklan::findOrFail($id);
        $iklan->status = !$iklan->status;
        $iklan->save();
        return response()->json(['status' => $iklan->status ? 'Aktif' : 'Nonaktif']);
    }

    public function lokasiTersedia()
    {
        $seluruhSlot = [
            'HomePage Atas',
            'HomePage Tengah',
            'HomePage Bawah',
            'DetailArtikel Atas',
            'DetailArtikel Tengah',
            'DetailArtikel Bawah'
        ];

        $terpakai = Iklan::pluck('lokasi')->toArray();
        $tersisa = array_values(array_diff($seluruhSlot, $terpakai));

        return count($tersisa) > 0 ? $tersisa : ['Slot Penuh'];
    }

    public function statistik()
    {
        // Dummy data yang bisa diubah ke real-time saat deploy
        return response()->json([
            'pendapatan_hari_ini' => 720000,
            'total_klik' => 523,
            'avg_ctr' => 3.5,
            'data' => [
                ['nama_slot' => 'Banner 1', 'views' => 8200, 'klik' => 312, 'ctr' => 3.8, 'status' => 'Aktif', 'pendapatan' => 910000],
                ['nama_slot' => 'Banner 2', 'views' => 8200, 'klik' => 321, 'ctr' => 3.9, 'status' => 'Aktif', 'pendapatan' => 920000],
                ['nama_slot' => 'Banner 3', 'views' => 8200, 'klik' => 312, 'ctr' => 3.8, 'status' => 'Nonaktif', 'pendapatan' => 910000],
            ]
        ]);
    }
}
