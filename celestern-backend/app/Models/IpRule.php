<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IpRule extends Model
{
    protected $fillable = ['ip_address', 'type'];
}