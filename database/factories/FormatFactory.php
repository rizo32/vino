<?php

namespace Database\Factories;

use App\Models\Format;
use Illuminate\Database\Eloquent\Factories\Factory;

class FormatFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Format::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $volumes = [
            '1 L',
            '1,5 L',
            '200 ml',
            '2 L',
            '2,25 L',
            '250 ml',
            '3 L',
            '375 ml',
            '4 L',
            '500 ml',
        ];

        return [
            'volume' => $this->faker->unique()->randomElement($volumes),
        ];
    }
}
