import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Link } from "react-router-dom";

const AdminFood = (props) => {
  const food = props.food;
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
      <div className='admin-food-card-wrapper'>
        <div 
          className='admin-food-card'
          onClick={() => {
            setIsModalOpen(true)
          }}
        >
            <div className='admin-food-item'>
              <img src={'img/'+food.image} className="admin-food-item-img" />
              <ul>
                <li>{food.name}</li>
                <li>{food.price}円</li>
              </ul>
            </div>
        </div>
      </div>
      );
}

export default AdminFood;