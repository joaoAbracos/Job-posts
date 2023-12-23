<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'remote',
        'country',
        'region',
        'apply_url',
        'comp',
        'compensation',
        'skills',
        'description',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
