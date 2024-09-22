import Elements, { ElementType, SetupElementType } from '../Elements/Elements';
import StickyNoteScreen from '../StickyNoteScreen/StickyNoteScreen';

const wallElements: ElementType[] = [
  { 
    style: { top: '2%', left: '72%', width: '250px', zIndex: '1' }, 
    image: '/assets/ShelfDecor.png', 
    name: 'Shelf', 
    description: 'shelf' 
  },
  { 
    style: { top: '38%', left: '60%', width: '350px', zIndex: '0' }, 
    image: '/assets/Cabinet.png', 
    name: 'Cabinet', 
    description: 'Cabinet' 
  },
  { 
    style: { top: '5%', left: '62%', width: '80px', zIndex: '1' }, 
    image: '/assets/Calendar.png', 
    name: 'Calendar', 
    description: 'Calendar represents how organised I am' 
  },
  { 
    style: { top: '16%', left: '62%', width: '65px', zIndex: '10' }, 
    image: '/assets/StickyNotes.png', 
    name: 'Sticky Notes', 
    element: <StickyNoteScreen open={false} />,
    description: 'As I am on a junior part of my journey as a developer, I am in a contant learning mode. Visual aids like sticky notes helped a lot with my process' 
  },
  {
    style: { top: '28.5%', left: '5%', width: '40px', zIndex: '9' },
    image: '/assets/LavaLamp.png',
    name: 'Lava Lamp',
    description: 'Lava Lamp'
  },
  { 
    style: { top: '39%', left: '0%', width: '280px', zIndex: '1' }, 
    image: '/assets/Piano.png', 
    name: 'Piano', 
    audio: '/assets/PianoLoop.mp3',
    description: 'piano' 
  },
  { 
    style: { top: '18%', left: '5%', width: '220px', zIndex: '1' }, 
    image: '/assets/FilmPoster.png', 
    name: 'Film Poster', 
    description: 'Poster of the film I helped designed a few years ago. It is called The Dunns of Brixton, its on Amazon, feel free to check it out!' 
  },
  { 
    style: { top: '-4.4%', left: '0.5%', width: '240px', zIndex: '1' }, 
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