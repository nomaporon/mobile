import React, { useState } from 'react';
import Header from '../../Components/Header';
import Table from '../../Components/Table';

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
  
  return (
    <div>
      <Header title="注文履歴一覧" />
      <div className="order-history">
        <div className="table-wrapper">
          <Table 
            table_header={table_header}
            table_content={table_content}
          />
        </div>
      </div>
    </div>
  );
}

export default History;