<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCellarHasBottleRequest;
use App\Http\Requests\UpdateCellarHasBottleRequest;
use App\Http\Resources\CellarHasBottleResource;
use App\Models\CellarHasBottle;
use Illuminate\Http\Request;

class CellarHasBottleController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    return CellarHasBottleResource::collection(
      CellarHasBottleResource::query()->orderBy('id', 'desc')->paginate(10)
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
    dd($request);
    // dd($id);

    $request->validate([ // à mettre dans StoreCellarHasBottleRequest
      // 'cellar_id' => 'required|integer',
      'bottle_id' => 'required|integer',
    ]);

    $cellarHasBottle = new CellarHasBottle([
      // 'cellar_id' => $request->input('cellar_id'),
      'cellar_id' => 1,
      'bottle_id' => $request->input('bottle_id'),
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
    $cellarHasBottle->delete();

    return response("", 204);
  }
}