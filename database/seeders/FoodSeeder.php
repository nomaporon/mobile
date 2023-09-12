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
            'image'=>'yakiniku.jpg',
            'unit_price'=>650,
            'gross_profit'=>450,
        ]);
        
        DB::table('foods')->insert([
            'name'=>'サラダ',
            'image'=>'salad.jpeg',
            'unit_price'=>200,
            'gross_profit'=>140,
        ]);
        
        DB::table('foods')->insert([
            'name'=>'ウーロン茶',
            'unit_price'=>350,
            'gross_profit'=>250,
        ]);
        
        DB::table('foods')->insert([
            'name'=>'チキン南蛮定食',
            'image'=>'chicken_nanban.jpg',
            'unit_price'=>850,
            'gross_profit'=>550,
        ]);
        
        DB::table('foods')->insert([
            'name'=>'ハンバーグ定食',
            'image'=>'hamburger.jpg',
            'unit_price'=>750,
            'gross_profit'=>500,
        ]);
        
        DB::table('foods')->insert([
            'name'=>'唐揚げ定食',
            'unit_price'=>550,
            'gross_profit'=>400,
        ]);
        
        DB::table('foods')->insert([
            'name'=>'味噌汁',
            'image'=>'miso_soup.jpg',
            'unit_price'=>250,
            'gross_profit'=>170,
        ]);

        DB::table('foods')->insert([
            'name'=>'アイスクリーム',
            'image'=>'ice_cream.jpg',
            'unit_price'=>300,
            'gross_profit'=>210,
        ]);
        
        DB::table('foods')->insert([
            'name'=>'コーラ',
            'image'=>'cola.jpg',
            'unit_price'=>200,
            'gross_profit'=>140,
        ]);
        
        DB::table('foods')->insert([
            'name'=>'オレンジジュース',
            'image'=>'orange_juice.jpg',
            'unit_price'=>200,
            'gross_profit'=>140,
        ]);
    }
}
