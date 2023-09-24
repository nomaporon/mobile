import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditMenu from './AdminView/EditMenu';
import AddMenu from './AdminView/AddMenu';
import Sidebar from '../Components/AdminComponents/Sidebar';
import "../../css/admin.css";

const Admin = (props) => {
    {/*
        categories = [{"id" => 1, "category" => "おすすめ", "foods" => [{"food_id" => 1, "name" => "焼肉定食", image" => "...", "price" => 650}, ...]
    */}
    const categories = props.categories;

    return(
        <BrowserRouter>
            <div className="app">
                <div className="header">
                    <Routes>
                      <Route path="/admin" element={<h1>メニュー編集</h1>} />
                      <Route path="/add" element={<h1>メニュー追加</h1>} />
                    </Routes>
                </div>
                <Sidebar />
                <Routes>
                  <Route path="/admin" element={<EditMenu categories={categories} />} />
                  <Route path="/add" element={<AddMenu categories={categories} errors={props.errors} />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default Admin;