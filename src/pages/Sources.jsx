import React from "react";
import { SOURCES } from "../constants/data";
import Card from "../components/UI/Card";

/**
 * Sources & References Page
 * Displays list of sources and references used
 */
export default function Sources() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-slate-900 dark:text-white">
          المصادر والمراجع
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          المصادر الموثوقة للمحتوى التعليمي
        </p>
      </div>

      {/* Sources */}
      <div className="space-y-8">
        {SOURCES.map((category, idx) => (
          <div key={idx}>
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              {category.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {category.items.map((item, itemIdx) => (
                <Card key={itemIdx}>
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">
                      {item.type === "كتاب"
                        ? "📖"
                        : item.type === "موقع"
                          ? "🌐"
                          : item.type === "فيديو"
                            ? "📹"
                            : "📄"}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        {item.author}
                      </p>
                      <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full font-semibold">
                        {item.type}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Citation information */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
          📚 شروط الاستخدام
        </h2>
        <ul className="space-y-3 text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-3">
            <span className="text-xl">✓</span>
            <span>يمكنك استخدام المحتوى لأغراض تعليمية شخصية</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl">✓</span>
            <span>يجب نسب المحتوى إلى المصادر الأصلية عند إعادة النشر</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl">✓</span>
            <span>يُحظر استخدام المحتوى للأغراض التجارية بدون إذن</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl">✓</span>
            <span>نحتفظ بحق تحديث وتعديل المحتوى في أي وقت</span>
          </li>
        </ul>
      </Card>

      {/* Important books */}
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
        <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
          📖 الكتب الأساسية عن السيرة
        </h2>

        <div className="space-y-4">
          {[
            {
              title: "السيرة النبوية لابن هشام",
              desc: "مرجع تاريخي موثوق يجمع بين الدقة والتفصيل",
              author: "ابن هشام (ت 218 هـ)",
            },
            {
              title: "المغازي للواقدي",
              desc: "كتاب مهم في تفاصيل الغزوات والسرايا",
              author: "الواقدي (ت 207 هـ)",
            },
            {
              title: "دلائل النبوة",
              desc: "يتناول معجزات ودلائل نبوة محمد صلى الله عليه وسلم",
              author: "أبو نعيم الأصبهاني",
            },
            {
              title: "الطبقات الكبرى",
              desc: "ترجمة القادة والصحابة وأحداث السيرة",
              author: "ابن سعد (ت 230 هـ)",
            },
          ].map((book, idx) => (
            <div
              key={idx}
              className="p-4 bg-white dark:bg-slate-800/50 rounded-lg border-ر border-slate-200 dark:border-slate-700"
            >
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                {book.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                {book.desc}
              </p>
              <p className="text-xs text-slate-500">المؤلف: {book.author}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Disclaimer */}
      <div className="text-center p-6 bg-slate-100 dark:bg-slate-800 rounded-lg">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          هذه المنصة تهدف لتقديم محتوى تعليمي دقيق ومفيد. جميع المعلومات مستندة
          على مصادر إسلامية موثوقة.
        </p>
      </div>
    </div>
  );
}
