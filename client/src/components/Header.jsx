import { useEffect, useRef, useState } from 'react';

export default function Header({ onOpenSearch, onOpenCurrency, onToast }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setShowMenu(false);
      }
    }
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showMenu]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        {/* Brand Logo */}
        <a className="site-header__logo" href="/" aria-label="Airbnb homepage">
          <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" className="site-header__logo-icon">
            <path
              fill="#FF385C"
              d="M16 1c-1.6 0-2.9 1.1-3.6 2.6C9.8 8.7 3 19.6 3 23.5 3 28.2 6.8 32 11.5 32c2.7 0 5.1-1.3 6.6-3.3.5.6 1.1 1.2 1.8 1.7C21.4 31.4 23 32 24.7 32 28.7 32 32 28.7 32 24.7c0-3.6-5.9-13.7-8.7-19.6C22.6 3.1 21.3 1.4 19.6 1c-.6-.1-1.2 0-1.8.2C17.2 1 16.6 1 16 1z"
            />
          </svg>
          <span className="site-header__brand-name">airbnb</span>
        </a>

        {/* Center Search Bar Pill */}
        <div
          className="site-header__search-pill"
          role="search"
          onClick={onOpenSearch}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpenSearch?.();
            }
          }}
          aria-label="Click to search destinations, dates, and guests"
        >
          <button
            className="site-header__search-btn site-header__search-btn--bold"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenSearch?.();
            }}
          >
            Anywhere
          </button>
          <span className="site-header__search-divider" aria-hidden="true" />
          <button
            className="site-header__search-btn site-header__search-btn--bold"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenSearch?.();
            }}
          >
            Any week
          </button>
          <span className="site-header__search-divider" aria-hidden="true" />
          <button
            className="site-header__search-btn site-header__search-btn--muted"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenSearch?.();
            }}
          >
            Add guests
          </button>
          <button
            className="site-header__search-icon-btn"
            aria-label="Search"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenSearch?.();
            }}
          >
            <svg viewBox="0 0 32 32" width="12" height="12" aria-hidden="true">
              <path
                fill="currentColor"
                d="M13 24a11 11 0 100-22 11 11 0 000 22zm8-2.586l6.293 6.293a1 1 0 01-1.414 1.414L19.586 23A12.934 12.934 0 0113 26a13 13 0 1113-13c0 2.946-.98 5.666-2.632 7.848z"
              />
            </svg>
          </button>
        </div>

        {/* Right User Controls */}
        <div className="site-header__user-nav">
          <button
            className="site-header__host-link"
            type="button"
            onClick={() => onToast?.('Airbnb your home setup opened!')}
          >
            Airbnb your home
          </button>
          <button
            className="site-header__globe-btn"
            aria-label="Language and currency settings"
            type="button"
            onClick={onOpenCurrency}
          >
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <path
                fill="currentColor"
                d="M8 0a8 8 0 100 16A8 8 0 008 0zm6.86 7H11.9c-.1-1.57-.45-3.03-.99-4.25A6.98 6.98 0 0114.86 7zM8 1.05c.87 1.34 1.5 3.32 1.66 4.95H6.34C6.5 4.37 7.13 2.39 8 1.05zM1.14 9h2.96c.1 1.57.45 3.03.99 4.25A6.98 6.98 0 011.14 9zm2.96-2H1.14a6.98 6.98 0 013.95-4.25C4.55 3.97 4.2 5.43 4.1 7zM8 14.95c-.87-1.34-1.5-3.32-1.66-4.95h3.32c-.16 1.63-.79 3.61-1.66 4.95zm2.91-2.2c.54-1.22.89-2.68.99-4.25h2.96a6.98 6.98 0 01-3.95 4.25z"
              />
            </svg>
          </button>

          <div className="site-header__profile-menu-container" ref={menuRef}>
            <button
              className="site-header__profile-btn"
              onClick={() => setShowMenu(!showMenu)}
              aria-expanded={showMenu}
              aria-label="User profile and menu"
              type="button"
            >
              <svg viewBox="0 0 32 32" width="16" height="16" aria-hidden="true" className="site-header__hamburger">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  d="M4 7h24M4 16h24M4 25h24"
                />
              </svg>
              <div className="site-header__avatar-wrapper">
                <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
                  <path
                    fill="#717171"
                    d="M16 2a14 14 0 100 28 14 14 0 000-28zm0 5a5 5 0 110 10 5 5 0 010-10zm0 21.6a11.58 11.58 0 01-8.15-3.41A9.95 9.95 0 0116 20a9.95 9.95 0 018.15 5.19A11.58 11.58 0 0116 28.6z"
                  />
                </svg>
              </div>
            </button>

            {showMenu && (
              <div className="site-header__menu-dropdown" role="menu">
                <button
                  className="site-header__menu-item site-header__menu-item--bold"
                  role="menuitem"
                  type="button"
                  onClick={() => {
                    setShowMenu(false);
                    onToast?.('Sign up modal opened');
                  }}
                >
                  Sign up
                </button>
                <button
                  className="site-header__menu-item"
                  role="menuitem"
                  type="button"
                  onClick={() => {
                    setShowMenu(false);
                    onToast?.('Log in modal opened');
                  }}
                >
                  Log in
                </button>
                <hr className="site-header__menu-divider" />
                <button
                  className="site-header__menu-item"
                  role="menuitem"
                  type="button"
                  onClick={() => {
                    setShowMenu(false);
                    onToast?.('Airbnb your home');
                  }}
                >
                  Airbnb your home
                </button>
                <button
                  className="site-header__menu-item"
                  role="menuitem"
                  type="button"
                  onClick={() => {
                    setShowMenu(false);
                    onToast?.('Help Centre: FAQs & Customer Support');
                  }}
                >
                  Help Centre
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
