import React from "react";
import Button from "../UI/Button";

/**
 * Topic Card Component
 * Shows topic information with progress bar
 */
export default function TopicCard({ topic, onClick, onStartQuiz }) {
  return (
    <div
      onClick={onClick}
      className="glassmorphism rounded-2xl p-6 cursor-pointer hover:shadow-lg hover:scale-105 transition-all group"
    >
      {/* Icon and difficulty */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl">{topic.icon}</span>
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full ${
            topic.difficulty === "سهل"
              ? "bg-green-100 text-green-700"
              : topic.difficulty === "متوسط"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {topic.difficulty}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white group-hover:text-primary-600">
        {topic.title}
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
        {topic.description}
      </p>

      {/* Meta info */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
        <span>⏱️ {topic.duration}</span>
        <span>•</span>
        <span>📚 {topic.sections?.length || 0} أقسام</span>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold">التقدم</span>
          <span className="text-xs text-primary-600">{topic.progress}%</span>
        </div>
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all"
            style={{ width: `${topic.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <Button
          variant="primary"
          size="sm"
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          اقرأ المزيد
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            onStartQuiz?.();
          }}
        >
          اختبر نفسك
        </Button>
      </div>
    </div>
  );
}
