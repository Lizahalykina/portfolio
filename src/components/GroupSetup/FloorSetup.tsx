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
    description: 'This is supposed to show my problem-solving skills, but ironically, I never actually tried to solve the cube'
  },
  {
    style: { top: '90%', left: '65%', width: '32px', zIndex: '1' },
    image: '/assets/MagnifyingGlass.png',
    name: 'Magnifying Glass',
    description: 'This one should sigfnify my attention to detail in everything I do'
  },
  {
    style: { top: '69%', left: '-5%', width: '280px', zIndex: '1' },
    image: '/assets/Plant.png',
    name: 'Chinese Money Plant',
    description: 'The only plant that I managed to keep alive'
  }
];


const FloorSetup = () => {
  const setupPosition : SetupElementType = { top: '0%', left: '0%', width: '100%', position: 'absolute' };
  return (
    <Elements elements={floorSetup} style={setupPosition}/>
  );
};

export default FloorSetup;
