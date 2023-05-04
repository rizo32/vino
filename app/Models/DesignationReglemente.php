<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DesignationReglemente extends Model
{
    use HasFactory;

    protected $table = 'designation_reglementes';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
    ];
}
