<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class industryPerson extends Model
{
    use HasFactory;
    protected $table = 'industry_persons';

    protected $fillable = [
        'email',
        'name',
        'password',
    ];
    protected $hidden=['password'];

    public $timestamps = true;
}
