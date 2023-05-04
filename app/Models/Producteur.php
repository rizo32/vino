<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producteur extends Model
{
    use HasFactory;
    protected $table = 'producteurs';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
    ];
}
