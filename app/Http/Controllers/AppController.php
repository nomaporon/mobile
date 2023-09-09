<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Food;
use App\Models\OrderList;
use App\Models\OrderHistory;
use Inertia\Inertia;

class AppController extends Controller
{
    public function index(Category $categories, OrderList $order_list, OrderHistory $order_history)
    {
        /** 
         *  $categories = [{id: 1, name: 'おすすめ'}, {id: 2, name: '定食'}, ...]
         *  categoryごとのfoodをひとまとまりにしてビューに渡す
         */
        $category_foods = array();
        $categories_foods = array();
        
        foreach ($categories->get() as $category){
            /** 
             * food = {"id" => 1, "name" => "焼肉定食, image" => "...", "unit_price" => 650, "gross_profit" => 450}
             * category_foods = [{"food_id" => 1, "name" => "焼肉定食", image" => "...", "price" => 650},... ]
             */
            foreach ($category->foods as $food){
                array_push($category_foods, array(
                        "food_id" => $food->id,
                        "name" => $food->name,
                        "image" => $food->image,
                        "price" => $food->unit_price
                    ));
            }
            array_push($categories_foods, array(
                    "id" => "{$category['id']}",
                    "category" => "{$category['name']}",
                    "foods" => $category_foods
                ));
            $category_foods = array();
        }
        
        $order_info = array();
        
        foreach ($order_list as $order){
            
        }
        
        /**
         *  return categories [Array]  [{"id" => 1, "category" => "おすすめ", "foods" => [{"food_id" => 1, "name" => "焼肉定食", image" => "...", "price" => 650}, ...]
         *  return order_list [Array]  [{id: 1, food_id: 10, table_id: 1, quantity: 1}, {id: 2, food_id: 8, table_id: 1, quantity: 2},...]
         *  return order_history [Array]  [{id: 1, food_id: 1, table_id: 1, quantity: 1, is_served: 1,..}, {id: 2, food_id: 2, table_id: 1, quantity: 2, is_served: 0, …},...]
         */ 
        return Inertia::render(
                "App",
                [
                    "categories" => $categories_foods,
                    "order_list" => $order_list->get(),
                    "order_history" => $order_history->get()
                ]
            );
    }
}
