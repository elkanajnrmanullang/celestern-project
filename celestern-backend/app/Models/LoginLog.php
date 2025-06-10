<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Admin;

class LoginLog extends Model
{
    protected $fillable = ['admin_id', 'email', 'ip', 'location', 'status'];

    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }
}
