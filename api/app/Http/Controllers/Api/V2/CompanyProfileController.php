<?php

namespace App\Http\Controllers\Api\v2;

use App\Http\Controllers\Controller;
use App\Http\Requests\EditCompanyProfileRequest;
use App\Models\CompanyProfile;
use App\Http\Requests\StoreCompanyProfileRequest;
use App\Http\Requests\UpdateCompanyProfileRequest;
use App\Http\Resources\CompanyProfileResource;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

class CompanyProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // var_dump($request);
        // die;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCompanyProfileRequest $request)
    {
        if ($request->user()->profileCompany()->exists()) {
            throw new Exception("You already have a Profile", 500);
        }
        $profile = $request->user()->profileCompany()->create($request->validated());
      
        if ($request->hasFile('file')) {
            $avatar = $request->file('file');
            // Upload the new image to the public directory
           $avatar = Storage::disk('public')->put('/company',$avatar);

            // Update the profile with the new image path
            $profile->update([
                'image_path' => $avatar,
            ]);
        }
        return response()->json(['status' => true], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(CompanyProfile $profileAccount)
    {
        $user = Auth::user();
        $personProfile = $user->profileCompany;
    
        if (!$personProfile) {
            return response()->json(['error' => 'Person profile not found'], 404);
        }
    
        return new CompanyProfileResource($personProfile);   
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EditCompanyProfileRequest $request)
    {
        // Edit functionality based on the store method
       
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCompanyProfileRequest $request, CompanyProfile $profileAccount)
    {
        $user = Auth::user();
        
        if($request->input('image_path') == str_replace(URL::to("/company") . "/", "", $user->profileCompany->image_path)) {
            $validatedData = $request->except('image_path');
        } else {
            $validatedData = $request->validated();
        }
        
        $profile = $user->profileCompany()->update($validatedData);
      
        if ($request->hasFile('file')) {
            $avatar1 = $request->file('file');

            Storage::disk('public')->delete($user->profileCompany->image_path);
            // Upload the new image to the public directory
           $avatar = Storage::disk('public')->put('/company',$avatar1);

            // Update the profile with the new image path
            $user->profileCompany()->update([
                'image_path' => $avatar,
            ]);
        }
        return response()->json(['status' => true], Response::HTTP_CREATED);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CompanyProfile $profileAccount)
    {
        //
    }
}