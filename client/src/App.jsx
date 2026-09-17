import { useEffect, useState } from 'react';
import { fetchListing } from './api/listing';
import Header from './components/Header';
import ListingHeader from './components/ListingHeader';
import Gallery from './components/Gallery';
import ListingBody from './components/ListingBody';
import BookingCard from './components/BookingCard';
import Reviews from './components/Reviews';
import LocationMap from './components/LocationMap';
import HostBio from './components/HostBio';
import ThingsToKnow from './components/ThingsToKnow';
import Footer from './components/Footer';
import PhotoTour from './components/PhotoTour';
import Lightbox from './components/Lightbox';
import AmenitiesModal from './components/AmenitiesModal';
import DescriptionModal from './components/DescriptionModal';
import ReviewsModal from './components/ReviewsModal';
import ThingsToKnowModal from './components/ThingsToKnowModal';
import MessageHostModal from './components/MessageHostModal';
import ReportModal from './components/ReportModal';
import ReserveModal from './components/ReserveModal';
import KeyboardShortcutsModal from './components/KeyboardShortcutsModal';
import SearchModal from './components/SearchModal';
import CurrencyModal from './components/CurrencyModal';
import Toast from './components/Toast';

import localListing from './data/listing.json';

import './styles/listing.css';
import './styles/tour.css';
import './styles/lightbox.css';

export default function App() {
  const [listing, setListing] = useState(localListing);
  const [view, setView] = useState('listing'); // 'listing' | 'tour' | 'lightbox'
  const [tourIndex, setTourIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeModal, setActiveModal] = useState(null); // null | 'amenities' | 'description' | 'reviews' | 'reserve' | 'messageHost' | 'report' | 'keyboardShortcuts' | 'search' | 'currency' | 'houseRules' | 'safety' | 'cancellation'
  const [toastMessage, setToastMessage] = useState(null);

  // Synchronized booking state
  const [startDate, setStartDate] = useState({ day: 14, month: 10, year: 2023 });
  const [endDate, setEndDate] = useState({ day: 19, month: 10, year: 2023 });
  const [nights, setNights] = useState(5);
  const [guests, setGuests] = useState(1);
  const [selectingStep, setSelectingStep] = useState('checkin'); // 'checkin' | 'checkout'

  // Currency & Language settings
  const [currencyInfo, setCurrencyInfo] = useState({
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    rate: 1,
  });
  const [languageInfo, setLanguageInfo] = useState({
    code: 'en-IN',
    name: 'English (IN)',
    region: 'India',
  });

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    fetchListing().then(setListing);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleDateSelect = (pickedDate) => {
    if (selectingStep === 'checkout') {
      const startVal = startDate.year * 10000 + startDate.month * 100 + startDate.day;
      const pickedVal = pickedDate.year * 10000 + pickedDate.month * 100 + pickedDate.day;

      if (pickedVal > startVal) {
        setEndDate(pickedDate);
        const calculatedNights =
          pickedDate.month === startDate.month
            ? pickedDate.day - startDate.day
            : 31 - startDate.day + pickedDate.day;
        setNights(calculatedNights);
        setSelectingStep('checkin');
        showToast(
          `Stay updated: ${calculatedNights} nights (${startDate.day} Oct – ${pickedDate.day} ${
            pickedDate.month === 10 ? 'Oct' : 'Nov'
          })`
        );
      } else {
        setStartDate(pickedDate);
        setSelectingStep('checkout');
        showToast(
          `Check-in set to ${pickedDate.day} ${
            pickedDate.month === 10 ? 'Oct' : 'Nov'
          }. Now select checkout date.`
        );
      }
    } else {
      setStartDate(pickedDate);
      setSelectingStep('checkout');
      showToast(
        `Check-in set to ${pickedDate.day} ${
          pickedDate.month === 10 ? 'Oct' : 'Nov'
        }. Now click your checkout date.`
      );
    }
  };

  const handleClearDates = () => {
    setStartDate({ day: 14, month: 10, year: 2023 });
    setEndDate({ day: 19, month: 10, year: 2023 });
    setNights(5);
    setSelectingStep('checkin');
    showToast('Dates reset to default (14 Oct – 19 Oct)');
  };

  const handleScrollToCalendar = () => {
    const el = document.getElementById('calendar-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (!listing) {
    return (
      <div className="app-loading" role="status" aria-live="polite">
        <div className="app-loading__spinner" />
        <span>Loading listing…</span>
      </div>
    );
  }

  return (
    <>
      <Header
        onOpenSearch={() => setActiveModal('search')}
        onOpenCurrency={() => setActiveModal('currency')}
        onToast={showToast}
      />

      <main className="listing-page">
        <div className="listing-page__content">
          <ListingHeader
            listing={listing}
            onToast={showToast}
          />

          <Gallery
            images={listing.images}
            onOpenTour={(i) => {
              setTourIndex(i);
              setView('tour');
            }}
          />

          <div className="listing-page__grid">
            <div className="listing-page__main-col">
              <ListingBody
                listing={listing}
                startDate={startDate}
                endDate={endDate}
                nights={nights}
                onSelectDay={handleDateSelect}
                onClearDates={handleClearDates}
                onOpenKeyboardShortcuts={() => setActiveModal('keyboardShortcuts')}
                onOpenAmenities={() => setActiveModal('amenities')}
                onOpenDescription={() => setActiveModal('description')}
              />

              <hr className="listing-section-divider" />

              <Reviews
                listing={listing}
                onOpenReviews={() => setActiveModal('reviews')}
              />

              <hr className="listing-section-divider" />

              <LocationMap locationDetails={listing.locationDetails} />

              <hr className="listing-section-divider" />

              <HostBio
                host={listing.host}
                onMessageHost={() => setActiveModal('messageHost')}
              />

              <hr className="listing-section-divider" />

              <ThingsToKnow
                listing={listing}
                onOpenModal={(type) => setActiveModal(type)}
              />
            </div>

            <aside className="listing-page__sidebar">
              <BookingCard
                listing={listing}
                currencyInfo={currencyInfo}
                startDate={startDate}
                endDate={endDate}
                nights={nights}
                guests={guests}
                setGuests={setGuests}
                onOpenReserve={() => setActiveModal('reserve')}
                onOpenReport={() => setActiveModal('report')}
                onDatesClick={handleScrollToCalendar}
              />
            </aside>
          </div>
        </div>
      </main>

      <Footer
        nearbyListings={listing.nearbyListings}
        currencyInfo={currencyInfo}
        languageInfo={languageInfo}
        onOpenCurrency={() => setActiveModal('currency')}
      />

      {/* Overlays */}
      {view === 'tour' && (
        <PhotoTour
          images={listing.images}
          listingTitle={listing.title}
          initialIndex={tourIndex}
          onClose={() => setView('listing')}
          onOpenLightbox={(i) => {
            setLightboxIndex(i);
            setView('lightbox');
          }}
          onToast={showToast}
        />
      )}

      {view === 'lightbox' && (
        <Lightbox
          images={listing.images}
          startIndex={lightboxIndex}
          onClose={() => setView('tour')}
          onToast={showToast}
        />
      )}

      {/* Modals */}
      {activeModal === 'amenities' && (
        <AmenitiesModal
          amenities={listing.amenities}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'description' && (
        <DescriptionModal
          listing={listing}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'reviews' && (
        <ReviewsModal
          listing={listing}
          onClose={() => setActiveModal(null)}
        />
      )}

      {(activeModal === 'houseRules' ||
        activeModal === 'safety' ||
        activeModal === 'cancellation') && (
        <ThingsToKnowModal
          type={activeModal}
          listing={listing}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'messageHost' && (
        <MessageHostModal
          host={listing.host}
          onClose={() => setActiveModal(null)}
          onSent={showToast}
        />
      )}

      {activeModal === 'report' && (
        <ReportModal
          onClose={() => setActiveModal(null)}
          onReported={showToast}
        />
      )}

      {activeModal === 'reserve' && (
        <ReserveModal
          listing={listing}
          currencyInfo={currencyInfo}
          startDate={startDate}
          endDate={endDate}
          nights={nights}
          guests={guests}
          onClose={() => setActiveModal(null)}
          onConfirmed={showToast}
        />
      )}

      {activeModal === 'keyboardShortcuts' && (
        <KeyboardShortcutsModal
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'search' && (
        <SearchModal
          onClose={() => setActiveModal(null)}
          onSearch={showToast}
        />
      )}

      {activeModal === 'currency' && (
        <CurrencyModal
          currentCurrency={currencyInfo.code}
          currentLanguage={languageInfo.code}
          onSelectCurrency={(c) => {
            setCurrencyInfo(c);
            showToast(`Currency updated to ${c.code} (${c.symbol})`);
          }}
          onSelectLanguage={(l) => {
            setLanguageInfo(l);
            showToast(`Language set to ${l.name} (${l.region})`);
          }}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* Floating Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </>
  );
}
