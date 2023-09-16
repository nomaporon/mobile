import React, { useState } from 'react';
import AdminFood from '../../Components/AdminComponents/AdminFood';

const EditMenu = (props) => {
    const categories = props.categories;
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const menuIndex = categories[selectedCategoryId].foods;
    
    return(
        <div className="content">
            <div className="admin-category-header">
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
                    { menuIndex.map((food) => (
                        <AdminFood food={food} />
                    )) }
                </div>
            </div>
        </div>    
    );
}

export default EditMenu;