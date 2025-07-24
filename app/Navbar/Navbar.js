'use client'

import { useState, useEffect } from 'react'

export default function Navbar({user , setUser}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  

  return (
    <>
      
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FeedbackHub
              </h1>
            </div>

            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">Home</a>
              <a href="/admin" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">Admin</a>
              <a href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">About</a>
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 font-medium">Hi, {user.firstName}</span>
                  <button
                    onClick={async () => {
                      await fetch('http://localhost:3005/api/logout', {
                        method: 'POST',
                        credentials: 'include',
                      })
                      setUser(null)
                      window.location.reload()
                    }}
                    className="text-red-600 hover:underline"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <a
                  href="/login"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Get Started
                </a>
              )}
            </nav>

            
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              {isMenuOpen ? (
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

    
          {isMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-200 mt-4">
              <nav className="flex flex-col space-y-3 pt-4">
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200">Home</a>
                <a href="/admin" className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200">Admin</a>
                <a href="/about" className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200">About</a>
                {user ? (
                  <button
                    onClick={async () => {
                      await fetch('http://localhost:3005/api/logout', {
                        method: 'POST',
                        credentials: 'include',
                      })
                        setUser(null)
                      window.location.reload()
                    }}
                    className="text-red-600 py-2 px-4"
                  >
                    Logout
                  </button>
                ) : (
                  <a href="/login" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-200 mt-2">
                    Get Started
                  </a>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
