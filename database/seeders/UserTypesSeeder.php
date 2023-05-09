<?php

namespace Database\Seeders;

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
    $userTypes = [
        ['name' => 'Admin'],
        ['name' => 'Employee'],
        ['name' => 'User'],
        ['name' => 'Banned'],
    ];

    DB::table('user_types')->insert($userTypes);
}
}
