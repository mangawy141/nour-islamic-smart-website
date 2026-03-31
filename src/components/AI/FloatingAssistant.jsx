import React from "react";
import { MessageCircle } from "lucide-react";

/**
 * Floating Assistant Button Component
 * Floating button in bottom right corner to open chat
 */
export default function FloatingAssistant({ onClick, isActive }) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-8 left-8 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all z-35 hover:scale-110 ${
        isActive
          ? "bg-primary-600 text-white"
          : "bg-gradient-to-br from-primary-500 to-secondary-500 text-white hover:shadow-lg"
      }`}
      title="تحدث مع نور"
    >
      {isActive ? <MessageCircle size={24} /> : "✨"}
    </button>
  );
}
