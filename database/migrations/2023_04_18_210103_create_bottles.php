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
      $table->string('name', 255);
      $table->string('code_saq', 255);
      $table->decimal('price_saq', 8, 2);
      $table->string('image_url', 255)->nullable();
      $table->string('url_saq', 255)->nullable();
      $table->unsignedBigInteger('format_id')->nullable();
      $table->foreign('format_id')->references('id')->on('formats')->onDelete('cascade');
      $table->unsignedBigInteger('country_id')->nullable();
      $table->foreign('country_id')->references('id')->on('countries')->onDelete('cascade');
      $table->unsignedBigInteger('region_id')->nullable();
      $table->foreign('region_id')->references('id')->on('regions')->onDelete('cascade');
      $table->unsignedBigInteger('cepage_id')->nullable();
      $table->foreign('cepage_id')->references('id')->on('cepages')->onDelete('cascade');
      $table->unsignedBigInteger('designation_reglemente_id')->nullable();
      $table->foreign('designation_reglemente_id')->references('id')->on('designation_reglementes')->onDelete('cascade');
      $table->unsignedBigInteger('taux_alcool_id')->nullable();
      $table->foreign('taux_alcool_id')->references('id')->on('taux_alcools')->onDelete('cascade');
      $table->unsignedBigInteger('taux_sucre_id')->nullable();
      $table->foreign('taux_sucre_id')->references('id')->on('taux_sucres')->onDelete('cascade');
      $table->unsignedBigInteger('producteur_id')->nullable();
      $table->foreign('producteur_id')->references('id')->on('producteurs')->onDelete('cascade');
      $table->unsignedBigInteger('temperature_service_id')->nullable();
      $table->foreign('temperature_service_id')->references('id')->on('temperature_services')->onDelete('cascade');
      $table->unsignedBigInteger('aroma_id')->nullable();
      $table->foreign('aroma_id')->references('id')->on('aromas')->onDelete('cascade');
      $table->unsignedBigInteger('type_id')->nullable();
      $table->foreign('type_id')->references('id')->on('types')->onDelete('cascade');
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
