<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    use HasFactory;
    
    protected $table = 'foods';
    
    protected $fillable = [
        'name',
        'image',
        'unit_price',
        'gross_profit'
    ];
    
    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }
}
