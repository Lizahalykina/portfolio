import Elements, { ElementType, SetupElementType } from '../Elements/Elements';

const wallElements: ElementType[] = [
  { 
    style: { top: '2%', left: '72%', width: '250px', zIndex: '1' }, 
    image: '/assets/ShelfDecor.png', 
    name: 'Shelf', 
    description: 'shelf' 
  },
  { 
    style: { top: '30%', left: '61%', width: '380px', zIndex: '1' }, 
    image: '/assets/Cabinet.png', 
    name: 'Cabinet', 
    description: 'cabinet' 
  },
  { 
    style: { top: '8%', left: '62%', width: '80px', zIndex: '1' }, 
    image: '/assets/Calendar.png', 
    name: 'Calendar', 
    description: 'calendar' 
  },
  { 
    style: { top: '20%', left: '61%', width: '60px', zIndex: '1' }, 
    image: '/assets/StickyNotes.png', 
    name: 'Sticky Notes', 
    description: 'sticky notes' 
  },
  { 
    style: { top: '40%', left: '0%', width: '250px', zIndex: '1' }, 
    image: '/assets/Piano.png', 
    name: 'Piano', 
    description: 'piano' 
  },
  { 
    style: { top: '0%', left: '0%', width: '250px', zIndex: '1' }, 
    image: '/assets/Bookshelf.png', 
    name: 'Bookshelf', 
    description: 'bookshelf' 
  }
];

const WallSetup = () => {
  const setupPosition : SetupElementType = { top: '0%', left: '0%', width: '100%', position: 'absolute' };

  return (
    <Elements elements={wallElements} style={setupPosition}/>
  );
};

export default WallSetup;
