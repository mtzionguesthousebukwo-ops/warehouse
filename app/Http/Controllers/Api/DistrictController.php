<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\District;
use Illuminate\Http\Request;


class DistrictController extends Controller
{
public function index()
{
// Optional include region relation if defined
return response()->json(District::orderBy('id', 'desc')->get());
}


public function store(Request $request)
{
$data = $request->validate([
'region_id' => 'required|integer|exists:regions,id',
'name' => 'required|string|max:255',
'geojson' => 'nullable|string',
]);


$district = District::create($data);
return response()->json($district, 201);
}


public function show($id)
{
return response()->json(District::findOrFail($id));
}


public function update(Request $request, $id)
{
$data = $request->validate([
'region_id' => 'required|integer|exists:regions,id',
'name' => 'required|string|max:255',
'geojson' => 'nullable|string',
]);


$district = District::findOrFail($id);
$district->update($data);
return response()->json($district);
}


public function destroy($id)
{
$district = District::findOrFail($id);
$district->delete();
return response()->json(null, 204);
}
}