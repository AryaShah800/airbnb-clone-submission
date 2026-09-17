export default function BookingCard({
  listing,
  currencyInfo = { code: 'INR', symbol: '₹', rate: 1 },
  startDate = { day: 14, month: 10, year: 2023 },
  endDate = { day: 19, month: 10, year: 2023 },
  nights = 5,
  guests = 1,
  setGuests,
  onOpenReserve,
  onOpenReport,
  onDatesClick,
}) {
  const baseNightly = listing?.price?.nightly || 28498;
  const baseCleaning = listing?.price?.cleaningFee || 1500;
  const rate = currencyInfo?.rate || 1;
  const currency = currencyInfo?.symbol || '₹';

  const nightly = Math.round(baseNightly * rate);
  const cleaningFee = Math.round(baseCleaning * rate);
  const stayCost = nightly * nights;
  const serviceFee = Math.round(stayCost * 0.142);
  const total = stayCost + cleaningFee + serviceFee;

  const formatDate = (d) =>
    `${String(d.day).padStart(2, '0')}/${String(d.month).padStart(2, '0')}/${d.year}`;

  return (
    <aside className="booking-card" aria-label="Booking widget">
      {/* Price Header */}
      <div className="booking-card__price-row">
        <div>
          <span className="booking-card__price">
            {currency}
            {nightly.toLocaleString('en-IN')}
          </span>
          <span className="booking-card__price-unit"> night</span>
        </div>
      </div>

      {/* Date & Guest Picker Box */}
      <div className="booking-card__picker-box">
        <div
          className="booking-card__date-row"
          onClick={onDatesClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onDatesClick?.();
            }
          }}
          aria-label={`Selected dates: ${formatDate(startDate)} to ${formatDate(endDate)}. Click to change.`}
          title="Click to jump to calendar"
        >
          <div className="booking-card__date-col booking-card__date-col--left">
            <label className="booking-card__picker-label">CHECK-IN</label>
            <div className="booking-card__picker-val">{formatDate(startDate)}</div>
          </div>
          <div className="booking-card__date-col">
            <label className="booking-card__picker-label">CHECKOUT</label>
            <div className="booking-card__picker-val">{formatDate(endDate)}</div>
          </div>
        </div>
        <div className="booking-card__guest-row">
          <label htmlFor="booking-guests" className="booking-card__picker-label">
            GUESTS
          </label>
          <div className="booking-card__select-wrap">
            <select
              id="booking-guests"
              value={guests}
              onChange={(e) => setGuests?.(Number(e.target.value))}
              className="booking-card__guest-select"
            >
              {Array.from({ length: listing?.guests || 4 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} guest{n > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Reserve CTA */}
      <button
        type="button"
        className="booking-card__reserve-btn"
        onClick={onOpenReserve}
      >
        Reserve
      </button>

      <p className="booking-card__charged-note">You won&apos;t be charged yet</p>

      {/* Breakdown */}
      <div className="booking-card__breakdown">
        <div className="booking-card__breakdown-row">
          <span className="booking-card__breakdown-label">
            {currency}
            {nightly.toLocaleString('en-IN')} x {nights} nights
          </span>
          <span className="booking-card__breakdown-val">
            {currency}
            {stayCost.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="booking-card__breakdown-row">
          <span className="booking-card__breakdown-label">Cleaning fee</span>
          <span className="booking-card__breakdown-val">
            {currency}
            {cleaningFee.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="booking-card__breakdown-row">
          <span className="booking-card__breakdown-label">Airbnb service fee</span>
          <span className="booking-card__breakdown-val">
            {currency}
            {serviceFee.toLocaleString('en-IN')}
          </span>
        </div>

        <hr className="booking-card__divider" />

        <div className="booking-card__breakdown-row booking-card__breakdown-row--total">
          <span className="booking-card__total-label">Total before taxes</span>
          <span className="booking-card__total-val">
            {currency}
            {total.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Report listing */}
      <div className="booking-card__report">
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className="report-flag">
          <path
            fill="currentColor"
            d="M3 1v14H1V1h2zm1-1h10l-2 5 2 5H4V0z"
          />
        </svg>
        <button
          type="button"
          className="booking-card__report-btn"
          onClick={onOpenReport}
        >
          Report this listing
        </button>
      </div>
    </aside>
  );
}
