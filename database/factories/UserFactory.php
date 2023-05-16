<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = User::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition()
    {
        /* Creation d'un prenom et nom de famille générer  */
        $firstName = $this->faker->firstName();
        $lastName = $this->faker->lastName();

        return [
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => strtolower($firstName) . '.' . strtolower($lastName) . '@gmail.com', /* concaténation pour avoir des email correspondant */
            'password' => bcrypt('password'),  /* password default */
            'user_type_id' => 3, /* default id 3 pour users  */
            'created_at' => $this->faker->dateTimeBetween('-6 months', 'now'), /*  date de creation aleatoire entre aujourd'hui et moins 6 mois ( pour simuler 6 mois d'opératiosn ) */
        ];
    }
}
