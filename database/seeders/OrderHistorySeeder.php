<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderHistorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('order_histories')->insert([
            'food_id'=>1,
            'table_id'=>1,
            'quantity'=>1,
            'is_served'=>1,
        ]);
        
        DB::table('order_histories')->insert([
            'food_id'=>2,
            'table_id'=>1,
            'quantity'=>2,
            'is_served'=>0,
        ]);
        
        DB::table('order_histories')->insert([
            'food_id'=>9,
            'table_id'=>1,
            'quantity'=>1,
            'is_served'=>0,
        ]);
    }
}
