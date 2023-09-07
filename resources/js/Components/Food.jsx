import React, { useState } from 'react';

const Food = (props) => {
    const food = props.food;
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    let modal;
    
    return (
        <div className='food-card'>
            <div className='food-item'>
                <p>{food.name}</p>
                <p>{food.price}</p>
            </div>
        </div>
        );
    
}

export default Food;