<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateCommentSettingsTable extends Migration
{
    public function up()
    {
        Schema::create('comment_settings', function (Blueprint $table) {
            $table->id();
            $table->boolean('allow_anonymous')->default(false);
            $table->boolean('auto_approve')->default(false);
            $table->boolean('ai_filter')->default(false);
            $table->timestamps();
        });

        // Insert default row
        DB::table('comment_settings')->insert([
            'allow_anonymous' => false,
            'auto_approve' => false,
            'ai_filter' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function down()
    {
        Schema::dropIfExists('comment_settings');
    }
}
