<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        Schema::create('cellars', function (Blueprint $table) {
            $table->id();
            $table->string('name',100);
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cellars');
    }
};
