import React, { useState } from 'react';
import Header from '../../Components/Header';
import Table from '../../Components/Table';

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
  
  return (
    <div>
      <Header title="注文リスト" />
      <div className="order-list">
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

export default List;