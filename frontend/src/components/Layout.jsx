import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div className="min-h-screen flex flex-col">
        <Navbar className="flex"/>
        <main className="flex-1">{children}</main>
        <Footer className="flex"/>
    </div>
  )
}

export default Layout