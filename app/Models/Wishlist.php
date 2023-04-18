<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    use HasFactory;

    protected $table = 'wishlists';
    protected function setKeysForSaveQuery(Builder $query)
    {
        // NICOLAS
        // Je ne suis pas sûr à 100% que cela fonctionne comme ça (protéger une clé primaire composé de deux clés étrangères)
        //https://blog.maqe.com/solved-eloquent-doesnt-support-composite-primary-keys-62b740120f
        $query
            ->where('user_id', '=', $this->getAttribute('user_id'))
            ->where('bottle_id', '=', $this->getAttribute('bottle_id'));
        return $query;
    }
}
