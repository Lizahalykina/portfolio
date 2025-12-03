import React from 'react';
import './BottomMenu.css';
import ActionMenu from '../ActionMenu/ActionMenu';
import ItemsMenu from '../ItemsMenu/ItemsMenu';

interface BottomMenuProps {
  startActionAnimation?: boolean;
}

const BottomMenu: React.FC<BottomMenuProps> = ({ startActionAnimation = false }) => {
  return (
    <div className="bottom-menu-container">
      <div className="bottom-menu-items">
        <ActionMenu startAnimation={startActionAnimation} />
        <ItemsMenu/>
        {/* <button className="next-button">Next</button> */}
      </div>
    </div>
  );
};

export default BottomMenu;
