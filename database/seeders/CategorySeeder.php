<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
            'name'=>'おすすめ',
        ]);
        
        DB::table('categories')->insert([
            'name'=>'定食',
        ]);
        
        DB::table('categories')->insert([
            'name'=>'サイドメニュー',
        ]);
        
        DB::table('categories')->insert([
            'name'=>'ドリンク',
        ]);
    }
}
