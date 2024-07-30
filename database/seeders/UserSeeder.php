<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin',
                'email' => 'admin@mail.com',
                'password' => bcrypt('admin123'),
                'email_verified_at' => now(),
            ],
            [
                'name' => 'User',
                'email' => 'user@mail.com',
                'password' => bcrypt('admin123'),
                'email_verified_at' => now(),
            ],
        ];


        User::insert($users);
    }
}
