import React, { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import { Link, useLocation } from "react-router-dom";

const EditMenu = (props) => {
    /**
     * カテゴリとそのカテゴリに属する料理の情報を含む配列
     * @type {array}
     * categories = [{"id" => 1, "category" => "おすすめ", "foods" => [{"food_id" => 1, "name" => "焼肉定食", image" => "...", "price" => 650}, "gross_profit" => 450, ...]
    */
    const categories = props.categories;
    /**
     * 初期値に選択した料理の情報を入れるために、ここで情報取得する
     * *food_info = {"food_id" => 1, "name" => "焼肉定食", image" => "...", "price" => 650, "gross_profit" => 450}
    */
    const location = useLocation();
    const food_info = location.state;
    /*元々選択されていたカテゴリを取得*/
    const this_food_categories = categories.reduce((result, category) => {
      const category_include_this_food = category.foods.some(food => food.name === food_info.name);
      if (category_include_this_food) {
        result.push({ "id": category.id, "category": category.category });
      }
      return result;
    }, []);
    /*idのみをふくむ配列を用意: this_food_category_id = [1, 3, 4]*/
    const this_food_category_id = this_food_categories.map((category) => {
        return category.id
    });
    /*初期値は元々メニューが持っている情報*/
    const {data, setData, post} = useForm({
        food_id: food_info.food_id,
        food_name: food_info.name,
        image_data: food_info.image,
        unit_price: food_info.price,
        gross_profit: food_info.gross_profit,
        category_id: this_food_category_id
    });
    
    const no_image_url = "https://formymobileorderapp.s3.ap-northeast-1.amazonaws.com/image/no_image.png";
    /*プレビューで表示する画像用のstate*/
    const [imageData, setImageData] = useState(food_info.image);
    /*原価を計算する用のstate*/
    const [costPrice, setCostPrice] = useState(food_info.price - food_info.gross_profit);
    /*カテゴリを増やした際にカテゴリの数をカウントするstate*/
    const [countSelectedCategory, setcountSelectedCategory] = useState(this_food_category_id.length);
    
    /*選択したカテゴリを保持するstate。複数のカテゴリを選択した時にどのカテゴリが選択されているかをis_selectedでチェックする*/
    /*this_food_category_id_setに含まれているカテゴリIDはis_selectedをtrueとする*/
    /*select_countは元々選択されていれば初期値を1とする*/
    const this_food_category_id_set = new Set(this_food_category_id)
    const [isSelectedCategory, setIsSelectedCategory] = useState(
        categories.map((category, index) => {
            return {
                id: category.id,
                name: category.category,
                is_selected: this_food_category_id_set.has(category.id),
                select_count: Number(this_food_category_id_set.has(category.id))
            }
        })
    );
    
    /*ファイルがアップロードされた時に、dataに画像名をセットし、プレビュー用にImageDataをセットする*/
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
    
    /*画像削除ボタンを押した時にno_imageの画像に置き換える*/
    const deleteImage = () => {
        setImageData(no_image_url)
        setData("image_data", "no_image.png")
    }
    
    /*単価と粗利をdataにセットするための関数*/
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
    /*プルダウンでカテゴリをクリックした時にはsideを"select"として、is_selectedをtrueに、select_countを1増やす*/
    /*プルダウンを押した際には一度リセットするためにsideを"unselect"として、is_selectedをfalseに、select_countを1減らす*/
    const handleSelectedCategory = (category_id, side) => {
        if (side == "select") {
            let updated_selected_category = isSelectedCategory.map((category) => (category["id"] === category_id ? {
                    id: category.id, 
                    name: category.name, 
                    is_selected: true, 
                    select_count: category.select_count + 1
                } 
            : category))
            /*どのカテゴリが選択されているかを保持しておくために更新したstateをセットする*/
            setIsSelectedCategory(updated_selected_category);
            /*現在選択されているカテゴリを更新し、dataにセットする*/
            handleDataCategoryId(updated_selected_category);
        } else if (side == "unselect") {
            let arr = [];
            /*複数のプルダウンで複数回同じカテゴリが選ばれている時、is_selectedはtrueのままselect_countを1減らす*/
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
            /*どのカテゴリが選択されているかを保持しておくために更新したstateをセットする*/
            setIsSelectedCategory(arr);
        }
    }
    
    /*選択されているカテゴリのカテゴリIDを取得して、dataにセットする関数*/
    const handleDataCategoryId = (updated_selected_category) => {
        let selected_category = updated_selected_category.filter(category => category["is_selected"] === true);
        const selected_category_id = selected_category.map((category) => {
            return category.id
        });
        setData(data => ({...data, category_id: selected_category_id}));
    }
    
    /*カテゴリの追加・削除を行う関数。削除は難しそうだったので保留*/
    /*カテゴリ追加ボタンを押した時に、sideをaddとしてis_selectedをtrueに、select_countを1増やす。また、プルダウンの数も増やす*/
    const handleCountSelectCategory = (side) => {
        if (side == "add" && countSelectedCategory < categories.length) {
            /*プルダウンの数を増やす用のstate更新*/
            setcountSelectedCategory(countSelectedCategory + 1);
            /*追加するプルダウンの初期値をcategory_idが1のものとするため、そのselect_countを1増やす*/
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
        this_food_category_id.map((each_category_id) => {
            categoryForm.push(
                <select 
                    className="category-select"
                    onFocus={(e) => handleSelectedCategory(Number(e.target.value), "unselect")}
                    onBlur={(e) => handleSelectedCategory(Number(e.target.value), "select")}
                >
                    {categories.map((category) => {
                        if (category.id === each_category_id) {
                            return <option value={category.id} selected>{category.category}</option>
                        } else {
                            return <option value={category.id} >{category.category}</option>
                        }
                    })}
                </select>
            );            
        })

        for (let i = 0; i < countSelectedCategory - this_food_categories.length; i++){
            categoryForm.push(
                <select 
                    className="category-select"
                    onFocus={(e) => handleSelectedCategory(Number(e.target.value), "unselect")}
                    onBlur={(e) => handleSelectedCategory(Number(e.target.value), "select")}
                >
                    {categories.map((category) => (
                        <option value={category.id}>{category.category}</option>
                    ))}
                </select>
            );
        }
        return <div>{categoryForm}</div>;
    }
    
    const deleteMenu = () => {
        router.delete(`/menu/${food_info.food_id}`, {
            onBefore: () => confirm("本当に削除しますか？"),
        })
    }
    
    return(
        <div className="content">
            <div className="add-food-info">
                <div className="add-food-name-form">
                    <h3 className="required">メニュー名</h3>
                    <input className="food-name-form" type="text" defaultValue={food_info.name} onChange={(e) => setData("food_name", e.target.value)}/>
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
                        defaultValue={food_info.price}
                        onChange={(e) => handlePriceAndProfit(Number(e.target.value), "unit_price")}
                    />円
                    <span className="error-message">{props.errors.unit_price}</span>
                </div>
                <div className="add-food-price">
                    <h3>原価</h3>
                    <input 
                        className="price-input-form"
                        type="text"
                        defaultValue={food_info.price - food_info.gross_profit}
                        onChange={(e) => handlePriceAndProfit(Number(e.target.value), "cost_price")}
                    />円
                    <span className="error-message">{props.errors.gross_profit}</span>
                </div>
                <div className="action-btn-wrapper">
                    <Link
                        to="/admin"
                        className="action-btn"
                        onClick={() => deleteMenu()}
                    >
                        <p>メニュー削除</p>
                    </Link>
                    <Link to="/admin" className="action-btn">
                        <p>キャンセル</p>
                    </Link>
                    <Link
                        to="/admin"
                        className="action-btn"
                        onClick={() => {
                            post("/update_menu")
                        }}
                    >
                        <p>変更</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default EditMenu;