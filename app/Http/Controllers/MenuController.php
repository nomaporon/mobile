<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Food;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function index(Category $category)
    {
        // $category_names = [{id: 1, name: 'おすすめ'}, {id: 2, name: '定食'}, ...]
        $category_names = $category->get();
        $category_foods = array();
        $categories_foods = array();
        
        foreach ($category_names as $category_name){
            foreach ($category_name->foods as $food){
                // category_foods = [{"name" => "焼肉定食", "price" => 650}, {"name" => "サラダ", "price" => 250}]
                array_push($category_foods, array("name" => $food->name, "price" => $food->unit_price));
            }
            // categories_foods = [{"id" => 1, "category" => "おすすめ", "foods" => [{"name" => "焼肉定食", "price" => 650}, {"name" => "サラダ", "price" => 250}]}, ...]
            array_push($categories_foods, array("id" => "{$category_name['id']}", "category" => "{$category_name['name']}", "foods" => $category_foods));
            $category_foods = array();
        }
        return Inertia::render("Menu/Index",["categories" => $categories_foods]);
    }
}
