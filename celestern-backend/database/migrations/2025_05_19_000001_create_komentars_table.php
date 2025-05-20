<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKomentarsTable extends Migration
{
    public function up()
    {
        Schema::create('komentars', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('berita_id');
            $table->string('nama');
            $table->text('komentar');
            $table->enum('status', ['tampil', 'pending', 'spam'])->default('pending');
            $table->timestamps();

            // Foreign key (jika artikel sudah pasti ada)
            // $table->foreign('artikel_id')->references('id')->on('beritas')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('komentars');
    }
}
