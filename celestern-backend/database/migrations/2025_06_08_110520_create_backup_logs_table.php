<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('backup_logs', function (Blueprint $table) {
            $table->id();
            $table->string('filename');
            $table->string('size'); // contoh: "15MB"
            $table->enum('status', ['Berhasil', 'Gagal']);
            $table->timestamps(); // created_at sebagai waktu backup
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('backup_logs');
    }
};
