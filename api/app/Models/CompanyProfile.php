<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyProfile extends Model
{
    use HasFactory;
    protected $table = "company_profile";
    protected $fillable = ['company_name','country','region','city','website','email','social','explanation','image_path'];

    public function user(){
        return $this->belongsTo(User::class,'profile');
    }
}
