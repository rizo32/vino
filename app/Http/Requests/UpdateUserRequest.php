<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        // Aller chercher l'id de l'utilisateur actif
        $userId = $this->route('user');

        return [
            'first_name' => 'required|string|max:55',
            'last_name' => 'required|string|max:55',
            'email' => [
                'required',
                'email',
                'min:8',
                // email unique auprès des AUTRES users
                Rule::unique('users')->ignore($userId),
            ],
            'password' => [
                'confirmed',
                'nullable',
                Password::min(8)
                    ->letters()
                    ->numbers()
                    ->symbols()
            ]
        ];
    }

    // message explicatif de l'ensemble des règles si le mot de passe est trop court
    public function messages()
    {
        return [
            'password.min' => 'au moins 8 caractères incluant au minimum un chiffre et un symbole',
        ];
    }
}