import React from 'react';
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";
import "../../css/app.css";

const Footer = () => {
    return (
        <footer>
            <NavLink to="/">
                <div className="footer-item">
                    メニュー
                </div>
            </NavLink>
            <NavLink to="/list">
                <div className="footer-item">
                    注文リスト
                </div>
            </NavLink>
            <NavLink to="/history">
                <div className="footer-item">
                    注文履歴・お会計
                </div>
            </NavLink>
        </footer>
        );
}

export default Footer;