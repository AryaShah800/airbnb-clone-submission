import useModalA11y from './useModalA11y';

export default function DescriptionModal({ listing, onClose }) {
  const containerRef = useModalA11y({ isOpen: true, onClose });

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="desc-modal-title"
      ref={containerRef}
    >
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="modal-dialog">
        <div className="modal-dialog__header">
          <button
            className="modal-dialog__close"
            onClick={onClose}
            aria-label="Close description modal"
            type="button"
          >
            <svg viewBox="0 0 32 32" width="16" height="16" aria-hidden="true">
              <path
                fill="currentColor"
                d="M18.14 16.03l9.37-9.36c.59-.59.59-1.54 0-2.12-.59-.59-1.54-.59-2.12 0l-9.37 9.36-9.37-9.36c-.59-.59-1.54-.59-2.12 0-.59.59-.59 1.54 0 2.12l9.37 9.36-9.37 9.36c-.59.59-.59 1.54 0 2.12.29.29.68.44 1.06.44.38 0 .77-.15 1.06-.44l9.37-9.36 9.37 9.36c.29.29.68.44 1.06.44.38 0 .77-.15 1.06-.44.59-.59.59-1.54 0-2.12l-9.37-9.36z"
              />
            </svg>
          </button>
          <h2 id="desc-modal-title" className="modal-dialog__title">
            About this space
          </h2>
        </div>
        <div className="modal-dialog__body">
          <div className="desc-modal__content">
            {listing.description.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
            <hr className="modal-dialog__divider" />
            <h3>The Space</h3>
            <p>
              Located in the highly sought-after Candolim enclave of North Goa, Mirashya UG10
              offers a private jacuzzi experience within a tranquil serviced apartment setting.
              The master bedroom features a double bed with premium mattress and crisp linens. The
              living room includes a convertible sofa bed, dedicated work station, and flat-screen TV.
            </p>
            <h3>Guest Access</h3>
            <p>
              Guests have exclusive private access to the entire apartment, including private jacuzzi
              and balcony, as well as shared access to the compound's swimming pool, garden, and on-premises parking.
            </p>
            <h3>Other Things to Note</h3>
            <p>
              • Daily housekeeping available on request<br />
              • High-speed fiber Wi-Fi with power backup<br />
              • Caretaker on-site to assist with check-in and local recommendations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
