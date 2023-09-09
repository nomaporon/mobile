import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';

const Food = (props) => {
  const food = props.food;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [count, setCount] = useState(1);
  const {data, setData, post} = useForm({
    food_id: "",
    table_id: 1,
    quantity: count
  });
  
  const handleSetCount = (count) => {
    setCount(count);
    setData("quantity", count);
  }
  
  let modal;
  if (isModalOpen) {
    modal = (
      <div className='modal'>
        <div className='modal-inner'>
          <div className='modal-food-info'>
            <p>{food.name}</p>
            <p>{food.price}</p>
          </div>
          <div className='counter'>
            <button
              className='count-btn'
              onClick={() => {if (count > 1) { handleSetCount(count - 1) }}}
            >
              -
            </button>
            <p>{count}</p>
            <button
              className='count-btn'
              onClick={() => {if (count < 10) { handleSetCount(count + 1) }}}
            >
              +
            </button>
          </div>
          <div className='add-order-or-cancel-btns'>
            <button
              className='cancel-btn'
              onClick={() => {
                setIsModalOpen(false)
                handleSetCount(1)
              }}
            >
              キャンセル
            </button>
            <button
              className='add-order-list-btn'
              onClick={() => post("/add_order")}
            >
              注文リストに追加
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
      <div className='food-card-wrapper'>
        <div 
          className='food-card'
          onClick={() => {
            setIsModalOpen(true)
            setData("food_id", food.food_id);
          }}
        >
            <div className='food-item'>
                <p>{food.name}</p>
                <p>{food.price}</p>
            </div>
        </div>
        {modal}
      </div>
      );
}

export default Food;