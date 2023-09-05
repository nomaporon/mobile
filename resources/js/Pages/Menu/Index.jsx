import React from 'react';
import Header from '../../Components/Header';
import Category from '../../Components/Category';
import "../../../css/app.css";

const Index = (props) => {
    const categories = props.categories;
    console.log(categories)
    
    return (
        <div>
            <Header title="メニュー一覧" />
            <div className="category-header">
                { categories.map((category) => (
                    <div className="category">
                        <Category
                            category_item={category} 
                        />
                    </div>
                ) )}
            </div>
        </div>
        );
}

export default Index;