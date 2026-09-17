import { useEffect, useState } from 'react';
import useModalA11y from './useModalA11y';

export default function Lightbox({ images, startIndex = 0, onClose, onToast }) {
  const [index, setIndex] = useState(startIndex);
  const [direction, setDirection] = useState('next'); // 'next' | 'prev'
  const [saved, setSaved] = useState(false);

  const containerRef = useModalA11y({ isOpen: true, onClose });

  const current = images[index] || images[0];
  const total = images.length;

  const handlePrev = () => {
    setDirection('prev');
    setIndex((i) => (i - 1 + total) % total);
  };

  const handleNext = () => {
    setDirection('next');
    setIndex((i) => (i + 1) % total);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [total]);

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Single photo viewer"
      ref={containerRef}
    >
      {/* Top Header */}
      <header className="lightbox__topbar">
        <button
          type="button"
          className="lightbox__close-btn"
          onClick={onClose}
          aria-label="Close photo viewer"
        >
          <svg viewBox="0 0 32 32" width="16" height="16" aria-hidden="true">
            <path
              fill="currentColor"
              d="M18.14 16.03l9.37-9.36c.59-.59.59-1.54 0-2.12-.59-.59-1.54-.59-2.12 0l-9.37 9.36-9.37-9.36c-.59-.59-1.54-.59-2.12 0-.59.59-.59 1.54 0 2.12l9.37 9.36-9.37 9.36c-.59.59-.59 1.54 0 2.12.29.29.68.44 1.06.44.38 0 .77-.15 1.06-.44l9.37-9.36 9.37 9.36c.29.29.68.44 1.06.44.38 0 .77-.15 1.06-.44.59-.59.59-1.54 0-2.12l-9.37-9.36z"
            />
          </svg>
        </button>

        <div className="lightbox__counter" aria-live="polite">
          {index + 1} / {total}
        </div>

        <div className="lightbox__actions">
          <button
            type="button"
            className="lightbox__action-btn"
            onClick={() => {
              if (navigator.clipboard) navigator.clipboard.writeText(window.location.href);
              onToast?.('Link copied to clipboard!');
            }}
            aria-label="Share photo"
          >
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                d="M15 8v6.4a.6.6 0 01-.6.6H1.6a.6.6 0 01-.6-.6V8M11 3.5L8 1 5 3.5M8 1.5v10"
              />
            </svg>
            <span>Share</span>
          </button>

          <button
            type="button"
            className="lightbox__action-btn"
            onClick={() => {
              const nextSaved = !saved;
              setSaved(nextSaved);
              onToast?.(nextSaved ? 'Saved to your wishlist!' : 'Removed from wishlist.');
            }}
            aria-label={saved ? 'Saved' : 'Save'}
          >
            <svg
              viewBox="0 0 32 32"
              width="16"
              height="16"
              aria-hidden="true"
              className={saved ? 'lightbox__heart--active' : ''}
            >
              <path
                fill={saved ? '#FF385C' : 'none'}
                stroke={saved ? '#FF385C' : 'currentColor'}
                strokeWidth="2.2"
                d="M16 28c7-4.73 14-10.44 14-17.4A7.6 7.6 0 0022.4 3c-2.4 0-4.86 1.4-6.4 4-1.54-2.6-4-4-6.4-4A7.6 7.6 0 002 10.6C2 17.56 9 23.27 16 28z"
              />
            </svg>
            <span>{saved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </header>

      {/* Main Viewing Stage */}
      <main className="lightbox__stage">
        <button
          type="button"
          className="lightbox__nav-btn lightbox__nav-btn--prev"
          onClick={handlePrev}
          aria-label="Previous photo (Left arrow)"
        >
          <svg viewBox="0 0 32 32" width="18" height="18" aria-hidden="true">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              d="M20 28L8 16 20 4"
            />
          </svg>
        </button>

        <div className="lightbox__image-container">
          <img
            key={current.id}
            src={current.url}
            alt={current.room}
            className={`lightbox__image lightbox__image--anim-${direction}`}
          />
        </div>

        <button
          type="button"
          className="lightbox__nav-btn lightbox__nav-btn--next"
          onClick={handleNext}
          aria-label="Next photo (Right arrow)"
        >
          <svg viewBox="0 0 32 32" width="18" height="18" aria-hidden="true">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              d="M12 4l12 12-12 12"
            />
          </svg>
        </button>
      </main>

      {/* Bottom Room & Caption Footer */}
      <footer className="lightbox__caption-footer">
        <div className="lightbox__caption-content">
          <h3 className="lightbox__caption-room">{current.room}</h3>
          {current.caption && (
            <p className="lightbox__caption-text">{current.caption}</p>
          )}
        </div>
      </footer>
    </div>
  );
}
