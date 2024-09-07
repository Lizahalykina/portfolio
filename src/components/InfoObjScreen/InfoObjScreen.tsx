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
        <h5>{objName}</h5>
        <p>{objDescription}</p>
        <button onClick={onClose}>close</button>
      </div>
  );
};

export default InfoObjScreen;
