<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bottle;
use App\Models\User;
use App\Models\CellarHasBottle;
use App\Models\Cellar;
use App\Models\Country;
use Carbon\Carbon;
use Illuminate\Http\Request;

class LineGraphController extends Controller
{
    public function appStats()
    {
        $now = Carbon::now(); 
        $months = [];

        for ($i = 0; $i < 5; $i++) { /* Boucle pour 6 mois */
            $month = $now->format('F');
            $months[] = $month;
            $now->subMonth();
        }

        $months = array_reverse($months);

        $stats = [];
        foreach ($months as $month) { /* pour chacun des mois */
            /* declaration du premier et dernier jour du mois */
            $startOfMonth = Carbon::parse("first day of $month")->startOfDay();
            $endOfMonth = Carbon::parse("last day of $month")->endOfDay();
            /* Nombre total d'utilisateurs créés jusqu'à la fin du mois */
            $totalUsers = User::where('created_at', '<=', $endOfMonth)->count();
            /* Nombre total de celliers créés jusqu'à la fin du mois */
            $totalCellars = Cellar::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();
            /*  Nombre total de bouteilles ajoutées aux celliers dans le mois */
            $totalBottles = CellarHasBottle::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();

            /* moyennes des bouteilles par cellier */
            $avgBottlesPerUser = $totalCellars ? $totalBottles / $totalCellars : 0;
            /* Moyenne de bouteilles ajoutées par utilisateur */
            $avgAddedBottlesPerUser = $totalUsers ? $totalBottles / $totalUsers : 0;

            /* ajout des statistique par mois  */
            $stats[] = [
                'month' => $month,
                'totalUsers' => $totalUsers,
                'avgBottlesPerUser' => $avgBottlesPerUser,
                'avgAddedBottlesPerUser' => $avgAddedBottlesPerUser
            ];
        }

        return response()->json($stats);
    }
}
