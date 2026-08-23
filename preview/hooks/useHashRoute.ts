import { useEffect, useState } from 'react';
import { componentDocs } from '../content/componentDocs';

const getSlug = () => window.location.hash.match(/^#\/components\/([^/]+)/)?.[1] ?? 'button';

export const useHashRoute = () => {
  const [slug, setSlug] = useState(getSlug);
  useEffect(() => {
    const update = () => setSlug(getSlug());
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  return componentDocs.some((item) => item.slug === slug) ? slug : 'button';
};
