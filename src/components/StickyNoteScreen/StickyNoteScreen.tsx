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
      text: 'Common Git Commands:',
      bullets: ['git status', 'git pull origin main', 'git checkout -b [branch-name]'],
    },
    {
      id: 2,
      text: '`===` not `==`! Because I don’t like surprises 🧐',
    },
    {
      id: 3,
      text: 'Commit often, push even more often! 🐙 Don’t forget to pull first 😅',
    },
    {
      id: 4,
      text: 'Take a deep breath. Things will work out 🌿',
    },
    {
      id: 5,
      text: 'JavaScript Array Methods:',
      bullets: ['map()', 'filter()', 'reduce()'],
    },
    {
      id: 6,
      text: 'Hydrate! Water won’t drink itself 💧',
    },
    {
      id: 7,
      text: 'Small progress is still progress. Keep going 🚀',
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

    const newNote: StickyNote = { id: Date.now(), text: inputText };
    setNotes([...notes, newNote]);
    setInputText('');

    try {
      await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputText }),
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
                  As a junior developer, I'm always learning. Visual aids like sticky notes have
                  been really helpful in my process. For example, I use them to remember key coding
                  concepts, track bugs, or note shortcuts I’m practicing.
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
