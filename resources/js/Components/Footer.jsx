import React from 'react';
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";
import "../../css/app.css";

const Footer = () => {
    return (
        <footer>
            <div className="footer-item">
                <NavLink to="/">メニュー</NavLink>
            </div>
            <div className="footer-item">
                <NavLink to="/list">注文リスト</NavLink>
            </div>
            <div className="footer-item">
                <NavLink to="/history">注文履歴・お会計</NavLink>
            </div>
        </footer>
        );
}

export default Footer;