<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Laravel CORS Configuration
    |--------------------------------------------------------------------------
    |
    | This file contains settings for cross-origin requests. You may adjust
    | these settings as needed. By default, we allow all origins for the
    | "api" routes, but you can customize it to be more restrictive.
    |
    */

    'paths' => ['api/*'], // Menentukan jalur API yang dapat menerima CORS

    'allowed_methods' => ['*'], // Semua metode HTTP diizinkan

    'allowed_origins' => ['http://localhost:3000'], // Frontend React kamu yang berjalan di localhost:3000

    'allowed_origins_patterns' => [], // Aturan pencocokan asal jika diperlukan

    'allowed_headers' => ['*'], // Izinkan semua header

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false, // Cek apakah cookies diperlukan untuk CORS
];
