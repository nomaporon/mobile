import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Link } from "react-router-dom";

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
      category_id: [1]
    });
    const [imageDataURL, setImageDataURL] = useState("storage/img/no_image.png");/*画像のURLを保持するstate*/
    const [costPrice, setCostPrice] = useState(null); /*原価を取得するstate。粗利を計算するために使う*/
    const [countSelectedCategory, setcountSelectedCategory] = useState(1); /*増やしたカテゴリフォームをカウントするstate*/
    /*選択したカテゴリを保持するstate。複数のカテゴリを選択した時にどのカテゴリが選択されているかをis_selectedでチェックする*/
    const [isSelectedCategory, setIsSelectedCategory] = useState(
        categories.map((category, index) => {
            return {
                id: category.id,
                name: category.category,
                is_selected: index === 0,
                select_count: Number(index === 0)
            }
        })
    );
    
    /*ファイルアップロード時にプレビューできるようにし、画像データをimage_dataにセット*/
    const onFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            let file = files[0];
            let reader = new FileReader();
            reader.onloadend = (e) => {
                setImageDataURL(e.target.result)
            }
            reader.readAsDataURL(file)
            setData("image_data", file)
        }
    }
    
    const deleteImage = () => {
        setImageDataURL("storage/img/no_image.png")
        setData("image_data", "no_image.png")
    }
    
    /*unit_priceとgross_profitを計算してセットする関数*/
    const handlePriceAndProfit = (price, side) => {
        if (side == "unit_price") {
            setData(data => ({...data, unit_price: price}));
            setData(data => ({...data, gross_profit: price - costPrice}));
        } else if (side == "cost_price") {
            setCostPrice(price)
            setData("gross_profit", data.unit_price - price)
        }
    }
    
    /*どのカテゴリを選択したか判別する変数を管理する関数*/
    const handleSelectedCategory = (category_id, side) => {
        if (side == "select") {
            let updated_selected_category = isSelectedCategory.map((category) => (category["id"] === category_id ? {
                    id: category.id, 
                    name: category.name, 
                    is_selected: true, 
                    select_count: category.select_count + 1
                } 
            : category))
            setIsSelectedCategory(updated_selected_category);
            handleDataCategoryId(updated_selected_category);
        } else if (side == "unselect") {
            let arr = [];
            isSelectedCategory.map((category) => {
                if (category["select_count"] === 1 && category["id"] === category_id) {
                    arr.push({
                        id: category.id, 
                        name: category.name, 
                        is_selected: false,
                        select_count: category.select_count - 1
                    });
                } else if (category["select_count"] > 1 && category["id"] === category_id) {
                    arr.push({
                         id: category.id, 
                         name: category.name, 
                         is_selected: true,
                         select_count: category.select_count - 1
                    });
                } else {
                    arr.push(category)
                }
            });
            setIsSelectedCategory(arr);
        }
    }
    
    const handleDataCategoryId = (updated_selected_category) => {
        let selected_category = updated_selected_category.filter(category => category["is_selected"] === true);
        const selected_category_id = selected_category.map((category) => {
            return category.id
        });
        setData(data => ({...data, category_id: selected_category_id}));
    }
    
    /*カテゴリの追加・削除を行う関数。削除は難しそうだったので保留*/
    const handleCountSelectCategory = (side) => {
        if (side == "add" && countSelectedCategory < categories.length) {
            setcountSelectedCategory(countSelectedCategory + 1);
            let updated_selected_category = isSelectedCategory.map((category) => (category["id"] === 1 ? {
                    id: category.id, 
                    name: category.name, 
                    is_selected: true,
                    select_count: category.select_count + 1
                } 
            : category))
            setIsSelectedCategory(updated_selected_category);
            handleDataCategoryId(updated_selected_category);
        } else if (side == "delete" && countSelectedCategory > 1) {
            setcountSelectedCategory(countSelectedCategory - 1);
        }
    }
    
    /*カテゴリを追加・削除した時にプルダウンの数を変更する関数*/
    const handleSelectCategoryForm = () => {
        let categoryForm = [];
        for (let i = 0; i < countSelectedCategory; i++){
            categoryForm.push(
                <select 
                    className="category-select"
                    onFocus={(e) => handleSelectedCategory(Number(e.target.value), "unselect")}
                    onBlur={(e) => handleSelectedCategory(Number(e.target.value), "select")}
                >
                    {isSelectedCategory.map((category) => (
                        <option value={category.id}>{category.name}</option>
                    ))}
                </select>
            );
        }
        return <div>{categoryForm}</div>;
    }
    
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
                    <img src={imageDataURL} className="add-food-img" />
                    <input
                        className="change-food-img-btn"
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => onFileChange(e)}
                    />
                    <span className="error-message">{props.errors.image_data}</span>
                    <button className="delete-food-img-btn" onClick={() => deleteImage()}>写真を削除</button>
                </div>
                <div className="add-food-category-form">
                    <h3>カテゴリ名</h3>
                    {handleSelectCategoryForm()}
                    <button className="add-category-btn" onClick={() => handleCountSelectCategory("add")}>カテゴリを追加</button>
                </div>
                <div className="add-food-price">
                    <h3 className="required">金額</h3>
                    <input 
                        className="price-input-form"
                        type="text"
                        onChange={(e) => handlePriceAndProfit(Number(e.target.value), "unit_price")}
                    />円
                    <span className="error-message">{props.errors.unit_price}</span>
                </div>
                <div className="add-food-price">
                    <h3>原価</h3>
                    <input 
                        className="price-input-form"
                        type="text"
                        onChange={(e) => handlePriceAndProfit(Number(e.target.value), "cost_price")}
                    />円
                    <span className="error-message">{props.errors.gross_profit}</span>
                </div>
                <div className="action-btn-wrapper">
                    <Link to="/admin" className="action-btn">
                        <div>
                            <p>キャンセル</p>
                        </div>
                    </Link>
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