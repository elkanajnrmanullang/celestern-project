<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLoginLogsTable extends Migration
{
    public function up(): void
    {
        Schema::create('login_logs', function (Blueprint $table) {
    $table->id();
    $table->string('email');
    $table->string('ip_address');
    $table->string('location')->nullable(); 
    $table->string('status')->default('Berhasil');
    $table->timestamps();
});
    }

    public function down(): void
    {
        Schema::dropIfExists('login_logs');
    }
}
