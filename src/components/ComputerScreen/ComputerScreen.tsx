import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ComputerScreen.css';
import CloseButton from '../Common/CloseButton/CloseButton';

interface ComputerScreenProps {
  open: boolean;
  onClose?: () => void;
}

interface TerminalLine {
  type: 'output' | 'command' | 'prompt';
  content: string;
  id: number;
}

const ComputerScreen: React.FC<ComputerScreenProps> = ({ open, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [notebookOpen, setNotebookOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isBooted, setIsBooted] = useState(false);
  const [bootFlicker, setBootFlicker] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [output, setOutput] = useState<TerminalLine[]>([]);
  const [windowPosition, setWindowPosition] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });
  const [notebookPosition, setNotebookPosition] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });
  const [windowSize, setWindowSize] = useState({ width: 600, height: 300 });
  const [notebookSize, setNotebookSize] = useState({ width: 600, height: 400 });
  const [isDragging, setIsDragging] = useState(false);
  const [isNotebookDragging, setIsNotebookDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isNotebookResizing, setIsNotebookResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [notebookDragStart, setNotebookDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [notebookResizeStart, setNotebookResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const notebookBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalWindowRef = useRef<HTMLDivElement>(null);
  const notebookWindowRef = useRef<HTMLDivElement>(null);
  const screenContentRef = useRef<HTMLDivElement>(null);
  const lineIdRef = useRef(0);

  const addOutput = useCallback((content: string, type: 'output' | 'command' | 'prompt' = 'output') => {
    setOutput(prev => [...prev, { type, content, id: lineIdRef.current++ }]);
  }, []);

  const scrollToBottom = () => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (open) {
      setIsEntering(true);
      setIsClosing(false);
    }
  }, [open]);

  useEffect(() => {
    if (terminalOpen && !isBooted) {
      setBootFlicker(true);
      const timer1 = setTimeout(() => setBootFlicker(false), 50);
      const timer2 = setTimeout(() => {
        addOutput('system initialised.');
        setTimeout(() => {
          addOutput("type 'help' for commands.");
          setIsBooted(true);
        }, 100);
      }, 100);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [terminalOpen, isBooted, addOutput]);

  useEffect(() => {
    if (terminalOpen && isBooted) {
      scrollToBottom();
    }
  }, [output, terminalOpen, isBooted]);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  const executeCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    addOutput(`> ${cmd}`, 'command');

    switch (trimmedCmd) {
      case 'help':
        addOutput('help, about, skills, experience, projects, education, contact, clear');
        break;

      case 'about':
        addOutput('Front-end engineer specialising in React, Next.js, and TypeScript.');
        addOutput('Builds fast, accessible, SEO-friendly interfaces. Combines UX/UI design');
        addOutput('background with engineering practices to deliver clear, maintainable UI.');
        break;

      case 'skills':
        addOutput('Languages:');
        addOutput('  TypeScript, JavaScript, Python, HTML, CSS');
        addOutput('Frontend:');
        addOutput('  React, Next.js, Tailwind, Styled Components,');
        addOutput('  accessibility, performance optimisation, responsive design, technical SEO');
        addOutput('Tooling:');
        addOutput('  GitHub, GitLab, CI/CD, AWS, Docker, Vite, NPM, Vercel');
        addOutput('Design:');
        addOutput('  Figma, UX/UI, Photoshop, After Effects');
        addOutput('Other:');
        addOutput('  Storybook, Contentful, Headless CMS, data visualisation, JWT auth flows');
        break;

      case 'experience':
        addOutput('2024 – now | Frontend Engineer | Zero Petroleum');
        addOutput('  • Delivered multiple React/Next.js internal applications.');
        addOutput('  • Built reusable UI library with Storybook.');
        addOutput('  • Supported AWS/Vercel infra and CI/CD workflows.');
        addOutput('  • Improved CMS workflows for non-technical teams.');
        addOutput('');
        addOutput('2022 – 2024 | Frontend Developer | Websters');
        addOutput('  • Built pixel-accurate, high-performance React/Next.js UIs.');
        addOutput('  • Contributed to design systems and technical direction.');
        addOutput('  • Improved UX flows with design collaboration.');
        addOutput('  • Delivered modular components for repeatable patterns.');
        addOutput('');
        addOutput('2020 – 2022 | Digital Designer | Contract');
        addOutput('  • Produced commercial visuals and branded content.');
        addOutput('  • Illustrated 200-page graphic novel later optioned by a major streamer.');
        break;

      case 'projects':
        addOutput('project-one');
        addOutput('  React / TypeScript / Next.js');
        addOutput('  Internal tools for scientific and operational workflows.');
        addOutput('  [link unavailable]');
        addOutput('');
        addOutput('component-library');
        addOutput('  TypeScript / Storybook / Tailwind');
        addOutput('  Reusable system powering multiple internal apps.');
        addOutput('  [link unavailable]');
        addOutput('');
        addOutput('marketing-sites');
        addOutput('  Next.js / accessibility review / animations');
        addOutput('  Delivered high-fidelity builds across multiple clients.');
        addOutput('  [link unavailable]');
        break;

      case 'education':
        addOutput('Advanced JavaScript — General Assembly');
        addOutput('Certificate Courses — Codecademy (JS, Python, PostgreSQL)');
        addOutput('BA Art & Film — University of Reading');
        addOutput('A-Levels — King\'s Ely School');
        break;

      case 'contact':
        addOutput('Site:    missing-engineer.netlify.app');
        addOutput('Email:   halykina.liza@gmail.com');
        addOutput('Phone:   +44 7922 532346');
        break;

      case 'clear':
        setOutput([]);
        break;

      case '':
        break;

      default:
        addOutput(`command not found: ${trimmedCmd}`);
    }
  }, [addOutput]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      if (cmd) {
        setHistory(prev => [...prev, cmd]);
        setHistoryIndex(-1);
        executeCommand(cmd);
        setInput('');
      } else {
        addOutput('>', 'command');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('terminal-header') || 
        (e.target as HTMLElement).closest('.terminal-header')) {
      setIsDragging(true);
      const windowRect = terminalWindowRef.current?.getBoundingClientRect();
      const screenRect = screenContentRef.current?.getBoundingClientRect();
      if (windowRect && screenRect) {
        const relativeX = windowRect.left - screenRect.left;
        const relativeY = windowRect.top - screenRect.top;
        setDragStart({
          x: e.clientX - windowRect.left,
          y: e.clientY - windowRect.top
        });
        if (windowPosition.x === null || windowPosition.y === null) {
          setWindowPosition({ x: relativeX, y: relativeY });
        }
      }
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && windowPosition.x !== null && windowPosition.y !== null) {
      const screenRect = screenContentRef.current?.getBoundingClientRect();
      if (screenRect) {
        const newX = e.clientX - dragStart.x - screenRect.left;
        const newY = e.clientY - dragStart.y - screenRect.top;
        setWindowPosition({
          x: newX,
          y: newY
        });
      }
    } else if (isNotebookDragging && notebookPosition.x !== null && notebookPosition.y !== null) {
      const screenRect = screenContentRef.current?.getBoundingClientRect();
      if (screenRect) {
        const newX = e.clientX - notebookDragStart.x - screenRect.left;
        const newY = e.clientY - notebookDragStart.y - screenRect.top;
        // Constrain to screen bounds
        const minX = 0;
        const minY = 0;
        const maxX = screenRect.width - notebookSize.width;
        const maxY = screenRect.height - notebookSize.height;
        setNotebookPosition({
          x: Math.max(minX, Math.min(maxX, newX)),
          y: Math.max(minY, Math.min(maxY, newY))
        });
      }
    } else if (isResizing) {
      const newWidth = Math.max(400, resizeStart.width + (e.clientX - resizeStart.x));
      const newHeight = Math.max(300, resizeStart.height + (e.clientY - resizeStart.y));
      setWindowSize({ width: newWidth, height: newHeight });
    } else if (isNotebookResizing) {
      const screenRect = screenContentRef.current?.getBoundingClientRect();
      if (screenRect) {
        const newWidth = Math.max(400, Math.min(screenRect.width - 40, notebookResizeStart.width + (e.clientX - notebookResizeStart.x)));
        const newHeight = Math.max(300, Math.min(screenRect.height - 40, notebookResizeStart.height + (e.clientY - notebookResizeStart.y)));
        setNotebookSize({ width: newWidth, height: newHeight });
        // Adjust position if window would go out of bounds
        if (notebookPosition.x !== null && notebookPosition.y !== null) {
          const maxX = screenRect.width - newWidth;
          const maxY = screenRect.height - newHeight;
          setNotebookPosition({
            x: Math.min(notebookPosition.x, maxX),
            y: Math.min(notebookPosition.y, maxY)
          });
        }
      }
    }
  }, [isDragging, isNotebookDragging, isResizing, isNotebookResizing, dragStart, notebookDragStart, resizeStart, notebookResizeStart, windowPosition, notebookPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsNotebookDragging(false);
    setIsResizing(false);
    setIsNotebookResizing(false);
  }, []);

  useEffect(() => {
    if (isDragging || isNotebookDragging || isResizing || isNotebookResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isNotebookDragging, isResizing, isNotebookResizing, handleMouseMove, handleMouseUp]);

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: windowSize.width,
      height: windowSize.height
    });
  };

  const handleClose = () => {
    setIsClosing(true);
    setIsEntering(false);
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
      setIsClosing(false);
    }, 500);
  };

  const handleTerminalOpen = () => {
    setTerminalOpen(true);
    setIsFocused(true);
    setOutput([]);
    setIsBooted(false);
  };

  const handleTerminalClose = () => {
    setTerminalOpen(false);
    setIsFocused(false);
    setOutput([]);
    setIsBooted(false);
    setWindowPosition({ x: null, y: null });
  };

  const handleNotebookOpen = () => {
    setNotebookOpen(true);
    // Center the window on open if not positioned yet
    if (notebookPosition.x === null || notebookPosition.y === null) {
      const screenRect = screenContentRef.current?.getBoundingClientRect();
      if (screenRect) {
        // Ensure window size fits within screen
        const maxWidth = screenRect.width - 40;
        const maxHeight = screenRect.height - 40;
        const adjustedWidth = Math.min(notebookSize.width, maxWidth);
        const adjustedHeight = Math.min(notebookSize.height, maxHeight);
        setNotebookSize({ width: adjustedWidth, height: adjustedHeight });
        setNotebookPosition({
          x: (screenRect.width - adjustedWidth) / 2,
          y: (screenRect.height - adjustedHeight) / 2
        });
      }
    }
  };

  const handleNotebookClose = () => {
    setNotebookOpen(false);
    setNotebookPosition({ x: null, y: null });
  };

  const handleNotebookMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('notebook-header') || 
        (e.target as HTMLElement).closest('.notebook-header')) {
      setIsNotebookDragging(true);
      const windowRect = notebookWindowRef.current?.getBoundingClientRect();
      const screenRect = screenContentRef.current?.getBoundingClientRect();
      if (windowRect && screenRect) {
        const relativeX = windowRect.left - screenRect.left;
        const relativeY = windowRect.top - screenRect.top;
        setNotebookDragStart({
          x: e.clientX - windowRect.left,
          y: e.clientY - windowRect.top
        });
        if (notebookPosition.x === null || notebookPosition.y === null) {
          setNotebookPosition({ x: relativeX, y: relativeY });
        }
      }
    }
  };

  const handleNotebookResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsNotebookResizing(true);
    setNotebookResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: notebookSize.width,
      height: notebookSize.height
    });
  };

  if (!open && !isClosing) return null;

  return (
    <div className={`computer-screen ${isClosing ? 'closing' : ''} ${isEntering ? 'entering' : ''} ${isFocused ? 'focused' : ''}`}>
      <div className="computer-screen-background">
        {/* Background image will be added here*/}
      </div>
      <div className="monitor-container">
        <div className="monitor-frame">
          <div className="monitor-screen">
            <div className="screen-content" ref={screenContentRef}>
              <div className="terminal-icon" onClick={handleTerminalOpen} title="Terminal">
                <div className="terminal-icon-wrapper">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V8h16v10zm-2-1h-6v-2h6v2zM7.5 17l-1.41-1.41L8.67 13 6.09 10.41 7.5 9l4 4-4 4z"/>
                  </svg>
                </div>
                <div className="terminal-icon-label">Terminal</div>
              </div>
              
              <div className="notebook-icon" onClick={handleNotebookOpen} title="notebook.txt">
                <div className="notebook-icon-wrapper">
                  <div className="notebook-icon-text">📄</div>
                </div>
                <div className="notebook-icon-label">notebook.txt</div>
              </div>
              
              {terminalOpen && (
                <div 
                  className={`terminal-window ${bootFlicker ? 'boot-flicker' : ''}`}
                  ref={terminalWindowRef}
                  style={{
                    left: windowPosition.x !== null ? `${windowPosition.x}px` : '50%',
                    top: windowPosition.y !== null ? `${windowPosition.y}px` : '50%',
                    transform: windowPosition.x !== null ? 'none' : 'translate(-50%, -50%)',
                    width: `${windowSize.width}px`,
                    height: `${windowSize.height}px`
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={(e) => {
                    if (!terminalWindowRef.current?.contains(e.relatedTarget as Node)) {
                      setIsFocused(false);
                    }
                  }}
                  tabIndex={0}
                >
                  <div 
                    className="terminal-header"
                    onMouseDown={handleMouseDown}
                  >
                    <div className="terminal-header-top">┌──────────────────────────┐</div>
                    <div className="terminal-header-content">
                      <span className="terminal-title">TERMINAL.EXE</span>
                      <div className="terminal-controls">
                        <button className="terminal-minimize" title="Minimize">_</button>
                        <button className="terminal-maximize" title="Maximize">□</button>
                        <button className="terminal-close" onClick={handleTerminalClose} title="Close">×</button>
                      </div>
                    </div>
                    <div className="terminal-header-bottom">└──────────────────────────┘</div>
                  </div>
                  <div 
                    className="terminal-body"
                    ref={terminalBodyRef}
                    onClick={() => setIsFocused(true)}
                  >
                    {output.map(line => (
                      <div key={line.id} className={`terminal-line terminal-line-${line.type}`}>
                        {line.type === 'command' && <span className="terminal-prompt">$</span>}
                        <span>{line.content}</span>
                      </div>
                    ))}
                    {isBooted && (
                      <div className="terminal-input-line">
                        <span className="terminal-prompt">$</span>
                        <input
                          ref={inputRef}
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={handleInputKeyDown}
                          className="terminal-input"
                          autoFocus
                        />
                        <span className="terminal-cursor">█</span>
                      </div>
                    )}
                  </div>
                  <div className="terminal-resize-handle" onMouseDown={handleResizeMouseDown}></div>
                </div>
              )}

              {notebookOpen && (
                <div 
                  className="notebook-window"
                  ref={notebookWindowRef}
                  style={{
                    left: notebookPosition.x !== null ? `${notebookPosition.x}px` : '50%',
                    top: notebookPosition.y !== null ? `${notebookPosition.y}px` : '50%',
                    transform: notebookPosition.x !== null ? 'none' : 'translate(-50%, -50%)',
                    width: `${notebookSize.width}px`,
                    height: `${notebookSize.height}px`,
                    maxWidth: 'calc(100% - 40px)',
                    maxHeight: 'calc(100% - 40px)'
                  }}
                  tabIndex={0}
                >
                  <div 
                    className="notebook-header"
                    onMouseDown={handleNotebookMouseDown}
                  >
                    <div className="notebook-header-top">┌──────────────────────────┐</div>
                    <div className="notebook-header-content">
                      <span className="notebook-title">notebook.txt</span>
                      <div className="notebook-controls">
                        <button className="notebook-minimize" title="Minimize">_</button>
                        <button className="notebook-maximize" title="Maximize">□</button>
                        <button className="notebook-close" onClick={handleNotebookClose} title="Close">×</button>
                      </div>
                    </div>
                    <div className="notebook-header-bottom">└──────────────────────────┘</div>
                  </div>
                  <div 
                    className="notebook-body"
                    ref={notebookBodyRef}
                  >
                    <pre className="notebook-content">{`PORTFOLIO APP - TECHNICAL NOTES
  =====================================

  HOW IT WORKS
  ------------
  • State-driven React app with component composition
  • Intro sequence → Case file → Interactive room
  • Element-based room system: click objects to explore
  • Terminal emulator with command history
  • Pixel-perfect click detection using Canvas API
  • Image preloading for smooth transitions

  PATTERNS CHOSEN
  ---------------
  • Component composition: Small, reusable pieces
  • Props drilling: Simple state flow, no Redux needed
  • CSS modules: Component-scoped styling
  • Canvas API: Precise interaction boundaries
  • Staggered animations: Cinematic, skippable
  • TypeScript: Type safety throughout
  • useRef: Direct DOM access when needed

  ACCESSIBILITY
  -------------
  • Keyboard navigation (Enter/Space on buttons)
  • Semantic HTML (buttons, proper img alt text)
  • Focus management (auto-focus terminal input)
  • ARIA roles where needed
  • Areas to improve: screen readers, focus traps, 
    reduced motion support

  GOOD UI PRINCIPLES
  ------------------
  1. User control: Skip animations, clear close buttons
  2. Visual feedback: Hover states, click animations
  3. Performance: Preloading, smooth transitions
  4. Narrative: Detective theme, cinematic intro
  5. Clarity: Clear labels, discoverable interactions
  6. Consistency: Reusable components, unified timing
  7. Accessibility: Keyboard nav, semantic HTML

  STACK
  -----
  React 18.3.1, TypeScript 4.9.5, CSS3, Canvas API
  No external UI libraries - full control`}</pre>
                  </div>
                  <div className="notebook-resize-handle" onMouseDown={handleNotebookResizeMouseDown}></div>
                </div>
              )}
            </div>
          </div>
          <div className="monitor-stand"></div>
          <div className="monitor-base"></div>
        </div>
      </div>
      <CloseButton onClick={handleClose} className="computer-close-button" />
    </div>
  );
};

export default ComputerScreen;
