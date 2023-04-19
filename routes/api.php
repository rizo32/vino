<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\BottleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});

Route::apiResource('/bottles', BottleController::class);
// Gab: touché pas la ligne en bas, longue histoire
// Route::get('/bottles', [BottleController::class, 'index']);


/* <YG */
Route::apiResource('/admin', AdminController::class);
/* YG> */