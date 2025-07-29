import React, {useEffect, useState} from 'react'
import { useBookStore } from "../store/useBookStore";
import {ArrowRight, ArrowLeft, Search} from 'lucide-react';
import { Link } from 'react-router-dom';

const BookList = () => {
    const {fetchBook, bookList,totalPage, currentPage} = useBookStore();
    const [genre, setGenre] = useState('');
    const [author, setAuthor] = useState('');
    const [limit, setLimit] = useState(10);

     useEffect(() => {
          fetchBook({ genre, author, page: 1, limit });
    }, []);

    const handleNextClick = async (e) => {
      e.preventDefault();

      if(currentPage < totalPage) {
        await fetchBook(
          { genre, author, page: currentPage + 1, limit }
        )
      }
    }

    const handlePrevClick = async (e) => {
      e.preventDefault();
      if(currentPage >= 1) {
        await fetchBook(
          { genre, author, page: currentPage - 1, limit }
        )
      }
    }

    // Filtering based on user action
    const handleFilter = async (e) => {
    e.preventDefault()
    await fetchBook({ genre, author, page: 1, limit })
  }

  return (
    <>
    <div className='px-4 py-1 md:flex md:space-y-0 space-y-2 items-center justify-between'>
      {/* Dropdown for genre filter */}
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="p-2 bg-emerald-500 border mb-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Genres</option>
          <option value="Tech Fiction">Tech Fiction</option>
          <option value="Adventure">Adventure</option>
          <option value="Mystery">Mystery</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Science">Science</option>
          <option value="Tech Thriller">Tech Thriller</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Historical Mystery">Historical Mystery</option>
          <option value="Thriller">Thriller</option>
          <option value="Programming">Programming</option>
          <option value="Dystopian">Dystopian</option>
        </select>
        <input type='text' value={author} onChange={(e) => setAuthor(e.target.value)} placeholder='serch by author...' className='md:max-w-2xs w-full px-3 py-1 bg-white/10 rounded-[8px]'/> 
        <button onClick={handleFilter} className='bg-green-400 hover:bg-green-600 px-3 py-1 rounded-[6px] cursor-pointer'>click me after filter</button>
    </div>
    <ul className="bg-white/10 shadow scrollbar-custom rounded-lg divide-y divide-gray-200 max-h-96 overflow-y-auto">
  {bookList.map((book) => (
    <li key={book._id} className="px-6 py-4">
      <div className="sm:flex grid justify-between items-start">
        {/* Left Content: Genre badge, Title, Description */}
        <div className="sm:flex-1">
          {/* Genre Badge */}
          <span className="inline-block bg-indigo-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full mb-1">
            {book.genre}
          </span>

          {/* Title */}
          <h3 className="text-lg font-semibold text-white">{book.title}</h3>

          {/* Description */}
          <p className="text-sm text-white/80 mt-1 mb-3">{book.description.length > 100 ? book.description.slice(0, 100) + '...' : book.description }</p>

          <Link to={`/books/${book._id}`} className='bg-green-600 hover:bg-green-800 px-4 py-2 text-xs rounded-xl cursor-pointer'>Read More</Link>
        </div>

        {/* Right Content: Author */}
        <div className="sm:ml-4 mt-4 sm:mt-0 sm:text-right text-left">
          <p className="sm:text-sm text-xs text-white/60 font-medium">- By {book.author}</p>
        </div>
      </div>
    </li>
  ))}
</ul>

<div className=' flex gap-3 items-center justify-between p-4'>
  <button onClick={handlePrevClick} className={`flex items-end bg-green-400 rounded-md justify-center py-1 px-3 gap-2 hover:bg-green-600 ${currentPage == 1 || currentPage<2 ? "cursor-not-allowed opacity-50" : "cursor-pointer" }`} disabled={currentPage <= 1}>
    <ArrowLeft /> Prev
  </button>
  <button onClick={handleNextClick} className={`flex items-end bg-green-400 rounded-md justify-center py-1 px-3 gap-2 hover:bg-green-600 ${currentPage == totalPage ? "cursor-not-allowed opacity-50" : "cursor-pointer" }`} disabled={currentPage >= totalPage} >
    Next <ArrowRight />
  </button>
</div>
</>
  )
}

export default BookList