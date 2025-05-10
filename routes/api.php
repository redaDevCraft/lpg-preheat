<?php

use App\Http\Controllers\SensorDataController;
use App\Models\SensorData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post(uri: '/sensor-data', action: [SensorDataController::class, 'store']);

Route::get('/sensor-data/show', function () {
    return SensorData::latest()->take(1)->get();
});