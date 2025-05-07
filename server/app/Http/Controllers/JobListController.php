<?php

namespace App\Http\Controllers;

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
}
