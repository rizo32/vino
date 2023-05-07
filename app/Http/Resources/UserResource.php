<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        //charger les tables reliées et avoir les données au lieu d'une clé étrangère
        $this->load('cellar');

        $data = [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'password' => $this->password,
            'remember_token' => $this->remember_token,
            'profile_picture_path' => $this->profile_picture_path,

            // Pour l'instant cellar fonctionne comme s'il ne peut y avoir qu'un cellier par usager
            'cellar_id' => $this->cellar->id
        ];

        return $data;
    }
}