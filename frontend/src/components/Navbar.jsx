import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {AlignJustify, LogOut} from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [hamburger,setHamburger] = useState(false);
  const { user, isAuthenticated, logOut, authMe } = useAuthStore();

  const handleLogOut = async(e) => {
    e.preventDefault();
    const res = await logOut();
    await authMe();
    if(res?.success) {
      toast.success(res.message);
    }
    
  }

  return (
    <nav className="bg-gray-800 w-full shadow-md  z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-green-600 hover:text-green-500">
            📚 BookVerse
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-white/50 hover:text-green-400 hover:underline font-medium transition">Home</Link>
            <Link to="/books" className="text-white/50 hover:text-green-400 hover:underline font-medium transition">Books</Link>
            <Link to="/about" className="text-white/50 hover:text-green-400 hover:underline font-medium transition">About</Link>
            <Link to="/contact" className="text-white/50 hover:text-green-400 hover:underline font-medium transition">Contact</Link>
          </div>

          {/* Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {
              (!user || !isAuthenticated) ? (
              <> <Link to="/login" className="text-gray-600 hover:text-green-400 hover:underline font-medium">Login</Link>
            <Link to="/signup" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition font-medium">Sign Up</Link>
          </>
          ) : (
            <><Link onClick={handleLogOut} className="text-gray-600 hover:text-green-400 hover:underline font-medium">Logout</Link></>
          )
            }
           </div>

          {/* Mobile Menu Button */}
          <div className={`md:hidden table relative`}>
            <button type="button" className="text-gray-600 hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" onClick={(e) => setHamburger(!hamburger)}>
              <AlignJustify />
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
        {hamburger && (
          <div className="absolute bg-gray-800 right-0 top-12 w-[260px] rounded-b-lg md:hidden flex flex-col space-y-2 mt-4 p-4 border-t border-white/10">
            <Link to="/" className="text-white/70 hover:text-green-400 px-2">Home</Link>
            <Link to="/books" className="text-white/70 hover:text-green-400 px-2">Books</Link>
            <Link to="/about" className="text-white/70 hover:text-green-400 px-2">About</Link>
            <Link to="/contact" className="text-white/70 hover:text-green-400 px-2">Contact</Link>
            
            {
              (!user || !isAuthenticated) ? (
              <> <Link to="/login" className="text-white/70 hover:text-green-400 px-2">Login</Link>
            <Link to="/signup" className="text-white px-4 py-2 bg-green-600 rounded-md w-fit mx-2 hover:bg-green-500">Sign Up</Link>
          </>
          ) : (
            <><Link onClick={handleLogOut} className="text-white/70 hover:text-green-400 px-2">Logout</Link></>
          )
            }
          </div>
)}
        </div>
      </div>
    </nav>
  )
}

export default Navbar