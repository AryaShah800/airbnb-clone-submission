import { useState } from 'react';

export default function LocationMap({ locationDetails }) {
  const [zoom, setZoom] = useState(14);
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="location-section" aria-labelledby="location-heading">
      <h2 id="location-heading" className="section-title">Where you&apos;ll be</h2>
      <p className="location-subtitle">{locationDetails.neighborhood}</p>

      {/* Styled Interactive SVG Map */}
      <div className="location-map" role="region" aria-label="Interactive map of Candolim Goa">
        <svg
          viewBox="0 0 1120 480"
          className="location-map__svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Background land and sea */}
          <rect width="1120" height="480" fill="#e8ece9" />

          {/* Arabian Sea coastline on the left */}
          <path
            d="M 0,0 L 360,0 Q 380,120 340,240 T 310,480 L 0,480 Z"
            fill="#cbe0f5"
          />

          {/* Beach strip */}
          <path
            d="M 360,0 Q 380,120 340,240 T 310,480"
            stroke="#f0e6cf"
            strokeWidth="16"
            fill="none"
          />

          {/* Road networks */}
          <path
            d="M 370,50 Q 520,70 700,40 T 1120,60"
            stroke="#ffffff"
            strokeWidth="8"
            fill="none"
          />
          <path
            d="M 350,180 Q 500,200 800,160 T 1120,200"
            stroke="#ffffff"
            strokeWidth="10"
            fill="none"
          />
          <path
            d="M 330,340 Q 600,320 850,380 T 1120,360"
            stroke="#ffffff"
            strokeWidth="8"
            fill="none"
          />
          <path
            d="M 520,0 L 520,480"
            stroke="#ffffff"
            strokeWidth="7"
            fill="none"
          />
          <path
            d="M 720,0 L 720,480"
            stroke="#ffffff"
            strokeWidth="9"
            fill="none"
          />
          <path
            d="M 940,0 L 940,480"
            stroke="#ffffff"
            strokeWidth="6"
            fill="none"
          />

          {/* Green parks & resorts */}
          <rect x="420" y="80" width="80" height="70" rx="10" fill="#d5e3d8" />
          <rect x="760" y="240" width="130" height="90" rx="12" fill="#d5e3d8" />
          <circle cx="880" cy="110" r="45" fill="#d5e3d8" />

          {/* Translucent Circular Area highlight */}
          <circle
            cx="620"
            cy="240"
            r={110 * (zoom / 14)}
            fill="rgba(0, 166, 153, 0.18)"
            stroke="rgba(0, 166, 153, 0.4)"
            strokeWidth="2"
          />

          {/* Candolim center Airbnb Pin */}
          <g transform="translate(620, 240)">
            <circle cx="0" cy="0" r="24" fill="#222222" />
            <path
              d="M-8,4 L0,-6 L8,4 Z M-5,4 L-5,8 L5,8 L5,4 Z"
              fill="#ffffff"
            />
          </g>

          {/* Map labels */}
          <text x="160" y="240" fill="#587d9d" fontSize="16" fontWeight="600" letterSpacing="1">
            ARABIAN SEA
          </text>
          <text x="375" y="160" fill="#717171" fontSize="13" fontWeight="600">
            Candolim Beach Road
          </text>
          <text x="595" y="290" fill="#222222" fontSize="14" fontWeight="700" textAnchor="middle">
            Mirashya UG10 (Approximate location)
          </text>
        </svg>

        {/* Zoom Controls */}
        <div className="location-map__controls">
          <button
            type="button"
            className="map-ctrl-btn"
            onClick={() => setZoom((z) => Math.min(18, z + 1))}
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            type="button"
            className="map-ctrl-btn"
            onClick={() => setZoom((z) => Math.max(10, z - 1))}
            aria-label="Zoom out"
          >
            −
          </button>
        </div>
      </div>

      {/* Neighborhood details */}
      <div className="location-neighborhood">
        <h3 className="location-neighborhood__title">Candolim, Goa, India</h3>
        <p className="location-neighborhood__desc">
          {expanded
            ? locationDetails.description
            : `${locationDetails.description.slice(0, 180)}…`}
        </p>
        <button
          type="button"
          className="location-neighborhood__more"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show less' : 'Show more >'}
        </button>
      </div>
    </section>
  );
}
