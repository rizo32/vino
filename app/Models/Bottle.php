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
        'description',
        'price_saq',
        'url_saq',
        'image_url',
        'format_id',
        'type_id',
        // 'contry_id', erreur ?
        'milesime',
        'rating_saq',
    ];
}
