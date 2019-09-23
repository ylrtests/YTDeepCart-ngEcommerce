<?php

use Illuminate\Http\Request;
use App\Cart;
use App\User;
use App\Product;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// ----------- api/auth/
Route::group([
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', 'AuthController@login'); //No auth needed
    Route::post('signup', 'AuthController@signup'); //No auth needed
    Route::post('logout', 'AuthController@logout'); 
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});

Route::group([
    'prefix' => 'product'
], function ($router) {
    Route::get('{id}', 'ProductController@show'); //No auth needed
    Route::get('offers/all', 'ProductController@getOffers'); //No auth needed
});

Route::group([
    'prefix' => 'categories'
], function ($router) {
    Route::get('/', 'CategoryController@index'); //No auth needed
});

Route::group([
    'prefix' => 'cart'
], function ($router) {
    Route::get('products', 'CartController@productsInCart');
    Route::delete('remove/{product_id}', 'CartController@removeProductInCart');
});

