<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class GoogleUserController extends Controller
{
    public function store(Request $request)
    {
        Log::info('Google login request received:', $request->all());

        $request->validate([
            'email' => 'required|email',
            'name' => 'required|string',
            'picture' => 'nullable|url',
        ]);

        $user = User::updateOrCreate(
            ['email' => $request->email],
            [
                'name' => $request->name,
                'profile_picture' => $request->picture, // ✅ simpan ke kolom yang tersedia di DB
                'login_type' => 'google',
            ]
        );

        return response()->json([
            'message' => 'User saved successfully',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'picture' => $user->profile_picture, // ✅ kirim dalam key 'picture' agar cocok dengan frontend
            ]
        ]);
    }
}
