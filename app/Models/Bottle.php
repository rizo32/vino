<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bottle extends Model
{
  use HasFactory;

  protected $table = 'bottles';
  protected $primaryKey = 'id';
  protected $fillable = [
    'name',
    'image_path',
    'code_saq',
    'country_id',
    'price_saq',
    'url_saq',
    'image_url',
    'format_id',
    'type_id',
    'rating_saq',
    'num_comments'
  ];

  public function format()
  {
    return $this->belongsTo(Format::class);
  }

  public function country()
  {
    return $this->belongsTo(Country::class);
  }

  public function type()
  {
    return $this->belongsTo(Type::class);
  }

  public function cellarHasBottle()
  {
    return $this->hasMany(CellarHasBottle::class);
  }
}
