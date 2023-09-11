<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderHistory extends Model
{
    use HasFactory;
    
    const UPDATED_AT = NULL;
    
    protected $table = 'order_histories';
    
    protected $fillable = [
        'food_id',
        'table_id',
        'quantity',
        'is_served'
    ];
    
    public function food()
    {
        return $this->belongsTo(Food::class);
    }
}
