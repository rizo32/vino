<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use App\Models\Cellar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        $user = User::create([ // En cas d'avertissement utiliser: User::query()->create()
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            // encryption du mot de passe
            'password' => bcrypt($data['password']),
            'user_type_id' => '3', /* default user value YG */
        ]);

        // création d'un cellier à la création de l'user
        $cellar = Cellar::create([
            'name' => "Le cellier de " . $data['first_name'],
            'user_id' => $user->id
        ]);

        // création du token d'authentification
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        // gestion error authentification
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'errors' => [
                    'password' => [
                        "Le mot de passe ou adresse courriel est invalide"
                    ]
                ]
            ], 422);
        }

        $user = Auth::user();

        // création du token d'authentification
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        $user = $request->user();

        // suppression du token pour l'user connecté
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}