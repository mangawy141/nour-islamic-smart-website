import React, { useState, useEffect, useRef } from "react";
import { TIMELINE_EVENTS } from "../constants/data";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";

/**
 * Timeline Page - Advanced Version
 * Professional scroll-triggered animations with Noor character appearing on events
 */
export default function Timeline({ setCurrentPage, onVisibleEventsChange }) {
  const [visibleEvents, setVisibleEvents] = useState([]);
  const [userScrollPercent, setUserScrollPercent] = useState(0);
  const timelineRef = useRef(null);
  const eventRefs = useRef({});

  // Color palette for each timeline event glow
  const glowColors = [
    "from-blue-200 via-cyan-200 to-cyan-50",
    "from-purple-200 via-pink-200 to-pink-50",
    "from-green-200 via-emerald-200 to-emerald-50",
    "from-orange-200 via-yellow-200 to-yellow-50",
    "from-rose-200 via-red-200 to-red-50",
    "from-indigo-200 via-purple-200 to-purple-50",
    "from-teal-200 via-cyan-200 to-blue-50",
    "from-amber-200 via-yellow-200 to-yellow-50",
    "from-pink-200 via-rose-200 to-orange-50",
  ];

  // Notify parent when visible events change
  useEffect(() => {
    if (onVisibleEventsChange) {
      onVisibleEventsChange(visibleEvents);
    }
  }, [visibleEvents, onVisibleEventsChange]);

  // Handle scroll animations with Intersection Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "100px 0px 0px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const eventId = parseInt(entry.target.dataset.eventId);
          setVisibleEvents((prev) => {
            if (!prev.includes(eventId)) {
              return [...prev, eventId];
            }
            return prev;
          });
        }
      });
    }, observerOptions);

    // Observe all event elements
    Object.values(eventRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Track scroll position for Noor animation
  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const timelineHeight = timelineRef.current.scrollHeight;
        const windowHeight = window.innerHeight;

        const scrolled = Math.max(0, -rect.top);
        const totalScroll = timelineHeight - windowHeight;
        const percent = Math.min(100, (scrolled / totalScroll) * 100);

        setUserScrollPercent(percent);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-primary-50 dark:from-slate-900 dark:to-slate-800">
      {/* Scroll Progress Bar */}
      <div className="fixed top-20 left-0 w-full h-1 bg-slate-200 dark:bg-slate-700 z-30">
        <div
          className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600 transition-all duration-300"
          style={{ width: `${userScrollPercent}%` }}
        ></div>
      </div>

      <div
        className="max-w-7xl mx-auto px-4 py-12 space-y-12"
        ref={timelineRef}
      >
        {/* Header */}
        <div className="text-center space-y-4 animate-fadeIn py-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 bg-clip-text text-transparent mb-4">
            التايم لاين التاريخي
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 font-semibold">
            رحلة النبي محمد صلى الله عليه وسلم عبر الزمن (الأحداث مرتبة بتسلسل
            زمني)
          </p>
          <p className="text-sm text-slate-500 mt-4">
            ⬇️ اسحب لأسفل لترى نور بالظهور
          </p>
        </div>

        {/* Timeline */}
        <div className="relative py-12">
          {/* SVG Filter Definitions for Professional Glows */}
          <svg width="0" height="0">
            <defs>
              <filter
                id="glow-filter"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="glow-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(251, 191, 36, 0.8)" />
                <stop offset="70%" stopColor="rgba(251, 191, 36, 0.3)" />
                <stop offset="100%" stopColor="rgba(251, 191, 36, 0)" />
              </radialGradient>
            </defs>
          </svg>

          {/* Animated Center Line with Professional Gradient */}
          <div className="hidden md:block absolute left-1/2 w-1 h-full -translate-x-1/2 overflow-hidden">
            {/* Base line */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700"></div>

            {/* Golden progress line that stretches with scroll */}
            <div
              className="absolute inset-0 w-full bg-gradient-to-b from-amber-300 via-yellow-300 to-amber-400"
              style={{
                height: `${userScrollPercent}%`,
                boxShadow: `
                  0 0 10px rgba(251, 191, 36, 0.6),
                  0 0 20px rgba(251, 191, 36, 0.4),
                  0 0 30px rgba(251, 191, 36, 0.2),
                  inset 0 0 10px rgba(255, 255, 255, 0.3)
                `,
                transition: "height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            ></div>
          </div>

          {/* Events */}
          <div className="space-y-16">
            {TIMELINE_EVENTS.map((event, idx) => (
              <div
                key={event.id}
                data-event-id={event.id}
                ref={(el) => (eventRefs.current[event.id] = el)}
                className={`md:flex items-center gap-8 transition-all duration-700 transform ${
                  visibleEvents.includes(event.id)
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95"
                }`}
                style={{
                  transitionDelay: visibleEvents.includes(event.id)
                    ? `${idx * 0.15}s`
                    : "0s",
                }}
              >
                {/* Mobile Timeline Indicator */}
                <div className="md:hidden relative">
                  <div
                    className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center text-xl -translate-x-6 transition-all duration-700 ${
                      visibleEvents.includes(event.id)
                        ? "bg-gradient-to-br from-primary-500 to-secondary-500 border-4 border-white dark:border-slate-900 shadow-lg scale-100"
                        : "bg-slate-300 dark:bg-slate-700 border-4 border-slate-200 dark:border-slate-600 scale-75"
                    }`}
                  >
                    {event.icon}
                  </div>
                </div>

                {/* Content Card with Professional Glow */}
                <div
                  className={`flex-1 ${idx % 2 === 0 ? "md:order-1 md:text-left" : "md:order-3 md:text-right"}`}
                >
                  {/* Glow effect background - appears when event is visible */}
                  {visibleEvents.includes(event.id) && (
                    <div
                      className={`absolute -inset-8 bg-gradient-to-r ${glowColors[idx % glowColors.length]} rounded-2xl blur-2xl opacity-30 -z-10 transition-all duration-500`}
                      style={{
                        animation: `glow-appear 0.8s ease-out forwards`,
                      }}
                    ></div>
                  )}

                  <Card
                    className={`relative transition-all duration-700 hover:shadow-2xl transform hover:scale-105 ${
                      visibleEvents.includes(event.id)
                        ? "shadow-xl golden-border"
                        : "shadow-md"
                    }`}
                    hover={true}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-5xl flex-shrink-0 animate-pulse">
                        {event.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-primary-600 dark:text-primary-400 tracking-wider uppercase">
                          \u2022 {event.date}
                        </p>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-2 break-words">
                          {event.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg mb-4 w-full break-words hyphens-auto">
                      {event.description}
                    </p>

                    {/* Timeline Event Badge */}
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-3 py-1 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full text-primary-700 dark:text-primary-300 font-semibold">
                        • الحدث {idx + 1} من {TIMELINE_EVENTS.length}
                      </span>
                    </div>
                  </Card>

                  {/* Noor Storytelling - Mobile */}
                  {visibleEvents.includes(event.id) && (
                    <div className="md:hidden mt-6 flex items-start gap-4">
                      {/* Noor Character */}
                      <div className="flex-shrink-0">
                        <div className="relative w-16">
                          <div className="absolute -inset-2 bg-secondary-300 dark:bg-secondary-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
                          <div className="relative text-4xl text-center animate-bounce">
                            ✨
                          </div>
                          <div className="text-center text-xs font-bold text-secondary-600 dark:text-secondary-300 mt-1">
                            نور
                          </div>
                        </div>
                      </div>
                      {/* Message Bubble */}
                      <div className="flex-1 p-4 bg-gradient-to-br from-secondary-100 to-primary-100 dark:from-secondary-900/30 dark:to-primary-900/30 rounded-2xl border-2 border-secondary-300 dark:border-secondary-700 shadow-lg animate-slideDown relative">
                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                          {event.storytelling}
                        </p>
                        {/* Speech bubble pointer */}
                        <div className="absolute -left-2 top-4 w-0 h-0 border-r-8 border-t-4 border-b-4 border-r-secondary-100 dark:border-r-secondary-900/30 border-t-transparent border-b-transparent"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Noor Storytelling - Desktop Side */}
                {visibleEvents.includes(event.id) && (
                  <div
                    className={`hidden md:flex order-${idx % 2 === 0 ? "3" : "1"} items-start gap-3 flex-shrink-0 w-56`}
                  >
                    {idx % 2 === 0 ? (
                      <>
                        {/* Message Bubble on Left, Noor on Right */}
                        <div className="flex-1 p-4 bg-gradient-to-br from-secondary-100 to-primary-100 dark:from-secondary-900/30 dark:to-primary-900/30 rounded-2xl border-2 border-secondary-300 dark:border-secondary-700 shadow-lg animate-slideDown relative">
                          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                            {event.storytelling}
                          </p>
                          {/* Speech bubble pointer facing right */}
                          <div className="absolute -right-3 top-4 w-0 h-0 border-l-8 border-t-4 border-b-4 border-l-secondary-100 dark:border-l-secondary-900/30 border-t-transparent border-b-transparent"></div>
                        </div>
                        {/* Noor Character on Right */}
                        <div className="flex-shrink-0">
                          <div className="w-16 sticky top-32">
                            <div className="absolute -inset-2 bg-secondary-300 dark:bg-secondary-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
                            <div className="text-4xl text-center animate-bounce">
                              ✨
                            </div>
                            <div className="text-center text-xs font-bold text-secondary-600 dark:text-secondary-300 mt-1">
                              نور
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Noor Character on Left */}
                        <div className="flex-shrink-0">
                          <div className="w-16 sticky top-32">
                            <div className="absolute -inset-2 bg-secondary-300 dark:bg-secondary-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
                            <div className="text-4xl text-center animate-bounce">
                              ✨
                            </div>
                            <div className="text-center text-xs font-bold text-secondary-600 dark:text-secondary-300 mt-1">
                              نور
                            </div>
                          </div>
                        </div>
                        {/* Message Bubble on Right */}
                        <div className="flex-1 p-4 bg-gradient-to-br from-secondary-100 to-primary-100 dark:from-secondary-900/30 dark:to-primary-900/30 rounded-2xl border-2 border-secondary-300 dark:border-secondary-700 shadow-lg animate-slideDown relative">
                          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                            {event.storytelling}
                          </p>
                          {/* Speech bubble pointer facing left */}
                          <div className="absolute -left-3 top-4 w-0 h-0 border-r-8 border-t-4 border-b-4 border-r-secondary-100 dark:border-r-secondary-900/30 border-t-transparent border-b-transparent"></div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Desktop Timeline Dot - With Professional Glow */}
                <div className="hidden md:flex order-2 flex-shrink-0 relative">
                  {/* Outer glow ring - animates when event is visible */}
                  {visibleEvents.includes(event.id) && (
                    <>
                      <div className="absolute inset-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 to-yellow-300 blur-lg opacity-60 animate-pulse"></div>
                      <div className="absolute -inset-2 w-14 h-14 rounded-full border-2 border-amber-300/50 animate-[spin_3s_linear_infinite]"></div>
                    </>
                  )}

                  {/* Inner dot */}
                  <div
                    className={`relative w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-700 transform z-10 ${
                      visibleEvents.includes(event.id)
                        ? "bg-gradient-to-br from-primary-500 to-secondary-500 border-4 border-white dark:border-slate-900 shadow-2xl scale-100"
                        : "bg-slate-300 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 scale-50"
                    }`}
                  >
                    {event.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Section with Animations */}
        <div className="grid md:grid-cols-4 gap-6 py-12 animate-slideUp">
          {[
            { label: "سنوات الدعوة", value: "23", icon: "📅" },
            { label: "الغزوات", value: "27", icon: "⚔️" },
            { label: "الصحابة", value: "10,000+", icon: "👥" },
            { label: "حجة الوداع", value: "1", icon: "🕌" },
          ].map((stat, idx) => (
            <Card
              key={idx}
              className="text-center group hover:-translate-y-2 transition-all duration-500"
            >
              <div className="text-5xl mb-3 group-hover:scale-125 transition-transform duration-500">
                {stat.icon}
              </div>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-slate-600 dark:text-slate-400 font-semibold">
                {stat.label}
              </p>
            </Card>
          ))}
        </div>

        {/* Important Dates Card */}
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-900/50 animate-slideUp">
          <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white flex items-center gap-2">
            <span className="text-3xl">📅</span> السنوات المهمة في السيرة
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                year: "570 م",
                event: "ولادة النبي صلى الله عليه وسلم",
                icon: "👶",
              },
              { year: "609 م", event: "نزول الوحي والبعثة", icon: "✨" },
              { year: "622 م", event: "الهجرة النبوية", icon: "🛤️" },
              { year: "630 م", event: "فتح مكة", icon: "🕌" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-all duration-500 group"
              >
                <span className="text-3xl group-hover:scale-125 transition-transform duration-500">
                  {item.icon}
                </span>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent block">
                    {item.year}
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 font-semibold mt-1">
                    {item.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Bottom CTA */}
        <div className="text-center py-12 animate-slideUp">
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-4">
            استكشف المزيد من المعلومات بربط مع غذائم السيرة الأرائية؟
          </p>
          <div className="inline-block">
            <Button
              size="lg"
              onClick={() => setCurrentPage("sources")}
              className="inline-block px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-bold hover:shadow-lg transition-shadow"
            >
              ابدأ التعلم
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.05);
          }
        }

        @keyframes glow-appear {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 0.3;
            transform: scale(1);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }

        .golden-border {
          border: 2px solid rgba(212, 175, 55, 0.6);
          box-shadow:
            0 0 15px rgba(251, 191, 36, 0.5),
            0 0 30px rgba(251, 191, 36, 0.2),
            inset 0 0 15px rgba(255, 255, 255, 0.1);
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.05), transparent);
        }

        .golden-border:hover {
          box-shadow:
            0 0 20px rgba(251, 191, 36, 0.7),
            0 0 40px rgba(251, 191, 36, 0.3),
            inset 0 0 20px rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </div>
  );
}
