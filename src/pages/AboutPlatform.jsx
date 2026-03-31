import React from "react";
import Card from "../components/UI/Card";

/**
 * About Platform Page
 * Explains the mission and vision of the platform
 */
export default function AboutPlatform() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-slate-900 dark:text-white">
          عن منصة نور
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          منصة تعليمية إسلامية متطورة
        </p>
      </div>

      {/* Mission */}
      <Card>
        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
          🎯 رسالتنا
        </h2>
        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
          نسعى لدعم المتعلمين العرب في فهم السيرة النبوية واستيعاب دروسها
          الغالية من خلال تقنيات تعليمية حديثة وتفاعلية، مع الاستعانة بالذكاء
          الاصطناعي لتوفير تجربة تعليمية شخصية وفعال.
        </p>
      </Card>

      {/* Vision */}
      <Card>
        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
          👁️ رؤيتنا
        </h2>
        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
          أن نكون المنصة الرائدة في التعليم الإسلامي الرقمي، حيث يتمكن كل متعلم
          من استيعاب السيرة النبوية بعمق، والاستفادة من قصص النبي صلى الله عليه
          وسلم في بناء شخصية قوية متوازنة.
        </p>
      </Card>

      {/* Values */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">
          💎 قيمنا الأساسية
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "الأمانة العلمية",
              description: "نعتمد على مصادر موثوقة وعلماء موثوقين",
            },
            {
              title: "الجودة والتميز",
              description: "نسعى لأعلى مستويات الجودة في كل محتوى",
            },
            {
              title: "الابتكار",
              description: "نستخدم أحدث التقنيات في التعليم",
            },
            { title: "التيسير", description: "نسهل الوصول للمعرفة للجميع" },
          ].map((value, idx) => (
            <Card key={idx}>
              <h3 className="text-xl font-bold mb-2 text-primary-600">
                {value.title}
              </h3>
              <p className="text-slate-700 dark:text-slate-300">
                {value.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: "محتوى تعليمي", value: "50+" },
          { label: "ساعات التعلم", value: "100+" },
          { label: "المتعلمون", value: "آلاف" },
          { label: "دقة المعلومات", value: "99%" },
        ].map((stat, idx) => (
          <Card key={idx} className="text-center">
            <p className="text-4xl font-bold text-primary-600 mb-2">
              {stat.value}
            </p>
            <p className="text-slate-600 dark:text-slate-400">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Educational Value */}
      <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-slate-800 dark:to-slate-700">
        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
          📚 القيمة التعليمية
        </h2>
        <ul className="space-y-4 text-lg text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-3">
            <span className="text-2xl">✓</span>
            <span>
              فهم عميق لحياة النبي محمد صلى الله عليه وسلم من المصادر الموثوقة
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">✓</span>
            <span>دروس عملية يمكن تطبيقها في الحياة اليومية</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">✓</span>
            <span>تطوير مهارات التحليل والنقد الإيجابي</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">✓</span>
            <span>بناء شخصية قوية على أساس إسلامي صحيح</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">✓</span>
            <span>التعرف على الحضارة الإسلامية وإسهاماتها</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
