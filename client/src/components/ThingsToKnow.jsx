export default function ThingsToKnow({ listing, onOpenModal }) {
  return (
    <section className="things-to-know" aria-labelledby="ttk-heading">
      <h2 id="ttk-heading" className="section-title">Things to know</h2>

      <div className="things-to-know__grid">
        {/* Col 1: House Rules */}
        <div className="ttk-col">
          <h3 className="ttk-col__title">House rules</h3>
          <ul className="ttk-col__list">
            {(listing?.houseRules || []).slice(0, 3).map((rule) => (
              <li key={rule} className="ttk-col__item">{rule}</li>
            ))}
          </ul>
          <button
            type="button"
            className="ttk-col__more-btn"
            onClick={() => onOpenModal?.('houseRules')}
          >
            Show more &gt;
          </button>
        </div>

        {/* Col 2: Safety & Property */}
        <div className="ttk-col">
          <h3 className="ttk-col__title">Safety &amp; property</h3>
          <ul className="ttk-col__list">
            {(listing?.safety || []).slice(0, 3).map((item) => (
              <li key={item} className="ttk-col__item">{item}</li>
            ))}
          </ul>
          <button
            type="button"
            className="ttk-col__more-btn"
            onClick={() => onOpenModal?.('safety')}
          >
            Show more &gt;
          </button>
        </div>

        {/* Col 3: Cancellation Policy */}
        <div className="ttk-col">
          <h3 className="ttk-col__title">Cancellation policy</h3>
          <ul className="ttk-col__list">
            {(listing?.cancellationPolicy || []).slice(0, 2).map((policy) => (
              <li key={policy} className="ttk-col__item">{policy}</li>
            ))}
          </ul>
          <button
            type="button"
            className="ttk-col__more-btn"
            onClick={() => onOpenModal?.('cancellation')}
          >
            Show more &gt;
          </button>
        </div>
      </div>
    </section>
  );
}
