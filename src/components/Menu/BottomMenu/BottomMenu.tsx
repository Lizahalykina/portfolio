import React from 'react';
import './BottomMenu.css';
import ActionMenu from '../ActionMenu/ActionMenu';
import ItemsMenu from '../ItemsMenu/ItemsMenu';

const BottomMenu: React.FC = () => {
  return (
    <div className="bottom-menu-container">
      <img src="/assets/BottomMenu.png" alt="Bottom Menu" className="bottom-menu-background" />
      <div className="bottom-menu-items">
        <ActionMenu/>
        {/* <ItemsMenu/>
        <button className="next-button">Next</button> */}
      </div>
    </div>
  );
};

export default BottomMenu;
