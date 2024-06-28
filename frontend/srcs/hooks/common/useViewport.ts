import { useEffect, useState } from 'react';

export enum ScreenSize {
  Desktop,
  Tablet,
  Mobile
}

export function useViewport() {
  const [size, setSize] = useState(ScreenSize.Desktop);
  useEffect(() => {
    const handler = () => {
      let s = ScreenSize.Desktop;
      if (window.innerWidth < 450) {
        s = ScreenSize.Mobile;
      } else if (window.innerWidth < 900) {
        s = ScreenSize.Tablet;
      }
      setSize(s);
    };
    window.addEventListener('resize', handler);
    handler();
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  return size;
}
