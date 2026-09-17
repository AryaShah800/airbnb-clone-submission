export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="global-toast" role="status" aria-live="polite">
      <span className="global-toast__message">{message}</span>
      <button
        type="button"
        className="global-toast__close"
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
}
