import { useEffect, useMemo, useRef } from 'react';
import { generateQRCode } from '../services/qrService';

// Small helper to safely stringify options for effect deps
const stableKey = (obj) => {
  try {
    return JSON.stringify(obj);
  } catch {
    return '';
  }
};

// Reusable hook to manage a QRCodeStyling instance lifecycle
// - Creates once, appends to container
// - Updates on options change
// - Cleans up on unmount
export const useQRCode = (containerRef, options) => {
  const instanceRef = useRef(null);
  const optionsKey = useMemo(() => stableKey(options), [options]);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;
    if (!options || !options.data) return;

    // Create or update
    if (!instanceRef.current) {
      instanceRef.current = generateQRCode(options);
      // Ensure clean container then append
      while (container.firstChild) container.removeChild(container.firstChild);
      instanceRef.current.append(container);
    } else {
      instanceRef.current.update(options);
    }

    // Cleanup on unmount
    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [containerRef, options, optionsKey]);

  return instanceRef;
};

export default useQRCode;
