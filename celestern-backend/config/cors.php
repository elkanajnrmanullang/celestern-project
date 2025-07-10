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

    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,


];