<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Cellar;
use Illuminate\Database\Seeder;

class CellarSeeder extends Seeder
{
    public function run()
    {
        User::all()->each(function ($user) {
            Cellar::factory()->create([
                'user_id' => $user->id,
                'name' => 'Cellier ' . $user->first_name,
            ]);
        });
    }
}
