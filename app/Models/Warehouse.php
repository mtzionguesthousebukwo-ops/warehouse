<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model {
    protected $fillable = ['name','district_id','agency_id','latitude','longitude'];
    public function district(){ return $this->belongsTo(District::class); }
    public function agency(){ return $this->belongsTo(Agency::class); }
    public function capacities(){ return $this->hasMany(WarehouseCapacity::class); }
}
