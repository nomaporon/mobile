import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from '../Components/Header';
import Menu from './View/Menu';
import List from './View/List';
import History from './View/History';
import Footer from '../Components/Footer';
import "../../css/app.css";

const App = (props) => {
    const categories = props.categories;
    
    return (
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Menu categories={categories} />} />
              <Route path="/list" element={<List />} />
              <Route path="/history" element={<History />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
        );
}

export default App;