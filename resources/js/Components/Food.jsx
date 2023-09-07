import React, { useState } from 'react';

const Food = (props) => {
    const food = props.food;
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    let modal;
    if (isModalOpen) {
      modal = (
        <div className='modal'>
          <div className='modal-inner'>
            <div className='modal-content'>
              <p>{food.name}</p>
              <p>{food.price}</p>
            </div>
            <button
              className='modal-close-btn'
              onClick={() => setIsModalOpen(false)}
            >
              とじる
            </button>
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