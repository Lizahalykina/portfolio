import Elements, { ElementType, SetupElementType } from '../Elements/Elements';
import './DrawerSetup.css';

const drawerElement: ElementType[] = [
    {
        style: { top: '69%', left: '80%', width: '144px', zIndex: '10' },
        image: '/assets/ArtSupplies.png',
        name: 'Art Supplies',
        description: 'I do have an extensive background in arts and it is still an important part of my life. I used to host monthly Art tours in London, as well as masterclasses and live drawing events.'
    },
    {
        style: { top: '48%', left: '75%', width: '32px', zIndex: '10' },
        image: '/assets/PencilHolder.png',
        name: 'Pencil Holder',
        description: 'Pencil Holder'
    },
    { 
        style: { top: '48%', left: '80%', width: '88px', zIndex: '9' }, 
        image: '/assets/Camera.png', 
        name: 'Camera', 
        description: 'Camera' 
    }, 
    {
        style: { top: '55%', left: '72%', width: '176px', zIndex: '8' },
        image: '/assets/DrawerUnitTopLayerFront.png',
        name: 'Drawer Unit Top Front',
        description: 'Viewer facing side of the drawer unit'
    },
    {
        style: { top: '77.2%', left: '70%', width: '88px', zIndex: '7' },
        image: '/assets/LowerDrawerFront.png',
        name: 'Lower Drawer Front',
        description: 'Animated drawer',
        classname: 'drawer'
    },
    {
        style: { top: '76%', left: '71%', width: '52px', zIndex: '6' },
        image: '/assets/FolderFile.png',
        name: 'Lower Drawer Folderfile',
        description: 'Folder',
        classname: 'drawer'
    },
    {
        style: { top: '55%', left: '72%', width: '176px', zIndex: '5' },
        image: '/assets/DrawerUnitTopLayer.png',
        name: 'Drawer Unit Top',
        description: 'Main layer for the drawer unit',
    },
    {
        style: { top: '55%', left: '72%', width: '176px', zIndex: '1' },
        image: '/assets/DrawerUnitLowerLayer.png',
        name: 'Drawer Unit Lower',
        description: 'Base for the drawer unit'
    },

  
  
];


const DrawerSetup = () => {
  const setupPosition : SetupElementType = { top: '0%', left: '0%', width: '100%', position: 'absolute' };

  return (
    <Elements elements={drawerElement} style={setupPosition}/>
  );
};

export default DrawerSetup;
