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
        // initialise les counters
        $redWineCount = 0;
        $whiteWineCount = 0;
        $pinkWineCount = 0;
        $otherWineCount = 0;
    
        /* loop a travers to les cellars */
        $cellars = Cellar::all();
        foreach ($cellars as $cellar) {
            // Prend tou les bouteilles associés au cellier
            $cellarHasBottles = CellarHasBottle::where('cellar_id', $cellar->id)->get();
    
            // Traverse tout les donné associés au bouteilles
            foreach ($cellarHasBottles as $cellarHasBottle) {
                //Trouve bouteille et quantité
                $bottle = Bottle::find($cellarHasBottle->bottle_id);
                $quantity = $cellarHasBottle->quantity;
    
                //mis a jour du counter selon le type de bouteille
                if ($bottle->type_id == 1) {
                    $redWineCount += $quantity;
                } elseif ($bottle->type_id == 2) {
                    $whiteWineCount += $quantity;
                } elseif ($bottle->type_id == 3){
                    $pinkWineCount += $quantity;
                } elseif ($bottle->type_id == 4){
                    $otherWineCount += $quantity;
                } 
                
            }
        }
    
        
        return response()->json([
            'redWineCount' => $redWineCount,
            'whiteWineCount' => $whiteWineCount,
            'pinkWineCount' => $pinkWineCount,
            'otherWineCount' => $otherWineCount,
        ]);
    }


    public function topWineStats(){
        /* fonction qui resort le total des bouteilles dans les 5 régions les plus populaire dans les cellier de nos utilisateurs. */


        $topWineStats = Country::select('name', 'id')

        ->withCount(['bottles' => function ($query) {
            $query->select(\DB::raw('sum(cellar_has_bottles.quantity) as total'))
            ->join('cellar_has_bottles', 'cellar_has_bottles.bottle_id', '=', 'bottles.id')
            ->join('cellars', 'cellars.id', '=', 'cellar_has_bottles.cellar_id')
            ->join('users', 'users.id', '=', 'cellars.user_id')
            ->groupBy('bottles.country_id')
            ->orderBy('total', 'desc')
            ->limit(5);

        }])
        ->get();

        return response()->json([
            'topWineStats' => $topWineStats,
        ]);

    }
}