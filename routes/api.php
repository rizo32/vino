<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BottleController;
use App\Http\Controllers\Api\CellarHasBottleController;
use App\Http\Controllers\Api\SaqController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\TypeController;
use App\Http\Controllers\Api\CountryController;

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
// elo
Route::get('/csrf-token', function () {
    return response()->json([
        'token' => csrf_token()
    ]);
});
// 

Route::middleware('auth:sanctum')->group(function () {    
    // Opérations users
    Route::apiResource('/users', UserController::class);
    // Pour aller chercher l'user connecté
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
});
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);


Route::apiResource('/bottles', BottleController::class);
Route::apiResource('/cellarHasBottles', CellarHasBottleController::class);

// Filtres
Route::get('/countries', [CountryController::class, 'index']);
Route::get('/types', [TypeController::class, 'index']);

/* <YG */
Route::apiResource('/admin', AdminController::class);
Route::post('/saq/fetch', [SaqController::class, 'fetchProduits'])->name('saq.fetch');
Route::get('/saq/fetch', [SaqController::class, 'fetchProduits'])->name('saq.fetch');


/* YG> */