<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User_cellar_personal_bottle extends Model
{
    use HasFactory;
    
    protected $table = 'user_cellar_personal_bottle';
    protected $primaryKey = 'id';
}
