<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// rizo: j'ai ajouté les foreign keys et corrigé les formats
return new class extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    DB::statement('SET FOREIGN_KEY_CHECKS=0;');

    Schema::create('bottles', function (Blueprint $table) {
      $table->id();
      $table->string('name', 90);
      $table->string('image_path', 255);
      $table->string('code_saq', 255);
      $table->text('description');
      $table->decimal('price_saq', 8, 2);
      $table->string('image_url', 255)->nullable();
      $table->string('url_saq', 255)->nullable();
      $table->string('format_id', 255)->nullable()->onDelete('cascade');
      $table->string('country_id', 255)->nullable()->onDelete('cascade');
      $table->string('type_id', 255)->nullable()->onDelete('cascade');
      $table->integer('millesime')->nullable();
      $table->float('rating_saq')->nullable();
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
    Schema::dropIfExists('bottles');
  }
};
