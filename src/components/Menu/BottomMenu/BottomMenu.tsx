import React from 'react';
import './BottomMenu.css';
import ActionMenu from '../ActionMenu/ActionMenu';
import ItemsMenu from '../ItemsMenu/ItemsMenu';

const BottomMenu= () => {
  return (
    <div className="bottom-menu-container">
      <div className="bottom-menu-items">
        <ActionMenu/>
        <ItemsMenu/>
        {/* <button className="next-button">Next</button> */}
      </div>
    </div>
  );
};

export default BottomMenu;
