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
        Schema::create('user_cellar_personal_bottles', function (Blueprint $table) {
            $table->integer('user_id');
            $table->integer('bottle_id');
            $table->timestamps();
            $table->primary(['user_id','bottle_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_cellar_personal_bottles');
    }
};
