import { useState } from 'react';
import useModalA11y from './useModalA11y';

export default function ReviewsModal({ listing, onClose }) {
  const containerRef = useModalA11y({ isOpen: true, onClose });
  const [search, setSearch] = useState('');

  const filteredReviews = listing.reviews.filter(
    (r) =>
      r.comment.toLowerCase().includes(search.toLowerCase()) ||
      r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reviews-modal-title"
      ref={containerRef}
    >
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="modal-dialog modal-dialog--wide">
        <div className="modal-dialog__header">
          <button
            className="modal-dialog__close"
            onClick={onClose}
            aria-label="Close reviews modal"
            type="button"
          >
            <svg viewBox="0 0 32 32" width="16" height="16" aria-hidden="true">
              <path
                fill="currentColor"
                d="M18.14 16.03l9.37-9.36c.59-.59.59-1.54 0-2.12-.59-.59-1.54-.59-2.12 0l-9.37 9.36-9.37-9.36c-.59-.59-1.54-.59-2.12 0-.59.59-.59 1.54 0 2.12l9.37 9.36-9.37 9.36c-.59.59-.59 1.54 0 2.12.29.29.68.44 1.06.44.38 0 .77-.15 1.06-.44l9.37-9.36 9.37 9.36c.29.29.68.44 1.06.44.38 0 .77-.15 1.06-.44.59-.59.59-1.54 0-2.12l-9.37-9.36z"
              />
            </svg>
          </button>
          <div className="reviews-modal__title-wrap">
            <span className="reviews-modal__star">★</span>
            <h2 id="reviews-modal-title" className="modal-dialog__title">
              {listing.rating} · {listing.reviewCount} reviews
            </h2>
          </div>
        </div>

        <div className="modal-dialog__search">
          <svg
            viewBox="0 0 32 32"
            width="14"
            height="14"
            aria-hidden="true"
            className="modal-dialog__search-icon"
          >
            <path
              fill="currentColor"
              d="M13 24a11 11 0 100-22 11 11 0 000 22zm8-2.586l6.293 6.293a1 1 0 01-1.414 1.414L19.586 23A12.934 12.934 0 0113 26a13 13 0 1113-13c0 2.946-.98 5.666-2.632 7.848z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search reviews"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="modal-dialog__search-input"
            aria-label="Search reviews"
          />
        </div>

        <div className="modal-dialog__body reviews-modal__grid">
          <div className="reviews-modal__ratings-sidebar">
            <h3 className="reviews-modal__sidebar-heading">Ratings breakdown</h3>
            {Object.entries(listing.categoryRatings).map(([key, val]) => (
              <div key={key} className="reviews-modal__rating-bar-row">
                <span className="reviews-modal__cat-name">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
                <div className="reviews-modal__bar-track">
                  <div
                    className="reviews-modal__bar-fill"
                    style={{ width: `${(val / 5) * 100}%` }}
                  />
                </div>
                <span className="reviews-modal__cat-score">{val.toFixed(1)}</span>
              </div>
            ))}
          </div>

          <div className="reviews-modal__reviews-list">
            {filteredReviews.length === 0 ? (
              <p className="modal-dialog__empty">
                No reviews found matching &quot;{search}&quot;.
              </p>
            ) : (
              filteredReviews.map((rev) => (
                <article key={rev.id} className="reviews-modal__card">
                  <div className="reviews-modal__reviewer">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="reviews-modal__avatar"
                    />
                    <div>
                      <h4 className="reviews-modal__name">{rev.name}</h4>
                      <p className="reviews-modal__tenure">{rev.tenure}</p>
                    </div>
                  </div>
                  <div className="reviews-modal__meta">
                    <span className="reviews-modal__stars">{'★'.repeat(rev.rating)}</span>
                    <span>·</span>
                    <span>{rev.date}</span>
                  </div>
                  <p className="reviews-modal__text">{rev.comment}</p>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
