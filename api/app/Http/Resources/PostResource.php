<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'title' => $this->title,
            'remote' => $this->remote,
            'country' => $this->country,
            'region' => $this->region,
            'apply_url' => $this->apply_url,
            'comp' => $this->comp,
            'compensation' => $this->compensation,
            'skills' => $this->skills,
            'description' => $this->description,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
