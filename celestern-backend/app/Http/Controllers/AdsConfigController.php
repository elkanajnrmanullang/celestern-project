<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdsConfigController extends Controller
{
    public function show()
    {
        $config = DB::table('ads_settings')->first();
        return $config ?? [
            'id_publisher' => '',
            'token_api' => '',
            'status' => 'TERHUBUNG'
        ];
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_publisher' => 'required|string',
            'token_api' => 'required|string',
        ]);

        DB::table('ads_settings')->updateOrInsert(
            ['id' => 1],
            [
                'id_publisher' => $request->id_publisher,
                'token_api' => $request->token_api,
                'status' => 'TERHUBUNG',
                'updated_at' => now()
            ]
        );

        return response()->json(['message' => 'Konfigurasi berhasil disimpan']);
    }
}
