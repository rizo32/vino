<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

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
        $this->load('bottle');

        return [
            'cellar_id' => $this->cellar_id,
            'quantity' => $this->quantity,
            'bottle' => new BottleResource($this->whenLoaded('bottle')),
        ];
    }
}
