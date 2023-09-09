<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderHistory extends Model
{
    use HasFactory;
    
    protected $table = 'order_histories';
    
    protected $fillable = [
        'is_served'
    ];
    
    public function food()
    {
        return $this->belongsTo(Food::class);
    }
}
