<?php

namespace App\Http\Controllers;

use App\Models\CommentSetting;
use Illuminate\Http\Request;

class CommentSettingController extends Controller
{
    public function index()
    {
        $setting = CommentSetting::first();
        return response()->json($setting);
    }

    public function update(Request $request)
    {
        $setting = CommentSetting::first();
        $setting->update($request->only(['allow_anonymous', 'auto_approve', 'ai_filter']));
        return response()->json(['message' => 'Pengaturan komentar diperbarui.']);
    }
}
