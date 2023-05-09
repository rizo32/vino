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
        'code_saq',
        'price_saq',
        'image_url',
        'url_saq',
        'format_id',
        'country_id',
        'region_id',
        'cepage_id',
        'designation_reglemente_id',
        'taux_alcool',
        'taux_sucre_id',
        'producteur_id',
        'temperature_service_id',
        'aroma_id',
        'type_id',
        'rating_saq',
        'num_comments',
        'code_cup',
    ];

    public function format()
    {
        return $this->belongsTo(Format::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function region()
    {
        return $this->belongsTo(Region::class);
    }

    public function cepage()
    {
        return $this->belongsTo(Cepage::class);
    }

    public function producteur()
    {
        return $this->belongsTo(Producteur::class);
    }

    public function aroma()
    {
        return $this->belongsTo(Aroma::class);
    }

    public function temperatureService()
    {
        return $this->belongsTo(TemperatureService::class);
    }

    public function tauxSucre()
    {
        return $this->belongsTo(TauxSucre::class);
    }

    public function tauxAlcool()
    {
        return $this->belongsTo(TauxAlcool::class);
    }

    public function designationReglemente()
    {
        return $this->belongsTo(DesignationReglemente::class);
    }

    public function type()
    {
        return $this->belongsTo(Type::class);
    }

    public function cellarHasBottle()
    {
        return $this->hasMany(CellarHasBottle::class);
    }

    public function wishlist()
    {
        return $this->hasMany(Wishlist::class);
    }
}