<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Agency;
use Illuminate\Http\Request;

class AgencyController extends Controller
{
    // Get all agencies
    public function index()
    {
        return response()->json(Agency::all());
    }

    // Create new agency
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $agency = Agency::create($validated);

        return response()->json($agency, 201);
    }

    // Get single agency
    public function show($id)
    {
        $agency = Agency::findOrFail($id);
        return response()->json($agency);
    }

    // Update agency
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $agency = Agency::findOrFail($id);
        $agency->update($validated);

        return response()->json($agency);
    }

    // Delete agency
    public function destroy($id)
    {
        $agency = Agency::findOrFail($id);
        $agency->delete();

        return response()->json(null, 204);
    }
}
