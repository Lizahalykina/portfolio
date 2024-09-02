import { useState } from 'react';
import { ElementType } from '../Elements';
import InfoObjScreen from '../../InfoObjScreen/InfoObjScreen';

const Element = ({image, style, name, description} : ElementType) => {

  const [showInfoScreen, setShowInfoScreen] = useState(false);
  const openInfoScreen = () => {setShowInfoScreen(true)}
  const closeInfoScreen = () => {setShowInfoScreen(false)}

  return (
    <div style={{ top: style.top, left: style.left, position: 'absolute' , zIndex: style.zIndex }}>
      {showInfoScreen && <InfoObjScreen onClose={closeInfoScreen} objName={name} objDescription={description}/>}
      <img src={image} alt={image} style={{width: style.width }} onClick={openInfoScreen}/>
    </div>
  );
};

export default Element;
