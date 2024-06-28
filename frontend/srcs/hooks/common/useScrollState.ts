// import { useEffect, useState } from 'react';
// import { ScreenRollHandler } from 'src/components/base/ScreenRoller/ScreenRollHandler';

// export function useScrollState() {
//   const [page, setPage] = useState(0);
//   const [scroll, setScroll] = useState(0);
//   const [offset, setOffset] = useState(0);
//   const [maxOffset, setMaxOffset] = useState(window.innerHeight);
//   const [normalizedScroll, setNormalizedScroll] = useState(0);

//   useEffect(() => {
//     const handler = (
//       statePage: number,
//       stateScroll: number,
//       stateOffset: number,
//       stateMaxOffset: number,
//       stateNormalized: number
//     ) => {
//       setPage(statePage);
//       setScroll(stateScroll);
//       setOffset(stateOffset);
//       setMaxOffset(stateMaxOffset);
//       setNormalizedScroll(stateNormalized);
//     };
//     ScreenRollHandler.addScrollListener(handler);

//     return () => {
//       ScreenRollHandler.removeScrollListener(handler);
//     };
//   }, []);

//   return {
//     page,
//     scroll,
//     offset,
//     maxOffset,
//     normalizedScroll
//   };
// }
