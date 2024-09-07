import React from 'react';
import './SideMenu.css';
import ItemsMenu from '../ItemsMenu/ItemsMenu';

const SideMenu: React.FC = () => {
  return (
    <div className="side-menu-container">
      <div className="side-menu-items">
        <ItemsMenu/>
      </div>
    </div>
  );
};

export default SideMenu;
