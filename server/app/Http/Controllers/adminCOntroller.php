<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class adminCOntroller extends Controller
{
    public function login(Request $request)
    {
        // Validate input
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        // Find user by email
        $user = Admin::where('email', $request->email)->first();

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
}
