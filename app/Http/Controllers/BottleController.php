<?php

namespace App\Http\Controllers;

use App\Http\Resources\BottleResource;
use App\Models\Bottle;
use Illuminate\Http\Request;

class BottleController extends Controller
{
  public function index()
  {
    return BottleResource::collection(
      Bottle::query()->orderBy('id', 'desc')->paginate(10)
    );
  }
}