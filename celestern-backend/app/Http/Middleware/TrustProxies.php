<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Foundation\Http\Middleware\TrustProxies as Middleware;

class TrustProxies extends Middleware
{
    /**
     * The trusted proxies for this application.
     *
     * @var array|string
     */
    protected $proxies = '*';  // Bisa disesuaikan dengan IP proxy atau biarkan '*' untuk semua.

    /**
     * The headers that should be used to detect proxies.
     *
     * @var int
     */
    protected $headers = 255;  // Secara manual tentukan nilai untuk all forwarded headers
}
