<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\JobApplication;
use App\Models\JobList;

class JobApplicationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'job_id' => 'required|integer|exists:job_lists,id',
            'link' => 'nullable|url',
            'explanation' => 'required|string',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif',
            'user_id' => 'required'
        ]);

        $imageFilenames = [];
        $imageBase64 = [];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                if ($image) {
                    $filename = uniqid('job_img_') . '.' . $image->getClientOriginalExtension();
                    $image->storeAs('private/job-application', $filename); // ✅ FIXED PATH
                    $imageFilenames[] = $filename;

                    // Convert to base64
                    $path = storage_path('app/private/job-application/' . $filename);
                    $imageData = base64_encode(file_get_contents($path));
                    $mimeType = mime_content_type($path);
                    $imageBase64[] = "$imageData";
                }
            }
        }

        $application = new JobApplication();
        $application->job_id = $request->job_id;
        $application->user_id = $request->user_id;
        $application->link = $request->link;
        $application->explanation = $request->explanation;
        $application->images = json_encode($imageFilenames); // save filenames
        $application->save();
        $jobdetails = JobList::find($application->job_id);

        return response()->json([
            'message' => 'Job application submitted successfully.',
            'images' => count($imageBase64) > 0 ? $imageBase64 : null,
            'job' => $jobdetails ? $jobdetails : null
        ], 200);
    }
    public function show($id)
    {
        $jobstatus = JobApplication::join('job_lists', 'job_lists.id', '=', 'job_applications.job_id')
            ->join('industry_persons', 'job_lists.industry_id', '=', 'industry_persons.id')
            ->where('job_applications.user_id', $id)
            ->select(
                'job_lists.title as job_title',
                'job_applications.test_result as test_result',
                'industry_persons.name as company_name'
            )
            ->get();

        return response()->json($jobstatus, 200);
    }
    public function update(Request $request, $id)
    {
        // Validate the incoming data
        $request->validate([
            'data' => 'required',
            'id'=>'required'
        ]);

        // Find the job application by job_id
        $res = JobApplication::where('job_id', $id)
        ->where('user_id',$request->id)
        ->first();

        // Check if a record was found
        if (!$res) {
            return response()->json(['message' => 'Job application not found'], 404);
        }

        // Update the test_result
        $res->test_result = $request->data;
        $res->save();

        // Return success response
        return response()->json(['message' => 'Test result updated successfully'], 200);
    }
}
