import { useState } from 'react';
import useModalA11y from './useModalA11y';

export default function PhotoTour({
  images,
  listingTitle,
  initialIndex = 0,
  onClose,
  onOpenLightbox,
  onToast,
}) {
  const containerRef = useModalA11y({ isOpen: true, onClose });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [saved, setSaved] = useState(false);

  // Unique categories
  const categories = ['All', ...new Set(images.map((img) => img.category || 'General'))];

  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter((img) => img.category === selectedCategory);

  // Group filtered images by room
  const groupedByRoom = {};
  filteredImages.forEach((img) => {
    if (!groupedByRoom[img.room]) groupedByRoom[img.room] = [];
    groupedByRoom[img.room].push(img);
  });

  return (
    <div
      className="tour"
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour"
      ref={containerRef}
    >
      {/* Sticky Top Bar */}
      <header className="tour__topbar">
        <button
          type="button"
          className="tour__back-btn"
          onClick={onClose}
          aria-label="Back to listing"
        >
          <svg viewBox="0 0 32 32" width="16" height="16" aria-hidden="true">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              d="M20 28L8 16 20 4"
            />
          </svg>
        </button>

        <span className="tour__title">{listingTitle}</span>

        <div className="tour__topbar-actions">
          <button
            type="button"
            className="tour__action-btn"
            onClick={() => {
              if (navigator.clipboard) navigator.clipboard.writeText(window.location.href);
              onToast?.('Link copied to clipboard!');
            }}
            aria-label="Share photos"
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
            className="tour__action-btn"
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
              className={saved ? 'tour__heart--active' : ''}
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

      {/* Room Category Tabs */}
      <nav className="tour__category-tabs" aria-label="Photo room categories">
        <div className="tour__tabs-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`tour__tab ${selectedCategory === cat ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* Photo Stream Grouped by Room */}
      <main className="tour__content">
        <div className="tour__stream">
          {Object.entries(groupedByRoom).map(([roomName, roomImages]) => (
            <section key={roomName} className="tour__room-section">
              <div className="tour__room-header">
                <h2 className="tour__room-title">{roomName}</h2>
                {roomImages[0]?.caption && (
                  <p className="tour__room-caption">{roomImages[0].caption}</p>
                )}
              </div>

              <div className="tour__photo-grid">
                {roomImages.map((img) => {
                  const globalIndex = images.findIndex((i) => i.id === img.id);
                  return (
                    <button
                      key={img.id}
                      type="button"
                      className="tour__photo-card"
                      onClick={() => onOpenLightbox(globalIndex >= 0 ? globalIndex : 0)}
                      aria-label={`Open photo in lightbox: ${img.room}`}
                    >
                      <img src={img.url} alt={img.room} loading="lazy" />
                      <div className="tour__photo-hover-overlay">
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="#fff" aria-hidden="true">
                          <path d="M15 3l2.3 2.3-3.89 3.89 1.41 1.41 3.89-3.89L21 9V3h-6zM3 9l2.3-2.3 3.89 3.89 1.41-1.41-3.89-3.89L9 3H3v6zm6 12l-2.3-2.3 3.89-3.89-1.41-1.41-3.89 3.89L3 15v6h6zm12-6l-2.3 2.3-3.89-3.89-1.41 1.41 3.89 3.89L15 21h6v-6z" />
                        </svg>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
