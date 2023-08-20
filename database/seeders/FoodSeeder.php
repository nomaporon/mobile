<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FoodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('foods')->insert([
            'name'=>'焼肉定食',
            'unit_price'=>650,
            'gross_profit'=>450,
        ]);
        
        DB::table('foods')->insert([
            'name'=>'サラダ',
            'unit_price'=>200,
            'gross_profit'=>140,
        ]);
        
        DB::table('foods')->insert([
            'name'=>'ウーロン茶',
            'unit_price'=>350,
            'gross_profit'=>250,
        ]);
    }
}
