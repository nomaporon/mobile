import React from 'react';
import "../../css/app.css";

const Footer = () => {
    return (
        <div className="footer">
            <a href="/">
                <div className="footer-item">メニュー</div>
            </a>
            <a href="/list"> 
                <div className="footer-item">注文リスト</div>
            </a>
            <a href="/history">
                <div className="footer-item">注文履歴・お会計</div>
            </a>
        </div>
        );
}

export default Footer;