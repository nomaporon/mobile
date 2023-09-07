import React, { useState } from 'react';

const Category = (props) => {
    const category_name = props.category_name
    
    return (
        <div className='category-item'>
          <p>{category_name}</p>
        </div>
        );
}

export default Category;