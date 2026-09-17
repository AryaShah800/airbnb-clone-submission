import { useEffect, useRef } from 'react';

/**
 * Handles the standard modal/overlay accessibility contract:
 * - moves focus into the overlay on open
 * - traps Tab/Shift+Tab within the overlay
 * - closes on Escape
 * - restores focus to the previously focused element on close
 */
export default function useModalA11y({ isOpen, onClose, onArrowLeft, onArrowRight }) {
  const containerRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement;
    const container = containerRef.current;
    const focusable = () =>
      container
        ? [...container.querySelectorAll('button, [href], input, select, [tabindex]:not([tabindex="-1"])')]
        : [];

    const firstFocusable = focusable()[0];
    firstFocusable?.focus();

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft' && onArrowLeft) {
        onArrowLeft();
      } else if (e.key === 'ArrowRight' && onArrowRight) {
        onArrowRight();
      } else if (e.key === 'Tab') {
        const items = focusable();
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return containerRef;
}
