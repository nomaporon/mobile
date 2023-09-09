<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderList extends Model
{
    use HasFactory;
    
    protected $table = 'order_lists';
    
    protected $fillable = [
        'food_id',
        'table_id',
        'quantity'
    ];
    
    public $timestamps = false;
    
    public function food()
    {
        return $this->belongsTo(Food::class);
    }
}
