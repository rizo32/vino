<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cepage extends Model
{
    use HasFactory;

    protected $table = 'cepages';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
    ];

    public function bottles()
    {
        return $this->hasMany(Bottle::class);
    }
}
