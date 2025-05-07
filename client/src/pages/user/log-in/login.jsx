import { useState } from 'react';
import loginSignupBg from '../../../assets/authbg.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';
import api from '../../../lib/api'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role,setRole]=useState('user');
    const navigate=useNavigate()


    const handleLogIN=async(e)=>{
        e.preventDefault();
        if(role==='user'){
            try{
                const res=await api.post(`/user/login`,{
                    email:email,
                    password:password
                });
                if(res.status===200){
                    localStorage.setItem('user_id',res.data.user.id);
                    localStorage.setItem('user_role','user')
                    alert("Log In Sccessfull");
                    navigate('/user/dashboard');
                }
                else{
                    alert("Log In Failed");
                }
            }catch(error){
                console.log(error);
            }
        }else{
            try{
                const res=await api.post(`/industry-person/login`,{
                    email:email,
                    password:password
                });
                if(res.status===200){
                    alert("Log In Sccessfull");
                    localStorage.setItem('user_id',res.data.user.id);
                    localStorage.setItem('user_role','industry')
                    navigate('/company/dashboard')
                }
            }catch(error){
                console.log(error);
            }
        }
    }
    return (
        <div
            className="w-full h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${loginSignupBg})` }}
        >
            <form onSubmit={handleLogIN} className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                <div className='w-full gap-3 flex flex-row'>
                    <label>Log In as</label>
                    <select value={role} onChange={(e)=>setRole(e.target.value)}>
                        <option value='user'>User</option>
                        <option value='industry'>Industry Person</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="relative">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
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
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Sign In
                </button>
                <div className='w-full flex flex-row justify-center items-center gap-2'>
                    <p>Don't have an account??</p>
                    <button onClick={()=>navigate('/signup')} className='bg-green-600 text-white rounded-md p-2 hover:bg-green-700'>Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
