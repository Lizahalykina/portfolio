export function typeWriterEffect(text: string, element: HTMLElement, speed: number = 100): () => void {
  let index = 0;
  let timeoutId: NodeJS.Timeout | null = null;
  
  function type() {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
      timeoutId = setTimeout(type, speed);
    }
  }
  element.innerHTML = '';
  type();
  
  // Return cleanup function
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };
}

// Preload all room images in the background
export function preloadRoomImages(): Promise<void> {
  const images = [
    '/assets/Background.png',
    '/assets/ArtSupplies.png',
    '/assets/PencilHolder.png',
    '/assets/Camera.png',
    '/assets/DrawerUnitTopLayerFront.png',
    '/assets/LowerDrawerFront.png',
    '/assets/FolderFile.png',
    '/assets/DrawerUnitTopLayer.png',
    '/assets/DrawerUnitLowerLayer.png',
    '/assets/ShelfDecor.png',
    '/assets/Cabinet.png',
    '/assets/Calendar.png',
    '/assets/StickyNotes.png',
    '/assets/LavaLamp.png',
    '/assets/Piano.png',
    '/assets/FilmPoster.png',
    '/assets/Bookshelf.png',
    '/assets/Dog.png',
    '/assets/Cube.png',
    '/assets/MagnifyingGlass.png',
    '/assets/Plant.png',
    '/assets/Avatar.png',
    '/assets/Computer.png',
    '/assets/Desk.png',
  ];

  const imagePromises = images.map((src) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Resolve even on error to not block
      img.src = src;
    });
  });

  return Promise.all(imagePromises).then(() => {});
}