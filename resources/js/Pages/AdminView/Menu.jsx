import React, { useState } from 'react';
import { Link } from "react-router-dom";
import AdminFood from '../../Components/AdminComponents/AdminFood';

const Menu = (props) => {
    /**
     * categories = [{"id" => 1, "category" => "おすすめ", "foods" => [{"food_id" => 1, "name" => "焼肉定食", image" => "...", "price" => 650}, ...]
    */
    const categories = props.categories;
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const menuIndex = categories[selectedCategoryId].foods;
      
    return(
        <div className="content">
            <div className="admin-category-header">
                <div className="add-admin-category">
                    <p>+ カテゴリー追加</p>
                </div>
                { categories.map((category) => (
                    <div 
                        className="admin-category"
                        onClick={() => setSelectedCategoryId(category.id - 1)}
                    >
                        <p>{category.category}</p>
                    </div>
                )) }
            </div>
            <div className="admin-menu">
                <div className="admin-food-cards-wrapper">
                    <div className="admin-card-wrapper">
                        <Link to="/add">
                            <div className="add-admin-food">
                                <p>+ メニュー追加</p>
                            </div>
                        </Link>
                    </div>
                    <div className='admin-card-wrapper'>
                        <div className="delete-admin-food">
                            <p>- メニュー削除</p>
                        </div>
                    </div>
                    { menuIndex.map((food) => (
                        <AdminFood food={food}/>
                    )) }
                </div>
            </div>
        </div>    
    );
}

export default Menu;