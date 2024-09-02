import React from 'react';
import './ItemsMenu.css';

const ItemsMenu: React.FC = () => {
  return (
    <div className="items-menu-container">
        <div className="items-container">
            <img src="/assets/Calendar.png" alt="Item Picture" className="item-picture" />
            <img src="/assets/Cube.png" alt="Item Picture" className="item-picture" />
            <img src="/assets/MagnifyingGlass.png" alt="Item Picture" className="item-picture" />
            <img src="/assets/StickyNotes.png" alt="Item Picture" className="item-picture" />
            </div>
    </div>
  );
};

export default ItemsMenu;
