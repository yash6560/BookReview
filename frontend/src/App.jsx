import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './pages/HomePage';
import Loginpage from './pages/LoginPage';
import NewBookPage from './pages/NewBookPage';
import AddReviewPage from './pages/AddReviewPage';
import BookDetailPage from './pages/BookDetailPage';
import SignupPage from './pages/SignupPage';
import useAuthStore from './store/useAuthStore';
import { useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import Layout from "./components/Layout";

function App() {

  const {authMe, isAuthenticated, user} = useAuthStore();
  

  useEffect(() => {
    if(!user) {
      authMe();
    }
  }, [isAuthenticated]);
  

  return (
    <div className="bg-gradient-to-br from-black to-gray-700 text-white">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Homepage/></Layout>} />
        <Route path="/login" element={<Loginpage/>} />
        <Route path="/signup" element={ <SignupPage/>} />
        <Route path="/books/:id" element={<Layout><BookDetailPage/></Layout>} />
        <Route path="/books/:id/review" element={isAuthenticated ? <Layout><AddReviewPage/></Layout> : <Loginpage/>} />
        <Route path="/book" element={isAuthenticated ? <Layout><NewBookPage/></Layout> : <Loginpage/>} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
    </div>
  )
}

export default App
