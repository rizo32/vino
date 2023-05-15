<?php

namespace Database\Factories;

use App\Models\Cellar;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CellarFactory extends Factory
{
    protected $model = Cellar::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'name' => $this->faker->word,
            'created_at' => $this->faker->dateTimeBetween('-6 months', 'now'),
        ];
    }
}
