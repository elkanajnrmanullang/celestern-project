<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('iklans', function (Blueprint $table) {
            $table->id();
            $table->string('nama_slot');
            $table->string('lokasi'); // homepage, detail_artikel, dll
            $table->string('ukuran')->nullable(); // misalnya: 728x90
            $table->integer('urutan')->default(0);
            $table->text('html_embed');
            $table->boolean('status')->default(true); // true = aktif
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('iklans');
    }
};
