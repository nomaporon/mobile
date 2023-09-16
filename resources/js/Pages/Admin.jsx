import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditMenu from './AdminView/EditMenu';
import Sidebar from '../Components/AdminComponents/Sidebar';
import "../../css/admin.css";

const Admin = (props) => {
    const categories = props.categories;
    console.log(categories);
    
    return(
        <BrowserRouter>
            <div className="app">
                <div className="header">
                    <Routes>
                      <Route path="/admin" element={<h1>メニュー編集</h1>} />
                    </Routes>
                </div>
                <Sidebar />
                <Routes>
                  <Route path="/admin" element={<EditMenu categories={categories} />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default Admin;