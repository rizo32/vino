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
      $table->string('code_saq', 255);
      $table->decimal('price_saq', 8, 2);
      $table->string('image_url', 255)->nullable();
      $table->string('url_saq', 255)->nullable();
      $table->foreignId('format_id')->constrained()->onDelete('cascade')->nullable();
      $table->foreignId('country_id')->constrained()->onDelete('cascade')->nullable();
      $table->foreignId('region_id')->constrained()->onDelete('cascade')->nullable();
      $table->foreignId('cepage_id')->constrained()->onDelete('cascade')->nullable();
      $table->foreignId('designation_reglemente_id')->constrained()->onDelete('cascade')->nullable();
      $table->foreignId('taux_alcool_id')->constrained()->onDelete('cascade')->nullable();
      $table->foreignId('taux_sucre_id')->constrained()->onDelete('cascade')->nullable();
      $table->foreignId('producteur_id')->constrained()->onDelete('cascade')->nullable();
      $table->foreignId('temperature_service_id')->constrained()->onDelete('cascade')->nullable();
      $table->foreignId('aroma_id')->constrained()->onDelete('cascade')->nullable();      
      $table->foreignId('type_id')->constrained()->onDelete('cascade')->nullable();
      $table->float('rating_saq')->nullable();
      $table->integer('num_comments')->nullable();
      $table->string('code_cup')->nullable();
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
