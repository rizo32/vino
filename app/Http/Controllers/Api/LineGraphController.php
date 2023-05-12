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

        for ($i = 0; $i < 5; $i++) {
            $month = $now->format('F');
            $months[] = $month;
            $now->subMonth();
        }

        $months = array_reverse($months);

        $stats = [];
        foreach ($months as $month) {
            $startOfMonth = Carbon::parse("first day of $month")->startOfDay();
            $endOfMonth = Carbon::parse("last day of $month")->endOfDay();

            $totalUsers = User::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();
            $totalCellars = Cellar::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();
            $totalBottles = CellarHasBottle::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();

            $avgBottlesPerUser = $totalUsers ? $totalCellars / $totalUsers : 0;
            $avgAddedBottlesPerUser = $totalUsers ? $totalBottles / $totalUsers : 0;

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
