<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tables')->insert([
            'is_used'=>1,
        ]);
        
        DB::table('tables')->insert([
            'is_used'=>0,
        ]);
        
        DB::table('tables')->insert([
            'is_used'=>1,
        ]);
    }
}
