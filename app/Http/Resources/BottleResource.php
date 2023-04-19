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
    // ceci va marcher quand les modèles étrangers seront loadés
    return [
      'id' => $this->id,
      'name' => $this->name,
      'type' => $this->type->types,
      'format_name' => $this->format->volume,
      'country_name' => $this->country->name,
    ];
  }
}