<?php

use App\Http\Controllers\UserController;
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


// Protected router's by token of user 
Route::group(['middleware' => ['auth:sanctum']], function() {
    // Books for Test
    Route::get('/books', [UserController::class, 'handleBooks']);
    Route::get('/hussain', function() {
        return 'hussain';
    });
});

// Login User, once you logged in, it will create new token for you
Route::post('/login', [UserController::class, 'login']);

// Register User
Route::post('/register', [UserController::class, 'register']);


