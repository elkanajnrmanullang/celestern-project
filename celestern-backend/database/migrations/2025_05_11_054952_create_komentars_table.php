<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('komentars', function (Blueprint $table) {
            $table->id();
            $table->string('nama_pengguna');
            $table->text('komentar');
            $table->unsignedBigInteger('berita_id');
            $table->enum('status', ['TAMPIL', 'SPAM', 'TERSEMBUNYI'])->default('TAMPIL');
            $table->timestamps();

            $table->foreign('berita_id')->references('id')->on('beritas')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('komentars');
    }
};