import React, { useState } from "react";
import { Link } from "react-router-dom";

export const AdminFood = (props) => {
  /**
   * food = {"food_id" => 1, "name" => "焼肉定食", image" => "...", "price" => 650, "gross_profit" => 450}
   * categories = [{"id" => 1, "category" => "おすすめ", "foods" => [{"food_id" => 1, "name" => "焼肉定食", image" => "...", "price" => 650, "gross_profit" => 450}, ...]
  */
  const food = props.food;
  
  return (
      <div className="admin-food-card-wrapper">
        <Link to="/edit" state={food} className="admin-food-card">
            <div className="admin-food-item">
              <img src={food.image} className="admin-food-item-img" />
              <ul>
                <li>{food.name}</li>
                <li>{food.price}円</li>
              </ul>
            </div>
        </Link>
      </div>
      );
}

export default AdminFood;