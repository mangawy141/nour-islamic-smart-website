import React from "react";

/**
 * Sidebar Component
 * Mobile navigation sidebar
 */
export default function Sidebar({
  currentPage,
  setCurrentPage,
  setIsMobileMenuOpen,
}) {
  const navItems = [
    { id: "home", label: "الرئيسية" },
    { id: "about", label: "المنصة" },
    { id: "dashboard", label: "لوحتي" },
    { id: "topics", label: "المواضيع" },
    { id: "timeline", label: "التايم لاين" },
    { id: "quiz", label: "الاختبار" },
    { id: "sources", label: "المصادر" },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/50 z-30"
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <div
        className="absolute top-20 right-0 w-full max-w-xs bg-white dark:bg-slate-900 shadow-lg p-4 animate-slideDown"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-right px-4 py-3 rounded-lg transition-colors ${
                currentPage === item.id
                  ? "bg-primary-500 text-white"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
