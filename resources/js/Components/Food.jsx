import React, { useState } from 'react';

const Food = (props) => {
    const food = props.food;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [count, setCount] = useState(1);
    
    let modal;
    if (isModalOpen) {
      modal = (
        <div className='modal'>
          <div className='modal-inner'>
            <div className='modal-content'>
              <p>{food.name}</p>
              <p>{food.price}</p>
            </div>
            <div className='counter'>
              <button
                className='count-btn'
                onClick={() => setCount(count - 1)}
              >
                -
              </button>
              <p>{count}</p>
              <button
                className='count-btn'
                onClick={() => setCount(count + 1)}
              >
                +
              </button>
            </div>
            <div className='add-order-or-cancel-btns'>
              <button
                className='cancel-btn'
                onClick={() => setIsModalOpen(false)}
              >
                キャンセル
              </button>
              <button
                className='add-order-list-btn'
              >
                注文リストに追加
              </button>
            </div>
          </div>
        </div>
      );
    }
    
    return (
        <div className='food-card'>
            <div 
                className='food-item'
                onClick={() => setIsModalOpen(true)}
            >
                <p>{food.name}</p>
                <p>{food.price}</p>
            </div>
            {modal}
        </div>
        );
    
}

export default Food;