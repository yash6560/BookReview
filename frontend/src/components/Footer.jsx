import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-white/10 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Tagline */}
          <div className="mb-4 md:mb-0 text-center md:text-left cursor-pointer">
            <h2 className="text-2xl font-bold text-green-500">📚 BookVerse</h2>
            <p className="text-white/50 text-sm">Discover. Review. Share.</p>
          </div>

          {/* Footer Links */}
          <div className="flex space-x-6 text-sm">
            <Link to="/" className="text-white/70 hover:text-green-400  hover:underline transition">Home</Link>
            <Link to="/book" className="text-white/70 hover:text-green-400 hover:underline transition">Books</Link>
            <Link to="/about" className="text-white/70 hover:text-green-400 hover:underline transition">About</Link>
            <Link to="/contact" className="text-white/70 hover:text-green-400 hover:underline transition">Contact</Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-white/70 mt-6">
          &copy; {new Date().getFullYear()} BookVerse. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
