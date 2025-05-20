<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommentSetting extends Model
{
    protected $table = 'comment_settings';
    protected $fillable = ['allow_anonymous', 'auto_approve', 'ai_filter'];
}