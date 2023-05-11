<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller; 
use App\Models\Bottle;
use App\Models\User;
use App\Models\CellarHasBottle;
use App\Models\Cellar;
use App\Models\Country;

use Illuminate\Http\Request;

class StatsController extends Controller
{
    public function getStats()
    {
        $numberOfUsers = $this->getNumberOfUsers();
        $avgCellarTotalWorth = $this->getAvgCellarTotalWorth();
        $totalCellarWorth = $this->getTotalCellarWorth();
        $wineOfTheMoment = $this->getWineOfTheMoment();

        return response()->json([
            'numberOfUsers' => $numberOfUsers,
            'avgCellarTotalWorth' => $avgCellarTotalWorth,
            'totalCellarWorth' => $totalCellarWorth,
            'wineOfTheMoment' => $wineOfTheMoment,
        ]);
    }

    private function getNumberOfUsers()
    {
    
        return User::count();
    }

    private function getAvgCellarTotalWorth()
    {
        $cellarCount = Cellar::count();
        $totalWorth = 0;
    
        $cellars = Cellar::all();
        foreach ($cellars as $cellar) {
            $cellarHasBottles = CellarHasBottle::where('cellar_id', $cellar->id)->get();
            foreach ($cellarHasBottles as $cellarHasBottle) {
                $bottle = Bottle::find($cellarHasBottle->bottle_id);
                $totalWorth += $bottle->price_saq;
            }
        }
    
        $avgTotalWorth = $cellarCount > 0 ? $totalWorth / $cellarCount : 0;
    
        return $avgTotalWorth;
    }
    

    private function getTotalCellarWorth()
    {
        $cellarCount = Cellar::count();
        $totalWorth = 0;
    
        $cellars = Cellar::all();
        foreach ($cellars as $cellar) {
            $cellarHasBottles = CellarHasBottle::where('cellar_id', $cellar->id)->get();
            foreach ($cellarHasBottles as $cellarHasBottle) {
                $bottle = Bottle::find($cellarHasBottle->bottle_id);
                $totalWorth += $bottle->price_saq;
            }
        }
        return $totalWorth;
    }

    private function getWineOfTheMoment()
    {
        $bottleCounts = [];

    $cellarHasBottles = CellarHasBottle::all();
    foreach ($cellarHasBottles as $cellarHasBottle) {
        $bottleId = $cellarHasBottle->bottle_id;
        if (array_key_exists($bottleId, $bottleCounts)) {
            $bottleCounts[$bottleId]++;
        } else {
            $bottleCounts[$bottleId] = 1;
        }
    }

    $mostPopularBottleId = max($bottleCounts);
    $mostPopularBottle = Bottle::find($mostPopularBottleId);

    return $mostPopularBottle['name'];
    }
}

