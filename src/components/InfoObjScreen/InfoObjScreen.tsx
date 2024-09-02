import React from 'react';
import './InfoObjScreen.css';

interface InfoObjScreenType {
   onClose: () => void;
   objName: string;
   objDescription: string;
}

const InfoObjScreen = ({ onClose, objName, objDescription} : InfoObjScreenType) => {
  return (
    <div className="info-screen">
      <div className="info-content">
        <h5>{objName}</h5>
        <p>{objDescription}</p>
        <button onClick={onClose}>close</button>
      </div>
    </div>
  );
};

export default InfoObjScreen;
