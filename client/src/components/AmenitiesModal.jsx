import { useState } from 'react';
import useModalA11y from './useModalA11y';

export default function AmenitiesModal({ amenities, onClose }) {
  const containerRef = useModalA11y({ isOpen: true, onClose });
  const [search, setSearch] = useState('');

  // Group amenities by category
  const categories = {};
  amenities.forEach((item) => {
    if (!categories[item.category]) categories[item.category] = [];
    categories[item.category].push(item);
  });

  const filteredCategories = Object.entries(categories).reduce((acc, [cat, items]) => {
    const matched = items.filter((i) =>
      i.name.toLowerCase().includes(search.toLowerCase())
    );
    if (matched.length > 0) acc[cat] = matched;
    return acc;
  }, {});

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="amenities-modal-title"
      ref={containerRef}
    >
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="modal-dialog modal-dialog--wide">
        <div className="modal-dialog__header">
          <button
            className="modal-dialog__close"
            onClick={onClose}
            aria-label="Close amenities modal"
            type="button"
          >
            <svg viewBox="0 0 32 32" width="16" height="16" aria-hidden="true">
              <path
                fill="currentColor"
                d="M18.14 16.03l9.37-9.36c.59-.59.59-1.54 0-2.12-.59-.59-1.54-.59-2.12 0l-9.37 9.36-9.37-9.36c-.59-.59-1.54-.59-2.12 0-.59.59-.59 1.54 0 2.12l9.37 9.36-9.37 9.36c-.59.59-.59 1.54 0 2.12.29.29.68.44 1.06.44.38 0 .77-.15 1.06-.44l9.37-9.36 9.37 9.36c.29.29.68.44 1.06.44.38 0 .77-.15 1.06-.44.59-.59.59-1.54 0-2.12l-9.37-9.36z"
              />
            </svg>
          </button>
          <h2 id="amenities-modal-title" className="modal-dialog__title">
            What this place offers
          </h2>
        </div>

        <div className="modal-dialog__search">
          <svg
            viewBox="0 0 32 32"
            width="14"
            height="14"
            aria-hidden="true"
            className="modal-dialog__search-icon"
          >
            <path
              fill="currentColor"
              d="M13 24a11 11 0 100-22 11 11 0 000 22zm8-2.586l6.293 6.293a1 1 0 01-1.414 1.414L19.586 23A12.934 12.934 0 0113 26a13 13 0 1113-13c0 2.946-.98 5.666-2.632 7.848z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search amenities"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="modal-dialog__search-input"
            aria-label="Search amenities"
          />
        </div>

        <div className="modal-dialog__body">
          {Object.entries(filteredCategories).length === 0 ? (
            <p className="modal-dialog__empty">
              No amenities found matching &quot;{search}&quot;.
            </p>
          ) : (
            Object.entries(filteredCategories).map(([cat, items]) => (
              <section key={cat} className="amenities-modal__section">
                <h3 className="amenities-modal__cat-title">{cat}</h3>
                <ul className="amenities-modal__list">
                  {items.map((item) => (
                    <li key={item.name} className="amenities-modal__item">
                      <span className="amenities-modal__name">{item.name}</span>
                    </li>
                  ))}
                </ul>
                <hr className="modal-dialog__divider" />
              </section>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
