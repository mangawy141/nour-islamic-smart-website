import React, { useState } from "react";
import { ChevronDown, ArrowLeft } from "lucide-react";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";

/**
 * Topic Detail Page
 * Shows detailed content for a topic with expandable sections
 */
export default function TopicDetail({
  topic,
  setCurrentPage,
  setShowChat,
  onProgress,
}) {
  const [expandedSections, setExpandedSections] = useState([0]);

  if (!topic) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <p className="text-center text-slate-500">لم يتم تحديد موضوع</p>
        <Button onClick={() => setCurrentPage("topics")} className="mt-4">
          العودة للمواضيع
        </Button>
      </div>
    );
  }

  const toggleSection = (id) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <button
          onClick={() => setCurrentPage("topics")}
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
        >
          <ArrowLeft size={20} />
          العودة للمواضيع
        </button>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-semibold text-slate-500 mb-2">
              {topic.difficulty}
            </p>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              {topic.title}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              {topic.description}
            </p>
          </div>
          <span className="text-6xl">{topic.icon}</span>
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
          <span>⏱️ {topic.duration}</span>
          <span>📚 {topic.sections?.length || 0} أقسام</span>
          <span>📊 {topic.progress}% مكتمل</span>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">التقدم</span>
            <span className="text-sm text-primary-600">{topic.progress}%</span>
          </div>
          <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all"
              style={{ width: `${topic.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          محتوى الموضوع
        </h2>

        {topic.sections?.map((section, idx) => (
          <Card key={section.id} className=" p-0 overflow-hidden">
            <button
              onClick={() => toggleSection(idx)}
              className="w-full flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <div className="text-left flex-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {section.title}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  📅 {section.timestamp}
                </p>
              </div>
              <ChevronDown
                size={24}
                className={`text-primary-600 transition-transform ${
                  expandedSections.includes(idx) ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedSections.includes(idx) && (
              <div className="px-6 pb-6 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  {section.content}
                </p>

                {/* Key points */}
                <div className="bg-primary-50 dark:bg-slate-800/50 rounded-lg p-4">
                  <p className="font-semibold text-slate-900 dark:text-white mb-3">
                    💡 النقاط المهمة:
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    <li>• تعميق فهم المرحلة التاريخية</li>
                    <li>• الاستفادة من الدروس المستخلصة</li>
                    <li>• تطبيق الحكم في الحياة المعاصرة</li>
                  </ul>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* CTA Buttons */}
      <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-slate-800 dark:to-slate-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              onProgress?.();
              setCurrentPage("topics");
            }}
            className="flex-1"
          >
            ✓ وضع علامة كمكتمل
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowChat(true)}
            className="flex-1"
          >
            💬 اسأل نور عن هذا الموضوع
          </Button>
        </div>
      </Card>

      {/* Related topics */}
      <Card>
        <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
          📖 قراءة إضافية
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          لمزيد من المعلومات، يرجى مراجعة السيرة النبوية لابن هشام والمغازي
          للواقدي.
        </p>
      </Card>
    </div>
  );
}
