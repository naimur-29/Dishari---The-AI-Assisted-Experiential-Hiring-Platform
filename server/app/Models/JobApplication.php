<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    use HasFactory;
    protected $table = 'job_applications';
    protected $fillable = [
        'job_id',
        'link',
        'explanation',
        'images',
        'test_result',
        'user_id'
    ];

    public $timestamps = true;
}
