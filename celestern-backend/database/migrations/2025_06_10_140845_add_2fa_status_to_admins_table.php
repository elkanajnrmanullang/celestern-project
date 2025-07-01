<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Add2faStatusToAdminsTable extends Migration
{
    public function up(): void
    {
        // Schema::table('admins', function (Blueprint $table) {
        //     $table->boolean('two_factor_enabled')->default(false)->after('password');
        // });
    }

    public function down(): void
    {
        Schema::table('admins', function (Blueprint $table) {
            $table->dropColumn('two_factor_enabled');
        });
    }
}
