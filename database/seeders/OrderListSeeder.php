<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('order_lists')->insert([
            'food_id'=>10,
            'table_id'=>1,
            'quantity'=>1,
        ]);
        
        DB::table('order_lists')->insert([
            'food_id'=>8,
            'table_id'=>1,
            'quantity'=>2,
        ]);
    }
}
