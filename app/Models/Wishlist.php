<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Bottle;
use App\Models\User;

class Wishlist extends Model
{
    use HasFactory;

    protected $table = 'wishlists';
    protected $primaryKey = 'id';

    protected $fillable = [
        'user_id',
        'bottle_id'
    ];

    public function bottle()
    {
        return $this->belongsTo(Bottle::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
