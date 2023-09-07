import React, { useState } from 'react';
import Header from '../../Components/Header';
import Category from '../../Components/Category';
import Food from '../../Components/Food';
import "../../../css/app.css";

const Index = (props) => {
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
                        onClick={() => setSelectedCategoryId(parseInt(category.id) - 1)}
                    >
                        <Category
                            category_name={category.category} 
                        />
                    </div>
                )) }
            </div>
            <div className="menu-index">
                { menuIndex.map((food) => (
                    <Food
                        food={food}
                    />
                )) }
            </div>
        </div>
        );
        
}

export default Index;