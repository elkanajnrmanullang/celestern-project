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
            $table->string('nama_user');
            $table->text('komentar');
            $table->unsignedBigInteger('berita_id');
            $table->date('tanggal_komentar');
            $table->enum('status', ['tampil', 'spam', 'tersembunyi'])->default('tampil');
            $table->timestamps();

            $table->foreign('berita_id')->references('id')->on('beritas')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('komentars');
    }
}
