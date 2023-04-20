<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Bottle;
use App\Models\Cellar;

class CellarHasBottle extends Model
{
    use HasFactory;

    protected $table = 'cellars_has_bottles';
    protected function setKeysForSaveQuery(Builder $query)
    {
        // NICOLAS
        // Je ne suis pas sûr à 100% que cela fonctionne comme ça (protéger une clé primaire composé de deux clés étrangères)
        //https://blog.maqe.com/solved-eloquent-doesnt-support-composite-primary-keys-62b740120f
        $query
            ->where('cellar_id', '=', $this->getAttribute('cellar_id'))
            ->where('bottle_id', '=', $this->getAttribute('bottle_id'));
        return $query;
    }
    protected $fillable = [
        'cellar_id',
        'bottle_id',
        'quantity',
    ];

    public function bottle()
    {
        return $this->belongsTo(Bottle::class);
    }

    public function cellar()
    {
        return $this->belongsTo(Cellar::class);
    }
}
