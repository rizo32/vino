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
        Schema::create('cellars_has_bottles', function (Blueprint $table) {
            $table->integer('cellar_id');
            $table->integer('bottle_id');
            $table->integer('quantity');
            $table->timestamps();
            $table->primary(['cellar_id','bottle_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cellars_has_bottles');
    }
};
