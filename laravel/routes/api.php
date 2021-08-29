<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('todo', 'TodosController@index');
Route::group(['prefix' => 'todo'], function () {
    Route::post('add', 'TodosController@store');
    Route::get('edit/{id}', 'TodosController@edit');
    Route::post('update/{id}', 'TodosController@update');
    Route::delete('delete/{id}', 'TodosController@destroy');
});