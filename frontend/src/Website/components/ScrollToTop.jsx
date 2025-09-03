import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation(); 

  useEffect(() => {
    window.scrollTo(0, 0);  // go to top
  }, [pathname]);

  return null; // nothing to render
}
