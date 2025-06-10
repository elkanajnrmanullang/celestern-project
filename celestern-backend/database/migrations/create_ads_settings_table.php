<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('ads_settings', function (Blueprint $table) {
            $table->id();
            $table->string('id_publisher');
            $table->string('token_api');
            $table->string('status')->default('TERHUBUNG');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ads_settings');
    }
};
