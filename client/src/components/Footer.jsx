export default function Footer({
  nearbyListings,
  currencyInfo = { code: 'INR', symbol: '₹', rate: 1 },
  languageInfo = { code: 'en-IN', name: 'English (IN)' },
  onOpenCurrency,
}) {
  const rate = currencyInfo?.rate || 1;
  const symbol = currencyInfo?.symbol || '₹';

  return (
    <footer className="site-footer">
      {/* Nearby listings section */}
      {nearbyListings && nearbyListings.length > 0 && (
        <div className="nearby-listings-section">
          <h2 className="section-title">Other listings nearby</h2>
          <div className="nearby-grid">
            {nearbyListings.map((item) => {
              const convertedPrice = Math.round(item.price * rate);
              return (
                <div key={item.id} className="nearby-card">
                  <img src={item.image} alt={item.title} className="nearby-card__img" />
                  <div className="nearby-card__content">
                    <div className="nearby-card__top">
                      <h3 className="nearby-card__location">{item.location}</h3>
                      <span className="nearby-card__rating">★ {item.rating}</span>
                    </div>
                    <p className="nearby-card__title">{item.title}</p>
                    <p className="nearby-card__dates">{item.dates}</p>
                    <p className="nearby-card__price">
                      <span className="nearby-card__price-num">
                        {symbol}
                        {convertedPrice.toLocaleString('en-IN')}
                      </span>{' '}
                      night
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Corporate Airbnb Footer */}
      <div className="site-footer__main">
        <div className="site-footer__columns">
          <div className="site-footer__col">
            <h4 className="site-footer__col-title">Support</h4>
            <ul className="site-footer__links">
              <li><a href="#help">Help Centre</a></li>
              <li><a href="#aircover">AirCover</a></li>
              <li><a href="#safety">Anti-discrimination</a></li>
              <li><a href="#disability">Disability support</a></li>
              <li><a href="#cancellation">Cancellation options</a></li>
            </ul>
          </div>

          <div className="site-footer__col">
            <h4 className="site-footer__col-title">Hosting</h4>
            <ul className="site-footer__links">
              <li><a href="#host">Airbnb your home</a></li>
              <li><a href="#aircover-hosts">AirCover for Hosts</a></li>
              <li><a href="#resources">Hosting resources</a></li>
              <li><a href="#community">Community forum</a></li>
              <li><a href="#responsible">Hosting responsibly</a></li>
            </ul>
          </div>

          <div className="site-footer__col">
            <h4 className="site-footer__col-title">Airbnb</h4>
            <ul className="site-footer__links">
              <li><a href="#newsroom">Newsroom</a></li>
              <li><a href="#features">New features</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#investors">Investors</a></li>
              <li><a href="#emergency">Airbnb.org emergency stays</a></li>
            </ul>
          </div>
        </div>

        <hr className="site-footer__divider" />

        <div className="site-footer__bottom">
          <div className="site-footer__legal">
            <span>© 2026 Airbnb, Inc.</span>
            <span>·</span>
            <a href="#privacy">Privacy</a>
            <span>·</span>
            <a href="#terms">Terms</a>
            <span>·</span>
            <a href="#sitemap">Sitemap</a>
            <span>·</span>
            <a href="#company">Company details</a>
          </div>

          <div className="site-footer__settings">
            <button
              type="button"
              className="footer-setting-btn"
              onClick={onOpenCurrency}
              aria-label="Change language"
            >
              <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M8 0a8 8 0 100 16A8 8 0 008 0zm6.86 7H11.9c-.1-1.57-.45-3.03-.99-4.25A6.98 6.98 0 0114.86 7zM8 1.05c.87 1.34 1.5 3.32 1.66 4.95H6.34C6.5 4.37 7.13 2.39 8 1.05zM1.14 9h2.96c.1 1.57.45 3.03.99 4.25A6.98 6.98 0 011.14 9zm2.96-2H1.14a6.98 6.98 0 013.95-4.25C4.55 3.97 4.2 5.43 4.1 7zM8 14.95c-.87-1.34-1.5-3.32-1.66-4.95h3.32c-.16 1.63-.79 3.61-1.66 4.95zm2.91-2.2c.54-1.22.89-2.68.99-4.25h2.96a6.98 6.98 0 01-3.95 4.25z"
                />
              </svg>
              <span>{languageInfo?.name || 'English (IN)'}</span>
            </button>
            <button
              type="button"
              className="footer-setting-btn"
              onClick={onOpenCurrency}
              aria-label="Change currency"
            >
              <span>{currencyInfo?.symbol || '₹'} {currencyInfo?.code || 'INR'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
