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
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

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
             * category_foods = [{"food_id" => 1, "name" => "焼肉定食", image" => "...", "price" => 650, "gross_profit" => 450},... ]
             */
            foreach ($category->foods as $food){
                array_push($category_foods, array(
                        "food_id" => intval($food->id),
                        "name" => $food->name,
                        "image" => config('menu.image_url').($food->image),
                        "price" => $food->unit_price,
                        "gross_profit" => $food->gross_profit
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
        $file = $request->file("image_data");
        $file_name = "no_image.png";
        if (!is_null($file)) {
            $file_name = $file->getClientOriginalName();
            $file->storeAs('/image', $file_name, 's3');
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
    }
    
    public function update_menu(Request $request)
    {
        $request->validate([
            'food_name' => 'required|string|max:30',
            'image_data' => 'nullable',
            'unit_price' => 'required|integer',
            'gross_profit' => 'nullable|integer',
            'category_id' => 'required'
        ]);
        
        $input = $request->all();
        $file = $request->file("image_data");
        if (!is_null($file)) {
            $file_name = $file->getClientOriginalName();
            $file->storeAs('/image', $file_name, 's3');
        } elseif (!is_null($input['image_data'])) {
            $file_name = $input['image_data'];
        } else {
            $file_name = "no_image.png";
        }
        
        $data = array(
            "name" => $input['food_name'],
            "image" => $file_name,
            "unit_price" => $input['unit_price'],
            "gross_profit" => $input['gross_profit']
        );
        
        DB::table('foods')
            ->where('id',$input['food_id'])
            ->update($data);
        
        DB::table('food_category')
            ->where('food_id', $input['food_id'])
            ->delete();
        
        $category_ids = $input['category_id'];
        foreach ($category_ids as $category_id) {
            DB::table('food_category')
                ->insert(["food_id" => $input['food_id'], "category_id" => $category_id]);
        }
    }
    
    public function delete_menu(Food $food)
    {
        $file_name = $food['image'];
        DB::table('food_category')
            ->where('food_id', $food['id'])
            ->delete();
        $food->delete();
        if (!($file_name === "no_image.png")) {
            Storage::disk('s3')->delete('image/'.$file_name);
        }
    }
    
    public function add_category(Request $request, Category $category)
    {
        $input = $request->all();
        $category->fill($input)->save();
    }
}
