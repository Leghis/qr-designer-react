import { useState, useEffect } from 'react';

/**
 * Hook to handle delayed unmounting for animations
 * Prevents DOM errors by ensuring components stay mounted during exit animations
 */
export const useDelayedUnmount = (isMounted, delayTime = 300) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeoutId;
    
    if (isMounted && !shouldRender) {
      setShouldRender(true);
    } else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(false), delayTime);
    }
    
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, shouldRender]);

  return shouldRender;
};

export default useDelayedUnmount;