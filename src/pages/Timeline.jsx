import React, { useState, useEffect } from "react";
import { TIMELINE_EVENTS } from "../constants/data";
import Card from "../components/UI/Card";

/**
 * Timeline Page
 * Interactive timeline of Islamic history events
 */
export default function Timeline() {
  const [visibleEvents, setVisibleEvents] = useState([]);

  useEffect(() => {
    // Animate events on scroll
    TIMELINE_EVENTS.forEach((event, idx) => {
      setTimeout(() => {
        setVisibleEvents((prev) => [...prev, event.id]);
      }, idx * 150);
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-slate-900 dark:text-white">
          التايم لاين التاريخي
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          رحلة النبي محمد صلى الله عليه وسلم عبر الزمن
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Center line */}
        <div className="hidden md:block absolute left-1/2 w-1 h-full bg-gradient-to-b from-primary-500 via-secondary-500 to-primary-500 -translate-x-1/2"></div>

        {/* Events */}
        <div className="space-y-12">
          {TIMELINE_EVENTS.map((event, idx) => (
            <div
              key={event.id}
              className={`md:flex items-center gap-8 transition-all duration-500 ${
                visibleEvents.includes(event.id)
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              {/* Mobile timeline dot */}
              <div className="md:hidden absolute left-0 w-12 h-12 bg-white dark:bg-slate-900 rounded-full border-4 border-primary-500 flex items-center justify-center text-xl -translate-x-6">
                {event.icon}
              </div>

              {/* Content */}
              <div
                className={`flex-1 ${idx % 2 === 0 ? "md:text-left md:order-1" : "md:text-right md:order-3"}`}
              >
                <Card className="md:w-96">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-3xl">{event.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-primary-600">
                        {event.date}
                      </p>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {event.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    {event.description}
                  </p>
                </Card>
              </div>

              {/* Center dot for desktop */}
              <div className="hidden md:flex order-2 w-8 h-8 bg-white dark:bg-slate-900 rounded-full border-4 border-primary-500 flex-shrink-0 items-center justify-center text-lg">
                {event.icon}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: "سنوات الدعوة", value: "23" },
          { label: "الغزوات", value: "27" },
          { label: "الصحابة", value: "10,000+" },
          { label: "الحجات", value: "1" },
        ].map((stat, idx) => (
          <Card key={idx} className="text-center">
            <p className="text-3xl font-bold text-primary-600 mb-2">
              {stat.value}
            </p>
            <p className="text-slate-600 dark:text-slate-400">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Important dates */}
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
        <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
          📅 السنوات المهمة
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { year: "570 م", event: "ولادة النبي صلى الله عليه وسلم" },
            { year: "609 م", event: "نزول الوحي والبعثة" },
            { year: "622 م", event: "الهجرة النبوية" },
            { year: "630 م", event: "فتح مكة" },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <span className="text-2xl font-bold text-primary-600 whitespace-nowrap">
                {item.year}
              </span>
              <p className="text-slate-700 dark:text-slate-300">{item.event}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
