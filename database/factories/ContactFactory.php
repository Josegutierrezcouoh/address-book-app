<?php

namespace Database\Factories;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contact>
 */
class ContactFactory extends Factory
{
    protected $model = Contact::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::query()->inRandomOrder()->value('id') ?? User::factory(),
            'name' => $this->faker->name(),
            'notes' => $this->faker->optional()->paragraph(),
            'birthday' => $this->faker->dateTimeBetween('-70 years', '-10 years')->format('Y-m-d'),
            'website' => $this->faker->optional()->url(),
            'company' => $this->faker->optional()->company(),
        ];
    }
}
