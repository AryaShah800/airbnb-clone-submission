import useModalA11y from './useModalA11y';

export default function KeyboardShortcutsModal({ onClose }) {
  const containerRef = useModalA11y({ isOpen: true, onClose });

  const shortcuts = [
    { key: 'Enter / Space', desc: 'Select the date in focus' },
    { key: 'Left / Right arrow', desc: 'Move backward (left) and forward (right) by one day' },
    { key: 'Up / Down arrow', desc: 'Move backward (up) and forward (down) by one week' },
    { key: 'Page Up / Page Down', desc: 'Switch months' },
    { key: 'Home / End', desc: 'Go to the first or last day of the week' },
    { key: 'Escape', desc: 'Close this dialog' },
  ];

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="kb-modal-title"
      ref={containerRef}
    >
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="modal-dialog">
        <div className="modal-dialog__header">
          <button
            className="modal-dialog__close"
            onClick={onClose}
            aria-label="Close keyboard shortcuts dialog"
            type="button"
          >
            <svg viewBox="0 0 32 32" width="16" height="16" aria-hidden="true">
              <path
                fill="currentColor"
                d="M18.14 16.03l9.37-9.36c.59-.59.59-1.54 0-2.12-.59-.59-1.54-.59-2.12 0l-9.37 9.36-9.37-9.36c-.59-.59-1.54-.59-2.12 0-.59.59-.59 1.54 0 2.12l9.37 9.36-9.37 9.36c-.59.59-.59 1.54 0 2.12.29.29.68.44 1.06.44.38 0 .77-.15 1.06-.44l9.37-9.36 9.37 9.36c.29.29.68.44 1.06.44.38 0 .77-.15 1.06-.44.59-.59.59-1.54 0-2.12l-9.37-9.36z"
              />
            </svg>
          </button>
          <h2 id="kb-modal-title" className="modal-dialog__title">
            Keyboard shortcuts
          </h2>
        </div>

        <div className="modal-dialog__body">
          <table className="shortcuts-table">
            <tbody>
              {shortcuts.map((s, i) => (
                <tr key={i} className="shortcuts-table__row">
                  <td className="shortcuts-table__key">
                    <kbd>{s.key}</kbd>
                  </td>
                  <td className="shortcuts-table__desc">{s.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
