<?php

namespace Database\Factories;

use App\Models\Type;
use Illuminate\Database\Eloquent\Factories\Factory;

class TypeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Type::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $types = [
            'Vin rouge',
            'Vin blanc',
            'Vin rosé',
        ];

        return [
            'type' => $this->faker->unique()->randomElement($types),
        ];
    }
}
