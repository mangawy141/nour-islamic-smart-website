import React from "react";

/**
 * Loading Component
 * Shows loading animation while content is being fetched
 */
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-96">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse"></div>
        <div className="absolute inset-2 bg-white dark:bg-slate-900 rounded-full"></div>
      </div>
    </div>
  );
}
