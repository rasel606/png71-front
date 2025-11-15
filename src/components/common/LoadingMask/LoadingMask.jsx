// components/common/LoadingMask.jsx
import React from 'react';
import Logo from '../Logo/Logo';


const LoadingMask = ({ isLoading = true, message = "লোড হচ্ছে..." }) => {
  if (!isLoading) return null;

  return (
    <div 
      className="mcd-loading-mask ng-tns-c3120749333-2" 
      data-nghost-serverapp-c1952680815=""
    >
      <div className="loading-mask ng-star-inserted">
        <div className="loading-spinner"></div>
        <div className="loading-text"><Logo /> {message}</div>
      </div>
    </div>
  );
};

export default LoadingMask;