import React, { useState } from 'react';
import Food from './Food';

const Category = (props) => {
    const category = props.category_item
    console.log(category)
    const [isClickCategory, handleClickCategory] = useState(false);
    let category_index;
    if (isClickCategory) {
      category_index = (
        <div className="category-index">
          { category.foods.map((food) => (
              <div className="food">
                  <Food
                      food_name={food.name} 
                      food_price={food.price}
                  />
              </div>
          ) )}
        </div>
        );
    }
    
    return (
        <div
          className='category-item'
          onClick={() => {handleClickCategory(true)}}
        >
          <p>{category.category}</p>
          {category_index}
        </div>
        );
}

export default Category;