import React from 'react';
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/admin">
                <div className="sidebar-item">
                    メニュー編集
                </div>
            </Link>
        </div>
        );
}

export default Sidebar;