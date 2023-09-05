import React, { useState } from 'react';

const Food = (props) => {
    const name = props.food_name;
    const price = props.food_price;
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    let modal;
    
    return (
        <div className='food-card'>
            <div
                className='food-item'
                onClick={() => {this.handleClickLesson()}}
            >
                <p>{name}</p>
                <p>{price}</p>
            </div>
        </div>
        );
    
}

export default Food;