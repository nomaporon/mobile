import React, { useState } from 'react';
import Header from '../../Components/Header';

const List = (props) => {
  const categories = props.categories;
  const order_list = props.order_list;
  
  return (
    <div>
      <Header title="注文リスト" />
      <div className="order-list">
        { order_list.map((order) => (
          <div>
            <p>{ order }</p>
          </div>
        )) }
      </div>
    </div>
  );
}

export default List;