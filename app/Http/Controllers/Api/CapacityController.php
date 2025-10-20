<?php

namespace App\Http\Controllers;

use App\Models\Capacity;
use Illuminate\Http\Request;

class CapacityController extends Controller
{
    public function index()
    {
        return Capacity::with(['warehouse', 'period'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'warehouse_id' => 'required|exists:warehouses,id',
            'period_id'    => 'required|exists:periods,id',
            'capacity'     => 'required|integer|min:0',
        ]);

        $capacity = Capacity::create($validated);
        return response()->json($capacity, 201);
    }

    public function show($id)
    {
        return Capacity::with(['warehouse', 'period'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $capacity = Capacity::findOrFail($id);
        $validated = $request->validate([
            'warehouse_id' => 'sometimes|exists:warehouses,id',
            'period_id'    => 'sometimes|exists:periods,id',
            'capacity'     => 'sometimes|integer|min:0',
        ]);
        $capacity->update($validated);
        return response()->json($capacity, 200);
    }

    public function destroy($id)
    {
        $capacity = Capacity::findOrFail($id);
        $capacity->delete();
        return response()->json(['message' => 'Capacity deleted'], 200);
    }
}
