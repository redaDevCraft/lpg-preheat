<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SensorData extends Model
{
    protected $fillable = [ 
    'pressure',
    'temperature',
    'status_message',
    'invalve',
    'outvalve',];

}