<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TauxSucre extends Model
{
    use HasFactory;
    protected $table = 'taux_sucres';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
    ];
}
