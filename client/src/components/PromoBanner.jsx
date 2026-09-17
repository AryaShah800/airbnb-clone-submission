export default function PromoBanner({ promo }) {
  return (
    <div className="promo-banner">
      <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
        <path
          fill="var(--color-success)"
          d="M16 2 3 9v14l13 7 13-7V9L16 2zm0 4.2 8.9 4.8-8.9 4.8-8.9-4.8L16 6.2zM6 12.8l8 4.3v9L6 21.9v-9.1zm10 13.3v-9l8-4.3v9.1l-8 4.2z"
        />
      </svg>
      <div>
        <p className="promo-banner__title">{promo.text}</p>
        <p className="promo-banner__subtext">{promo.subtext}</p>
      </div>
    </div>
  );
}
