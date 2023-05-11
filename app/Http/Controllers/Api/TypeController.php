<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TypeController extends Controller
{
    public function index(Request $request)
    {
        // Get the logged-in user's cellar
        $cellar = Auth::user()->cellar;

        // Get the filters from the request payload
        $filters = $request->input('filters', []);

        // Start building the query
        $query = Type::query();

        $query->whereHas('bottles', function ($q) use ($filters, $cellar) {
            if (isset($filters['country']) && !empty($filters['country'])) {
                $q->whereIn('country_id', $filters['country']);
            }
    
            $q->whereHas('cellarHasBottle', function ($q) use ($cellar) {
                $q->where('cellar_id', $cellar->id);
            });
        });

        // Finally, get the countries and return them
        $types = $query->orderBy('name', 'asc')->get();
        return response()->json($types);


        // public function index()
        // {
        //     // utilisé pour les options de filtrage
        //     $types = Type::all();
        //     return response()->json($types);
        // }
    }
}