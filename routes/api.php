<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BottleController;
use App\Http\Controllers\Api\CellarHasBottleController;
use App\Http\Controllers\Api\SaqCatalogueController;
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

// Protection des routes avec access token
Route::middleware('auth:sanctum')->group(function () {

    // Opérations users
    Route::apiResource('/users', UserController::class);

    // Pour aller chercher l'user connecté
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // gestion de cellier
    Route::apiResource('/cellarHasBottles', CellarHasBottleController::class);

});

/* <YG */
Route::apiResource('/admin', AdminController::class);
Route::post('/saq/fetch', [SaqCatalogueController::class, 'fetchProduits'])->name('saq.fetch');
Route::get('/saq/fetch', [SaqCatalogueController::class, 'fetchProduits'])->name('saq.fetch');
/* YG> */



// Routes non protégées

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

// Gestion des bouteilles
Route::apiResource('/bottles', BottleController::class);

// Va chercher les options pour les filtres
Route::get('/countries', [CountryController::class, 'index']);
Route::get('/types', [TypeController::class, 'index']);