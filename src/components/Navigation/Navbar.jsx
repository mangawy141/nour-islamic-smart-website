import React from "react";
import { Menu, Moon, Sun } from "lucide-react";

/**
 * Navbar Component
 * Fixed navigation bar with menu and theme toggle
 */
export default function Navbar({
  currentPage,
  setCurrentPage,
  setIsMobileMenuOpen,
  isMobileMenuOpen,
  theme,
  setTheme,
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
    <nav className="fixed top-0 w-full bg-white dark:bg-slate-900 shadow-lg z-40 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => setCurrentPage("home")}
          className="cursor-pointer flex items-center gap-2 text-2xl font-bold text-primary-600 hover:text-primary-700"
        >
          <span className="text-3xl">✨</span>
          <span>نور</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === item.id
                  ? "bg-primary-500 text-white"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="تبديل المظهر"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
