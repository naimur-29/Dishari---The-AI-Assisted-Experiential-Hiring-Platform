<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class userController extends Controller
{
    public function login(Request $request)
    {
        // Validate input
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        // Find user by email
        $user = User::where('email', $request->email)->first();

        // Check user exists and password matches
        if ($user && Hash::check($request->password, $user->password)) {
            // You can use session or JWT depending on your system
            return response()->json([
                'status' => 'success',
                'message' => 'Login successful',
                'user' => $user
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid credentials'
            ], 401);
        }
    }
    public function signup(Request $request)
    {
        // Validate input
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        // Create new user
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        // Return success response
        return response()->json([
            'status' => 'success',
            'message' => 'User registered successfully',
            'user' => $user
        ], 201);
    }
    public function profile($id)
    {
        $profile = User::find($id);

        if ($profile) {
            return response()->json([
                'status' => 'success',
                'user' => $profile
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }
    }
    public function updateProfile(Request $request, $id)
    {
        // Validate the incoming request
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'graduation_year' => 'nullable|integer|min:1900|max:' . date('Y'),
            'university' => 'nullable|string|max:255',
            'skills' => 'nullable|string',
            'linkedin_url' => 'nullable|url'
        ]);

        // Find the user
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }

        // Update fields
        $user->name = $request->name;
        $user->email = $request->email;
        $user->graduation_year = $request->graduation_year;
        $user->university = $request->university;
        $user->skills = $request->skills;
        $user->linkedin_url = $request->linkedin_url;

        // Save changes
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Profile updated successfully',
            'user' => $user
        ], 201);
    }
}
