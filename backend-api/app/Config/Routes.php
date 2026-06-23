<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');

$routes->group('api', function($routes) {
    // Jalur Pemanasan CORS
    $routes->options('login', static function() {
        return \Config\Services::response()->setStatusCode(200);
    });
    
    // RUTE LOGIN INI YANG DICARI OLEH VUEJS
    $routes->post('login', '\App\Controllers\Api\Auth::login');
    
    // Rute CRUD Barang
    $routes->resource('barang', ['controller' => '\App\Controllers\Api\Barang', 'filter' => 'apiauth']);

    // Rute CRUD Kategori
    $routes->resource('kategori', ['controller' => '\App\Controllers\Api\Kategori', 'filter' => 'apiauth']);

    // Rute CRUD Supplier
    $routes->resource('supplier', ['controller' => '\App\Controllers\Api\Supplier', 'filter' => 'apiauth']);

    // Rute Histori Transaksi
    $routes->resource('histori', ['controller' => '\App\Controllers\Api\Histori', 'filter' => 'apiauth']);
});