import React from 'react';
import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Other from './pages/Other';

function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="other" element={<Other />} />
      </Routes>
    </div>
  );
}

export default App;
