import { useEffect, useState } from "react";

export const XXSmallBreakpoint = "320px";
export const XSmallBreakpoint = "480px";
export const SmallBreakpoint = "640px";
export const MediumBreakpoint = "768px";
export const LargeBreakpoint = "1024px";
export const XLargeBreakpoint = "1280px";
export const XXLargeBreakpoint = "1440px";

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const updateMatches = () => {
      setMatches(mediaQuery.matches);
    };

    // Initial check
    updateMatches();

    // Add listener for changes in the media query
    const mediaQueryListener = (event: MediaQueryListEvent) => {
      updateMatches();
    };

    mediaQuery.addEventListener("change", mediaQueryListener);

    // Clean up the listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener("change", mediaQueryListener);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;

export const useIsXXSmall = () =>
  useMediaQuery(`(max-width: ${XXSmallBreakpoint})`);
export const useIsXSmall = () =>
  useMediaQuery(`(max-width: ${XSmallBreakpoint})`);
export const useIsSmall = () =>
  useMediaQuery(`(max-width: ${SmallBreakpoint})`);
export const useIsMedium = () =>
  useMediaQuery(`(max-width: ${MediumBreakpoint})`);
export const useIsLarge = () =>
  useMediaQuery(`(max-width: ${LargeBreakpoint})`);
export const useIsXLarge = () =>
  useMediaQuery(`(max-width: ${XLargeBreakpoint})`);
export const useIsXXLarge = () =>
  useMediaQuery(`(max-width: ${XXLargeBreakpoint})`);
