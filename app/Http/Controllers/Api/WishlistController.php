<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\WishlistResource;
use App\Models\Wishlist;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


class WishlistController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        // Get the wishlisted bottles for the currently logged user
        $user = auth()->user();
        
        $query = Wishlist::where('user_id', $user->id)
        ->orderBy('created_at', 'desc');

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

        //retourne les bouteilles favorites/désirées de l'user connecté en format json
        return WishlistResource::collection($query->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            // Validate the request
            $validatedData = $request->validate([
                'id' => 'required|integer|exists:bottles,id'
            ]);
    
            // Check if the bottle is already in the user's wishlist
            $existingWishlistItem = Wishlist::where('user_id', Auth::id())
                ->where('bottle_id', $validatedData['id'])
                ->first();
    
            if ($existingWishlistItem) {
                // The bottle is already in the wishlist, you can return an appropriate response or throw an exception
                throw ValidationException::withMessages([
                    'bottle_id' => ['The bottle is already in the wishlist.']
                ]);
            }
    
            // Create a new wishlist item
            $wishlist = new Wishlist([
                'user_id' => Auth::id(),
                'bottle_id' => $validatedData['id'],
            ]);
    
            // Save the wishlist item
            $wishlist->save();
    
            // Return a response indicating that the bottle has been added to the wishlist
            return response()->json(['message' => 'Bottle added to the wishlist successfully.'], 201);
    
        } catch (ValidationException $e) {
            // Return validation errors if any
            return response()->json(['errors' => $e->errors()], 422);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $wishlistItem = Wishlist::find($id);
    
        if ($wishlistItem && $wishlistItem->user_id == Auth::id()) {
            $wishlistItem->delete();
            return response()->json(['message' => 'Bottle removed from the wishlist successfully.'], 200);
        }
    
        return response()->json(['message' => 'Bottle not found or not owned by the user.'], 404);
    }
}