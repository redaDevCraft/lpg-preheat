<?php

namespace App\Http\Controllers;

use App\Models\SensorData;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SensorDataController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $validated = $request->validate([
        'pressure' => 'required',
        'temperature' => 'required',
    ]);

    $sensorData = SensorData::create($validated);

    return response()->json($sensorData, 201);
    }

    /**
     * Display the specified resource.
     */
   public function show(SensorData $sensorData)
{
    // Fetch the latest 6 records
    $sensorData = SensorData::latest()->take(6)->get()->toArray();
    

    // Format the data for the frontend
    
    return Inertia::render('dashboard', [
        'sensorData' => $sensorData,
    ]);
}



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SensorData $sensorData)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SensorData $sensorData)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SensorData $sensorData)
    {
        //
    }
}