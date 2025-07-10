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
                'profile_picture' => $request->picture,
                'login_type' => 'google',
            ]
        );

        return response()->json([
            'message' => 'User saved successfully',
            'user' => $user,
        ]);
    }
}
