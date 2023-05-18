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
            'quantity' => $this->faker->numberBetween(1, 10), /* aleatoire entre 1 et 10 bouteilles  */
            'created_at' => $this->faker->dateTimeBetween('-6 months', 'now'), /*  date de creation aleatoire entre aujourd'hui et moins 6 mois ( pour simuler 6 mois d'interactions ) */
        ];
    }
}
