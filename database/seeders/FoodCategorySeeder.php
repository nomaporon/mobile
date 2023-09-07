<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FoodCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('food_category')->insert([
            'food_id'=>1,
            'category_id'=>1,
        ]);
        
        DB::table('food_category')->insert([
            'food_id'=>1,
            'category_id'=>2,
        ]);
        
        DB::table('food_category')->insert([
            'food_id'=>2,
            'category_id'=>1,
        ]);
        
        DB::table('food_category')->insert([
            'food_id'=>2,
            'category_id'=>3,
        ]);
        
        DB::table('food_category')->insert([
            'food_id'=>3,
            'category_id'=>4,
        ]);
        
        DB::table('food_category')->insert([
            'food_id'=>4,
            'category_id'=>1,
        ]);
        
        DB::table('food_category')->insert([
            'food_id'=>4,
            'category_id'=>2,
        ]);
        
        DB::table('food_category')->insert([
            'food_id'=>5,
            'category_id'=>2,
        ]);
        
        DB::table('food_category')->insert([
            'food_id'=>6,
            'category_id'=>1,
        ]);
        
        DB::table('food_category')->insert([
            'food_id'=>6,
            'category_id'=>2,
        ]);
        
        DB::table('food_category')->insert([
            'food_id'=>7,
            'category_id'=>1,
        ]);
        
        DB::table('food_category')->insert([
            'food_id'=>7,
            'category_id'=>3,
        ]);
        
        DB::table('food_category')->insert([
            'food_id'=>8,
            'category_id'=>3,
        ]);
        
        DB::table('food_category')->insert([
            'food_id'=>9,
            'category_id'=>4,
        ]);
        
        DB::table('food_category')->insert([
            'food_id'=>10,
            'category_id'=>4,
        ]);
    }
}
