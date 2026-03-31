# 🛠️ دليل التطوير - منصة نور

## نظرة عامة

هذا الدليل موجه للمطورين الذين يرغبون في تطوير وتوسيع منصة نور.

---

## المتطلبات

- Node.js 16+
- npm أو yarn
- محرر الأكواد (VS Code مثالي)
- معرفة بـ React و JavaScript

---

## هيكل المشروع التفصيلي

### المجلدات الرئيسية

#### `src/components/`

**Navigation/**

- `Navbar.jsx` - الشريط العلوي (750 سطر)
- `Sidebar.jsx` - القائمة الجانبية للموبايل

**AI/**

- `FloatingAssistant.jsx` - زر المساعد العائم
- `ChatWidget.jsx` - واجهة الدردشة العائمة

**UI/**

- `Button.jsx` - مكون الزر
- `Card.jsx` - مكون البطاقة
- `Toast.jsx` - الإشعارات
- `ProgressBar.jsx` - شريط التقدم
- `QRCodeWidget.jsx` - زر الرمز السريع
- `Loading.jsx` - مؤشر التحميل

**Common/**

- `TopicCard.jsx` - بطاقة الموضوع

#### `src/pages/`

- `HomePage.jsx` - الصفحة الأولى
- `AboutPlatform.jsx` - عن المنصة
- `Dashboard.jsx` - لوحة التحكم
- `TopicsExplorer.jsx` - استكشاف المواضيع
- `TopicDetail.jsx` - تفاصيل الموضوع
- `Timeline.jsx` - الخط الزمني
- `Quiz.jsx` - الاختبارات
- `ChatSection.jsx` - دردشة كاملة الشاشة
- `Sources.jsx` - المصادر

#### `src/services/`

- `AIService.js` - خدمة الذكاء الاصطناعي

#### `src/constants/`

- `data.js` - جميع البيانات الثابتة

#### `src/`

- `App.jsx` - المكون الرئيسي
- `index.jsx` - نقطة الدخول
- `index.css` - الأنماط العامة

---

## دورة حياة الحالة

### Global State (في App.jsx)

```javascript
// الصفحة الحالية
const [currentPage, setCurrentPage] = useState("home");

// إعدادات المساعد
const [showChat, setShowChat] = useState(false);
const [chatHistory, setChatHistory] = useState([]);

// التقدم
const [userProgress, setUserProgress] = useState({
  completedTopics: [],
  quizScores: [],
  currentTopic: null,
});

// الموضوع المختار
const [selectedTopic, setSelectedTopic] = useState(null);
```

### Local Storage

```javascript
// محفوظ تلقائياً:
- theme (فاتح/داكن)
- chatHistory (سجل الدردشة)
- userProgress (التقدم)
```

---

## تدفق البيانات

```
المستخدم
   ↓
[UI Component]
   ↓
handlers (onClick, onChange)
   ↓
State Updater (setState)
   ↓
Re-render
   ↓
Local Storage / External API
```

### مثال: أخذ اختبار

1. المستخدم ينقر → `Quiz` يُعرّض السؤال
2. المستخدم يختار خياراً → `handleAnswerSelect`
3. الحالة تُحدّث → `score` يزداد إذا كان صحيح
4. بعد الانتهاء → `quizScores` يُحفظ في localStorage
5. `onComplete` يُستدعى → نتائج تُعرض

---

## كيفية إضافة ميزات جديدة

### 1. إضافة صفحة جديدة

```javascript
// 1. أنشئ src/pages/NewPage.jsx
export default function NewPage() {
  return <div>محتوى الصفحة</div>
}

// 2. استوردها في App.jsx
import NewPage from './pages/NewPage'

// 3. أضفها في pages object
const pages = {
  home: <HomePage ... />,
  newpage: <NewPage />
}

// 4. أضف رابط في Navbar
const navItems = [
  { id: 'newpage', label: 'الصفحة الجديدة' }
]
```

### 2. إضافة مكون جديد

```javascript
// src/components/Custom/MyComponent.jsx
export default function MyComponent({ prop1, prop2 }) {
  return (
    <div>
      {prop1}
      {prop2}
    </div>
  );
}
```

### 3. إضافة حالة جديدة

```javascript
// في App.jsx
const [newState, setNewState] = useState(initialValue)

// مررها للمكونات
<Component value={newState} setValue={setNewState} />

// في المكون
<button onClick={() => setValue(newValue)}>غيّر</button>
```

---

## معالجة الأخطاء

### في المكونات

```javascript
try {
  // عملية
} catch (error) {
  console.error("Error:", error);
  showToast("حدث خطأ!", "error");
}
```

### في الخدمات

```javascript
// AIService.js
export async function getAIResponse(message) {
  try {
    const response = await fetch("...");
    if (!response.ok) {
      return getMockResponse(message);
    }
    return response.json();
  } catch (error) {
    return getMockResponse(message);
  }
}
```

---

## أنماط التصميم المستخدمة

### 1. Component Pattern

```javascript
// قابل لإعادة الاستخدام
<Button variant="primary" size="lg" onClick={handler}>
  نص
</Button>
```

### 2. Props Drilling

```javascript
<Parent currentPage={currentPage} setCurrentPage={setCurrentPage}>
  <Child currentPage={currentPage} setCurrentPage={setCurrentPage} />
</Parent>
```

### 3. Local State

```javascript
const [local, setLocal] = useState(initialValue);
```

### 4. Effects

```javascript
useEffect(() => {
  // تشغيل code عند التحميل
  return () => {
    // تنظيف عند الفصل
  };
}, [dependencies]);
```

---

## الاختبار

### اختبار يدوي

1. `npm run dev`
2. افتح المتصفح
3. اختبر كل ميزة يدوياً

### اختبار الحالة

```javascript
// في الكونسول (F12)
localStorage.getItem("userProgress");
localStorage.getItem("chatHistory");
```

### اختبار API

```javascript
// في Devtools Network tab
// يمكنك رؤية جميع الطلبات
```

---

## الأداء

### تحسينات الأداء

1. **Code Splitting** - تحميل الصفحات عند التصفح
2. **Lazy Loading** - تحميل الصور عند الحاجة
3. **Memoization** - تذكر النتائج المحسوبة

### قياس الأداء

```javascript
console.time("operation");
// العملية
console.timeEnd("operation");
```

---

## أدوات التطوير

### إضافات VS Code الموصى بها

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Thunder Client (لاختبار API)
- GitLens

### اختصارات مفيدة

```
Ctrl+Shift+F - البحث في جميع الملفات
Ctrl+F - البحث في الملف الحالي
Ctrl+H - بحث واستبدال
Ctrl+G - الذهاب للسطر
Ctrl+/ - تعليق
```

---

## الممارسات الجيدة

### التسمية

```javascript
// ✅ جيد
const getUserProgress = () => {};
const isLoading = false;
const handleButtonClick = () => {};

// ❌ سيء
const get_user_progress = () => {};
const loading = false;
const onClick = () => {};
```

### التنسيق

```javascript
// ✅ جيد
const data = {
  id: 1,
  name: "Test",
  items: [],
};

// ❌ سيء
const data = { id: 1, name: "Test", items: [] };
```

### التعليقات

```javascript
// ✅ جيد
// حساب النسبة المئوية للتقدم
const percentage = (completed / total) * 100;

// ❌ سيء
// إضافة 1
i++;
```

---

## إصلاح الأخطاء الشائعة

### خطأ: 404 Module not found

```
❌ import Component from './component'
✅ import Component from './components/Component'
```

### خطأ: setState لم يحدّث الحالة

```javascript
❌ state.push(item)
   setState(state)

✅ setState([...state, item])
```

### خطأ: Infinite loop في useEffect

```javascript
❌ useEffect(() => {
  setState(state + 1)
}) // بدون dependencies

✅ useEffect(() => {
  setState(state + 1)
}, []) // dependencies للتحكم
```

---

## التوسع المستقبلي

### أولويات المرحلة التالية

1. **قاعدة بيانات** - Firebase أو MongoDB
2. **المصادقة** - تسجيل الدخول والحسابات
3. **API Backend** - Node.js/Express
4. **تطبيق موبايل** - React Native
5. **الألعاب التعليمية** - Gamification

### خط الطريق

- [ ] شهر 1: تحسين الأداء
- [ ] شهر 2: إضافة المزيد من المحتوى
- [ ] شهر 3: تطبيق الموبايل
- [ ] شهر 4: نظام المصادقة

---

## الدعم والموارد

### مراجع مهمة

- [React Docs](https://react.dev)
- [Tailwind Docs](https://tailwindcss.com)
- [Vite Docs](https://vitejs.dev)
- [MDN Web Docs](https://mdn.org)

### الاتصال

- البريد الإلكتروني: support@noor.example
- GitHub Issues: للإبلاغ عن الأخطاء
- Discussions: للاقتراحات

---

**ملاحظة:** الحفاظ على جودة الكود أمر ضروري. تأكد دائماً من اتباع معايير المشروع.
