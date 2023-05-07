<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aroma extends Model
{
    use HasFactory;

    protected $table = 'aromas';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
    ];
}
