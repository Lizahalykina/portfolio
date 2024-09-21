import Elements, { ElementType, SetupElementType } from '../Elements/Elements';

const floorSetup: ElementType[] = [
  {
    style: { top: '70%', left: '10%', width: '150px', zIndex: '1' },
    image: '/assets/Dog.png',
    name: 'Zuko',
    description: 'This is my toy poodle Zuko (Avatar the last airbender ref). He loves humans and cats, not too friendly with most dogs. My groomer loves to give him a classic poodle cut, and I think this is very funny. He is VERY popular with grannies at our local park'
  },
  {
    style: { top: '62%', left: '23%', width: '40px', zIndex: '1' },
    image: '/assets/Cube.png',
    name: 'Rubiks Cube',
    description: 'This is supposed to show that I am good at problem-solving. Which I am, but ironically, I never actually tried to solve the cube'
  },
  {
    style: { top: '90%', left: '65%', width: '40px', zIndex: '1' },
    image: '/assets/MagnifyingGlass.png',
    name: 'Magnifying Glass',
    description: 'This one should sigfnify my attention to detail in everything I do'
  }
];


const FloorSetup = () => {
  const setupPosition : SetupElementType = { top: '0%', left: '0%', width: '100%', position: 'absolute' };
  return (
    <Elements elements={floorSetup} style={setupPosition}/>
  );
};

export default FloorSetup;
