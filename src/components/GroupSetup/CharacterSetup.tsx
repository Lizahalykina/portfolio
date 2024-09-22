import Elements, { ElementType, SetupElementType } from '../Elements/Elements';

const characterElements: ElementType[] = [
  {
    style: { top: '15%', left: '41%', width: '280px', zIndex: '4' },
    image: '/assets/Avatar.png',
    name: 'This is me!',
    description: 'Probably working on fixing this portfolio page'
  },
  {
    style: { top: '18%', left: '68%', width: '240px', zIndex: '3' },
    image: '/assets/Computer.png',
    name: 'Computer screen',
    description: 'I can work on anything and anywhere, but I prefer my home 49 inch screen setup with a drawing pad. My projects often require working simultaniously in different software applications, so this helps me see everything at once.'
  },
  {
    style: { top: '42%', left: '55%', width: '350px', zIndex: '2' },
    image: '/assets/Desk.png',
    name: 'Desk',
    description: 'A standard desk'
  },
];


const CharacterSetup = () => {
  const setupPosition : SetupElementType = { top: '0%', left: '0%', width: '100%', position: 'absolute' };

  return (
    <Elements elements={characterElements} style={setupPosition}/>
  );
};

export default CharacterSetup;
