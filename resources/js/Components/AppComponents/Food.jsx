import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Link } from "react-router-dom";

const Food = (props) => {
  const food = props.food;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [count, setCount] = useState(1);
  
  const {data, setData, post} = useForm({
    food_id: 1,
    table_id: 1,
    quantity: count
  });
  
  const handleSetCount = (opr) => {
    if (count < 10 && opr === "plus") {
      setCount(count + 1);
      setData("quantity", count + 1); 
    } else if (count > 1 && opr === "minus") {
      setCount(count - 1);
      setData("quantity", count - 1); 
    }
  }
  
  let modal;
  if (isModalOpen) {
    modal = (
      <div className='modal'>
        <div className='modal-wrapper'>
          <div className='modal-inner'>
            <div className='modal-info'>
              <div className='modal-food-info'>
                <img src={'storage/img/'+food.image} className="modal-food-img" />
                <ul>
                  <li>{food.name}</li>
                  <li>{food.price}円</li>
                </ul>
              </div>
              <div className='counter'>
                <button
                  className='count-btn'
                  onClick={() => handleSetCount("minus")}
                >
                  -
                </button>
                <p>{count}</p>
                <button
                  className='count-btn'
                  onClick={() => handleSetCount("plus")}
                >
                  +
                </button>
              </div>
              <div className='add-order-or-cancel-btns'>
                <button
                  className='cancel-btn'
                  onClick={() => {
                    setIsModalOpen(false)
                    setCount(1)
                  }}
                >
                  キャンセル
                </button>
                <Link to="/">
                  <button
                    className='add-order-list-btn'
                    onClick={() => {
                      setIsModalOpen(false)
                      post("/add_order")
                    }}
                  >
                    リストに追加
                  </button>
                </Link>
              </div>
            </div>
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
              <img src={'storage/img/'+food.image} className="food-item-img" />
              <ul>
                <li>{food.name}</li>
                <li>{food.price}円</li>
              </ul>
            </div>
        </div>
        {modal}
      </div>
      );
}

export default Food;