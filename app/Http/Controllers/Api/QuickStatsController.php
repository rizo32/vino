<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller; 
use App\Models\Bottle;
use App\Models\User;
use App\Models\CellarHasBottle;
use App\Models\Cellar;
use App\Models\Country;

use Illuminate\Http\Request;

class QuickStatsController extends Controller
{
    public function getStats()
    {
        /* recuperations des QuickStats */
        $numberOfUsers = $this->getNumberOfUsers();
        $avgCellarTotalWorth = $this->getAvgCellarTotalWorth();
        $totalCellarWorth = $this->getTotalCellarWorth();
        $wineOfTheMoment = $this->getWineOfTheMoment();

        /* Formatage pour le retour */
        return response()->json([
            'numberOfUsers' => $numberOfUsers,
            'avgCellarTotalWorth' => $avgCellarTotalWorth,
            'totalCellarWorth' => $totalCellarWorth,
            'wineOfTheMoment' => $wineOfTheMoment,
        ]);
    }

    private function getNumberOfUsers()
    {
    
        /* Nombre total d'utilisateurs */
        return User::count();
    }

    private function getAvgCellarTotalWorth()/* Calcul la valeur moyenne d'un cellier  */
    {
        
        $cellarCount = Cellar::count();  /* nombre total de cellier */
        $totalWorth = 0;
    
        $cellars = Cellar::all(); /* recupere tout les cellier */
        foreach ($cellars as $cellar) { /* boucle au travers d'eux  */
            $cellarHasBottles = CellarHasBottle::where('cellar_id', $cellar->id)->get(); /*Récupère les bouteilles associées au cellier*/
            foreach ($cellarHasBottles as $cellarHasBottle) { /* boucle a travers eux  */
                /* trouve la bouteilles  */
                $bottle = Bottle::find($cellarHasBottle->bottle_id); 
                /* recupere les info rechercher  */
                $totalWorth += $bottle->price_saq;
                $quantity = $cellarHasBottle->quantity;
                $totalWorth += $bottle->price_saq * $quantity;
            }
        }
    
        $avgTotalWorth = $cellarCount > 0 ? $totalWorth / $cellarCount : 0; /* Valeur total des bouteilles divisé par le nombre de cellier  */
        $avgTotalWorth = number_format($avgTotalWorth, 2); /* formatage tu retour  */
    
        return $avgTotalWorth;
    }
    

    private function getTotalCellarWorth()
    {
        /* Valeur total de tout les cellier */
        $cellarCount = Cellar::count();
        $totalWorth = 0;
    /* idem a la fonction du haut par contre ont ne divise pas le total */
        $cellars = Cellar::all();
        foreach ($cellars as $cellar) {
            $cellarHasBottles = CellarHasBottle::where('cellar_id', $cellar->id)->get();
            foreach ($cellarHasBottles as $cellarHasBottle) {
                $bottle = Bottle::find($cellarHasBottle->bottle_id);
                $quantity = $cellarHasBottle->quantity;
                $totalWorth += $bottle->price_saq * $quantity;
            }
        }
    
        return $totalWorth;
    }
    

    private function getWineOfTheMoment()
    {
        /* le vin le plus populaire ( quantités la plus élévé a travers les celliers ) */
        $bottleCounts = [];

    $cellarHasBottles = CellarHasBottle::all(); /* recupere tout les entrés soit tout les bouteilles  */
    foreach ($cellarHasBottles as $cellarHasBottle) { /* boucle a travers le tableau complet */
        $bottleId = $cellarHasBottle->bottle_id; /* recupere l'id de la bouteille  */
        if (array_key_exists($bottleId, $bottleCounts)) {  /* si la bouteille est deja dans le tableau  */
            $bottleCounts[$bottleId]++; /* ajoute 1 a la quantité  */
        } else {
            $bottleCounts[$bottleId] = 1; /* sinon ajoute la bouteille avec une quantité de 1  */
        }
    }

    $mostPopularBottleId = max($bottleCounts); /* recupere la bouteille avec la quantité la plus élevé  */
    $mostPopularBottle = Bottle::find($mostPopularBottleId); /* recupere la bouteille  */

    return $mostPopularBottle['name']; /* retourne le nom de la bouteille  */
    }
}

