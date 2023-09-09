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
    public function index(Category $categories, OrderList $order_lists, OrderHistory $order_histories)
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
        
        /**
         *  $order_list->get() = [{id: 1, food_id: 10, table_id: 1, quantity: 1}, {id: 2, food_id: 8, table_id: 1, quantity: 2},...]
         *  注文料理名、数量、金額を返す
         *  $order_info = 
         */
        $order_info = array();
        
        foreach ($order_lists->get() as $order){
            array_push($order_info, array(
                    "food_name" => "{$order->food->name}",
                    "quantity" => $order['quantity'],
                    "price" => intval($order->food->unit_price) * $order['quantity']
                ));
        }
        
        /**
         *  return categories [Array]  [{"id" => 1, "category" => "おすすめ", "foods" => [{"food_id" => 1, "name" => "焼肉定食", image" => "...", "price" => 650}, ...]
         *  return order_list [Array]  
         *  return order_history [Array]  [{id: 1, food_id: 1, table_id: 1, quantity: 1, is_served: 1,..}, {id: 2, food_id: 2, table_id: 1, quantity: 2, is_served: 0, …},...]
         */ 
        return Inertia::render(
                "App",
                [
                    "categories" => $categories_foods,
                    "order_list" => $order_info,
                ]
            );
    }
}
