

import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useApp } from '../../../contexts/AppContext';
import { usePopup } from '../../layouts/PopupManager';
import SideMenu from '../SideMenu/SideMenu';
import ChatApp from '../ChatApp/ChatApp';


const Header = ({ type = 'normal', title, onBack }) => {
  const { user, isAuthenticated } = useAuth();
  const { openPopup, closePopup } = usePopup();
  const { walletBalance } = useApp();

  const handleOpenMenu = () => {
    openPopup(
      <SideMenu onClose={closePopup} />,
      {
        contentClass: "menu", // Fixed: changed from "manu" to "memu"
        size: "fullscreen",
        position: "left",
        closeOnBackdrop: true,
        closeOnEscape: true,
        showBackdrop: true
      }
    );
  };


  // Example of opening chat support programmatically
// const { openPopup } = usePopup();

const handleOpenSupport = () => {
  openPopup(<ChatApp />, {
    contentClass: 'support-chat',
    size: 'medium'
  });
};

  console.log("walletBalance", openPopup, closePopup, walletBalance);

  if (type === 'promotion') {
    return (
      <header className="header-inner-promotion">
        <div className="header-left-btn-group promotion">
          <div className="page-main-close" onClick={onBack}></div>
          <div className="header-title">
            <p>{title}</p>
          </div>
        </div>
        
        {isAuthenticated && (
          <div className="header-wallet-info">
            <span>ব্যালেন্স: ৳{walletBalance.main.toFixed(2)}</span>
          </div>
        )}
      </header>
    );
  }

  return (
    <header className="header normal"  >
      <div className="header-left-btn-group" onClick={handleOpenMenu}>
        {/* <div className="back-btn" onClick={onBack}></div> */}
        <div className="menu-btn">
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
      
      <div className="logo" tabIndex="0">
        {isAuthenticated && user && (
          <div className="user-welcome">
            <span>স্বাগতম, {user.fullName}</span>
          </div>
        )}
      </div>
      
      <div className="header-right-btn-group">
        <a className="app-download" href="/bd/bn/app-download" target="_blank" rel="noopener noreferrer">
          <span className="item-icon app-download-icon"></span>
          <p>App</p>
        </a>
        
        <a className="service-btn" name="liveChatBtn" onClick={handleOpenSupport}>
          <span className="item-icon customer-icon"></span>
          <p>লাইভ চ্যাট</p>
        </a>
        
        {/* {isAuthenticated && (
          <div className="wallet-balance">
            <span>৳{walletBalance.main.toFixed(2)}</span>
          </div>
        )} */}
      </div>
    </header>
  );
};

export default Header;