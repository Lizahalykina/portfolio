import Elements, { ElementType, SetupElementType } from '../Elements/Elements';
import StickyNoteScreen from '../StickyNoteScreen/StickyNoteScreen';

interface WallSetupProps {
  onOpenStickyNoteScreen?: () => void;
}

const WallSetup = ({ onOpenStickyNoteScreen }: WallSetupProps) => {
  const wallElements: ElementType[] = [
    { 
      style: { top: '2%', left: '72%', width: '200px', zIndex: '1' }, 
      image: '/assets/ShelfDecor.png', 
      name: 'Shelf', 
      description: 'Where I keep things organized' 
    },
    { 
      style: { top: '38%', left: '60%', width: '280px', zIndex: '0' }, 
      image: '/assets/Cabinet.png', 
      name: 'Cabinet', 
      description: 'More storage space' 
    },
    { 
      style: { top: '5%', left: '62%', width: '64px', zIndex: '1' }, 
      image: '/assets/Calendar.png', 
      name: 'Calendar', 
      description: 'Helps me keep track of deadlines and meetings' 
    },
    { 
      style: { top: '16%', left: '62%', width: '52px', zIndex: '10' }, 
      image: '/assets/StickyNotes.png', 
      name: 'Sticky Notes', 
      element: <StickyNoteScreen open={false} />,
      description: 'Visual reminders help when information doesn\'t stick. Click to see my collection of silly mistakes and tips.' 
    },
    {
      style: { top: '28.5%', left: '5%', width: '32px', zIndex: '9' },
      image: '/assets/LavaLamp.png',
      name: 'Lava Lamp',
      description: 'Good for focus sessions. The movement is oddly calming.'
    },
    { 
      style: { top: '39%', left: '0%', width: '224px', zIndex: '1' }, 
      image: '/assets/Piano.png', 
      name: 'Piano', 
      audio: '/assets/PianoLoop.mp3',
      description: 'Spent years playing piano, but these days the computer keyboard gets more attention.' 
    },
    { 
      style: { top: '18%', left: '5%', width: '176px', zIndex: '1' }, 
      image: '/assets/FilmPoster.png', 
      name: 'Film Poster', 
      description: 'Poster for The Dunns of Brixton. I designed, hand-drew, and animated the full visual package—poster, title sequence, and all marketing materials. Available on Amazon if you\'re curious.' 
    },
    { 
      style: { top: '-4.4%', left: '0.5%', width: '192px', zIndex: '1' }, 
      image: '/assets/Bookshelf.png', 
      name: 'Bookshelf', 
      description: 'Mix of design books, coding references, science-fiction, and politics' 
    }
  ];

  const setupPosition : SetupElementType = { top: '0%', left: '0%', width: '100%', position: 'absolute' };

  return (
    <Elements elements={wallElements} style={setupPosition} onOpenStickyNoteScreen={onOpenStickyNoteScreen}/>
  );
};

export default WallSetup;