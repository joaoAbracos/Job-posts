<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
     /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation()
    {
        $this->merge([
            'remote' => $this->input('remote') === 'true' ? true : false,
            'comp' => $this->input('comp') === 'true' ? true : false
        ]);
    }

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
        $rules = [
            'title' => 'required',
            'remote' => 'required',
            'country' => 'nullable',
            'region' => 'nullable',
            'apply_url' => 'required|url',
            'comp' => 'required',
            'compensation' => 'nullable',
            'skills' => 'required',
            'description' => 'required',
        ];

        return $rules;
    }
}
