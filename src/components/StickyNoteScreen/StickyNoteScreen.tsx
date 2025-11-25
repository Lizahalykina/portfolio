import React, { useEffect, useState } from 'react';
import './StickyNoteScreen.css';

interface StickyNote {
  id: number;
  text: string;
  bullets?: string[];
}

interface StickyNoteScreenType {
  open: boolean;
}

const StickyNoteScreen = ({ open }: StickyNoteScreenType) => {
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

  useEffect(() => {
    setShowBoard(open);
  }, [open]);

  const closeBoard = () => {
    setShowBoard(false);
  };

  const addNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputText.trim() === '') return;

    const noteText = inputText.trim();
    const newNote: StickyNote = { id: Date.now(), text: noteText };
    setNotes([...notes, newNote]);
    setInputText('');

    try {
      await fetch(process.env.REACT_APP_EMAIL_BACKEND_URL || '', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: noteText }),
      });

      alert('Thanks for your note! It’s added to the board, and I’ll be notified!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Oops, something went wrong while sending the email. But your note is on the board!');
    }
  };

  return (
    <>
      {showBoard && (
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
                {notes.map((note) => (
                  <div key={note.id} className="sticky-note">
                    <p>{note.text}</p>
                    {note.bullets && (
                      <ul>
                        {note.bullets.map((bullet, index) => (
                          <li key={index}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
              <form className="note-input" onSubmit={addNote}>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Got a suggestion or a tip for me? Send it here!"
                />
                <button type="submit">Add a Note</button>
              </form>
            </div>
            <div className="board-close-button" onClick={closeBoard}>
            X
          </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StickyNoteScreen;
