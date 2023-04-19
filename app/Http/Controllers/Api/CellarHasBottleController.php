<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCellarHasBottleRequest;
use App\Http\Requests\UpdateCellarHasBottleRequest;
use App\Models\CellarHasBottle;

class CellarHasBottleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCellarHasBottleRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCellarHasBottleRequest $request, $id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CellarHasBottle  $cellarHasBottle
     * @return \Illuminate\Http\Response
     */
    public function destroy(CellarHasBottle $cellarHasBottle)
    {
        //
    }
}
