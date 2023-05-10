<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserType;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        // id de l'usager connecté pour ne pas pouvoir changer les informations des autres
        $id = Auth::id();
        $user = User::findOrFail($id); // Trouve le user par id, sinon envois 404
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, $id)
    {
        $data = $request->validated();

        /** @var \App\Models\User $user */
        $user = User::findOrFail($id); // Trouve le user par id, sinon envois 404

        $user->update([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            // modification mot de passe optionelle
            'password' => isset($data['password']) ? bcrypt($data['password']) : $user->password,
        ]);

        return response(compact('user'));
    }


    public function userList(){
        $userTypes = UserType::all();
        $users = User::all();
        return response()->json(compact('users', 'userTypes'));
    }

    public function userUpdate(Request $request, $id){
        $data = $request->all();
        $user = User::findOrFail($id);
        $user->update([
            'user_type_id' => $data['user_type_id'],
        ]);
        return response(compact('user'));
    }
}