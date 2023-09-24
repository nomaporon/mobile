import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const AddMenu = (props) => {
    /**
     * categories = [{"id" => 1, "category" => "おすすめ", "foods" => [{"food_id" => 1, "name" => "焼肉定食", image" => "...", "price" => 650}, ...]
    */
    const categories = props.categories;
    const {data, setData, post} = useForm({
      food_name: null,
      image_data: null,
      unit_price: null,
      gross_profit: null,
      category_id: 1
    });
    const [imageData, setImageData] = useState("storage/img/no_image.png");
    
    const onFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            let file = files[0];
            let reader = new FileReader();
            reader.onloadend = (e) => {
                setImageData(e.target.result)
            }
            reader.readAsDataURL(file)
            setData("image_data", file)
        }
    }
    console.log(props)
    return(
        <div className="content">
            <div className="add-food-info">
                <div className="add-food-name-form">
                    <h3 className="required">メニュー名</h3>
                    <input className="food-name-form" type="text" onChange={(e) => setData("food_name", e.target.value)}/>
                    <span className="error-message">{props.errors.food_name}</span>
                </div>
                <div className="add-food-img-form">
                    <h3>メニュー写真</h3>
                    <img src={imageData} className="add-food-img" />
                    <input
                        className="change-food-img-btn"
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => onFileChange(e)}
                    />
                    <span className="error-message">{props.errors.image_data}</span>
                </div>
                <div className="add-food-category-form">
                    <h3>カテゴリ名</h3>
                    <select className="category-select" onChange={(e) => setData("category_id", Number(e.target.value))}>
                    {categories.map((category) => (
                      <option value={category.id}>{category.category}</option>
                    ))}
                    </select>
                </div>
                <div className="add-food-price">
                    <h3 className="required">金額</h3>
                    <input className="price-input-form" type="text" onChange={(e) => setData("unit_price", Number(e.target.value))}/>円
                    <span className="error-message">{props.errors.unit_price}</span>
                </div>
                <div className="add-food-price">
                    <h3>原価</h3>
                    <input className="price-input-form" type="text" onChange={(e) => setData("gross_profit", data.unit_price - Number(e.target.value))}/>円
                    <span className="error-message">{props.errors.gross_profit}</span>
                </div>
                <div className="action-btn-wrapper">
                    <div className="action-btn">
                        <p>キャンセル</p>
                    </div>
                    <div 
                        className="action-btn"
                        onClick={() => {
                            post("/add_menu")
                        }}
                    >
                        <p>追加</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddMenu;