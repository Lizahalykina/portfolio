export function typeWriterEffect(text: string, element: HTMLElement, speed: number = 100) {
  let index = 0;
  
  function type() {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }
  element.innerHTML = '';
  type();
}
