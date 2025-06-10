<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('ip_rules', function (Blueprint $table) {
            $table->id();
            $table->string('ip_address')->unique();
            $table->enum('type', ['block', 'whitelist'])->default('block');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ip_rules');
    }
};
