import { useState } from 'react';
import useModalA11y from './useModalA11y';

export const CURRENCIES = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 1 },
  { code: 'USD', symbol: '$', name: 'United States Dollar', rate: 0.0116 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.0108 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.0091 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 0.0178 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 0.0161 },
  { code: 'AED', symbol: 'د.إ', name: 'Emirati Dirham', rate: 0.0426 },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rate: 0.0156 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 1.80 },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', rate: 0.0104 },
];

export const LANGUAGES = [
  { code: 'en-IN', name: 'English', region: 'India' },
  { code: 'en-US', name: 'English', region: 'United States' },
  { code: 'en-GB', name: 'English', region: 'United Kingdom' },
  { code: 'hi-IN', name: 'हिन्दी', region: 'भारत' },
  { code: 'fr-FR', name: 'Français', region: 'France' },
  { code: 'es-ES', name: 'Español', region: 'España' },
  { code: 'de-DE', name: 'Deutsch', region: 'Deutschland' },
  { code: 'ja-JP', name: '日本語', region: '日本' },
];

export default function CurrencyModal({
  currentCurrency = 'INR',
  currentLanguage = 'en-IN',
  onSelectCurrency,
  onSelectLanguage,
  onClose,
}) {
  const containerRef = useModalA11y({ isOpen: true, onClose });
  const [activeTab, setActiveTab] = useState('currency'); // 'currency' | 'language'

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="currency-modal-title"
      ref={containerRef}
    >
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="modal-dialog modal-dialog--wide">
        <div className="modal-dialog__header">
          <button
            className="modal-dialog__close"
            onClick={onClose}
            aria-label="Close currency and language settings"
            type="button"
          >
            <svg viewBox="0 0 32 32" width="16" height="16" aria-hidden="true">
              <path
                fill="currentColor"
                d="M18.14 16.03l9.37-9.36c.59-.59.59-1.54 0-2.12-.59-.59-1.54-.59-2.12 0l-9.37 9.36-9.37-9.36c-.59-.59-1.54-.59-2.12 0-.59.59-.59 1.54 0 2.12l9.37 9.36-9.37 9.36c-.59.59-.59 1.54 0 2.12.29.29.68.44 1.06.44.38 0 .77-.15 1.06-.44l9.37-9.36 9.37 9.36c.29.29.68.44 1.06.44.38 0 .77-.15 1.06-.44.59-.59.59-1.54 0-2.12l-9.37-9.36z"
              />
            </svg>
          </button>
          <div className="currency-modal__tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'currency'}
              className={`currency-modal__tab ${activeTab === 'currency' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('currency')}
            >
              Currency
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'language'}
              className={`currency-modal__tab ${activeTab === 'language' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('language')}
            >
              Language and region
            </button>
          </div>
        </div>

        <div className="modal-dialog__body">
          {activeTab === 'currency' ? (
            <div>
              <h2 id="currency-modal-title" className="currency-modal__heading">
                Choose a currency
              </h2>
              <div className="currency-grid">
                {CURRENCIES.map((c) => {
                  const isSelected = c.code === currentCurrency;
                  return (
                    <button
                      key={c.code}
                      type="button"
                      className={`currency-card ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => {
                        onSelectCurrency?.(c);
                        onClose();
                      }}
                    >
                      <div className="currency-card__info">
                        <span className="currency-card__name">{c.name}</span>
                        <span className="currency-card__code">
                          {c.code} – {c.symbol}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="currency-card__check" aria-hidden="true">
                          ✓
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              <h2 id="currency-modal-title" className="currency-modal__heading">
                Suggested languages
              </h2>
              <div className="currency-grid">
                {LANGUAGES.map((l) => {
                  const isSelected = l.code === currentLanguage;
                  return (
                    <button
                      key={l.code}
                      type="button"
                      className={`currency-card ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => {
                        onSelectLanguage?.(l);
                        onClose();
                      }}
                    >
                      <div className="currency-card__info">
                        <span className="currency-card__name">{l.name}</span>
                        <span className="currency-card__code">{l.region}</span>
                      </div>
                      {isSelected && (
                        <div className="currency-card__check" aria-hidden="true">
                          ✓
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
