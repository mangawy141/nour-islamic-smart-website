import React from "react";
import { BarChart3, TrendingUp, BookOpen } from "lucide-react";
import Card from "../components/UI/Card";

/**
 * Dashboard Page
 * Shows user progress and learning statistics
 */
export default function Dashboard({ userProgress }) {
  const completedCount = userProgress.completedTopics.length;
  const totalTopics = 5;
  const completionRate = Math.round((completedCount / totalTopics) * 100);

  // Calculate average quiz score
  const avgScore =
    userProgress.quizScores.length > 0
      ? Math.round(
          userProgress.quizScores.reduce((a, b) => a + b.score, 0) /
            userProgress.quizScores.length,
        )
      : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-5xl font-bold text-slate-900 dark:text-white">
          لوحتي التحكم
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          متابعة تقدمك في رحلة التعلم
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center">
          <p className="text-5xl font-bold text-primary-600 mb-2">
            {completedCount}
          </p>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            مواضيع مكتملة
          </p>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {completionRate}% من المناهج
          </p>
        </Card>

        <Card className="text-center">
          <BarChart3 className="w-12 h-12 mx-auto mb-4 text-secondary-600" />
          <p className="text-5xl font-bold text-secondary-600 mb-2">
            {avgScore}%
          </p>
          <p className="text-slate-600 dark:text-slate-400">متوسط درجاتك</p>
        </Card>

        <Card className="text-center">
          <TrendingUp className="w-12 h-12 mx-auto mb-4 text-primary-600" />
          <p className="text-5xl font-bold text-primary-600 mb-2">
            {userProgress.quizScores.length}
          </p>
          <p className="text-slate-600 dark:text-slate-400">اختبارات أكملتها</p>
        </Card>
      </div>

      {/* Completed Topics */}
      <Card>
        <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen size={24} />
          المواضيع المكتملة
        </h2>
        {completedCount > 0 ? (
          <div className="space-y-3">
            {[
              "الفترة الجاهلية والنشأة",
              "البعثة والدعوة المكية",
              "الهجرة المشرفة",
              "الغزوات والفتوحات",
              "الحياة الشخصية والأخلاق",
            ].map(
              (topic, idx) =>
                userProgress.completedTopics.includes(idx + 1) && (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                  >
                    <span className="text-2xl">✓</span>
                    <span className="text-slate-700 dark:text-slate-300">
                      {topic}
                    </span>
                  </div>
                ),
            )}
          </div>
        ) : (
          <p className="text-slate-600 dark:text-slate-400">
            لم تكمل أي مواضيع بعد. ابدأ الآن!
          </p>
        )}
      </Card>

      {/* Recent Quiz Results */}
      {userProgress.quizScores.length > 0 && (
        <Card>
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
            آخر الدرجات
          </h2>
          <div className="space-y-4">
            {userProgress.quizScores
              .slice(-5)
              .reverse()
              .map((result, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                >
                  <span className="text-slate-700 dark:text-slate-300">
                    الموضوع #{result.topic}
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary-600">
                        {result.score}%
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date(result.date).toLocaleDateString("ar-SA")}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                      {result.score >= 80
                        ? "⭐"
                        : result.score >= 60
                          ? "👍"
                          : "📝"}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      )}

      {/* Goals */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
          🎯 أهدافك
        </h2>
        <ul className="space-y-3 text-slate-700 dark:text-slate-300">
          <li className="flex items-center gap-3">
            <span className={completedCount >= 2 ? "✓" : "○"}>
              أكمل 5 مواضيع على الأقل
            </span>
            <span className="text-xs text-slate-500">({completedCount}/5)</span>
          </li>
          <li className="flex items-center gap-3">
            <span className={userProgress.quizScores.length >= 3 ? "✓" : "○"}>
              أكمل 3 اختبارات
            </span>
            <span className="text-xs text-slate-500">
              ({userProgress.quizScores.length}/3)
            </span>
          </li>
          <li className="flex items-center gap-3">
            <span className={avgScore >= 80 ? "✓" : "○"}>
              احصل على متوسط 80% أو أكثر
            </span>
            <span className="text-xs text-slate-500">({avgScore}%)</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
