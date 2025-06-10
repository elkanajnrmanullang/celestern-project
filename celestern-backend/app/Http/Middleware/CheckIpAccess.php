<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\IpRule;

class CheckIpAccess
{
    public function handle(Request $request, Closure $next)
    {
        $clientIp = $request->ip();

        $rule = IpRule::where('ip', $clientIp)->first();

        if ($rule && $rule->status === 'block') {
            return response()->json([
                'message' => 'Akses dari IP ini diblokir oleh sistem keamanan.',
                'ip' => $clientIp,
            ], 403);
        }

        return $next($request);
    }
}
