<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RegionController;
use App\Http\Controllers\Api\DistrictController;
use App\Http\Controllers\Api\AgencyController;
use App\Http\Controllers\Api\PeriodController;

use App\Http\Controllers\Api\WarehouseController;
use App\Http\Controllers\Api\WarehouseCapacityController;

Route::apiResource('agencies', AgencyController::class);
Route::apiResource('districts', DistrictController::class);
Route::apiResource('regions', RegionController::class);
Route::apiResource('periods', PeriodController::class);

Route::apiResource('capacities', WarehouseCapacityController::class);


Route::apiResource('warehouses', WarehouseController::class);
