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
        $this->load(['format', 'cellarHasBottle', 'country', 'type', 'cepage', 'region','tauxSucre','tauxAlcool','producteur','aroma','temperatureService', 'wishlist']);

        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'cepage_name'=> $this->cepage ? $this->cepage->name : null,
            'taux_sucre' => $this->tauxSucre ? $this->tauxSucre->name : null,
            'taux_alcool' => $this->tauxAlcool ? $this->tauxAlcool->name : null,
            'designation_reglemente' => $this->designationReglemente ? $this->designationReglemente->name : null,
            'image_url' => $this->image_url,
            'type_name' => $this->type ? $this->type->name : null,
            'arome' => $this->aroma ? $this->aroma->name : null,
            'producteur_name' => $this->producteur ? $this->producteur->name : null,
            'temperature_service' => $this->temperatureService ? $this->temperatureService->name : null,
            'format_name' => $this->format ? $this->format->name : null,
            'country_id' => $this->country_id,
            'country_name' => $this->country ? $this->country->name : null,
            'region_name' => $this->region ? $this->region->name : null,
            'rating_saq' => $this->rating_saq,
            'num_comments' => $this->num_comments,
            'isInWishlist' => $this->wishlist->count() > 0,
        ];

        /* Si besoin d'informations en plus
            'code_saq' => $this->code_saq,
            'type_id' => $this->type_id,
            'image_path' => $this->image_path,
            'description' => $this->description,
            'price_saq' => $this->price_saq,
            'url_saq' => $this->url_saq,
        */
        $user = auth()->user();

        if ($this->relationLoaded('cellarHasBottle')) {
            $data['quantity'] = $this->cellarHasBottle->where('cellar_id', '=', $user->cellar->id)->first()->quantity ?? 0;
        }
    
        return $data;

    }
}
