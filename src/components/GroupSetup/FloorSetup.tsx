import Elements, { ElementType, SetupElementType } from '../Elements/Elements';

const floorSetup: ElementType[] = [
  {
    style: { top: '51%', left: '25%', width: '112px', zIndex: '1' },
    image: '/assets/Dog.png',
    name: 'Zuko',
    audio: '/assets/DogBark.mp3',
      description: 'Zuko: Toy poodle. Field partner, expert distractor, and committed pigeon hunter. Wears his poodle cut like official uniform.'
    },
  {
    style: { top: '70%', left: '20%', width: '32px', zIndex: '1' },
    image: '/assets/Cube.png',
    name: 'Rubiks Cube',
    description: 'I like breaking down complex problems into smaller steps. Still working on solving this one though.'
  },
  {
    style: { top: '90%', left: '65%', width: '32px', zIndex: '1' },
    image: '/assets/MagnifyingGlass.png',
    name: 'Magnifying Glass',
    description: 'Useful for spotting those tiny bugs that take hours to find'
  },
  {
    style: { top: '69%', left: '-5%', width: '280px', zIndex: '1' },
    image: '/assets/Plant.png',
    name: 'Chinese Money Plant',
    description: 'One of the few plants I\'ve managed to keep alive. Turns out consistency helps with plants too.'
  }
];


const FloorSetup = () => {
  const setupPosition : SetupElementType = { top: '0%', left: '0%', width: '100%', position: 'absolute' };
  return (
    <Elements elements={floorSetup} style={setupPosition}/>
  );
};

export default FloorSetup;
