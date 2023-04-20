<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BottleController;
use App\Http\Controllers\Api\SaqController;

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

/* <YG */
Route::apiResource('/admin', AdminController::class);
Route::get('/saq/getProduits/{nombre}/{page}', [SaqController::class, 'getProduits'])->where(['nombre' => '[0-9]+', 'page' => '[0-9]+']);
Route::post('/saq/fetch', [SaqController::class, 'fetchProduits'])->name('saq.fetch');
/* YG> */

