<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class   ContactRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'birthday' => ['required', 'date'],
            'notes' => ['nullable', 'string'],
            'website' => ['nullable', 'url'],
            'company' => ['nullable', 'string', 'max:255'],
            
            'emails' => ['required', 'array', 'min:1'],
            'emails.*.email' => ['required', 'email'],
            'emails.*.type' => ['nullable', 'string'],
            
            'phones' => ['nullable', 'array'],
            'phones.*.number' => ['required', 'string'],
            'phones.*.type' => ['nullable', 'string'],
            
            'addresses' => ['nullable', 'array'],
            'addresses.*.street' => ['nullable', 'string'],
            'addresses.*.city' => ['nullable', 'string'],
            'addresses.*.state' => ['nullable', 'string'],
            'addresses.*.country' => ['nullable', 'string'],
            'addresses.*.postal_code' => ['nullable', 'string'],
        ];
    }
}
