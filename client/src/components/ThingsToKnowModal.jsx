import useModalA11y from './useModalA11y';

export default function ThingsToKnowModal({ type, listing, onClose }) {
  const containerRef = useModalA11y({ isOpen: true, onClose });

  const config = {
    houseRules: {
      title: 'House rules',
      subtitle: 'You’ll be staying in someone’s home, so please treat it with care and respect.',
      sections: [
        {
          heading: 'Checking in and out',
          items: [
            { icon: '🕒', title: 'Check-in: After 2:00 pm' },
            { icon: '🕚', title: 'Checkout: Before 11:00 am' },
            { icon: '🔑', title: 'Self check-in with building staff / lockbox' },
          ],
        },
        {
          heading: 'During your stay',
          items: [
            { icon: '👥', title: '4 guests maximum' },
            { icon: '🚫', title: 'No pets allowed' },
            { icon: '🔇', title: 'Quiet hours: 10:00 pm – 8:00 am' },
            { icon: '🚭', title: 'No smoking allowed inside the apartment' },
            { icon: '🎉', title: 'No parties or unauthorized events' },
            { icon: '📷', title: 'Commercial photography requires prior written approval' },
          ],
        },
        {
          heading: 'Before you leave',
          items: [
            { icon: '🗑️', title: 'Throw trash in designated bins' },
            { icon: '❄️', title: 'Turn off air conditioning and lights when leaving' },
            { icon: '🔒', title: 'Lock balcony doors and main entrance' },
          ],
        },
      ],
    },
    safety: {
      title: 'Safety & property',
      subtitle: 'Avoid surprises by reviewing these safety features and property details.',
      sections: [
        {
          heading: 'Safety devices',
          items: [
            { icon: '📹', title: 'Exterior security cameras on property', desc: 'Located at the building entrance and parking area for guest security.' },
            { icon: '🚨', title: 'Smoke alarm installed', desc: 'Installed in the kitchen and common area.' },
            { icon: '💨', title: 'Carbon monoxide detector', desc: 'Active carbon monoxide sensor in place.' },
            { icon: '🧯', title: 'First aid kit & fire extinguisher', desc: 'Located in the utility closet near the entrance.' },
          ],
        },
        {
          heading: 'Property info',
          items: [
            { icon: '🏊‍♂️', title: 'Shared outdoor swimming pool without lifeguard', desc: 'Open 8:00 am to 8:00 pm. Children must be supervised.' },
            { icon: '🪜', title: 'Potential for noise', desc: 'Ground floor unit with occasional sounds from garden pathway.' },
            { icon: '⚡', title: 'Power backup available', desc: 'Inverter backup powers essential lights, fans, and fiber Wi-Fi during local outages.' },
          ],
        },
      ],
    },
    cancellation: {
      title: 'Cancellation policy',
      subtitle: 'Before you book, make sure you’re comfortable with this Host’s cancellation policy.',
      sections: [
        {
          heading: 'Cancellation details',
          items: [
            { icon: '✓', title: 'Full refund within 48 hours of booking', desc: 'Cancel within 48 hours of booking and at least 14 days before check-in for a full 100% refund.' },
            { icon: '⏳', title: 'Partial refund before check-in', desc: 'Cancel at least 7 days before check-in and get a 50% refund of the nightly rate, plus the cleaning fee.' },
            { icon: '⚠️', title: 'Non-refundable within 7 days', desc: 'Cancellations made within 7 days of check-in are non-refundable.' },
          ],
        },
        {
          heading: 'Cleaning fee refund',
          items: [
            { icon: '🧼', title: 'Cleaning fees are always refunded if you cancel before check-in.' },
          ],
        },
      ],
    },
  };

  const current = config[type] || config.houseRules;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ttk-modal-title"
      ref={containerRef}
    >
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="modal-dialog">
        <div className="modal-dialog__header">
          <button
            className="modal-dialog__close"
            onClick={onClose}
            aria-label="Close modal"
            type="button"
          >
            <svg viewBox="0 0 32 32" width="16" height="16" aria-hidden="true">
              <path
                fill="currentColor"
                d="M18.14 16.03l9.37-9.36c.59-.59.59-1.54 0-2.12-.59-.59-1.54-.59-2.12 0l-9.37 9.36-9.37-9.36c-.59-.59-1.54-.59-2.12 0-.59.59-.59 1.54 0 2.12l9.37 9.36-9.37 9.36c-.59.59-.59 1.54 0 2.12.29.29.68.44 1.06.44.38 0 .77-.15 1.06-.44l9.37-9.36 9.37 9.36c.29.29.68.44 1.06.44.38 0 .77-.15 1.06-.44.59-.59.59-1.54 0-2.12l-9.37-9.36z"
              />
            </svg>
          </button>
          <h2 id="ttk-modal-title" className="modal-dialog__title">
            {current.title}
          </h2>
        </div>

        <div className="modal-dialog__body">
          <p className="ttk-modal__subtitle">{current.subtitle}</p>

          {current.sections.map((sec, idx) => (
            <div key={idx} className="ttk-modal__section">
              <h3 className="ttk-modal__section-heading">{sec.heading}</h3>
              <ul className="ttk-modal__list">
                {sec.items.map((item, i) => (
                  <li key={i} className="ttk-modal__list-item">
                    <span className="ttk-modal__item-icon">{item.icon}</span>
                    <div className="ttk-modal__item-text">
                      <span className="ttk-modal__item-title">{item.title}</span>
                      {item.desc && <p className="ttk-modal__item-desc">{item.desc}</p>}
                    </div>
                  </li>
                ))}
              </ul>
              {idx < current.sections.length - 1 && <hr className="modal-dialog__divider" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
