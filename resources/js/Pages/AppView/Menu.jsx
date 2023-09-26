import React, { useState } from 'react';
import Header from '../../Components/AppComponents/Header';
import Category from '../../Components/AppComponents/Category';
import Food from '../../Components/AppComponents/Food';

const Menu = (props) => {
    const categories = props.categories;
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const menuIndex = categories[selectedCategoryId].foods;
    
    return (
        <div className="app">
            <Header title="メニュー一覧" />
            <div className="category-header">
                <ul>
                    { categories.map((category) => (
                        <li onClick={() => setSelectedCategoryId(category.id - 1)}>
                            {category.category}
                        </li>
                    )) }
                </ul>
            </div>
            <div className="menu-index">
                <div className="food-cards-wrapper">
                    { menuIndex.map((food) => (
                        <Food food={food} />
                    )) }
                </div>
            </div>
        </div>
        );
}

export default Menu;