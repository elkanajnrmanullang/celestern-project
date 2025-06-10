<?php

namespace App\Http\Controllers;

use App\Models\IpRule;
use Illuminate\Http\Request;

class IpRuleController extends Controller
{
    public function index()
    {
        return IpRule::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'ip_address' => 'required|ip|unique:ip_rules',
            'type' => 'required|in:block,whitelist',
        ]);

        return IpRule::create($request->only('ip_address', 'type'));
    }

    public function destroy($id)
    {
        $ip = IpRule::findOrFail($id);
        $ip->delete();

        return response()->json(['message' => 'IP berhasil dihapus']);
    }
}
