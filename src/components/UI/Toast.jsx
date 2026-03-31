import React from "react";
import { X } from "lucide-react";

/**
 * Toast Notification Component
 * Displays temporary notifications at the top of the screen
 */
export default function Toast({ message, type = "success", onClose }) {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  }[type];

  return (
    <div
      className={`fixed top-20 right-4 z-50 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slideDown`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="hover:bg-white/20 p-1 rounded">
        <X size={16} />
      </button>
    </div>
  );
}
