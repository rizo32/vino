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
        $this->load(['format', 'country', 'type', 'cepage', 'region','tauxSucre','tauxAlcool','producteur','aroma','temperatureService']);

        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'cepage'=> $this->cepage,
            'taux_sucre' => $this->tauxSucre->name,
            'taux_alcool' => $this->tauxAlcool->name,
            'designation_reglemente' => $this->designationReglemente->name,
            'image_url' => $this->image_url,
            'type_name' => $this->type->name,
            'arome' => $this->aroma,
            'producteur_name' => $this->producteur->name,
            'temperature_service' => $this->temperatureService,
            'format_name' => $this->format->name,
            'country_name' => $this->country->name,
            'region_name' => $this->region->name,
            'rating_saq' => $this->rating_saq,
            'num_comments' => $this->num_comments,
        ];

        /* Si besoin d'informations en plus
            'code_saq' => $this->code_saq,
            'type_id' => $this->type_id,
            'country_id' => $this->country_id,
            'image_path' => $this->image_path,
            'description' => $this->description,
            'price_saq' => $this->price_saq,
            'url_saq' => $this->url_saq,
        */

        if ($this->relationLoaded('cellarHasBottle')) {
            $data['quantity'] = $this->cellarHasBottle->first()->quantity ?? 0;
        }
    
        return $data;

    }
}
