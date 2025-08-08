import { useEffect, useRef } from 'react';
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
      // Do not destroy instance to avoid double-unmount issues; just clear DOM
      if (containerRef?.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, stableKey(options)]);

  return instanceRef;
};

export default useQRCode;

