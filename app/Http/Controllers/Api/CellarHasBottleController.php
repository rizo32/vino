<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCellarHasBottleRequest;
use App\Http\Requests\UpdateCellarHasBottleRequest;
use App\Http\Resources\BottleResource;
use App\Http\Resources\CellarHasBottleResource;
use App\Models\Bottle;
use App\Models\CellarHasBottle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// Elodie et Gabriel

class CellarHasBottleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        // ordonner bouteilles pour ordre alphabétique
        $query = CellarHasBottle::with([
            'bottle' => function ($q) {
                $q->orderBy('name', 'asc');
            },
            'cellar'
        ])
            ->whereHas('cellar', function ($q) {
                $q->where('user_id', Auth::id());
            });

        // Recherche dans le NOM
        if ($request->has('search')) {
            $search = $request->search;
            $query->whereHas('bottle', function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%");
            });
        }

        // Filtre PAYS
        if ($request->has('country')) {
            $countries = explode(',', $request->country);
            $query->whereHas('bottle', function ($q) use ($countries) {
                $q->whereIn('country_id', $countries);
            });
        }

        // Filtre TYPE
        if ($request->has('type')) {
            $types = explode(',', $request->type);
            $query->whereHas('bottle', function ($q) use ($types) {
                $q->whereIn('type_id', $types);
            });
        }

        //retourne les bouteilles du cellier de l'user connecté en format json
        return CellarHasBottleResource::collection($query->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCellarHasBottleRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Utilisation connecté
        $user = auth()->user();

        $request->validate([
            'id' => 'required|integer',
        ]);

        //ajouter une bouteille au cellier de l'user connecté
        $bottleInCellar = CellarHasBottle::query()->where('bottle_id', '=', $request->input('id'))->where('cellar_id', '=', $user->cellar->id)->first();

        // incrémentation du nombre de bouteilles dans cellier (pour la pastille colorée)
        if ($bottleInCellar) {
            $data = ['quantity' => $bottleInCellar->quantity + $request->input('quantity')];
            $bottleInCellar->update($data);
            return BottleResource::collection(
                Bottle::with('cellarHasBottle')->orderBy('id', 'desc')->paginate(10)
            );
        }

        $cellarHasBottle = new CellarHasBottle([
            //ajouter une bouteille au cellier de l'user connecté
            'cellar_id' => $user->cellar->id,
            'bottle_id' => $request->input('id'),
            'quantity' => $request->input('quantity'),
        ]);


        $cellarHasBottle->save();

        return 'test';
    }

    // $query = CellarHasBottle::with(['bottle' => function ($q) {
    //     $q->orderBy('name', 'asc');
    // }, 'cellar'])
    // ->whereHas('cellar', function ($q) {
    //     $q->where('user_id', Auth::id());
    // });
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CellarHasBottle  $cellarHasBottle
     * @return \Illuminate\Http\Response
     */
    public function show(CellarHasBottle $cellarHasBottle)
    {
        //comment on utilise ca en parallele avec juste show une bouteille, vu que ici on a la donnée quantity ?
        return new CellarHasBottleResource($cellarHasBottle);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCellarHasBottleRequest  $request
     * @param  \App\Models\CellarHasBottle  $cellarHasBottle
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CellarHasBottle $cellarHasBottle)
    {
        $cellarHasBottle->update(['quantity' => $request->input('quantity')]);

        return new CellarHasBottleResource($cellarHasBottle);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CellarHasBottle  $cellarHasBottle
     * @return \Illuminate\Http\Response
     */
    public function destroy(CellarHasBottle $cellarHasBottle)
    {
        //enlever la bouteille du cellier
        $cellarHasBottle->delete();

        return new CellarHasBottleResource($cellarHasBottle);
    }

    public function storeScanBottle(Request $request)
    {
        // Utilisation connecté
        $user = auth()->user();

        $request->validate([
            'id' => 'required|integer',
        ]);

        //ajouter une bouteille au cellier de l'user connecté
        $bottleInCellar = CellarHasBottle::query()->where('bottle_id', '=', $request->input('id'))->where('cellar_id', '=', $user->cellar->id)->first();

        // incrémentation du nombre de bouteilles dans cellier (pour la pastille colorée)
        if ($bottleInCellar) {
            $data = ['quantity' => $bottleInCellar->quantity + 1];
            $bottleInCellar->update($data);
            return BottleResource::collection($bottleInCellar);
        }

        $cellarHasBottle = new CellarHasBottle([
            //ajouter une bouteille au cellier de l'user connecté
            'cellar_id' => $user->cellar->id,
            'bottle_id' => $request->input('id'),
            'quantity' => 1,
        ]);

        $cellarHasBottle->save();

        return BottleResource::collection($cellarHasBottle);
    }
}