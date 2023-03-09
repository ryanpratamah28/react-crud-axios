import React from 'react'

import Books from './Pages/Books/Books'
import Book from './Pages/Book/Book'

import './App.css'
import { Route, Routes } from 'react-router-dom'

function App() {
  return ( 
  <>
    <Routes>
      <Route path='/' element={<Books/>} />
      <Route path='/book/:id' element={<Book/>} />
    </Routes>
  </>
  )
}

export default App
