import { useState } from 'react';
import axios from 'axios';
import loginSignupBg from '../../../assets/authbg.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';
import api from '../../../lib/api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [role, setRole] = useState('user');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (role === 'user') {
      try {
        const response = await api.post('/user/signup', {
          name,
          email,
          password,
        });

        if (response.status === 201) {
          alert('User registered successfully!');
          navigate('/')

        } else {
          alert('Signup failed');
        }
      } catch (error) {
        console.error('Signup error:', error);
        alert(error.response?.data?.message || 'An error occurred during signup');
      }
    } else {
      try {
        const response = await api.post('/industry/signup', {
          name,
          email,
          password,
        });

        if (response.status === 201) {
          alert('Registration Successful!');
          navigate('/')

        } else {
          alert('Signup failed');
        }
      } catch (error) {
        console.error('Signup error:', error);
        alert(error.response?.data?.message || 'An error occurred during signup');
      }
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${loginSignupBg})` }}
    >
      <form
        onSubmit={handleSignup}
        className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Create Account</h2>
        <div className='w-full gap-3 flex flex-row'>
          <label>Sign Up as</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value='user'>User</option>
            <option value='industry'>Industry Person</option>
          </select>
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="you@example.com"
          />
        </div>

        <div className="relative">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="••••••••"
          />
          <span
            className="absolute right-3 top-9 text-gray-600 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
