<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Food;

class FoodController extends Controller
{
    public function index(Food $food)
    {
        return view('foods.index')->with(['foods' => $food->get()]);
    }
}
