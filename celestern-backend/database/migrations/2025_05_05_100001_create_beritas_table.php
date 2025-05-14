<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('beritas', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->string('slug')->unique();
            $table->text('isi');
            $table->string('tag')->nullable();
            $table->string('penulis');
            $table->foreignId('kategori_id')->constrained('kategori')->onDelete('cascade');
            $table->string('gambar')->nullable();
            $table->enum('status', ['TERTAYANG', 'TERJADWAL'])->default('TERTAYANG');
            $table->timestamp('tanggal_terbit')->nullable();
            $table->unsignedBigInteger('views')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('beritas');
    }
};