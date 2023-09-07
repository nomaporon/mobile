import React, { useState } from 'react';

const Category = (props) => {
    const category_name = props.category_name
    const [isClickCategory, handleClickCategory] = useState(false);
    
    return (
        <div
          className='category-item'
          onClick={() => {handleClickCategory(true)}}
        >
          <p>{category_name}</p>
        </div>
        );
}

export default Category;