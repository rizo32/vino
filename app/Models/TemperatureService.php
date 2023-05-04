<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TemperatureService extends Model
{
    use HasFactory;

    protected $table = 'temperature_services';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
    ];
}
