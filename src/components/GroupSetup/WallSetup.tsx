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
    style: { top: '5%', left: '62%', width: '80px', zIndex: '1' }, 
    image: '/assets/Calendar.png', 
    name: 'Calendar', 
    description: 'Calendar represents my how organised I am' 
  },
  { 
    style: { top: '16%', left: '62%', width: '65px', zIndex: '10' }, 
    image: '/assets/StickyNotes.png', 
    name: 'Sticky Notes', 
    description: 'As I am on a junior part of my journey as a developer, I am in a contant learning mode. Visual aids like sticky notes helped a lot with my process' 
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
  // { 
  //   style: { top: '0%', left: '0%', width: '250px', zIndex: '1' }, 
  //   image: '/assets/ArtSupplies.png', 
  //   name: 'Art Supplies', 
  //   description: 'I do have an extensive background in creative industries and it is still an important part of my life. I host monthly Art Meetups in London. Here is the website I made for it- check it out!' 
  // }
];

const WallSetup = () => {
  const setupPosition : SetupElementType = { top: '0%', left: '0%', width: '100%', position: 'absolute' };

  return (
    <Elements elements={wallElements} style={setupPosition}/>
  );
};

export default WallSetup;
