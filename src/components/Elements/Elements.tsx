import './Elements.css';
import Element from './Element/Element'
import { JsxElement } from 'typescript';
import { ReactElement } from 'react';

export type SetupElementType = {top:string, left: string, width: string, position?: string, zIndex?: string, cursor?: string,}
export interface ElementType {
  style: SetupElementType;
  image?: string;
  audio?: string;
  element?: ReactElement;
  name: string;
  description: string;
  classname?: string;
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
        <div key={element.name} >
          <Element
            style={element.style} 
            image={element.image} 
            name={element.name} 
            description={element.description} 
            audio={element.audio}
            element={element.element}
            classname={element.classname}
          />
        </div>
      )}
    </div>
  );
};

export default Elements;
