<?php

namespace App\Http\Controllers;

use App\Models\LoginLog;
use Illuminate\Http\Request;

class LoginLogController extends Controller
{
    /**
     * Menampilkan semua log login admin terbaru.
     */
    public function index()
    {
        // Ambil log login terbaru tanpa relasi karena tidak ada foreign key ke tabel admin
        $logs = LoginLog::latest()->get();

        return response()->json($logs);
    }
}
