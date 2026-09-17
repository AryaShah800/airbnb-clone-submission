import { useState } from 'react';

export default function ListingBody({
  listing,
  startDate = { day: 14, month: 10, year: 2023 },
  endDate = { day: 19, month: 10, year: 2023 },
  nights = 5,
  onSelectDay,
  onClearDates,
  onOpenKeyboardShortcuts,
  onOpenAmenities,
  onOpenDescription,
}) {
  const [showOriginal, setShowOriginal] = useState(false);

  // 10 key amenities with SVG icons matching reference
  const keyAmenities = [
    {
      name: 'Garden view',
      icon: (
        <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 28V14M16 14C11 14 6 10 6 4c6 0 10 5 10 10zm0 0c5 0 10-4 10-10-6 0-10 5-10 10z"
          />
        </svg>
      ),
    },
    {
      name: 'Private jacuzzi',
      icon: (
        <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            d="M4 14c0 6.63 5.37 12 12 12s12-5.37 12-12v-2H4v2zm4-6c0-1.5 1-3 2.5-3s2.5 1.5 2.5 3M15 8c0-1.5 1-3 2.5-3s2.5 1.5 2.5 3"
          />
        </svg>
      ),
    },
    {
      name: 'Fast wifi (100+ Mbps)',
      icon: (
        <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            d="M2 10c7.73-7.73 20.27-7.73 28 0M6 14c5.52-5.52 14.48-5.52 20 0M10 18c3.31-3.31 8.69-3.31 12 0M16 23a2 2 0 100 4 2 2 0 000-4z"
          />
        </svg>
      ),
    },
    {
      name: 'Dedicated workspace',
      icon: (
        <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 8h24v12H4zM10 20v6M22 20v6M2 26h28"
          />
        </svg>
      ),
    },
    {
      name: 'HDTV with streaming & cable',
      icon: (
        <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            d="M4 6h24v16H4zm6 20h12m-6-4v4"
          />
        </svg>
      ),
    },
    {
      name: 'Air conditioning',
      icon: (
        <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            d="M16 2v28M2 16h28M6 6l20 20M6 26L26 6"
          />
        </svg>
      ),
    },
    {
      name: 'Full kitchen',
      icon: (
        <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 4v12a3 3 0 006 0V4M10 4v12M19 4v24M23 4v6a3 3 0 01-3 3v15"
          />
        </svg>
      ),
    },
    {
      name: 'Private patio or balcony',
      icon: (
        <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            d="M4 6h24v20H4zm6 0v20m12-20v20M4 16h24"
          />
        </svg>
      ),
    },
    {
      name: 'Shared outdoor swimming pool',
      icon: (
        <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            d="M2 24c3 2 6 2 9 0s6-2 9 0 6 2 9 0M2 28c3 2 6 2 9 0s6-2 9 0 6 2 9 0M12 6a3 3 0 100-6 3 3 0 000 6zm7 8l-4-4-5 3v5"
          />
        </svg>
      ),
    },
    {
      name: 'Free parking on premises',
      icon: (
        <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            d="M6 6h12a7 7 0 010 14H6zm0 0v20"
          />
        </svg>
      ),
    },
  ];

  const monthNames = [
    '',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return (
    <div className="listing-body">
      {/* Property Title & Room Counts */}
      <div className="listing-body__header-info">
        <h2 className="listing-body__type-title">{listing.propertyType}</h2>
        <p className="listing-body__stats">
          {listing.guests} guests · {listing.bedrooms} bedroom · {listing.beds} bed ·{' '}
          {listing.bathrooms} private bath
        </p>
      </div>

      {/* Guest Favourite Award Ribbon */}
      <div className="guest-favourite-card" aria-label="Guest favourite award">
        <div className="guest-favourite-card__left">
          <svg viewBox="0 0 40 40" width="36" height="36" aria-hidden="true" className="guest-favourite-card__wreath">
            <path
              fill="#222"
              d="M19.6 4c.6 1.4.9 3 .9 4.6 0 5-3.3 9.3-8 10.7 1.4-3.8 1.1-8.1-.8-11.7C13.8 4 16.6 2.5 19.6 4zm.8 0c2.9-1.5 5.8 0 7.9 3.6-1.9 3.6-2.2 7.9-.8 11.7-4.7-1.4-8-5.7-8-10.7 0-1.6.3-3.2.9-4.6zM6.5 13.8c2.4 1 4.5 2.8 5.7 5.2 3.2 6.1 1.7 13.5-3.5 17.8-.8-5.3-3.7-9.8-8-12.7.9-3.9 3-7.5 5.8-10.3zm27 0c2.8 2.8 4.9 6.4 5.8 10.3-4.3 2.9-7.2 7.4-8 12.7-5.2-4.3-6.7-11.7-3.5-17.8 1.2-2.4 3.3-4.2 5.7-5.2z"
            />
          </svg>
          <div className="guest-favourite-card__tag">Guest<br />favourite</div>
        </div>
        <div className="guest-favourite-card__center">
          One of the most loved homes on Airbnb, according to guests
        </div>
        <div className="guest-favourite-card__right">
          <div className="guest-favourite-card__rating">
            <span className="guest-favourite-card__score">{(listing.rating || 4.95).toFixed(2)}</span>
            <div className="guest-favourite-card__stars">★★★★★</div>
          </div>
          <div className="guest-favourite-card__reviews-count">
            <span className="guest-favourite-card__count">{listing.reviewCount}</span>
            <span className="guest-favourite-card__reviews-label">Reviews</span>
          </div>
        </div>
      </div>

      {/* Host Row */}
      <div className="listing-body__host-row">
        <img
          className="listing-body__host-avatar"
          src={listing.host?.avatar || '/images/host-avatar.png'}
          alt={listing.host?.name || 'Host'}
        />
        <div className="listing-body__host-info">
          <h3 className="listing-body__host-name">Hosted by {listing.host?.name}</h3>
          <p className="listing-body__host-badge">
            {listing.host?.badge}s · {listing.host?.yearsHosting} year hosting
          </p>
        </div>
      </div>

      <hr className="listing-body__divider" />

      {/* Highlights Section */}
      <div className="listing-highlights">
        {(listing.highlights || []).map((h, i) => (
          <div key={i} className="listing-highlight">
            <div className="listing-highlight__icon">
              {h.icon === 'workspace' && (
                <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M4 8h24v12H4zM10 20v6M22 20v6M2 26h28"
                  />
                </svg>
              )}
              {h.icon === 'host' && (
                <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
                  <circle cx="16" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M16 18l-4 10 4-2 4 2-4-10z"
                  />
                </svg>
              )}
              {h.icon === 'location' && (
                <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M16 3a9 9 0 00-9 9c0 7 9 17 9 17s9-10 9-17a9 9 0 00-9-9z"
                  />
                  <circle cx="16" cy="12" r="3" fill="currentColor" />
                </svg>
              )}
            </div>
            <div className="listing-highlight__content">
              <h4 className="listing-highlight__title">{h.title}</h4>
              <p className="listing-highlight__desc">{h.description}</p>
            </div>
          </div>
        ))}
      </div>

      <hr className="listing-body__divider" />

      {/* Translation banner */}
      <div className="listing-body__translate-banner">
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className="translate-icon">
          <path
            fill="currentColor"
            d="M8 0a8 8 0 100 16A8 8 0 008 0zm6.86 7H11.9c-.1-1.57-.45-3.03-.99-4.25A6.98 6.98 0 0114.86 7zM8 1.05c.87 1.34 1.5 3.32 1.66 4.95H6.34C6.5 4.37 7.13 2.39 8 1.05zM1.14 9h2.96c.1 1.57.45 3.03.99 4.25A6.98 6.98 0 011.14 9zm2.96-2H1.14a6.98 6.98 0 013.95-4.25C4.55 3.97 4.2 5.43 4.1 7zM8 14.95c-.87-1.34-1.5-3.32-1.66-4.95h3.32c-.16 1.63-.79 3.61-1.66 4.95zm2.91-2.2c.54-1.22.89-2.68.99-4.25h2.96a6.98 6.98 0 01-3.95 4.25z"
          />
        </svg>
        <span>
          {showOriginal
            ? 'Showing original English (India) property description.'
            : 'Some info has been automatically translated. '}
        </span>
        <button
          type="button"
          className="translate-link"
          onClick={() => setShowOriginal(!showOriginal)}
        >
          {showOriginal ? 'Translate' : 'Show original'}
        </button>
      </div>

      <hr className="listing-body__divider" />

      {/* Listing Description */}
      <section className="listing-body__description-section">
        <div className="listing-body__description">
          {(listing.description || '').split('\n\n').slice(0, 2).map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <button
          type="button"
          className="listing-body__show-more"
          onClick={onOpenDescription}
        >
          <span>Show more</span>
          <svg viewBox="0 0 18 18" width="12" height="12" aria-hidden="true">
            <path fill="none" stroke="currentColor" strokeWidth="2.5" d="M6 3l6 6-6 6" />
          </svg>
        </button>
      </section>

      <hr className="listing-body__divider" />

      {/* Where you'll sleep */}
      <section className="listing-body__sleep-section">
        <h3 className="section-title">Where you&apos;ll sleep</h3>
        <div className="sleep-cards-grid">
          {(listing.sleepingArrangements || []).map((item, i) => (
            <div key={i} className="sleep-card">
              <img src={item.image} alt={item.room} className="sleep-card__img" />
              <div className="sleep-card__content">
                <h4 className="sleep-card__title">{item.room}</h4>
                <p className="sleep-card__subtitle">{item.bed}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="listing-body__divider" />

      {/* What this place offers */}
      <section className="listing-body__amenities-section">
        <h3 className="section-title">What this place offers</h3>
        <div className="amenities-grid">
          {keyAmenities.map((amenity, i) => (
            <div key={i} className="amenity-item">
              <span className="amenity-item__icon">{amenity.icon}</span>
              <span className="amenity-item__name">{amenity.name}</span>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="outline-btn outline-btn--amenities"
          onClick={onOpenAmenities}
        >
          Show all {listing.amenities?.length || 32} amenities
        </button>
      </section>

      <hr className="listing-body__divider" />

      {/* Interactive 2-Month Calendar */}
      <section id="calendar-section" className="listing-body__calendar-section">
        <h3 className="section-title">{nights} nights in Candolim</h3>
        <p className="calendar-subtitle">
          {startDate.day} {monthNames[startDate.month]} {startDate.year} – {endDate.day}{' '}
          {monthNames[endDate.month]} {endDate.year}
        </p>

        <div className="calendar-duo">
          {/* October 2023 */}
          <div className="calendar-month">
            <div className="calendar-month__header">
              <span className="calendar-month__title">October 2023</span>
            </div>
            <div className="calendar-grid">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                <span key={d} className="calendar-grid__weekday">{d}</span>
              ))}
              {/* Oct 1 is Sunday */}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                const isStart = startDate.month === 10 && day === startDate.day;
                const isEnd = endDate.month === 10 && day === endDate.day;
                const inRange =
                  startDate.month === 10 &&
                  endDate.month === 10 &&
                  day > startDate.day &&
                  day < endDate.day;

                return (
                  <button
                    key={`oct-${day}`}
                    type="button"
                    className={`calendar-grid__day ${
                      isStart ? 'is-start' : ''
                    } ${isEnd ? 'is-end' : ''} ${inRange ? 'is-in-range' : ''}`}
                    onClick={() => onSelectDay?.({ day, month: 10, year: 2023 })}
                    aria-label={`October ${day}, 2023`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* November 2023 */}
          <div className="calendar-month">
            <div className="calendar-month__header">
              <span className="calendar-month__title">November 2023</span>
            </div>
            <div className="calendar-grid">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                <span key={d} className="calendar-grid__weekday">{d}</span>
              ))}
              {/* Nov 1 is Wednesday, 3 empty cells */}
              <span className="calendar-grid__empty-day" />
              <span className="calendar-grid__empty-day" />
              <span className="calendar-grid__empty-day" />
              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                const isStart = startDate.month === 11 && day === startDate.day;
                const isEnd = endDate.month === 11 && day === endDate.day;
                const inRange =
                  (startDate.month === 10 && endDate.month === 11 && day < endDate.day) ||
                  (startDate.month === 11 &&
                    endDate.month === 11 &&
                    day > startDate.day &&
                    day < endDate.day);

                return (
                  <button
                    key={`nov-${day}`}
                    type="button"
                    className={`calendar-grid__day ${
                      isStart ? 'is-start' : ''
                    } ${isEnd ? 'is-end' : ''} ${inRange ? 'is-in-range' : ''}`}
                    onClick={() => onSelectDay?.({ day, month: 11, year: 2023 })}
                    aria-label={`November ${day}, 2023`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="calendar-footer">
          <button
            type="button"
            className="calendar-footer__keyboard"
            onClick={onOpenKeyboardShortcuts}
            aria-label="Keyboard shortcuts"
          >
            <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                d="M4 8h24v16H4zM8 12h2v2H8zm6 0h2v2h-2zm6 0h2v2h-2zm-12 5h2v2H8zm6 0h6v2h-6zm8 0h2v2h-2z"
              />
            </svg>
          </button>
          <button
            type="button"
            className="calendar-footer__clear"
            onClick={onClearDates}
          >
            Clear dates
          </button>
        </div>
      </section>
    </div>
  );
}
