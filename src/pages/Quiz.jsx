import React, { useState } from "react";
import { QUIZ_QUESTIONS, TOPICS } from "../constants/data";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";

/**
 * Quiz Page
 * Interactive quiz system with feedback
 */
export default function Quiz({ topic, setCurrentPage, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const quizTopic = topic || TOPICS[0];
  const questions = QUIZ_QUESTIONS[quizTopic.id] || [];

  if (!quizStarted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Card className="text-center space-y-6">
          <p className="text-5xl">{quizTopic.icon}</p>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            {quizTopic.title}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            اختبر معلوماتك عن هذا الموضوع
          </p>

          <div className="grid grid-cols-3 gap-4 py-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-600">
                {questions.length}
              </p>
              <p className="text-sm text-slate-500">أسئلة</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary-600">
                {questions.length * 10}
              </p>
              <p className="text-sm text-slate-500">نقطة</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-600">
                {questions.length * 2}
              </p>
              <p className="text-sm text-slate-500">دقيقة</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setQuizStarted(true)}
              className="w-full"
            >
              ابدأ الاختبار
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setCurrentPage("topics")}
              className="w-full"
            >
              العودة للمواضيع
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (showResults) {
    const finalScore = Math.round((score / (questions.length * 10)) * 100);
    const passed = finalScore >= 60;

    setTimeout(() => {
      if (onComplete) {
        onComplete(finalScore);
      }
    }, 100);

    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Card className="text-center space-y-6 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-slate-800 dark:to-slate-700">
          <p className="text-6xl">{passed ? "🎉" : "📚"}</p>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            {passed ? "مبروك!" : "حاول مرة أخرى"}
          </h1>

          <div className="space-y-4">
            <div>
              <p className="text-5xl font-bold text-primary-600">
                {finalScore}%
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                النسبة الكلية
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{score}</p>
                <p className="text-sm text-slate-500">النقاط المكتسبة</p>
              </div>
              <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-slate-600">
                  {questions.length * 10}
                </p>
                <p className="text-sm text-slate-500">النقاط الكلية</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                setCurrentQuestion(0);
                setScore(0);
                setAnswers({});
                setShowResults(false);
                setQuizStarted(true);
              }}
              className="w-full"
            >
              أعيد الاختبار
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setCurrentPage("topics")}
              className="w-full"
            >
              العودة للمواضيع
            </Button>
          </div>
        </Card>

        {/* Answer review */}
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            مراجعة الإجابات
          </h2>
          {questions.map((q, idx) => (
            <Card key={q.id}>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span
                    className={`text-2xl font-bold ${answers[q.id] === q.correct ? "text-green-600" : "text-red-600"}`}
                  >
                    {answers[q.id] === q.correct ? "✓" : "✗"}
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 dark:text-white mb-2">
                      {q.question}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">
            السؤال {currentQuestion + 1} من {questions.length}
          </span>
          <span className="text-sm font-semibold text-primary-600">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <Card className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => {
                const isCorrect = idx === question.correct;
                setAnswers({ ...answers, [question.id]: idx });
                if (isCorrect) {
                  setScore(score + 10);
                }
              }}
              disabled={answers[question.id] !== undefined}
              className={`w-full text-right p-4 rounded-lg border-2 transition-all font-semibold ${
                answers[question.id] === idx
                  ? idx === question.correct
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700"
                    : "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700"
                  : "border-slate-200 dark:border-slate-700 hover:border-primary-500 text-slate-700 dark:text-slate-300"
              }`}
            >
              <span className="flex items-center justify-between">
                <span>{option}</span>
                {answers[question.id] === idx && (
                  <span className="text-lg">
                    {idx === question.correct ? "✓" : "✗"}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>

        {/* Navigation */}
        {answers[question.id] !== undefined && (
          <div className="flex gap-3 pt-6">
            <Button
              variant="outline"
              onClick={() =>
                setCurrentQuestion(Math.max(0, currentQuestion - 1))
              }
              disabled={currentQuestion === 0}
              className="flex-1"
            >
              السابق
            </Button>
            {currentQuestion === questions.length - 1 ? (
              <Button
                variant="primary"
                onClick={() => setShowResults(true)}
                className="flex-1"
              >
                عرض النتائج
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="flex-1"
              >
                التالي
              </Button>
            )}
          </div>
        )}
      </Card>

      {/* Score indicator */}
      {answers[question.id] !== undefined && (
        <Card className="text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            النقاط الحالية
          </p>
          <p className="text-3xl font-bold text-primary-600">
            {score} / {(currentQuestion + 1) * 10}
          </p>
        </Card>
      )}
    </div>
  );
}
