import { useEffect, useRef, useCallback } from 'react';

export const useInfiniteScroll = (callback, hasMore, loading) => {
  const observer = useRef();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const lastElementRef = useCallback((node) => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        callbackRef.current();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return lastElementRef;
};
