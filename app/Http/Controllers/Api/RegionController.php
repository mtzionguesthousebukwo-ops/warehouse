<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Region;
use Illuminate\Http\Request;


class RegionController extends Controller
{
public function index()
{
return response()->json(Region::orderBy('id', 'desc')->get());
}


public function store(Request $request)
{
$data = $request->validate([
'name' => 'required|string|max:255',
]);


$region = Region::create($data);
return response()->json($region, 201);
}


public function show($id)
{
return response()->json(Region::findOrFail($id));
}


public function update(Request $request, $id)
{
$data = $request->validate([
'name' => 'required|string|max:255',
]);


$region = Region::findOrFail($id);
$region->update($data);
return response()->json($region);
}


public function destroy($id)
{
$region = Region::findOrFail($id);
$region->delete();
return response()->json(null, 204);
}
}