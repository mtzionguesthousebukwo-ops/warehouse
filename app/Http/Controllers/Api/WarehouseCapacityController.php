<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WarehouseCapacity;
use Illuminate\Http\Request;

class WarehouseCapacityController extends Controller
{
    public function index(Request $request)
    {
        // 🔹 If "report" query param is passed, return grouped analytics
        if ($request->query('report')) {
            $query = WarehouseCapacity::with([
                'warehouse.district.region',
                'period',
                'warehouse.agency'
            ]);

            // --- Filters ---
            if ($request->region) {
                $query->whereHas('warehouse.district.region', fn($q) => $q->where('name', $request->region));
            }
            if ($request->district) {
                $query->whereHas('warehouse.district', fn($q) => $q->where('name', $request->district));
            }
            if ($request->agency) {
                $query->whereHas('warehouse.agency', fn($q) => $q->where('name', $request->agency));
            }
            if ($request->period) {
                $query->whereHas('period', fn($q) => $q->where('name', $request->period));
            }

            $capacities = $query->get();

            // --- Build analytics ---
            $byDistrict = $capacities
                ->groupBy(fn($c) => $c->warehouse->district->name)
                ->map(fn($items, $name) => [
                    'name'     => $name,
                    'capacity' => $items->sum('capacity'),
                    'geojson'  => optional($items->first()->warehouse->district)->geojson,
                ])->values();

            $byRegion = $capacities
                ->groupBy(fn($c) => $c->warehouse->district->region->name)
                ->map(fn($items, $name) => [
                    'region'   => $name,
                    'capacity' => $items->sum('capacity'),
                ])->values();

            $byPeriod = $capacities
                ->groupBy(fn($c) => $c->warehouse->district->name)
                ->map(function ($items, $district) {
                    $row = ['district' => $district];
                    foreach ($items->groupBy(fn($c) => $c->period->name) as $periodName => $periodItems) {
                        $row[$periodName] = $periodItems->sum('capacity');
                    }
                    return $row;
                })->values();

            return response()->json([
                'byDistrict' => $byDistrict,
                'byRegion'   => $byRegion,
                'byPeriod'   => $byPeriod,
            ]);
        }

        // 🔹 Otherwise, return plain CRUD list (with filters)
        $query = WarehouseCapacity::query();

        if ($request->filled('warehouse_id')) {
            $query->where('warehouse_id', $request->warehouse_id);
        }
        if ($request->filled('period_id')) {
            $query->where('period_id', $request->period_id);
        }

        return response()->json($query->orderBy('id','desc')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'warehouse_id' => 'required|integer|exists:warehouses,id',
            'period_id'    => 'required|integer|exists:periods,id',
            'capacity'     => 'required|integer|min:0',
        ]);

        $cap = WarehouseCapacity::create($data);
        return response()->json($cap, 201);
    }

    public function show($id)
    {
        return response()->json(WarehouseCapacity::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'warehouse_id' => 'required|integer|exists:warehouses,id',
            'period_id'    => 'required|integer|exists:periods,id',
            'capacity'     => 'required|integer|min:0',
        ]);

        $cap = WarehouseCapacity::findOrFail($id);
        $cap->update($data);
        return response()->json($cap);
    }

    public function destroy($id)
    {
        $cap = WarehouseCapacity::findOrFail($id);
        $cap->delete();
        return response()->json(null, 204);
    }
}
