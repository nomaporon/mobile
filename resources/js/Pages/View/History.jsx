import React, { useState } from 'react';
import Header from '../../Components/Header';
import Table from '../../Components/Table';
import { router } from '@inertiajs/react';

const History = (props) => {
  /*
  * order_history = [Array] [{"food_name" => "オレンジジュース", "quantity" => 1, "price" => 200},..]
  * total_price [] 1250
  * table_content = [["オレンジジュース", 1, 200], ["アイスクリーム", 2, 600],...]
  */
  const order_history = props.order_history.order_history;
  const total_price = props.order_history.total_price;
  const table_header = ["料理名", "数量", "金額"];
  let table_content = [];
  
  order_history.map((order) => 
    table_content.push(Object.values(order))
  );
  
  const handleDeleteOrderHistory = () => {
    router.delete("/history")
  }
  
  let order_history_content = (
    <div>
      <div className="table-wrapper">
        <Table 
          table_header={table_header}
          table_content={table_content}
        />
      </div>
      <div className="total-price">
        <h3>合計金額　{total_price}円</h3>
      </div>
      <div className="bill-btn-wrapper">
        <div 
          className="bill-btn"
          onClick={() => handleDeleteOrderHistory()}
        >
          <p>お会計</p>
        </div>
      </div>
    </div>
  );
    
  if (!order_history.length){
    order_history_content = (
      <div className="empty-message">
        <p>まだ注文されていません</p>
      </div>
    );
  }
  
  return (
    <div>
      <Header title="注文履歴一覧" />
      <div className="order-history">
        {order_history_content}
      </div>
    </div>
  );
}

export default History;