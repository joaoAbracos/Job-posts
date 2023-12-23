<?php

use App\Http\Controllers\Api\V2\AllPostsController;
use App\Http\Controllers\Api\V2\CompleteTaskController;
use App\Http\Controllers\Api\V2\TaskController;
use App\Http\Controllers\Api\V2\CompanyProfileController;
use App\Http\Controllers\Api\V2\PersonProfileController;
use App\Http\Controllers\Api\V2\PostController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->prefix('v2')->group(function(){
    Route::apiResource('/tasks', TaskController::class);
    Route::patch('/tasks/{task}/complete', CompleteTaskController::class);

    Route::post('/register-company',[CompanyProfileController::class,'store']);
    Route::post('/register-person',[PersonProfileController::class,'store']);

    Route::get('/profile/person',[PersonProfileController::class,'show']);
    Route::get('/profile/company',[CompanyProfileController::class,'show']);

    Route::post('/profile/edit/company',[CompanyProfileController::class,'update']);
    Route::post('/profile/edit/person',[PersonProfileController::class,'update']);

    Route::post('/jobs',[PostController::class,'store']);
    Route::get('/jobs',[PostController::class,'index']);
    
});

Route::prefix('v2')->group(function(){
    Route::get('/all-jobs', [AllPostsController::class, 'index']);
    Route::get('/all-location-filters', [AllPostsController::class,'getLocationsAndSkills']);
});