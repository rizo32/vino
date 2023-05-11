<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller; 
use App\Models\Bottle;
use App\Models\User;
use App\Models\CellarHasBottle;
use App\Models\Cellar;
use App\Models\Country;

use Illuminate\Http\Request;

class PieGraphController extends Controller
{
    public function getWineStats()
    {
       /* data simple pour test -> manque logique */
        $redWineCount = Bottle::where('type', 'red')->count();
        $whiteWineCount = Bottle::where('type', 'white')->count();

     
        return response()->json([
            'redWineCount' => $redWineCount,
            'whiteWineCount' => $whiteWineCount,
        ]);
    }
}