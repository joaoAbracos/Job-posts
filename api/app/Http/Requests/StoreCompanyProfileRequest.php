<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCompanyProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'company_name' => 'required|unique:company_profile',
            'country' => 'required',
            'region' => 'required',
            'website' => 'required',
            'email' => 'required|email',
            'social' => 'required',
            'explanation' => 'required',
            'image_path' => 'nullable'
        ];
    }
}
