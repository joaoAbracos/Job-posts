<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class PersonProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=> $this->id,
            'name'=> $this->name,
            'lastname'=> $this->lastname,
            'birtday'=> $this->birtday,
            'gender'=> $this->gender,
            'country'=> $this->country,
            'region'=> $this->region,
            'ocupation'=> $this->ocupation,
            'introduction'=> $this->introduction,
            'file'=> Url::to('/storage').'/'.$this->image_path
        ];
    }
}
