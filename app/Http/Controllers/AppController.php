<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Food;
use App\Models\OrderList;
use App\Models\OrderHistory;
use Illuminate\Support\Facades\DB;
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
         *  $order_lists->get() = [{id: 1, food_id: 10, table_id: 1, quantity: 1}, {id: 2, food_id: 8, table_id: 1, quantity: 2},...]
         *  注文リストに追加した料理名、数量、金額を返す
         *  $order_info = [{"food_name" => "オレンジジュース", "quantity" => 1, "price" => 200}, {"food_name" => "アイスクリーム", "quantity" => 2, "price" => 600}]
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
         *  $order_histories->get() = [{id: 1, food_id: 1, table_id: 1, quantity: 1, is_served: 1,..}, {id: 2, food_id: 2, table_id: 1, quantity: 2, is_served: 0, …},...]
         *  注文した料理名、数量、金額と合計金額を返す
         */
        $order_history_info = array();
        $total_price = 0;
        
        foreach ($order_histories->get() as $order_history){
            array_push($order_history_info, array(
                    "food_name" => "{$order_history->food->name}",
                    "quantity" => $order_history['quantity'],
                    "price" => intval($order_history->food->unit_price) * $order_history['quantity']
                ));
            
            $total_price += (intval($order_history->food->unit_price) * $order_history['quantity']);
        }
        
        $order_history_and_total_price = array(
                "order_history" => $order_history_info,
                "total_price" => $total_price
            );
        
        /**
         *  return categories [Array]  [{"id" => 1, "category" => "おすすめ", "foods" => [{"food_id" => 1, "name" => "焼肉定食", image" => "...", "price" => 650}, ...]
         *  return order_list [Array]  [{"food_name" => "オレンジジュース", "quantity" => 1, "price" => 200}, {"food_name" => "アイスクリーム", "quantity" => 2, "price" => 600}]
         *  return order_history [Object]  {"order_history" => [{"food_name" => "オレンジジュース", "quantity" => 1, "price" => 200},..], total_price => 1250}
         */ 
        return Inertia::render(
                "App",
                [
                    "categories" => $categories_foods,
                    "order_list" => $order_info,
                    "order_history" => $order_history_and_total_price
                ]
            );
    }
    
    public function add_order_list(Request $request, OrderList $order_list)
    {
        $input = $request->all();
        $order_list->fill($input)->save();
    }
    
    public function add_order_history(OrderList $order_lists, OrderHistory $order_history)
    {
        $orders = $order_lists->get();
        $data = array();
        foreach ($orders as $order){
            array_push($data, array(
                    "food_id" => $order['food_id'],
                    "table_id" => $order['table_id'],
                    "quantity" => $order['quantity'],
                    "created_at" => now(),
                    "is_served" => 0
                )
            );
        }
        
        DB::table('order_histories')->insert($data);
        DB::table('order_lists')->truncate();
    }
    
    public function all_delete_order_list()
    {
        DB::table('order_lists')->truncate();
    }
}
