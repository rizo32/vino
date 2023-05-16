<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Cellar;
use Illuminate\Database\Seeder;

class CellarSeeder extends Seeder
{
    public function run()
    {
        /* recupere tout les user existant  */
        User::all()->each(function ($user) {
            /* creer un cellier avec le matching user.id */
            Cellar::factory()->create([
                'user_id' => $user->id,
                'name' => 'Cellier ' . $user->first_name, /* nom du cellier deviens cellier + le nom du users */
            ]);
        });
    }
}
