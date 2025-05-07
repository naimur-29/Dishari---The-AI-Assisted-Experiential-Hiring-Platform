<?php

namespace App\Http\Controllers;

use App\Models\JobApplication;
use Carbon\Carbon;
use App\Models\JobList;
use Illuminate\Http\Request;

class JobListController extends Controller
{
    public function index(Request $request)
    {
        $now = Carbon::now()->toDateTimeString();

        // Paginate the results, 10 per page
        $posts = JobList::where('deadline', '>=', $now)
            ->where('is_hiring', '1')
            ->paginate(10);  // Paginate with 10 posts per page

        return response()->json($posts);  // Return paginated results as JSON
    }
    public function show($id)
    {
        $job = JobList::find($id);

        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }

        return response()->json(['job' => $job]);
    }
    public function showBYID($id)
    {
        $job = JobList::where('industry_id',$id)->get();

        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }

        return response()->json($job);
    }
    public function closeJob($id){
        $job = JobList::find($id);
        $job->is_hiring=0;
        $job->save();

        $evaluationList=JobApplication::where('job_id',$id)->get();

        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }

        return response()->json(['evaluation'=>$evaluationList,'job'=>$job],200);
    }

    public function pickCandidate(Request $request,$id){
        $job = JobList::find($id);
        $job->ranks=$request->dt;
        $job->save();

        

        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }

        return response()->json(['msg'=>'SUcess'],200);
    }

    public function getRnak($id){
        $rank=JobList::find($id)->first()->ranks;
        return response()->json($rank);
    }

}
