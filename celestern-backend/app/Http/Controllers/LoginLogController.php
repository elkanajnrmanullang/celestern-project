<?php

namespace App\Http\Controllers;

use App\Models\LoginLog;
use Illuminate\Http\Request;

class LoginLogController extends Controller
{
    public function index()
    {
        $logs = LoginLog::with('admin')->latest()->get();
        return response()->json($logs);
    }
}
