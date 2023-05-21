<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBottleRequest;
use App\Models\Bottle;
use App\Models\Cellar;
use Illuminate\Http\Request;
use App\Http\Resources\BottleResource;
use Illuminate\Support\Facades\Auth;

// Elodie

class BottleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $user = auth()->user();

        // fetch bouteilles et information du cellier de l'user connecté (pour afficher nombre de bouteilles déjà dans cellier)
        $query = Bottle::with('cellarHasBottle')->orderBy('name', 'asc');

        // Recherche dans le NOM
        if ($request->has('search')) {
            $search = $request->search;
            $query->where('name', 'LIKE', "%{$search}%");
        }

        // Filtre PAYS
        if ($request->has('country')) {
            $countries = explode(',', $request->country);
            $query->whereIn('country_id', $countries);
        }

        // Filtre TYPE
        if ($request->has('type')) {
            $types = explode(',', $request->type);
            $query->whereIn('type_id', $types);
        }

        return BottleResource::collection($query->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //ajoute bouteille, non-utilisé pour l'instant
        $data = $request->validated();
        $bottle = Bottle::create($data);

        return response(new BottleResource($bottle), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Bottle  $bottle
     * @return \Illuminate\Http\Response
     */
    public function show(Bottle $bottle)
    {
        //json des infos de la bouteille
        return new BottleResource($bottle);
    }

    public function scan(Request $request)
    {
        $bottle = Bottle::query()->where('code_cup', 'LIKE', '%'.$request->code.'%')->first();
        if($bottle){
            return new BottleResource($bottle);
        }else {
            return false;
        }
    }
}