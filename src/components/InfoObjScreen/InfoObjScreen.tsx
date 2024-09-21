import React from 'react';
import './InfoObjScreen.css';

interface InfoObjScreenType {
   onClose: () => void;
   objName: string;
   objDescription: string;
}

const InfoObjScreen = ({ onClose, objName, objDescription} : InfoObjScreenType) => {
  return (
      <div className="info-objContent">
        <h3>{objName}</h3>
        <p>{objDescription}</p>
        <button onClick={onClose}>close</button>
      </div>
  );
};

export default InfoObjScreen;
