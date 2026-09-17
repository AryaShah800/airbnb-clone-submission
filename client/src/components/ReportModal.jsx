import { useState } from 'react';
import useModalA11y from './useModalA11y';

export default function ReportModal({ onClose, onReported }) {
  const containerRef = useModalA11y({ isOpen: true, onClose });
  const [reason, setReason] = useState('inaccurate');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const reasons = [
    { id: 'inaccurate', label: 'Inaccurate photos or description' },
    { id: 'scam', label: 'It looks fraudulent or like a scam' },
    { id: 'safety', label: 'Safety or privacy concern' },
    { id: 'offensive', label: 'Offensive or inappropriate content' },
    { id: 'other', label: 'Something else' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onReported?.('Report submitted. Thank you for keeping Airbnb safe.');
      onClose();
    }, 1400);
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
      ref={containerRef}
    >
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="modal-dialog">
        <div className="modal-dialog__header">
          <button
            className="modal-dialog__close"
            onClick={onClose}
            aria-label="Close report modal"
            type="button"
          >
            <svg viewBox="0 0 32 32" width="16" height="16" aria-hidden="true">
              <path
                fill="currentColor"
                d="M18.14 16.03l9.37-9.36c.59-.59.59-1.54 0-2.12-.59-.59-1.54-.59-2.12 0l-9.37 9.36-9.37-9.36c-.59-.59-1.54-.59-2.12 0-.59.59-.59 1.54 0 2.12l9.37 9.36-9.37 9.36c-.59.59-.59 1.54 0 2.12.29.29.68.44 1.06.44.38 0 .77-.15 1.06-.44l9.37-9.36 9.37 9.36c.29.29.68.44 1.06.44.38 0 .77-.15 1.06-.44.59-.59.59-1.54 0-2.12l-9.37-9.36z"
              />
            </svg>
          </button>
          <h2 id="report-modal-title" className="modal-dialog__title">
            Report this listing
          </h2>
        </div>

        <div className="modal-dialog__body">
          {submitted ? (
            <div className="message-modal__success">
              <div className="message-modal__success-icon">✓</div>
              <h3>Report received</h3>
              <p>Our Trust & Safety team reviews every report within 24 hours. Thanks for your vigilance.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="report-modal__form">
              <p className="report-modal__desc">
                Why are you reporting this listing? Your report will remain anonymous.
              </p>

              <div className="report-modal__options">
                {reasons.map((r) => (
                  <label key={r.id} className="report-modal__radio-label">
                    <input
                      type="radio"
                      name="reportReason"
                      value={r.id}
                      checked={reason === r.id}
                      onChange={(e) => setReason(e.target.value)}
                      className="report-modal__radio"
                    />
                    <span>{r.label}</span>
                  </label>
                ))}
              </div>

              <div className="report-modal__field">
                <label htmlFor="report-details-input" className="report-modal__label">
                  Additional comments (optional)
                </label>
                <textarea
                  id="report-details-input"
                  rows={4}
                  className="report-modal__textarea"
                  placeholder="Provide more context to assist our team..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div>

              <button type="submit" className="reserve-confirm-btn">
                Submit report
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
