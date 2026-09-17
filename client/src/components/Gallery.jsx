export default function Gallery({ images, onOpenTour }) {
  const shown = images.slice(0, 5);

  return (
    <div className="gallery" aria-label="Property photo gallery">
      <button
        className="gallery__tile gallery__tile--main"
        onClick={() => onOpenTour(0)}
        aria-label={`View photo 1: ${shown[0]?.room || 'Living room'}`}
        type="button"
      >
        <img src={shown[0]?.url} alt={shown[0]?.room || 'Hero photo'} loading="eager" />
      </button>

      <div className="gallery__grid-small">
        {shown.slice(1, 5).map((img, i) => (
          <button
            key={img.id}
            className={`gallery__tile gallery__tile--sub gallery__tile--${i}`}
            onClick={() => onOpenTour(i + 1)}
            aria-label={`View photo ${i + 2}: ${img.room}`}
            type="button"
          >
            <img src={img.url} alt={img.room} loading="lazy" />
          </button>
        ))}
      </div>

      <button
        className="gallery__show-all"
        onClick={() => onOpenTour(0)}
        aria-label={`Show all ${images.length} photos`}
        type="button"
      >
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className="gallery__grid-icon">
          <path
            fill="currentColor"
            d="M2 2h3.5v3.5H2V2zm0 4.25h3.5v3.5H2V6.25zm0 4.25h3.5V14H2v-3.5zm4.25-8.5H9.75v3.5H6.25V2zm0 4.25H9.75v3.5H6.25V6.25zm0 4.25H9.75V14H6.25v-3.5zM10.5 2H14v3.5h-3.5V2zm0 4.25H14v3.5h-3.5V6.25zm0 4.25H14V14h-3.5v-3.5z"
          />
        </svg>
        <span>Show all photos</span>
      </button>
    </div>
  );
}
