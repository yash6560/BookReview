import React, { useState } from 'react'
import { ImageIcon } from 'lucide-react';
import { useBookStore } from '../store/useBookStore';
import toast from 'react-hot-toast';

const NewBookPage = () => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [bookData, setBookData] = useState({
    title: '',
    description: '', 
    genre: '',
    author: '',
  });

  const {addBook} = useBookStore();

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('bookImg', file);
    formData.append('title', bookData.title);
    formData.append('description', bookData.description);
    formData.append('genre', bookData.genre);
    formData.append('author', bookData.author);

    try {
      const res = await addBook(formData);
      if(res?.success) {
        toast.success('Book Added Successfully');
        setBookData({ title: '', description: '', genre: '', author: '' });
        setFile(null);
        setFilePreview(null);
      }
      console.log('Book Added Successfully:', res);
    } catch (error) {
      console.error('Book Add Failed:', err);
    }
    
  }

  return (
    <div className='md:p-8 p-4 flex justify-center'>
      <div className='bg-white/10 w-full max-w-[600px] p-4 rounded-lg'>
        <h1 className='text-2xl font-bold mb-4'>Add New Book</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='block mb-2 text-sm font-medium text-gray-300'>Title</label>
            <input type='text' name='title' value={bookData.title} onChange={(e) => setBookData({ ...bookData, title: e.target.value })} className='w-full p-2 bg-gray-800 text-white rounded-lg mb-4' placeholder='Enter book title' />
          </div>
          <div>
            <label className='block mb-2 text-sm font-medium text-gray-300'>Description</label>
            <textarea cols={1} rows={4} name='description' value={bookData.description} onChange={(e) => setBookData({ ...bookData, description: e.target.value })}  type='text' className='w-full p-2 bg-gray-800 text-white rounded-lg mb-4' placeholder='Enter description' />
          </div>
          <div>
            <label className='block mb-2 text-sm font-medium text-gray-300'>Genre</label>
            <input type='text' name='genre' value={bookData.genre} onChange={(e) => setBookData({ ...bookData, genre: e.target.value })} className='w-full p-2 bg-gray-800 text-white rounded-lg mb-4' placeholder='Enter genre' />
          </div>
          <div>
            <label className='block mb-2 text-sm font-medium text-gray-300'>Author Name</label>
            <input type='text' name='author' value={bookData.author} onChange={(e) => setBookData({ ...bookData, author: e.target.value })} className='w-full p-2 bg-gray-800 text-white rounded-lg mb-4' placeholder='Enter author' />
          </div>
          <div>
            <label className='mb-2 text-sm font-medium text-gray-300 flex items-center gap-2 cursor-pointer bg-gray-700 hover:bg-gray-600 rounded-lg py-2 px-4'>
              <ImageIcon className="w-8 h-8 text-white" />
              <input type='file' name="bookImg" onChange={handleFileChange} accept="image/*" className='cursor-pointer'/>
            </label>
          </div>
          {
            filePreview && (
<div className="mt-4 mb-4">
          <img src={filePreview} alt="Preview" className="w-full max-h-60 object-cover rounded-lg border border-white/20"/>
        </div>
            )
          }
          
          <div>
            <button type='submit' className='w-full cursor-pointer bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200'>Add Book</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewBookPage