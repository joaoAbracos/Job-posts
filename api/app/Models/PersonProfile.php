<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonProfile extends Model
{
    use HasFactory;
    protected $table = "person_profiles";
    protected $fillable = ['name','lastname','birtday','gender','country','region','ocupation','introduction','image_path'];
    public function user(){
        return $this->belongsTo(User::class, 'profilePerson');
    }
}
