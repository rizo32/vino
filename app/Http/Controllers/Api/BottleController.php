<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBottleRequest;
use App\Models\Bottle;
use Illuminate\Http\Request;
use App\Http\Resources\BottleResource;

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
        $query = Bottle::with('cellarHasBottle')->orderBy('name', 'asc');

        // Apply search filter
        if ($request->has('search')) {
            $search = $request->search;
            $query->where('name', 'LIKE', "%{$search}%");
        }

        // Apply country filter
        if ($request->has('country')) {
            $countries = explode(',', $request->country);
            $query->whereIn('country_name', $countries);
        }

        // Apply other filters similarly...

        return BottleResource::collection($query->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBottleRequest $request)
    {
        //ajoute bouteille, non-utilisé pour l'instant
        $data = $request->validated(); //fichier request a faire
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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Bottle  $bottle
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Bottle $bottle)
    {
        //non utilise
        $data = $request->validated(); // fichier request a faire
        $bottle->update($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Bottle  $bottle
     * @return \Illuminate\Http\Response
     */
    public function destroy(Bottle $bottle)
    {
        //non utilise
        $bottle->delete();

        return response("", 204);
    }
}