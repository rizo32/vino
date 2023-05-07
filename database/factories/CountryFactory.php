<?php

namespace Database\Factories;

use App\Models\Country;
use Illuminate\Database\Eloquent\Factories\Factory;

class CountryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Country::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $countries = [
            'France', 'Italie', 'États-Unis', 'Espagne', 'Canada', 'Portugal', 'Australie', 'Chili', 'Argentine',
            'Afrique du Sud', 'Allemagne', 'Autriche', 'Nouvelle-Zélande', 'Grèce', 'Israël', 'Liban', 'Hongrie',
            'Roumanie', 'Uruguay', 'Arménie (République d\')', 'Géorgie', 'Moldavie', 'Slovénie', 'Suisse', 'Bulgarie',
            'Chine', 'Croatie', 'Luxembourg', 'Maroc', 'Mexique', 'Brésil', 'République Tchèque', 'Vin du monde',
        ];

        return [
            'name' => $this->faker->unique()->randomElement($countries),
        ];
    }
}
