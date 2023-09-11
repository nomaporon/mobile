import React, { useState } from 'react';
import Header from '../../Components/Header';
import Table from '../../Components/Table';
import { router } from '@inertiajs/react';
import { Link } from "react-router-dom";

const List = (props) => {
  /*
  * order_list [Array]  [{"food_name" => "オレンジジュース", "quantity" => 1, "price" => 200}, {"food_name" => "アイスクリーム", "quantity" => 2, "price" => 600},...]
  * table_content = [["オレンジジュース", 1, 200], ["アイスクリーム", 2, 600],...]
  */
  const order_list = props.order_list;
  const table_header = ["料理名", "数量", "金額"];
  let table_content = [];
  
  order_list.map((order) => 
    table_content.push(Object.values(order))
  );
  
  const handleDeleteAllOrder = () => {
    router.delete("/list")
  }
  
  const handleAddOrderHistory = () => {
    router.post("/add_order_history")
  }
  
  let order_list_content = (
    <div className="table-wrapper">
      <Table
        table_header={table_header}
        table_content={table_content}
      />
    </div>
  );
  if (!order_list.length){
    order_list_content = (
      <div>
        <p>注文リストは空です</p>
      </div>
    );
  }
  
  return (
    <div>
      <Header title="注文リスト" />
      <div className="order-list">
        {order_list_content}
        <div className="order-list-btn-wrapper">
          <div 
            className="delete-all-order-btn"
            onClick={() => handleDeleteAllOrder()}
          >
            全て取り消し
          </div>
          <Link to="/history">
            <div 
              className="create-order-btn"
              onClick={() => handleAddOrderHistory()}
            >
              注文
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default List;