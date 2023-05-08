<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

// transforme les données en format json

class WishlistResource extends JsonResource
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
        $this->load(['bottle', 'user']);

        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            //charge toutes les tables reliées avec la table bottle et avoir accès au données
            'bottle' => new BottleResource($this->whenLoaded('bottle')),
            'user' => new UserResource($this->whenLoaded('user')),
        ];
    }
}
