<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WarehouseCapacity extends Model {
    protected $fillable = ['warehouse_id','period_id','capacity'];
    public function warehouse(){ return $this->belongsTo(Warehouse::class); }
    public function period(){ return $this->belongsTo(Period::class); }
}

