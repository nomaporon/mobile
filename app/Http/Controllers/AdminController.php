<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Food;
use App\Models\OrderList;
use App\Models\OrderHistory;
use App\Models\FoodCategory;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(Category $categories)
    {
        /** 
         *  $categories->get() = [{id: 1, name: 'おすすめ'}, {id: 2, name: '定食'}, ...]
         *  categoryごとのfoodをひとまとまりにしてビューに渡す
         *  category_foods = [{"id" => 1, "category" => "おすすめ", "foods" => [{"food_id" => 1, "name" => "焼肉定食", image" => "...", "price" => 650}, ...]
         */
        $category_foods = array();
        $categories_foods = array();
        
        foreach ($categories->get() as $category){
            /** 
             * food = {"id" => "1", "name" => "焼肉定食, image" => "...", "unit_price" => 650, "gross_profit" => 450}
             * category_foods = [{"food_id" => 1, "name" => "焼肉定食", image" => "...", "price" => 650},... ]
             */
            foreach ($category->foods as $food){
                array_push($category_foods, array(
                        "food_id" => intval($food->id),
                        "name" => $food->name,
                        "image" => $food->image,
                        "price" => $food->unit_price
                    ));
            }
            array_push($categories_foods, array(
                    "id" => $category['id'],
                    "category" => "{$category['name']}",
                    "foods" => $category_foods
                ));
            $category_foods = array();
        }
        
        return Inertia::render("Admin", ["categories" => $categories_foods]);
    }
    
    public function add_menu(Request $request)
    {
        $request->validate([
            'food_name' => 'required|string|max:30',
            'image_data' => 'nullable',
            'unit_price' => 'required|integer',
            'gross_profit' => 'nullable|integer',
            'category_id' => 'required'
        ]);
        
        $input = $request->all();
        $file_name = null;
        if (!is_null($input['image_data']))
        {
            $file_name = $request->file("image_data")->getClientOriginalName();
            $request->file("image_data")->storeAs('public/img', $file_name);
        }
        $data = array(
            "name" => $input['food_name'],
            "image" => $file_name,
            "unit_price" => $input['unit_price'],
            "gross_profit" => $input['gross_profit']
        );
        $food_id = DB::table('foods')->insertGetId($data);
        
        $category_ids = $input['category_id'];
        foreach ($category_ids as $category_id) {
            DB::table('food_category')->insert(["food_id" => $food_id, "category_id" => $category_id]);
        }
        
        return redirect("/admin");
    }
}
