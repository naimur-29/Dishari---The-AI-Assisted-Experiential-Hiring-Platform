<?php

use App\Http\Controllers\adminCOntroller;
use App\Http\Controllers\industryPersonCOntroller;
use App\Http\Controllers\JobListController;
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


Route::get('/job-list',[JobListController::class,'index']);
Route::get('/job-details/{id}',[JobListController::class,'show']);
Route::get('/posts/{id}',[JobListController::class,'showBYID']);


use App\Http\Controllers\JobApplicationController;
use App\Models\JobList;

Route::post('/apply-job', [JobApplicationController::class, 'store']);
Route::get('/applied-posts/{id}', [JobApplicationController::class, 'show']);
Route::put('/apply-job/update/{id}', [JobApplicationController::class, 'update']);
Route::put('/apply-job/close/{id}', [JobListController::class, 'closeJob']);
Route::put('/apply-job/pick/{id}', [JobListController::class, 'pickCandidate']);
Route::get('/apply-job/ranks/{id}', [JobListController::class, 'getRnak']);
