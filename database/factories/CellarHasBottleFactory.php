<?php

namespace Database\Factories;

use App\Models\CellarHasBottle;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CellarHasBottleFactory extends Factory
{
    protected $model = CellarHasBottle::class;

    public function definition()
    {
        return [
            'cellar_id' => null, //vont etre ajouter lors du seeding
            'bottle_id' => null, // vont etre ajouter lors du seeding
            'quantity' => $this->faker->numberBetween(1, 10),
            'created_at' => $this->faker->dateTimeBetween('-6 months', 'now'),
        ];
    }
}
