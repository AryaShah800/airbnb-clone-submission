import { useState } from 'react';
import useModalA11y from './useModalA11y';

export default function ReserveModal({
  listing,
  currencyInfo = { code: 'INR', symbol: '₹', rate: 1 },
  startDate,
  endDate,
  nights,
  guests,
  onClose,
  onConfirmed,
}) {
  const containerRef = useModalA11y({ isOpen: true, onClose });
  const [step, setStep] = useState('confirm'); // 'confirm' | 'success'

  const baseNightly = listing?.price?.nightly || 28498;
  const baseCleaning = listing?.price?.cleaningFee || 1500;
  const rate = currencyInfo?.rate || 1;
  const currency = currencyInfo?.symbol || '₹';

  const nightly = Math.round(baseNightly * rate);
  const cleaningFee = Math.round(baseCleaning * rate);
  const stayCost = nightly * nights;
  const serviceFee = Math.round(stayCost * 0.142);
  const total = stayCost + cleaningFee + serviceFee;

  const handleConfirm = () => {
    setStep('success');
    onConfirmed?.('Reservation confirmed! Confirmation code #AB-92418');
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reserve-modal-title"
      ref={containerRef}
    >
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="modal-dialog modal-dialog--wide">
        <div className="modal-dialog__header">
          <button
            className="modal-dialog__close"
            onClick={onClose}
            aria-label="Close reservation modal"
            type="button"
          >
            <svg viewBox="0 0 32 32" width="16" height="16" aria-hidden="true">
              <path
                fill="currentColor"
                d="M18.14 16.03l9.37-9.36c.59-.59.59-1.54 0-2.12-.59-.59-1.54-.59-2.12 0l-9.37 9.36-9.37-9.36c-.59-.59-1.54-.59-2.12 0-.59.59-.59 1.54 0 2.12l9.37 9.36-9.37 9.36c-.59.59-.59 1.54 0 2.12.29.29.68.44 1.06.44.38 0 .77-.15 1.06-.44l9.37-9.36 9.37 9.36c.29.29.68.44 1.06.44.38 0 .77-.15 1.06-.44.59-.59.59-1.54 0-2.12l-9.37-9.36z"
              />
            </svg>
          </button>
          <h2 id="reserve-modal-title" className="modal-dialog__title">
            {step === 'confirm' ? 'Confirm your reservation' : 'Reservation confirmed!'}
          </h2>
        </div>

        <div className="modal-dialog__body">
          {step === 'confirm' ? (
            <div className="reserve-modal__content">
              {/* Listing summary card */}
              <div className="reserve-modal__listing-card">
                <img
                  src={listing?.images?.[0]?.url || '/images/img-1.jpg'}
                  alt={listing?.title}
                  className="reserve-modal__thumb"
                />
                <div>
                  <span className="reserve-modal__type">{listing?.propertyType}</span>
                  <h3 className="reserve-modal__name">{listing?.title}</h3>
                  <div className="reserve-modal__rating">
                    ★ {listing?.rating} ({listing?.reviewCount} reviews) · {listing?.host?.badge}
                  </div>
                </div>
              </div>

              <hr className="modal-dialog__divider" />

              {/* Trip details */}
              <div className="reserve-modal__trip-details">
                <h4 className="reserve-modal__section-title">Your trip</h4>

                <div className="reserve-modal__detail-row">
                  <div>
                    <strong>Dates</strong>
                    <p>
                      {startDate.day} Oct 2023 – {endDate.day} Oct 2023 ({nights} nights)
                    </p>
                  </div>
                </div>

                <div className="reserve-modal__detail-row">
                  <div>
                    <strong>Guests</strong>
                    <p>
                      {guests} guest{guests > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>

              <hr className="modal-dialog__divider" />

              {/* Price breakdown */}
              <div className="reserve-modal__price-details">
                <h4 className="reserve-modal__section-title">Price details</h4>

                <div className="booking-card__breakdown-row">
                  <span>
                    {currency}
                    {nightly.toLocaleString('en-IN')} x {nights} nights
                  </span>
                  <span>
                    {currency}
                    {stayCost.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="booking-card__breakdown-row">
                  <span>Cleaning fee</span>
                  <span>
                    {currency}
                    {cleaningFee.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="booking-card__breakdown-row">
                  <span>Airbnb service fee</span>
                  <span>
                    {currency}
                    {serviceFee.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="booking-card__breakdown-row booking-card__breakdown-row--total">
                  <strong>Total before taxes</strong>
                  <strong>
                    {currency}
                    {total.toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>

              <hr className="modal-dialog__divider" />

              <div className="reserve-modal__cancellation-note">
                <p>
                  <strong>Free cancellation before 12 Oct.</strong> After that, cancel before check-in and get a partial refund.
                </p>
              </div>

              <button
                type="button"
                className="reserve-confirm-btn"
                onClick={handleConfirm}
              >
                Confirm and reserve
              </button>
            </div>
          ) : (
            <div className="reserve-modal__success">
              <div className="reserve-modal__success-icon">🎉</div>
              <h3>Pack your bags! You&apos;re going to Candolim!</h3>
              <p className="reserve-modal__code">
                Confirmation code: <strong>#AB-92418</strong>
              </p>
              <p>
                A receipt and check-in guide have been sent to your email. Michelle & Neha are ready to welcome you.
              </p>
              <button
                type="button"
                className="outline-btn outline-btn--amenities"
                onClick={onClose}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
