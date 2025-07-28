<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BeritaStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'judul' => 'required|string|max:255',
            'slug' => 'required|string|unique:beritas,slug',
            'kategori' => 'required|string',
            'isi' => 'required|string',
            'status' => 'required|in:published,scheduled',
            'jadwal_terbit' => 'nullable|date',
            'cover_image' => 'nullable|image|max:2048',
            'user_id' => 'required|string',
        ];
    }
}
