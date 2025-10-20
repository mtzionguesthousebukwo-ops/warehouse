<?php


namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\Period;
use Illuminate\Http\Request;


class PeriodController extends Controller
{
public function index()
{
return response()->json(Period::orderBy('id', 'desc')->get());
}


public function store(Request $request)
{
$data = $request->validate([
'name' => 'required|string|max:255',
]);


$period = Period::create($data);
return response()->json($period, 201);
}


public function show($id)
{
return response()->json(Period::findOrFail($id));
}


public function update(Request $request, $id)
{
$data = $request->validate([
'name' => 'required|string|max:255',
]);


$period = Period::findOrFail($id);
$period->update($data);
return response()->json($period);
}


public function destroy($id)
{
$period = Period::findOrFail($id);
$period->delete();
return response()->json(null, 204);
}
}