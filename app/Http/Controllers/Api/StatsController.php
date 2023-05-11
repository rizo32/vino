<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller; 
use App\Models\Bottle;
use App\Models\User;
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

    }

    private function getTotalCellarWorth()
    {

    }

    private function getWineOfTheMoment()
    {
        
    }
}

