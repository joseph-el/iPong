import { useEffect } from 'react';

export function useViewportUpdate() {
  useEffect(() => {
    const handler = () => {
      document.body.style.setProperty('--full-height', window.innerHeight + 'px');
    };
    window.addEventListener('resize', handler);
    handler();
    return () => {
      
      window.removeEventListener('resize', handler);
    };
  }, []);
}
