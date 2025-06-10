<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\LoginLog;
use Illuminate\Support\Facades\Auth;

class LogAdminLogin
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Hanya log jika route login dipanggil dan berhasil
        if ($request->is('api/login') && Auth::check()) {
            LoginLog::create([
    'admin_id' => Auth::id(),
    'email' => Auth::user()->email,
    'ip' => $request->ip(),
    'location' => 'Tidak diketahui',
    'status' => 'Berhasil',
]);

        }

        return $response;
    }
}