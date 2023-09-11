import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../Components/Header';
import Menu from './View/Menu';
import List from './View/List';
import History from './View/History';
import Footer from '../Components/Footer';
import "../../css/app.css";

const App = (props) => {
  {/*
    categories [Array]  [{"id" => 1, "category" => "おすすめ", "foods" => [{"name" => "焼肉定食", "price" => 650}, {"name" => "サラダ", "price" => 250}]}, ...]
    order_list [Array]  [{"food_name" => "オレンジジュース", "quantity" => 1, "price" => 200}, {"food_name" => "アイスクリーム", "quantity" => 2, "price" => 600},...]
    order_history [Object]  {"order_history" => [{"food_name" => "オレンジジュース", "quantity" => 1, "price" => 200},..], total_price => 1250}
  */}
  const categories = props.categories;
  const order_list = props.order_list;
  const order_history = props.order_history;
  
  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Menu categories={categories} />} />
            <Route path="/list" element={<List order_list={order_list} />} />
            <Route path="/history" element={<History order_history={order_history}/>} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
      );
}

export default App;