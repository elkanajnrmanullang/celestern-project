<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\IpRule;

class CheckIpMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $ip = $request->ip();

        $rule = IpRule::where('ip_address', $ip)->first();

        if ($rule && $rule->type === 'block') {
            return response()->json(['message' => 'IP diblokir'], 403);
        }

        return $next($request);
    }
}
