import './Elements.css';
import Element from './Element/Element'

export type SetupElementType = {top:string, left: string, width: string, position?: string, zIndex?: string,}
export interface ElementType {
  style: SetupElementType;
  image: string;
  name: string;
  description: string;
}

interface ElementsType {
  elements: ElementType[];
  style: SetupElementType;
}

const Elements = ({elements, style,} : ElementsType) => {

  return (
    <div
      className="elements-setup"
      style={{ top: style.top, left: style.left, width: style.width, height: '100%', position:'absolute'}}
      
    >
        {elements.map((element) => 
        <Element style={element.style} image={element.image} name={element.name} description={element.description}/>)}
    </div>
  );
};

export default Elements;
