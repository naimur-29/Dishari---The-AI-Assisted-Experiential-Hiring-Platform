<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobList extends Model
{
    use HasFactory;
    protected $table='job_lists';
    protected $fillable=[
        'inudstry_id',
        'title',
        'problem_statement',
        'evaluation_criteria',
        'submission_guideline',
        'deadline',
        'is_hiring','ranks'
    ];
    public $timestamps=true;
}
