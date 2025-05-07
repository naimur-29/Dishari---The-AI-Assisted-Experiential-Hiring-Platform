<?php

namespace App\Http\Controllers;

use App\Models\industryPerson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
class industryPersonCOntroller extends Controller
{
    public function login(Request $request)
    {
        // Validate input
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Find user by email
        $user = industryPerson::where('email', $request->email)->first();

        // Check user exists and password matches
        if ($user && Hash::check($request->password, $user->password)) {
            // You can use session or JWT depending on your system
            return response()->json([
                'status' => 'success',
                'message' => 'Login successful',
                'user' => $user
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid credentials'
            ], 401);
        }
    }
    public function profile($id)
    {
        $profile = industryPerson::find($id);

        if ($profile) {
            return response()->json([
                'status' => 'success',
                'profile' => $profile
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }
    }
    public function signup(Request $request)
    {
        // Validate input
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:industry_persons,email',
            'password' => 'required|string|min:6',
            'industry_type'=> 'required|string',
            'address'=> 'required|string',
        ]);

        // Create new user
        $user = new industryPerson();
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
    public function updateProfile(Request $request, $id)
    {
        // Validate the incoming request
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'industry_type' => 'nullable|string|max:255',
            'address' => 'nullable|string',
        ]);

        // Find the user
        $user = industryPerson::find($id);

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }

        // Update fields
        $user->name = $request->name;
        $user->email = $request->email;
        $user->industry_type=$request->industry_type;
        $user->address=$request->address;

        // Save changes
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Profile updated successfully',
            'user' => $user
        ], 201);
    }
}
