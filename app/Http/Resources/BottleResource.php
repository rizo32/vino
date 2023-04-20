<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

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
        $this->load(['country', 'type']);
        //ajouter format

        return [
            'id' => $this->id,
            'name' => $this->name,
            'image_path' => $this->image_path,
            'code_saq' => $this->code_saq,
            'description' => $this->description,
            'price_saq' => $this->price_saq,
            'url_saq' => $this->url_saq,
            'image_url' => $this->image_url,
            'type' => $this->type->types,
            'format' => $this->format,//->volume
            'country_name' => $this->country->name,
            'milesime' => $this->milesime,
            'rating_saq' => $this->rating_saq,
        ];
    }
}
