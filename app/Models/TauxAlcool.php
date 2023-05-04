<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TauxAlcool extends Model
{
    use HasFactory;

    protected $table = 'taux_alcools';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
    ];
}
