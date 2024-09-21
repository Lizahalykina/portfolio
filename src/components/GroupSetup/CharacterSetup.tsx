import Elements, { ElementType, SetupElementType } from '../Elements/Elements';

const characterElements: ElementType[] = [
  {
    style: { top: '20%', left: '41%', width: '270px', zIndex: '4' },
    image: '/assets/Avatar.png',
    name: 'This is me!',
    description: 'Probably working on fixing this portfolio page'
  },
  {
    style: { top: '25%', left: '68%', width: '200px', zIndex: '3' },
    image: '/assets/Computer.png',
    name: 'Computer screen',
    description: 'I can work on anything and anywhere, but I prefer my home 49 inch screen setup with a drawing pad. My projects often require working simultaniously in different software applications, so this helps me see everything at once.'
  },
  {
    style: { top: '45%', left: '55%', width: '320px', zIndex: '2' },
    image: '/assets/Desk.png',
    name: 'Desk',
    description: 'A standard desk'
  },
  {
    style: { top: '40%', left: '70%', width: '280px', zIndex: '5' },
    image: '/assets/DrawerUnit.png',
    name: 'Drawer Unit',
    description: 'A storage drawer unit'
  }
];


const CharacterSetup = () => {
  const setupPosition : SetupElementType = { top: '0%', left: '0%', width: '100%', position: 'absolute' };

  return (
    <Elements elements={characterElements} style={setupPosition}/>
  );
};

export default CharacterSetup;
