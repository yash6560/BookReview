import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const [formData,setFormData] = useState({
    name : '',
    email : '',
    password : '',
  })

  const {isLoading, signUp} = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signUp(formData);
    if(res?.success) {
      toast.success(res.message);
      navigate('/login')
    }

  }

  return (
     <div className="bg-gradient-to-br from-black to-gray-700 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl md:p-8 p-4 shadow-2xl text-white">
        <h2 className="text-3xl font-bold text-center mb-6 flex gap-3 items-center justify-center">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input type="text" placeholder="John Doe" className="w-full mt-1 px-4 py-2 rounded-lg bg-white/20 focus:bg-white/30 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input type="email" placeholder="you@example.com" className="w-full mt-1 px-4 py-2 rounded-lg bg-white/20 focus:bg-white/30 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input type="password" placeholder="••••••••" className="w-full mt-1 px-4 py-2 rounded-lg bg-white/20 focus:bg-white/30 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
          </div>
          <button type="submit" className={`w-full bg-white text-indigo-600 font-bold py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer duration-300`} >
            {isLoading ? "Sign In..." : "Sign Up"}
          </button>
          <p className="text-center text-sm mt-4">
            Already have an account? <Link to='/login' className="underline text-white font-medium">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignupPage