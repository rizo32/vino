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

        Schema::create('cellars_has_bottles', function (Blueprint $table) {
            $table->foreignId('cellar_id')->constrained()->onDelete('cascade');
            $table->foreignId('bottle_id')->constrained()->onDelete('cascade');
            $table->integer('quantity');
            $table->timestamps();
            $table->primary(['cellar_id','bottle_id']);
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
        Schema::dropIfExists('cellars_has_bottles');
    }
};
