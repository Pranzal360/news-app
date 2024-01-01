import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InfiScroll from './components/InfiScroll'
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const apikey ='3442b03bf68542a689718bc262e32f4c'
  

  const [progress, setProgress] = useState(0)


  const [searchQuery, setsearchQuery] = useState('')
  
  const handleSearch = (query) => {
    setsearchQuery(query)
  }

    return (
      <BrowserRouter>
        <div>
            <LoadingBar
            color='#f11946'
            progress={progress}
          />
            <Navbar onSearch={handleSearch}></Navbar>
          <Routes>
            <Route path="/" element={<News setProgress = {setProgress} key = 'general' apikey = {apikey} category = 'general' searchQuery = {searchQuery}></News>}></Route>
            <Route path="/sports" element={<News setProgress = {setProgress} key = 'sports'  apikey = {apikey} category = 'sports' searchQuery = {searchQuery}></News>}></Route>
            <Route path="/entertainment" element={<News setProgress = {setProgress} key = 'entertainment'  apikey = {apikey} category = 'entertainment' searchQuery = {searchQuery}></News>}></Route>
            <Route path="/business" element={<News setProgress = {setProgress} key = 'business'  apikey = {apikey} category = 'business' searchQuery = {searchQuery}></News>}></Route>
            <Route path="/general" element={<News setProgress = {setProgress} key = 'general'  apikey = {apikey} category = 'general' searchQuery = {searchQuery}></News>}></Route>
            <Route path="/health" element={<News setProgress = {setProgress} key = 'health'  apikey = {apikey} category = 'health' searchQuery = {searchQuery}></News>}></Route>
            <Route path="/science" element={<News setProgress = {setProgress} key = 'science'  apikey = {apikey} category = 'science' searchQuery = {searchQuery}></News>}></Route>
            <Route path="/technology" element={<News setProgress = {setProgress} key = 'technology'  apikey = {apikey} category = 'technology' searchQuery = {searchQuery}></News>}></Route>
            
          </Routes>
        </div>
      </BrowserRouter>
    )

}
export default App

