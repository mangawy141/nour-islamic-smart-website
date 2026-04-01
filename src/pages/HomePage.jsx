import React from "react";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";

/**
 * Home Page Component
 * Landing page with hero section and CTA buttons
 */
export default function HomePage({ setCurrentPage, setShowChat }) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-4 py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">
                نور
              </h1>
              <p className="text-2xl font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                منصة تعليمية إسلامية ذكية
              </p>
            </div>

            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              اكتشف السيرة النبوية بطريقة حديثة وتفاعلية مع مساعدك الذكي{" "}
              <span className="font-bold text-primary-600">نور</span>. تعلم من
              قصص النبي محمد صلى الله عليه وسلم وطبق دروسه في حياتك.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setCurrentPage("topics")}
                className="text-base"
              >
                ابدأ التعلم
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowChat(true)}
                className="text-base"
              >
                تحدث مع نور 💬
              </Button>
            </div>

            {/* Features */}
            <div className="pt-8 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-primary-600">5+</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  مواضيع شاملة
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-secondary-600">100%</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  عربي الفصحى
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary-600">🤖</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  مساعد ذكي
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Illustration */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-80 h-80 animate-slideUp">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <Card className="w-full h-full flex items-center justify-center text-9xl">
                ✨
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-slate-900 dark:text-white">
            لماذا نور؟
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎓",
                title: "محتوى تعليمي شامل",
                description:
                  "سيرة نبوية كاملة مع شرح مفصل لكل مرحلة من مراحل حياة النبي صلى الله عليه وسلم",
              },
              {
                icon: "🤖",
                title: "مساعد ذكي متفاعل",
                description:
                  "اسأل نور أي سؤال عن السيرة والإسلام، وسيجيبك بطريقة بسيطة وشاملة",
              },
              {
                icon: "📊",
                title: "تتبع تقدمك",
                description:
                  "اختبر نفسك وتابع تقدمك مع لوحة تحكم مشخصة تظهر إنجازاتك",
              },
              {
                icon: "⏱️",
                title: "تعلم بسرعتك الخاصة",
                description:
                  "لا عجلة ولا ضغط، تعلم وفقاً لجدولك الخاص وفي الوقت المناسب لك",
              },
              {
                icon: "🌙",
                title: "واجهة مريحة",
                description:
                  "تصميم حديث وسهل الاستخدام مع دعم كامل للمظهر الداكن",
              },
              {
                icon: "📱",
                title: "متاح على جميع الأجهزة",
                description:
                  "تعلم على هاتفك أو جهازك اللوحي أو الكمبيوتر بسهولة",
              },
            ].map((feature, idx) => (
              <Card key={idx} className="text-center">
                <p className="text-5xl mb-4">{feature.icon}</p>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-600 to-secondary-600 animate-fadeIn">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6 animate-slideUp">
            هل أنت مستعد للتعلم؟
          </h2>
          <p
            className="text-lg mb-8 font-medium animate-slideUp"
            style={{ animationDelay: "0.1s" }}
          >
            ابدأ رحلتك التعليمية الآن واكتشف عظمة السيرة النبوية
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-slideUp"
            style={{ animationDelay: "0.2s" }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => setCurrentPage("dashboard")}
              className="bg-white text-green-500 hover:bg-gray-100 font-bold shadow-lg hover:shadow-xl transition-all"
            >
              اذهب إلى لوحتي
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={() => setCurrentPage("timeline")}
              className="bg-slate-900 text-white hover:bg-slate-800 font-bold shadow-lg hover:shadow-xl transition-all"
            >
              عرض التايم لاين 📅
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
