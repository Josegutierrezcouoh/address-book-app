<?php

namespace Database\Seeders;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->count(5)->create();

        Contact::factory()
            ->count(5000)
            ->create()
            ->each(function (Contact $contact) {

                $contact->emails()->createMany(
                    \App\Models\Email::factory()
                        ->count(random_int(1, 3))
                        ->make()
                        ->toArray()
                );

                 $contact->phones()->createMany(
                    \App\Models\Phone::factory()
                        ->count(random_int(1, 3))
                        ->make()
                        ->toArray()
                );

                $contact->addresses()->createMany(
                    \App\Models\Address::factory()
                        ->count(random_int(0, 2))
                        ->make()
                        ->toArray()
                );

            });
    }
}
