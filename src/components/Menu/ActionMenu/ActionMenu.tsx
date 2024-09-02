import React, { useEffect, useState } from 'react';
import './ActionMenu.css';

const ActionMenu: React.FC = () => {

  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTextVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="action-menu-container">
        <img src="/assets/TaskPicture.png" alt="Task Picture" className="task-picture" />
        <div className="action-task">
          <h3>Here is your first task.</h3>
          <p>Find all the elemenent. </p>
        </div>
    </div>
  );
};

export default ActionMenu;
