import React, { useEffect, useState, useMemo, useCallback } from 'react';
import './StickyNoteScreen.css';

interface StickyNote {
  id: number;
  text: string;
  bullets?: string[];
}

interface StickyNoteScreenType {
  open: boolean;
  onClose?: () => void;
}

const StickyNoteScreen = ({ open, onClose }: StickyNoteScreenType) => {
  const [showBoard, setShowBoard] = useState(open);
  const [notes, setNotes] = useState<StickyNote[]>([
    {
      id: 1,
      text: 'Ship small, ship often.',
    },
    {
      id: 2,
      text: 'Don\'t trust "it works on my machine." Check local, staging, prod',
    },
    {
      id: 3,
      text: 'Misaligned assumptions cost the most time. Validate with devs early',
    },
    {
      id: 4,
      text: 'Frontend, backend, AWS, deployment - if it touches your feature, understand it',
    },
    {
      id: 5,
      text: 'Keep code DRY (Don\'t Repeat Yourself)',
    },
    {
      id: 6,
      text: 'When something feels "off" for your design-trained eye, investigate',
    },
    {
      id: 7,
      text: 'A 5-minute clarification prevents a 5-hour rewrite.',
    },
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [draggedNoteId, setDraggedNoteId] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(null);

  // Calculate adaptive font size based on text length to ensure it fits
  const getFontSize = (text: string) => {
    const noteWidth = 140; // Note width minus padding (146 - 6px padding on each side)
    const noteHeight = 140; // Note height minus padding
    const padding = 12; // Total vertical padding
    const availableWidth = noteWidth - padding;
    const availableHeight = noteHeight - padding;
    
    // Estimate characters per line (roughly 8-10px per character depending on font)
    const avgCharWidth = 7; // Average character width in pixels
    const lineHeight = 1.3; // Line height multiplier
    const maxCharsPerLine = Math.floor(availableWidth / avgCharWidth);
    const maxLines = Math.floor(availableHeight / (13 * lineHeight)); // Base font size * line height
    
    const length = text.length;
    const estimatedLines = Math.ceil(length / maxCharsPerLine);
    
    if (estimatedLines <= maxLines) {
      // Text fits, use base size
      return 13;
    }
    
    // Text doesn't fit, scale down font size
    const scaleFactor = maxLines / estimatedLines;
    const newFontSize = Math.max(9, 13 * scaleFactor);
    
    // Recalculate with new font size
    const newAvgCharWidth = avgCharWidth * (newFontSize / 13);
    const newMaxCharsPerLine = Math.floor(availableWidth / newAvgCharWidth);
    const newEstimatedLines = Math.ceil(length / newMaxCharsPerLine);
    const newMaxLines = Math.floor(availableHeight / (newFontSize * lineHeight));
    
    if (newEstimatedLines <= newMaxLines) {
      return newFontSize;
    }
    
    // Still doesn't fit, scale down more aggressively
    return Math.max(8, newFontSize * (newMaxLines / newEstimatedLines));
  };
  
  const MAX_NOTE_LENGTH = 100; // Maximum characters for a note

  // Generate initial random positions for each note with minimum spacing within board dimensions
  const generateInitialPositions = useCallback((notesList: StickyNote[], boardWidth: number, boardHeight: number) => {
    const positions: Array<{ id: number; left: number; top: number; rotation: number }> = [];
    const padding = 10;
    const noteSize = 146; // Updated note size
    const minDistance = 160; // Minimum distance between note centers (noteSize + padding)
    const maxAttempts = 100; // Maximum attempts to find a valid position
    
    const maxX = boardWidth - noteSize - padding;
    const maxY = boardHeight - noteSize - padding;
    const minX = padding;
    const minY = padding;
    
    notesList.forEach((note) => {
      let attempts = 0;
      let validPosition = false;
      let left = 0;
      let top = 0;
      
      while (!validPosition && attempts < maxAttempts) {
        left = Math.random() * (maxX - minX) + minX;
        top = Math.random() * (maxY - minY) + minY;
        
        // Check if this position is far enough from existing notes
        validPosition = positions.every(existingPos => {
          const dx = left - existingPos.left;
          const dy = top - existingPos.top;
          const distance = Math.sqrt(dx * dx + dy * dy);
          return distance >= minDistance;
        });
        
        attempts++;
      }
      
      // If we couldn't find a valid position after max attempts, use the last generated position
      positions.push({
        id: note.id,
        left,
        top,
        rotation: (Math.random() - 0.5) * 8, // Random rotation between -4 and 4 degrees
      });
    });
    
    return positions;
  }, []);

  const [notePositions, setNotePositions] = useState<Array<{ id: number; left: number; top: number; rotation: number }>>([]);

  // Initialize positions based on actual board dimensions
  useEffect(() => {
    const boardElement = document.querySelector('.board');
    if (boardElement && notePositions.length === 0) {
      const rect = boardElement.getBoundingClientRect();
      const boardWidth = rect.width;
      const boardHeight = rect.height;
      const initialPositions = generateInitialPositions(notes, boardWidth, boardHeight);
      setNotePositions(initialPositions);
    }
  }, [notes, notePositions.length, generateInitialPositions]);

  // Update positions when notes change (new notes added)
  useEffect(() => {
    const boardElement = document.querySelector('.board');
    if (!boardElement) return;
    
    setNotePositions(prev => {
      const existingIds = new Set(prev.map(p => p.id));
      const newNotes = notes.filter(note => !existingIds.has(note.id));
      
      if (newNotes.length > 0) {
        const rect = boardElement.getBoundingClientRect();
        const boardWidth = rect.width;
        const boardHeight = rect.height;
        const newPositions = generateInitialPositions(newNotes, boardWidth, boardHeight);
        return [...prev, ...newPositions];
      }
      return prev;
    });
  }, [notes, generateInitialPositions]);

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, noteId: number) => {
    e.preventDefault();
    const position = notePositions.find(p => p.id === noteId);
    if (!position) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const boardRect = e.currentTarget.closest('.board')?.getBoundingClientRect();
    if (!boardRect) return;

    // Calculate offset from mouse position to the note's top-left corner
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setDraggedNoteId(noteId);
    setDragOffset({ x: offsetX, y: offsetY });
  };

  // Handle drag
  useEffect(() => {
    if (draggedNoteId === null || !dragOffset) return;

    const handleMouseMove = (e: MouseEvent) => {
      const boardElement = document.querySelector('.board');
      if (!boardElement) return;

      const boardRect = boardElement.getBoundingClientRect();
      const maxX = boardRect.width - 146; // Account for note width
      const maxY = boardRect.height - 146; // Account for note height
      const minX = 0;
      const minY = 0;

      let newX = e.clientX - boardRect.left - dragOffset.x;
      let newY = e.clientY - boardRect.top - dragOffset.y;

      // Constrain to board boundaries
      newX = Math.max(minX, Math.min(maxX, newX));
      newY = Math.max(minY, Math.min(maxY, newY));

      setNotePositions(prev =>
        prev.map(pos =>
          pos.id === draggedNoteId
            ? { ...pos, left: newX, top: newY }
            : pos
        )
      );
    };

    const handleMouseUp = () => {
      setDraggedNoteId(null);
      setDragOffset(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggedNoteId, dragOffset]);

  useEffect(() => {
    setShowBoard(open);
  }, [open]);

  const closeBoard = () => {
    setShowBoard(false);
    if (onClose) {
      onClose();
    }
  };

  const addNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputText.trim() === '') return;

    const noteText = inputText.trim().substring(0, MAX_NOTE_LENGTH);
    const newNote: StickyNote = { id: Date.now(), text: noteText };
    setNotes([...notes, newNote]);
    setInputText('');

    try {
      await fetch(process.env.REACT_APP_EMAIL_BACKEND_URL || '', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: noteText }),
      });

      alert("Thanks for your note! It's added to the board, and I'll be notified!");
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Oops, something went wrong while sending the email. But your note is on the board!');
    }
  };

  if (!showBoard) return null;

  return (
    <div className="board-screen">
      <div className="board-container">
        <div className="board-content">
          <div className="board-text">
            <h3>Sticky Note Board</h3>
            <h5>
            A compact collection of quick operational reminders - small insights gathered from real projects, backend infiltrations, and cross-team missions. Just the essentials I keep on hand to stay aligned, efficient, and mission-ready.
            </h5>
          </div>
          <div className="board">
            {notes.map((note) => {
              const position = notePositions.find(p => p.id === note.id);
              const fontSize = getFontSize(note.text);
              const isDragging = draggedNoteId === note.id;
              return (
                <div 
                  key={note.id} 
                  className={`sticky-note ${isDragging ? 'dragging' : ''}`}
                  style={{
                    left: position?.left || 0,
                    top: position?.top || 0,
                    transform: `rotate(${position?.rotation || 0}deg)`,
                    fontSize: `${fontSize}px`,
                  }}
                  onMouseDown={(e) => handleMouseDown(e, note.id)}
                >
                  <p>{note.text}</p>
                  {note.bullets && (
                    <ul>
                      {note.bullets.map((bullet, index) => (
                        <li key={index}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <form className="note-input" onSubmit={addNote}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => {
              const text = e.target.value;
              if (text.length <= MAX_NOTE_LENGTH) {
                setInputText(text);
              }
            }}
            placeholder={`Got a suggestion or a tip for me? Send it here! (max ${MAX_NOTE_LENGTH} chars)`}
            maxLength={MAX_NOTE_LENGTH}
          />
          <button type="submit">Add a Note</button>
        </form>
        <div className="board-close-button" onClick={closeBoard}>
          X
        </div>
      </div>
    </div>
  );
};

export default StickyNoteScreen;
