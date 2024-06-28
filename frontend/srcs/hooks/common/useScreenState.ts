// import { useEffect, useState } from 'react';
// import { ScreenRollHandler } from 'src/components/base/ScreenRoller/ScreenRollHandler';

// export function useScreenState(screen: number, haltScrollHandler?: (direction: number) => boolean) {
//   const [scroll, setScroll] = useState(0);
//   const [active, setActive] = useState(false);

//   useEffect(() => {
//     const handler = (state: number) => {
//       setScroll(state);
//       setActive(state > -1 && state < 1);
//     };
//     ScreenRollHandler.addPageStateListener(screen, handler);
//     return () => {
//       ScreenRollHandler.removeScrollListener(handler);
//     };
//   }, [screen]);

//   useEffect(() => {
//     if (haltScrollHandler) {
//       ScreenRollHandler.addPageBlockHandler(screen, haltScrollHandler);
//       return () => {
//         ScreenRollHandler.removePageBlockHandler(screen, haltScrollHandler);
//       };
//     }
//   }, [haltScrollHandler, screen]);

//   return {
//     scroll,
//     active
//   };
// }
