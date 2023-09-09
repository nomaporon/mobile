<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderList extends Model
{
    use HasFactory;
    
    protected $table = 'order_lists';
    
    protected $fillable = [
        'quantity'
    ];
    
    public function food()
    {
        return $this->belongsTo(Food::class);
    }
}
