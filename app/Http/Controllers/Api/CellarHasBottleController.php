<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCellarHasBottleRequest;
use App\Http\Requests\UpdateCellarHasBottleRequest;
use App\Http\Resources\CellarHasBottleResource;
use App\Models\CellarHasBottle;
use Illuminate\Http\Request;

// Elodie et Gabriel

class CellarHasBottleController extends Controller
{

  protected $allowedMethods = ['index', 'show', 'store', 'update', 'destroy'];
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
   */
  public function index()
  {
    //retourne les bouteilles d'un cellier donné (ici id 1) en format json
    return CellarHasBottleResource::collection(
      CellarHasBottle::query()->where('cellar_id', '=', '1')->orderBy('id', 'desc')->paginate(10)
    );
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \App\Http\Requests\StoreCellarHasBottleRequest  $request
   * @return \Illuminate\Http\Response
   */
  public function store(StoreCellarHasBottleRequest $request)
  {
    //ajouter une bouteille au cellier d'un id donné

    $request->validate([ // à mettre dans StoreCellarHasBottleRequest
      // 'cellar_id' => 'required|integer',
      'id' => 'required|integer',
    ]);

    $cellarHasBottle = new CellarHasBottle([
      // 'cellar_id' => $request->input('cellar_id'),
      'cellar_id' => 1,
      'bottle_id' => $request->input('id'),
      'quantity' => 1,
    ]);

    $cellarHasBottle->save();

    return response()->json([
      'message' => 'Bottle added to cellar successfully',
      'cellar_has_bottle' => $cellarHasBottle
    ], 201);
  }

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
  public function update(UpdateCellarHasBottleRequest $request, CellarHasBottle $cellarHasBottle)
  {
    //va devenir changer la quantite de la bouteille dans le cellier
    $data = $request->validated();
    $cellarHasBottle->update($data);

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

    return response("", 204);
  }
}