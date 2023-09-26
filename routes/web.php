<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FoodController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AppController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\OrderListController;
use App\Http\Controllers\OrderHistoryController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::controller(AppController::class)->group(function(){
    Route::get('/', 'index');
    Route::get('/list', 'index');
    Route::get('/history', 'index');
    Route::post('/add_order', 'add_order_list');
    Route::delete('/list', 'all_delete_order_list');
    Route::post('/add_order_history', 'add_order_history');
    Route::delete('/history', 'a');
});

Route::controller(AdminController::class)->group(function(){
    Route::get('/admin', 'index'); 
    Route::get('/add', 'index');
    Route::post('/add_menu', 'add_menu');
    Route::post('/update_menu', 'update_menu');
});

Route::get('/Welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
