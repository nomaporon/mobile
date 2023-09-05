<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    // public function index(Category $category)
    // {
    //     return view('categories.index')->with(['categories' => $category->get()]);
    // }

    public function index(Category $category)
    {
        return Inertia::render("Menu/Index",["categories" => $category->get()]);
    }
}
