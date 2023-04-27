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
    public function signup(SignupRequest $request){
      $data = $request->validated();
      /** @var \App\Models\User $user */
      $user = User::create([
        'first_name' => $data['first_name'],
        'last_name' => $data['last_name'],
        'email' => $data['email'],
        'password' => bcrypt($data['password']),
      ]);
      $cellar = Cellar::create([
        'name' => "Le cellier de " . $data['first_name'],
        'user_id' => $user->id
      ]);

      $token = $user->createToken('main')->plainTextToken;

      return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request){
      $credentials = $request->validated();
      if (!Auth::attempt($credentials)) {
        return response()->json([
          'errors' => [
            'password' => [
              "Le mot de passe est invalide"
            ]
          ]
        ], 422);
      }
      /** @var User $user */
      $user = Auth::user();
      $token = $user->createToken('main')->plainTextToken;
      return response(compact('user', 'token'));
    }

    public function logout(Request $request){
      /** @var User $user */
      $user = $request->user();
      $user->currentAccessToken()->delete();
      return response('', 204);
    }
}
