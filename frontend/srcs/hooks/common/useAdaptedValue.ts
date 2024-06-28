import { useEffect, useState } from 'react';
import { ScreenSize, useViewport } from './useViewport';

export function useAdaptedValue<T>(desktop: T, tablet: T, mobile: T) {
  const [value, setValue] = useState<T>(desktop);
  const screen = useViewport();

  useEffect(() => {
    switch (screen) {
      case ScreenSize.Desktop:
        setValue(desktop);
        break;
      case ScreenSize.Tablet:
        setValue(tablet);
        break;
      case ScreenSize.Mobile:
        setValue(mobile);
        break;
    }
  }, [screen, desktop, tablet, mobile]);

  return value;
}
