import React from 'react';
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/admin">
                <div className="sidebar-item">
                    <p>メニュー編集</p>
                </div>
            </Link>
        </div>
        );
}

export default Sidebar;