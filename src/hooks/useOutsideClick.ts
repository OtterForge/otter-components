import { type RefObject, useEffect } from 'react';

export const useOutsideClick = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void,
) => {
  useEffect(() => {
    const handler = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) callback();
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [callback, ref]);
};
