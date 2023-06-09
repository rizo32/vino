<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BottleController;
use App\Http\Controllers\Api\WishlistController;
use App\Http\Controllers\Api\CellarHasBottleController;
use App\Http\Controllers\Api\SaqCatalogueController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\TypeController;
use App\Http\Controllers\Api\CountryController;
use App\Http\Controllers\Api\QuickStatsController;
use App\Http\Controllers\Api\PieGraphController;
use App\Http\Controllers\Api\LineGraphController;
use App\Models\User;

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

    // gestion wishlist
    Route::apiResource('/wishlist', WishlistController::class);

    // Gestion des bouteilles
    Route::apiResource('/bottles', BottleController::class);

    //get bottle from barcode
    Route::get('/bottleScan', [BottleController::class, 'scan']);
    Route::post('/storeScanBottle', [CellarHasBottleController::class, 'storeScanBottle']);

    // Va chercher les options pour les filtres
    // Route::apiResource('/countries', CountryController::class);
    // Route::apiResource('/types', TypeController::class);
    Route::post('/countries/{source}', [CountryController::class, 'index']);
    Route::post('/types/{source}', [TypeController::class, 'index']);

});

/* <YG */
Route::post('/saq/fetch', [SaqCatalogueController::class, 'fetchProduits'])->name('saq.fetch');
Route::get('/saq/fetch', [SaqCatalogueController::class, 'fetchProduits'])->name('saq.fetch');
Route::get('/admin', [UserController::class, 'userList'])->name('admin');
Route::put('/admin/{id}', [UserController::class, 'userUpdate'])->name('user.update');
Route::get('/stats', [QuickStatsController::class, 'getStats']);
Route::get('/piestats', [PieGraphController::class, 'getWineStats']);
Route::get('/topWineStats', [PieGraphController::class, 'topWineStats']);
Route::get('/appStats', [LineGraphController::class, 'appStats']);
Route::delete('/deleteUser/{id}', [UserController::class, 'deleteUser']);

/* YG> */



// Routes non protégées

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);