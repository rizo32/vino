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
    protected $primaryKey = 'id';

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
