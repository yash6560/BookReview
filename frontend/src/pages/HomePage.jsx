import React, {useEffect} from 'react'
import BookList from '../components/BookList'

const HomePage = () => {

  
  return (
  <div className="min-h-screen  py-10 px-4">
      <div className="max-w-4xl mx-auto ">
        <h1 className="text-4xl font-bold text-center mb-10">📚 Book Review Platform</h1>

        <h2 className="text-2xl font-semibold mb-4">📖 List of All Books</h2>
        <BookList/>
      </div>
    </div>
  )
}

export default HomePage