<?php

namespace App\Http\Controllers;

use App\Models\SensorData;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class SensorDataController extends Controller
{
    /**
     * Display a listing of sensor data.
     */
    public function index()
    {
        $sensorData = SensorData::latest()->paginate(20);

        return Inertia::render('SensorData/Index', [
            'sensorData' => $sensorData,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('SensorData/Create');
    }

    /**
     * Store a newly created sensor record in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'pressure' => 'required|numeric',
            'temperature' => 'required|numeric',
            'status_message' => 'required|string',
            'invalve' => 'required|boolean',
            'outvalve' => 'required|boolean',
        ]);
    
        $sensorData = SensorData::create($validated);
    
        return response()->json([
            'message' => 'Sensor data stored successfully.',
            'data' => $sensorData
        ], 201);
    }

    /**
     * Display the latest 6 sensor data entries on the dashboard.
     */
    public function show(SensorData $sensorData)
    {
        $sensorData = SensorData::latest()->take(6)->get();

        return Inertia::render('dashboard', [
            'sensorData' => $sensorData,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SensorData $sensorData)
    {
        return Inertia::render('SensorData/Edit', [
            'sensorData' => $sensorData,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SensorData $sensorData)
    {
        $validated = $request->validate([
            'pressure' => 'required|numeric',
            'temperature' => 'required|numeric',
            'status' => 'required|string',
            'inValve' => 'required|boolean',
            'outValve' => 'required|boolean',
        ]);

        $sensorData->update($validated);

        return redirect()->back()->with('success', 'Sensor data updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SensorData $sensorData)
    {
        $sensorData->delete();

        return redirect()->back()->with('success', 'Sensor data deleted successfully.');
    }
}