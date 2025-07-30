import { create } from 'zustand';
import axiosInstance from '../utils/axios';
import {uploadInstance} from '../utils/axios';

export const useBookStore = create((set) => ({
    bookList : [],
    currentPage : null,
    totalPage : null,

    fetchBook : async ({genre, author, page=1, limit=10}) => {
        try {
            const res = await axiosInstance.get('/books/', {
                params: { genre, author, page, limit }
            });
            console.log(res.data);
            set({bookList : res.data.findBooks, currentPage:res.data.currentPage , totalPage:res.data.totalPages });
            
            
        } catch (error) {
            console.error('fetch book failed:', error);
        }
    },

    fetchBookById : async (id) => {
        try {
            const res = await axiosInstance.get(`/books/${id}`);
            return res.data.findBook;
        } catch (error) {
            console.error('fetch book by id failed:', error);
        }
    },

    addBook : async (formData) => {
        try {
            const res = await uploadInstance.post('/books/', formData)
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.error('add book failed:', error);
        }
    }
}));