<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

// Elodie
// transforme les données en format json

class BottleResource extends JsonResource
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
        $this->load(['format', 'country', 'type']);

        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'image_path' => $this->image_path,
            'code_saq' => $this->code_saq,
            'description' => $this->description,
            'price_saq' => $this->price_saq,
            'url_saq' => $this->url_saq,
            'image_url' => $this->image_url,
            'type_name' => $this->type->name,
            'type_id' => $this->type_id,
            'format_name' => $this->format->name,
            'country_name' => $this->country->name,
            'country_id' => $this->country_id,
            'milesime' => $this->milesime,
            'rating_saq' => $this->rating_saq,
            'num_comments' => $this->num_comments
        ];

        if ($this->relationLoaded('cellarHasBottle')) {
            $data['quantity'] = $this->cellarHasBottle->first()->quantity ?? 0;
        }
    
        return $data;

    }
}
