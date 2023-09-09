import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from '../Components/Header';
import Menu from './View/Menu';
import List from './View/List';
import History from './View/History';
import Footer from '../Components/Footer';
import "../../css/app.css";

const App = (props) => {
  {/*
    categories [Array]  [{"id" => 1, "category" => "おすすめ", "foods" => [{"name" => "焼肉定食", "price" => 650}, {"name" => "サラダ", "price" => 250}]}, ...]
    order_list [Array]  [{id: 1, food_id: 10, table_id: 1, quantity: 1}, {id: 2, food_id: 8, table_id: 1, quantity: 2},...]
    order_history [Array]  [{id: 1, food_id: 1, table_id: 1, quantity: 1, is_served: 1,..},...]
  */}
  const categories = props.categories;
  const order_list = props.order_list;
  const order_history = props.order_history;
  console.log(order_list);
  
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