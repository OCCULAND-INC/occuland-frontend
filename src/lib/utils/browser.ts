export function isBrowser() {
  return typeof window !== 'undefined';
}

export function hasNativeLoadingSupport() {
  return (
    isBrowser() &&
    !!window.HTMLImageElement &&
    'loading' in window.HTMLImageElement.prototype
  );
}

export function hasIntersectionObserver() {
  return (
    isBrowser() &&
    !!window.IntersectionObserver &&
    !!window.IntersectionObserverEntry &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype
  );
}

export function isSafari() {
  if (isBrowser()) {
    return /^((?!chrome|android|windows).)*safari/i.test(
      window.navigator.userAgent,
    );
  }
  return false;
}
