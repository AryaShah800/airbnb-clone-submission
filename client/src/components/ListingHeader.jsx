import { useState } from 'react';

export default function ListingHeader({ listing, onToast }) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      onToast?.('Listing link copied to clipboard!');
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleSaveToggle = () => {
    const next = !saved;
    setSaved(next);
    onToast?.(next ? 'Saved to your wishlist!' : 'Removed from wishlist.');
  };

  return (
    <div className="listing-header">
      <div className="listing-header__row">
        <h1 className="listing-header__title">{listing.title}</h1>
        <div className="listing-header__actions">
          <button
            className="listing-header__action"
            onClick={handleShare}
            aria-label="Share this listing"
            type="button"
          >
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                d="M15 8v6.4a.6.6 0 01-.6.6H1.6a.6.6 0 01-.6-.6V8M11 3.5L8 1 5 3.5M8 1.5v10"
              />
            </svg>
            <span>{copied ? 'Link copied!' : 'Share'}</span>
          </button>

          <button
            className="listing-header__action"
            onClick={handleSaveToggle}
            aria-label={saved ? 'Remove from saved' : 'Save to wishlist'}
            type="button"
          >
            <svg
              viewBox="0 0 32 32"
              width="16"
              height="16"
              aria-hidden="true"
              className={saved ? 'listing-header__heart--active' : ''}
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
      </div>
    </div>
  );
}
