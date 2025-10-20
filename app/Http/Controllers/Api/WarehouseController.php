<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Warehouse;
use Illuminate\Http\Request;

class WarehouseController extends Controller
{
    // GET /api/warehouses
    public function index()
    {
        return Warehouse::with(['district', 'agency'])->get();
    }

    // POST /api/warehouses
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'district_id' => 'required|exists:districts,id',
            'agency_id' => 'required|exists:agencies,id',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        return Warehouse::create($data);
    }

    // GET /api/warehouses/{id}
    public function show(Warehouse $warehouse)
    {
        return $warehouse->load(['district', 'agency']);
    }

    // PUT /api/warehouses/{id}
    public function update(Request $request, Warehouse $warehouse)
    {
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'district_id' => 'sometimes|exists:districts,id',
            'agency_id' => 'sometimes|exists:agencies,id',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        $warehouse->update($data);

        return $warehouse->load(['district', 'agency']);
    }

    // DELETE /api/warehouses/{id}
    public function destroy(Warehouse $warehouse)
    {
        $warehouse->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
