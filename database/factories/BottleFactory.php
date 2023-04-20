<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\bottles>
 */
class BottleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'id' => fake()->unique()->numberBetween($min = 1, $max = 100),
            'name' => fake()->words($nb = 2, $asText = true),
            'code_saq'=> fake()->randomDigitNot(5),
            'description'=>fake()->text($maxNbChars = 45),
            'price_saq'=>fake()->numberBetween($min = 100, $max = 9000),
            'millesime'=>fake()->dateTimeBetween($startDate = '-30 years', $endDate = 'now', $timezone = null),
        ];
    }
}
