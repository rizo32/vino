<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cellar extends Model
{
    use HasFactory;
    
    protected $table = 'cellars';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'user_id',
    ];
}
