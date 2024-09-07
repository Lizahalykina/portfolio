import Elements, { ElementType, SetupElementType } from '../Elements/Elements';

const floorSetup: ElementType[] = [
  {
    style: { top: '70%', left: '10%', width: '150px', zIndex: '1' },
    image: '/assets/Dog.png',
    name: 'Dog',
    description: 'A cute dog'
  },
  {
    style: { top: '62%', left: '23%', width: '40px', zIndex: '1' },
    image: '/assets/Cube.png',
    name: 'Cube',
    description: 'A small cube'
  },
  {
    style: { top: '90%', left: '65%', width: '40px', zIndex: '1' },
    image: '/assets/MagnifyingGlass.png',
    name: 'Magnifying Glass',
    description: 'A magnifying glass'
  }
];


const FloorSetup = () => {
  const setupPosition : SetupElementType = { top: '0%', left: '0%', width: '100%', position: 'absolute' };
  return (
    <Elements elements={floorSetup} style={setupPosition}/>
  );
};

export default FloorSetup;
