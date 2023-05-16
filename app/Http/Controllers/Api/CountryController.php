<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CountryController extends Controller
{
    public function index(Request $request, $source)
    {   
        // Ajout des filtres à la requête http
        $filters = $request->input('filters', []);

        // Mise en place de la requête fetch
        $query = Country::query();

        // Fetch différent selon la page appelant le filtre
        if ($source == 'cellar') {

            // options des pays si des filtres type sont en place
            $query->whereHas('bottles', function ($q) use ($filters) {
                if (isset($filters['type']) && !empty($filters['type'])) {
                    $q->whereIn('type_id', $filters['type']);
                }
                
                // Obtention des informations du cellier de l'usager
                $cellar = Auth::user()->cellar;

                // filtre selon le cellier de l'usager
                $q->whereHas('cellarHasBottle', function ($q) use ($cellar) {
                    $q->where('cellar_id', $cellar->id);
                });
            });

        } else if ($source == 'wishlist') {
            
            // options des pays si des filtres type sont en place
            $query->whereHas('bottles', function ($q) use ($filters) {
                if (isset($filters['type']) && !empty($filters['type'])) {
                    $q->whereIn('type_id', $filters['type']);
                }
    
                // Obtention des informations de l'usager
                $userId = Auth::id();

                // filtre selon les favoris de l'usager
                $q->whereHas('wishlist', function ($q) use ($userId) {
                    $q->where('user_id', $userId);
                });
            });
        }

        // Retour de la liste des pays en ordre alphabétique
        $countries = $query->orderBy('name', 'asc')->get();
        return response()->json($countries);
    }
}