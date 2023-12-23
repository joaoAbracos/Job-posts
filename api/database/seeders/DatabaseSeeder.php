<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $personRole = Role::create(['name' => 'person']);
        $adminRole = Role::create(['name' => 'admin']);
        $companyRole = Role::create(['name' => 'company']);


        // $storeTaskPermission = Permission::create(['name' => 'store-task']);
        $viewTaskPermission = Permission::create(['name' => 'view-task']);
        $deleteTaskPermission = Permission::create(['name' => 'delete-task']);
    
        $personRole->givePermissionTo([
            'view-task',
            'delete-task',
        ]);

        User::factory(5)->has(
            Task::factory(5)
        )->create()->each(function ($user){
            $user->assignRole('person');
        });
        User::factory(5)->has(
            Task::factory(5)
        )->create()->each(function ($user){
            $user->assignRole('company');
        });
       
    }
}
