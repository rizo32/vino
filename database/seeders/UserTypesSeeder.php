<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
{
    /* Tableau des types d'utilisateurs à insérer dans la table "user_types --normalisation et standardisation de la BD */
    $userTypes = [
        ['name' => 'Admin'],
        ['name' => 'Employee'],
        ['name' => 'User'],
        ['name' => 'Banned'],
    ];

    DB::table('user_types')->insert($userTypes);  /* insertion  */
}
}
