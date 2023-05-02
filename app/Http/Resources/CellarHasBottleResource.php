<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

// Elodie
// transforme les données en format json

class CellarHasBottleResource extends JsonResource
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
        $this->load(['bottle', 'cellar']);

        return [
            'id' => $this->id,
            'cellar_id' => $this->cellar_id,
            'quantity' => $this->quantity,
            //charge toutes les tables reliées avec la table bottle et avoir accès au données
            'bottle' => new BottleResource($this->whenLoaded('bottle')),
            'cellar' => new CellarResource($this->whenLoaded('cellar')),
        ];

        
    }
}
