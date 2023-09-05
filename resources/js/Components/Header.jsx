import React from 'react';
import "../../css/app.css";

const Header = (props) => {
    return (
        <div className="header">
            <h1 className="title">{props.title}</h1>
        </div>
        );
}

export default Header;