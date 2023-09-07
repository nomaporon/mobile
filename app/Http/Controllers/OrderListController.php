<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderListController extends Controller
{
    public function index() {
        return Inertia::render("Order/List");
    }
}
