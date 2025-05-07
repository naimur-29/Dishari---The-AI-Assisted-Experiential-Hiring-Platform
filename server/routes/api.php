<?php

use App\Http\Controllers\adminCOntroller;
use App\Http\Controllers\industryPersonCOntroller;
use App\Http\Controllers\userController;
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

Route::post('/user/login',[userController::class,'login']);
Route::post('/user/signup',[userController::class,'signup']);
Route::get('/user/profile/{id}',[userController::class,'profile']);
Route::put('/user/profile/{id}',[userController::class,'updateProfile']);

Route::post('/admin/login',[adminCOntroller::class,'login']);
Route::post('/industry-person/login',[industryPersonCOntroller::class,'login']);
Route::post('/industry/signup',[industryPersonCOntroller::class,'signup']);
Route::get('/industry/profile/{id}',[industryPersonCOntroller::class,'profile']);
Route::put('/industry/profile/{id}',[industryPersonCOntroller::class,'updateProfile']);