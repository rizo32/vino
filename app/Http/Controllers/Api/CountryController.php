<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CountryController extends Controller
{
    public function index(Request $request)
    {
        \Log::info(Auth::user());
        // \Log::info($request);
        // \Log::info(['query' => $request->toSql(), 'bindings' => $request->getBindings()]);

        // Get the logged-in user's cellar
        $cellar = Auth::user()->cellar;

        // Get the filters from the request payload
        $filters = $request->input('filters', []);

        // Start building the query
        $query = Country::query();

        $query->whereHas('bottles', function ($q) use ($filters, $cellar) {
            if (isset($filters['type']) && !empty($filters['type'])) {
                $q->whereIn('type_id', $filters['type']);
            }
    
            $q->whereHas('cellarHasBottle', function ($q) use ($cellar) {
                $q->where('cellar_id', $cellar->id);
            });
        });

        // Finally, get the countries and return them
        $countries = $query->orderBy('name', 'asc')->get();
        return response()->json($countries);

        // public function index()
        // {
        //     // utilisé pour les options de filtrage
        //     $countries = Country::orderBy('name', 'asc')->get();
        //     return response()->json($countries);
        // }
    }
}