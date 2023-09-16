import React, { useState } from 'react';
import Header from '../../Components/AppComponents/Header';
import Category from '../../Components/AppComponents/Category';
import Food from '../../Components/AppComponents/Food';

const Menu = (props) => {
    const categories = props.categories;
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const menuIndex = categories[selectedCategoryId].foods;
    
    return (
        <div>
            <Header title="メニュー一覧" />
            <div className="category-header">
                { categories.map((category) => (
                    <div 
                        className="category"
                        onClick={() => setSelectedCategoryId(category.id - 1)}
                    >
                        <Category category_name={category.category} />
                    </div>
                )) }
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