import { useState } from 'react';

export default function Reviews({ listing, onOpenReviews }) {
  const [selectedTag, setSelectedTag] = useState('All');

  const tags = ['All', 'Cleanliness', 'Location', 'Amenities', 'Check-in', 'Value'];

  const categoryIcons = {
    cleanliness: (
      <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
        <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M16 2v4M8 6l2 3M24 6l-2 3M4 14h4M24 14h4M16 10a8 8 0 100 16 8 8 0 000-16z" />
      </svg>
    ),
    accuracy: (
      <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
        <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M16 2a14 14 0 100 28 14 14 0 000-28zm-5 14l3 3 7-7" />
      </svg>
    ),
    checkin: (
      <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
        <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M16 4a6 6 0 00-6 6c0 5 6 18 6 18s6-13 6-18a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" />
      </svg>
    ),
    communication: (
      <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
        <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M26 18A10 10 0 006 14c0 2.5 1 5 3 7l-2 6 6-2a10 10 0 0013-7z" />
      </svg>
    ),
    location: (
      <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
        <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M16 2a10 10 0 00-10 10c0 8 10 18 10 18s10-10 10-18A10 10 0 0016 2zm0 13a3 3 0 110-6 3 3 0 010 6z" />
      </svg>
    ),
    value: (
      <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
        <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M28 14L18 4H4v14l10 10 14-14zM9 9h.01" />
      </svg>
    ),
  };

  const reviewsList = listing.reviews || [];
  const filteredReviews = selectedTag === 'All'
    ? reviewsList
    : reviewsList.filter(r => (r.comment || '').toLowerCase().includes(selectedTag.toLowerCase()));

  return (
    <section className="reviews-section" aria-labelledby="reviews-heading">
      {/* Giant Rating Header */}
      <div className="reviews-hero">
        <div className="reviews-hero__laurel-row">
          <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true" className="reviews-hero__wreath reviews-hero__wreath--left">
            <path fill="currentColor" d="M24 6c.7 1.7 1.1 3.6 1.1 5.5 0 6-4 11.2-9.6 12.8 1.7-4.6 1.3-9.7-1-14C17 6 20.4 4.2 24 6zM7.8 17.8c2.9 1.2 5.4 3.4 6.8 6.2 3.8 7.3 2 16.2-4.2 21.4-1-6.4-4.4-11.8-9.6-15.2 1.1-4.7 3.6-9 7-12.4z" />
          </svg>
          <span className="reviews-hero__big-number">{(listing.rating || 4.95).toFixed(2)}</span>
          <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true" className="reviews-hero__wreath reviews-hero__wreath--right">
            <path fill="currentColor" d="M24 6c-.7 1.7-1.1 3.6-1.1 5.5 0 6 4 11.2 9.6 12.8-1.7-4.6-1.3-9.7 1-14C31 6 27.6 4.2 24 6zm16.2 11.8c-2.9 1.2-5.4 3.4-6.8 6.2-3.8 7.3-2 16.2 4.2 21.4 1-6.4 4.4-11.8 9.6-15.2-1.1-4.7-3.6-9-7-12.4z" />
          </svg>
        </div>

        <h2 id="reviews-heading" className="reviews-hero__tag">Guest favourite</h2>
        <p className="reviews-hero__subtag">
          One of the most loved homes on Airbnb based on ratings, reviews, and reliability
        </p>
      </div>

      {/* Category breakdown bar charts */}
      <div className="reviews-breakdown-grid">
        {Object.entries(listing.categoryRatings || {}).map(([cat, score]) => (
          <div key={cat} className="category-score-card">
            <div className="category-score-card__top">
              <span className="category-score-card__icon">{categoryIcons[cat]}</span>
              <span className="category-score-card__name">
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </span>
            </div>
            <div className="category-score-card__bottom">
              <span className="category-score-card__score">{score.toFixed(1)}</span>
              <div className="category-score-card__track">
                <div
                  className="category-score-card__fill"
                  style={{ width: `${(score / 5) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter keyword pills */}
      <div className="reviews-filter-pills" role="tablist" aria-label="Review topics">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`filter-pill ${selectedTag === tag ? 'is-active' : ''}`}
            onClick={() => setSelectedTag(tag)}
            role="tab"
            aria-selected={selectedTag === tag}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* 2-Column Review Cards Grid */}
      <div className="reviews-cards-grid">
        {filteredReviews.slice(0, 6).map((rev) => (
          <article key={rev.id} className="review-card">
            <div className="review-card__header">
              <img src={rev.avatar} alt={rev.name} className="review-card__avatar" />
              <div>
                <h3 className="review-card__name">{rev.name}</h3>
                <p className="review-card__tenure">{rev.tenure}</p>
              </div>
            </div>

            <div className="review-card__meta">
              <span className="review-card__stars">★★★★★</span>
              <span className="review-card__dot">·</span>
              <span className="review-card__date">{rev.date}</span>
            </div>

            <p className="review-card__text">{rev.comment}</p>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="outline-btn outline-btn--reviews"
        onClick={onOpenReviews}
      >
        Show all {listing.reviewCount} reviews
      </button>
    </section>
  );
}
