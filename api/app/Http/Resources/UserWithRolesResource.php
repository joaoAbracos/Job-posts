<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserWithRolesResource extends JsonResource
{

    
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $profile = null;
        $roleNames = $this->getRoleNames();
        $firstRoleName = $roleNames[0];
        if ($firstRoleName === 'person' && $this->profilePerson !== null) {
            $profile = true;
        } elseif ($firstRoleName === 'company' && $this->profileCompany !== null) {
            $profile = true;
        }
        
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'roles' => $roleNames,
            'profile' => $profile,
            'email_verification' => $this->email_verified_at
        ];
    }
}

