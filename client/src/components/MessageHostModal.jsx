import { useState } from 'react';
import useModalA11y from './useModalA11y';

export default function MessageHostModal({ host, onClose, onSent }) {
  const containerRef = useModalA11y({ isOpen: true, onClose });
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const quickPrompts = [
    'Is early check-in possible?',
    'How far is Candolim beach?',
    'Is parking guaranteed on premises?',
    'What is the jacuzzi heating time?',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      onSent?.(`Message sent to ${host.name}!`);
      onClose();
    }, 1200);
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="message-host-title"
      ref={containerRef}
    >
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="modal-dialog">
        <div className="modal-dialog__header">
          <button
            className="modal-dialog__close"
            onClick={onClose}
            aria-label="Close message modal"
            type="button"
          >
            <svg viewBox="0 0 32 32" width="16" height="16" aria-hidden="true">
              <path
                fill="currentColor"
                d="M18.14 16.03l9.37-9.36c.59-.59.59-1.54 0-2.12-.59-.59-1.54-.59-2.12 0l-9.37 9.36-9.37-9.36c-.59-.59-1.54-.59-2.12 0-.59.59-.59 1.54 0 2.12l9.37 9.36-9.37 9.36c-.59.59-.59 1.54 0 2.12.29.29.68.44 1.06.44.38 0 .77-.15 1.06-.44l9.37-9.36 9.37 9.36c.29.29.68.44 1.06.44.38 0 .77-.15 1.06-.44.59-.59.59-1.54 0-2.12l-9.37-9.36z"
              />
            </svg>
          </button>
          <h2 id="message-host-title" className="modal-dialog__title">
            Contact {host.name}
          </h2>
        </div>

        <div className="modal-dialog__body">
          {submitted ? (
            <div className="message-modal__success">
              <div className="message-modal__success-icon">✓</div>
              <h3>Message sent to {host.name}!</h3>
              <p>They usually respond within an hour. Check your inbox for updates.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="message-modal__form">
              <div className="message-modal__host-snippet">
                <img src={host.avatar} alt={host.name} className="message-modal__avatar" />
                <div>
                  <h4 className="message-modal__host-name">{host.name}</h4>
                  <p className="message-modal__host-info">
                    {host.badge} · Responds {host.responseTime}
                  </p>
                </div>
              </div>

              <div className="message-modal__prompts">
                <span className="message-modal__prompts-label">Quick questions:</span>
                <div className="message-modal__pills">
                  {quickPrompts.map((q) => (
                    <button
                      key={q}
                      type="button"
                      className="message-modal__prompt-btn"
                      onClick={() => setMessage(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              <div className="message-modal__field">
                <label htmlFor="host-message-input" className="message-modal__label">
                  Your message
                </label>
                <textarea
                  id="host-message-input"
                  rows={4}
                  className="message-modal__textarea"
                  placeholder={`Hi ${host.name}, I'm planning to stay at Mirashya UG10...`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="reserve-confirm-btn"
                disabled={!message.trim()}
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
