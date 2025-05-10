<?php

use App\Models\SensorData;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


Route::get('/', function () {
    return Inertia::render('welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'isAuthenticated' => Auth::check(),        
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {

        return Inertia::render('dashboard', [
        ]);
    })->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('controls', function () {
        return Inertia::render('control/control');
    })->name('controls');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';