import React, { useEffect, useState } from "react";

/**
 * Progress Bar Component
 * Shows page scroll progress at the top of the page
 */
export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (window.scrollY / height) * 100;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600 z-50"
      style={{ width: `${progress}%` }}
    ></div>
  );
}
