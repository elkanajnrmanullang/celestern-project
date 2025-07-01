<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('ip_rules', function (Blueprint $table) {
            $table->id();
            $table->string('ip_address', 45)->unique(); // mendukung IPv6
            $table->enum('type', ['block', 'whitelist'])->default('block');
            $table->timestamps();

            // indeks tambahan untuk pencarian cepat
            $table->index(['type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ip_rules');
    }
};
