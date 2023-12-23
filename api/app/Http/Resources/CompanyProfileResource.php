<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

class CompanyProfileResource extends JsonResource
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
            'company_name'=> $this->company_name,
            'country'=> $this->country,
            'region'=> $this->region,
            'website'=> $this->website,
            'email'=> $this->email,
            'social'=> $this->social,
            'explanation'=> $this->explanation,
            'file'=>  URL::to("/storage") . "/" .$this->image_path
        ];
    }
}
