export default function HostBio({ host, onMessageHost }) {
  return (
    <section className="host-bio-section" aria-labelledby="host-heading">
      <h2 id="host-heading" className="section-title">Meet your host</h2>

      <div className="host-bio-layout">
        {/* Host Badge Card */}
        <div className="host-badge-card">
          <div className="host-badge-card__profile">
            <div className="host-badge-card__avatar-wrap">
              <img src={host?.avatar || '/images/host-avatar.png'} alt={host?.name || 'Host'} className="host-badge-card__avatar" />
              <div className="host-badge-card__superhost-badge" aria-label="Superhost badge">
                <svg viewBox="0 0 16 16" width="12" height="12" fill="#fff" aria-hidden="true">
                  <path d="M8 0l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5z" />
                </svg>
              </div>
            </div>
            <h3 className="host-badge-card__name">{host?.name}</h3>
            <p className="host-badge-card__status">{host?.badge}</p>
          </div>

          <div className="host-badge-card__stats">
            <div className="host-stat">
              <span className="host-stat__number">{host?.reviews || 19}</span>
              <span className="host-stat__label">Reviews</span>
            </div>
            <div className="host-stat">
              <span className="host-stat__number">{(host?.rating || 4.95).toFixed(2)}★</span>
              <span className="host-stat__label">Rating</span>
            </div>
            <div className="host-stat">
              <span className="host-stat__number">{host?.yearsHosting || 1}</span>
              <span className="host-stat__label">Year hosting</span>
            </div>
          </div>
        </div>

        {/* Host Details & Bio */}
        <div className="host-bio-details">
          <div className="host-cohosts">
            <h4 className="host-cohosts__title">Co-hosts</h4>
            <div className="host-cohosts__list">
              {(host?.coHosts || []).map((ch) => (
                <div key={ch.name} className="host-cohost-item">
                  <img src={ch.avatar} alt={ch.name} className="host-cohost-item__avatar" />
                  <span className="host-cohost-item__name">{ch.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="host-work-info">
            <h4 className="host-work-info__title">Host details</h4>
            <p className="host-work-info__item">Response rate: {host?.responseRate || '100%'}</p>
            <p className="host-work-info__item">Responds {host?.responseTime || 'within an hour'}</p>
          </div>

          <p className="host-bio-about">{host?.about}</p>

          <button
            type="button"
            className="outline-btn outline-btn--message"
            onClick={onMessageHost}
          >
            Message Host
          </button>

          {/* Payment protection notice */}
          <div className="host-protection-note">
            <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true" className="protection-icon">
              <path
                fill="none"
                stroke="#FF385C"
                strokeWidth="2"
                d="M16 2l12 4v8c0 8-6 14-12 16-6-2-12-8-12-16V6l12-4z"
              />
            </svg>
            <p className="host-protection-note__text">
              To protect your payment, never transfer money or communicate outside of the Airbnb website or app.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
