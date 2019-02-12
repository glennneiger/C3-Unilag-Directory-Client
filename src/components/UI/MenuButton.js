import React from 'react';

const menuButton = (props) => {
  return (
      <button className="menu-button" onClick={props.toggleSidebar}>
         <div className="menu-button-line"></div>
         <div className="menu-button-line"></div>
         <div className="menu-button-line"></div>
      </button>
  );
};

export default menuButton;