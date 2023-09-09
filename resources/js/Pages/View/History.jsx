import React, { useState } from 'react';
import Header from '../../Components/Header';

const History = (props) => {
  const order_history = props.order_history.order_history;
  const total_price = props.order_history.total_price;

  return (
    <div>
    　<Header title="注文履歴一覧" />
    　{ order_history.map((order) => (
    　  <div>
    　   <p>{ order.food_name }</p>
    　   <p>{ order.quantity }</p>
    　   <p>{ order.price }</p>
    　  </div>
    　)) }
    　<h3>{ total_price }</h3>
    </div>
  );
}

export default History;