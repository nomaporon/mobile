import React, { useState } from 'react';
import { Link } from "react-router-dom";

const AdminFood = (props) => {
  /**
   * food = {"food_id" => 1, "name" => "焼肉定食", image" => "...", "price" => 650}
   * categories = [{"id" => 1, "category" => "おすすめ", "foods" => [{"food_id" => 1, "name" => "焼肉定食", image" => "...", "price" => 650}, ...]
  */
  const food = props.food;
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  
  return (
      <div className='admin-food-card-wrapper'>
        <div 
          className='admin-food-card'
          onClick={() => {
            setIsFoodModalOpen(true)
          }}
        >
            <div className='admin-food-item'>
              <img src={'storage/img/'+food.image} className="admin-food-item-img" />
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