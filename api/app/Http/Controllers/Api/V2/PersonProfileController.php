<?php

namespace App\Http\Controllers\Api\V2;

use App\Http\Controllers\Controller;
use App\Http\Resources\PersonProfileResource;
use App\Models\PersonProfile;
use App\Http\Requests\StorePersonProfileRequest;
use App\Http\Requests\UpdatePersonProfileRequest;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

class PersonProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePersonProfileRequest $request)
    {
        
        if ($request->user()->profilePerson()->exists()) {
            throw new  Exception("You already have a Profile", 500);
        }
 
        $profile = $request->user()->profilePerson()->create($request->validated());
     
        
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            // Upload the new image to the public directory
           $avatar = Storage::disk('public')->put('/person',$avatar);

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
    public function show(PersonProfile $personProfile)
    {
        $user = Auth::user();
        $personProfile = $user->profilePerson;
    
        if (!$personProfile) {
            return response()->json(['error' => 'Person profile not found'], 404);
        }
    
        return new PersonProfileResource($personProfile);   
       
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PersonProfile $personProfile)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePersonProfileRequest $request, PersonProfile $personProfile)
    {
        $user = Auth::user();
        
        if($request->input('img_path') == str_replace(URL::to("/person") . "/", "", $user->profilePerson->image_path)) {
            $validatedData = $request->except('img_path');
        } else {
            $validatedData = $request->validated();
        }
        
        $profile = $user->profilePerson()->update($validatedData);
      
        if ($request->hasFile('avatar')) {
            $avatar1 = $request->file('avatar');
            // Delete the old image file
            Storage::disk('public')->delete($user->profilePerson->image_path);
            
            // Upload the new image to the public directory
            $avatar = Storage::disk('public')->put('/person',$avatar1);

            // Update the profile with the new image path
            $user->profilePerson()->update([
                'image_path' => $avatar,
            ]);
        }
        return response()->json(['status' => true], Response::HTTP_CREATED);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PersonProfile $personProfile)
    {
        //
    }
}

