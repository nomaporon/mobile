import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Link, useLocation } from "react-router-dom";

const AddCategory = (props) => {
    const {data, setData, post} = useForm({
        name: ""
    })
    
    return(
        <div className="content">
            <div className="add-food-info">
                <div className="add-food-name-form">
                    <h3 className="required">カテゴリ名</h3>
                    <input className="food-name-form" type="text" onChange={(e) => setData("name", e.target.value)}/>
                    <span className="error-message">{props.errors.category_name}</span>
                </div>
                <div className="action-btn-wrapper">
                    <Link to="/admin" className="action-btn">
                        <p>キャンセル</p>
                    </Link>
                    <Link
                        to="/admin"
                        className="action-btn"
                        onClick={() => {
                            post("/add_category")
                        }}
                    >
                        <p>追加</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AddCategory;