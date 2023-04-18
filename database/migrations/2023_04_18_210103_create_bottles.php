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
        Schema::create('bottles', function (Blueprint $table) {
            $table->id();
            $table->string('name',45);
            $table->string('image_path',45);
            $table->string('code_saq',45);
            $table->string('description',45);
            $table->string('price_saq',45);
            $table->string('url_saq',45);
            $table->string('image_url',45);
            $table->integer('format');
            $table->integer('county_id');
            $table->integer('type_id');
            $table->string('millesime',45);
            $table->float('rating_saq');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bottles');
    }
};
