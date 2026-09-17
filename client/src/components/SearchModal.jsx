import { useState } from 'react';
import useModalA11y from './useModalA11y';

export default function SearchModal({ onClose, onSearch }) {
  const containerRef = useModalA11y({ isOpen: true, onClose });

  const destinations = [
    { name: 'Candolim, North Goa', desc: 'Near beach, shacks & Mirashya UG10' },
    { name: 'Calangute, North Goa', desc: 'Central coastal hub & water sports' },
    { name: 'Baga, North Goa', desc: 'Nightlife, dining & beach clubs' },
    { name: 'Anjuna, North Goa', desc: 'Flea markets, cliffs & sunset cafes' },
    { name: 'Panaji, Central Goa', desc: 'Fontainhas Latin quarter & casinos' },
    { name: 'Morjim & Ashwem, North Goa', desc: 'Tranquil beaches & olive ridley turtles' },
    { name: 'Palolem, South Goa', desc: 'Scenic crescent bay & peaceful palms' },
  ];

  const [destination, setDestination] = useState(destinations[0].name);
  const [checkIn, setCheckIn] = useState('2023-10-14');
  const [checkOut, setCheckOut] = useState('2023-10-19');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [infants, setInfants] = useState(0);

  const totalGuests = adults + children;

  const handleSubmit = (e) => {
    e.preventDefault();
    const summary = `${destination} · ${checkIn} to ${checkOut} · ${totalGuests} guest${
      totalGuests > 1 ? 's' : ''
    }${infants > 0 ? ` (${infants} infant${infants > 1 ? 's' : ''})` : ''}`;
    onSearch?.(`Search applied: ${summary}`);
    onClose();
  };

  const handlePreset = (dest) => {
    setDestination(dest);
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      ref={containerRef}
    >
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="modal-dialog modal-dialog--wide">
        <div className="modal-dialog__header">
          <button
            className="modal-dialog__close"
            onClick={onClose}
            aria-label="Close search"
            type="button"
          >
            <svg viewBox="0 0 32 32" width="16" height="16" aria-hidden="true">
              <path
                fill="currentColor"
                d="M18.14 16.03l9.37-9.36c.59-.59.59-1.54 0-2.12-.59-.59-1.54-.59-2.12 0l-9.37 9.36-9.37-9.36c-.59-.59-1.54-.59-2.12 0-.59.59-.59 1.54 0 2.12l9.37 9.36-9.37 9.36c-.59.59-.59 1.54 0 2.12.29.29.68.44 1.06.44.38 0 .77-.15 1.06-.44l9.37-9.36 9.37 9.36c.29.29.68.44 1.06.44.38 0 .77-.15 1.06-.44.59-.59.59-1.54 0-2.12l-9.37-9.36z"
              />
            </svg>
          </button>
          <h2 id="search-modal-title" className="modal-dialog__title">
            Find your stay
          </h2>
        </div>

        <div className="modal-dialog__body">
          <form onSubmit={handleSubmit} className="search-form-rich">
            {/* WHERE: Dropdown & quick pills */}
            <div className="search-card-block">
              <label htmlFor="search-dest-select" className="search-card-block__label">
                <span className="search-card-block__label-text">Where</span>
                <span className="search-card-block__sub">Choose destination or area</span>
              </label>
              <div className="search-select-wrap">
                <select
                  id="search-dest-select"
                  className="search-card-block__select"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                >
                  {destinations.map((d) => (
                    <option key={d.name} value={d.name}>
                      📍 {d.name} ({d.desc})
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick destination chips */}
              <div className="search-chips-row">
                {destinations.slice(0, 4).map((d) => {
                  const short = d.name.split(',')[0];
                  return (
                    <button
                      key={short}
                      type="button"
                      className={`search-chip ${destination.includes(short) ? 'is-active' : ''}`}
                      onClick={() => handlePreset(d.name)}
                    >
                      {short}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* WHEN: Date Pickers */}
            <div className="search-card-block">
              <span className="search-card-block__label-text">When</span>
              <span className="search-card-block__sub">Select check-in and checkout dates</span>

              <div className="search-dates-grid">
                <div className="search-date-field">
                  <label htmlFor="search-checkin-input" className="search-date-field__sublabel">
                    Check-in
                  </label>
                  <input
                    id="search-checkin-input"
                    type="date"
                    className="search-date-field__input"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                  />
                </div>

                <div className="search-date-field">
                  <label htmlFor="search-checkout-input" className="search-date-field__sublabel">
                    Checkout
                  </label>
                  <input
                    id="search-checkout-input"
                    type="date"
                    className="search-date-field__input"
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* WHO: Guest Stepper Counter */}
            <div className="search-card-block">
              <div className="search-card-block__header">
                <div>
                  <span className="search-card-block__label-text">Who</span>
                  <span className="search-card-block__sub">
                    {totalGuests} guest{totalGuests > 1 ? 's' : ''}
                    {infants > 0 ? `, ${infants} infant${infants > 1 ? 's' : ''}` : ''}
                  </span>
                </div>
              </div>

              <div className="guest-steppers-list">
                {/* Adults */}
                <div className="guest-stepper-row">
                  <div>
                    <div className="guest-stepper-row__title">Adults</div>
                    <div className="guest-stepper-row__desc">Age 13 or above</div>
                  </div>
                  <div className="guest-stepper-controls">
                    <button
                      type="button"
                      className="stepper-btn"
                      disabled={adults <= 1}
                      onClick={() => setAdults((a) => Math.max(1, a - 1))}
                      aria-label="Decrease adults"
                    >
                      −
                    </button>
                    <span className="stepper-count">{adults}</span>
                    <button
                      type="button"
                      className="stepper-btn"
                      disabled={adults >= 16}
                      onClick={() => setAdults((a) => a + 1)}
                      aria-label="Increase adults"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="guest-stepper-row">
                  <div>
                    <div className="guest-stepper-row__title">Children</div>
                    <div className="guest-stepper-row__desc">Ages 2–12</div>
                  </div>
                  <div className="guest-stepper-controls">
                    <button
                      type="button"
                      className="stepper-btn"
                      disabled={children <= 0}
                      onClick={() => setChildren((c) => Math.max(0, c - 1))}
                      aria-label="Decrease children"
                    >
                      −
                    </button>
                    <span className="stepper-count">{children}</span>
                    <button
                      type="button"
                      className="stepper-btn"
                      disabled={children >= 10}
                      onClick={() => setChildren((c) => c + 1)}
                      aria-label="Increase children"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Infants */}
                <div className="guest-stepper-row">
                  <div>
                    <div className="guest-stepper-row__title">Infants</div>
                    <div className="guest-stepper-row__desc">Under 2</div>
                  </div>
                  <div className="guest-stepper-controls">
                    <button
                      type="button"
                      className="stepper-btn"
                      disabled={infants <= 0}
                      onClick={() => setInfants((i) => Math.max(0, i - 1))}
                      aria-label="Decrease infants"
                    >
                      −
                    </button>
                    <span className="stepper-count">{infants}</span>
                    <button
                      type="button"
                      className="stepper-btn"
                      disabled={infants >= 5}
                      onClick={() => setInfants((i) => i + 1)}
                      aria-label="Increase infants"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="search-form-rich__footer">
              <button
                type="button"
                className="search-form-rich__clear-btn"
                onClick={() => {
                  setDestination(destinations[0].name);
                  setCheckIn('2023-10-14');
                  setCheckOut('2023-10-19');
                  setAdults(1);
                  setChildren(0);
                  setInfants(0);
                }}
              >
                Clear all
              </button>
              <button type="submit" className="reserve-confirm-btn search-form-rich__submit-btn">
                <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M13 24a11 11 0 100-22 11 11 0 000 22zm8-2.586l6.293 6.293a1 1 0 01-1.414 1.414L19.586 23A12.934 12.934 0 0113 26a13 13 0 1113-13c0 2.946-.98 5.666-2.632 7.848z" />
                </svg>
                Search Stays
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
