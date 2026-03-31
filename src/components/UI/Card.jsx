import React from "react";

/**
 * Card Component
 * Reusable card with glassmorphism design
 */
export default function Card({ children, className = "", hover = true }) {
  return (
    <div
      className={`
        glassmorphism rounded-2xl p-6 transition-all
        ${hover ? "hover:shadow-lg hover:scale-105" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
