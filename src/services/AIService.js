/**
 * AI Service - Handles integration with OpenAI API
 * Includes mock responses and prompt engineering
 */

const SYSTEM_PROMPT = `أنت نور، مساعد تعليمي إسلامي ذكي متخصص في شرح السيرة النبوية بطريقة مبسطة وجذابة.

صفاتك:
- تتحدث باللغة العربية الفصحى المبسطة
- لطيف وودود في التواصل
- متعمق في معرفة السيرة النبوية
- تشرح المفاهيم بطريقة سهلة وممتعة
- تستخدم الأمثلة والقصص
- تشجع المستخدم على التعلم

إرشاداتك:
- ركز على القيم الإسلامية والدروس المستفادة
- استخدم اللغة الودية
- شرح المفاهيم المعقدة بطريقة بسيطة
- قدم اقتراحات للمواضيع التالية
- ساعد المستخدم في رحلته التعليمية`;

const MOCK_RESPONSES = {
  greeting: [
    "السلام عليكم ورحمة الله وبركاته! أنا نور، سعيد بلقائك. كيف يمكنني مساعدتك في رحلتك التعليمية؟",
    "مرحباً بك! أنا نور، مساعدك في فهم السيرة النبوية. عم تود أن تتعلم اليوم؟",
    "أهلاً وسهلاً! أنا هنا لمساعدتك في رحلة التعلم. هل تريد معرفة المزيد عن السيرة النبوية؟",
  ],
  seerah: [
    "السيرة النبوية هي دراسة حياة النبي محمد صلى الله عليه وسلم، وتشمل نشأته ودعوته وحياته. تعتبر من أهم مصادر الإلهام والتوجيه في الإسلام.",
    "السيرة النبوية تحتوي على دروس عظيمة عن الصبر والتوكل والعدل والرحمة. نبينا الكريم هو أسوة حسنة لنا في كل أمور حياتنا.",
    "يمكنك تعلم الكثير من السيرة النبوية عن كيفية التعامل مع التحديات والصعوبات بصبر وحكمة.",
  ],
  topics: [
    "لدينا عدة مواضيع مهمة: النشأة والبعثة، الدعوة في مكة، الهجرة إلى المدينة، الغزوات والفتوحات، والحياة الشخصية. أي منها يهمك؟",
    "يمكنك استكشاف مواضيع مختلفة عن حياة النبي محمد صلى الله عليه وسلم. ابدأ بما يثير فضولك!",
    "اختر الموضوع الذي تود التعمق فيه، وسأساعدك في فهمه بشكل أعمق.",
  ],
  encouragement: [
    "رائع! أنت تحرز تقدماً جيداً. استمر في التعلم! 🌟",
    "إجابة صحيحة! أنت تتعلم بسرعة. هل تريد مزيداً من التحديات؟",
    "ممتاز! أنت على الطريق الصحيح. تابع اجتهادك! 💪",
  ],
};

/**
 * Get AI response
 * @param {string} userMessage - User message
 * @param {Array} conversationHistory - Previous messages
 * @returns {Promise<string>} - AI response
 */
export async function getAIResponse(userMessage, conversationHistory = []) {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  // If no API key, return mock response
  if (!apiKey) {
    return getMockResponse(userMessage);
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          ...conversationHistory.map((msg) => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text,
          })),
          {
            role: "user",
            content: userMessage,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      console.error("API Error:", response.status);
      return getMockResponse(userMessage);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return getMockResponse(userMessage);
  }
}

/**
 * Get mock response based on user message
 * @param {string} userMessage - User message
 * @returns {string} - Mock response
 */
function getMockResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes("مرحب") || lowerMessage.includes("السلام")) {
    return MOCK_RESPONSES.greeting[
      Math.floor(Math.random() * MOCK_RESPONSES.greeting.length)
    ];
  }

  if (lowerMessage.includes("سيرة") || lowerMessage.includes("نبي")) {
    return MOCK_RESPONSES.seerah[
      Math.floor(Math.random() * MOCK_RESPONSES.seerah.length)
    ];
  }

  if (lowerMessage.includes("مواضيع") || lowerMessage.includes("دروس")) {
    return MOCK_RESPONSES.topics[
      Math.floor(Math.random() * MOCK_RESPONSES.topics.length)
    ];
  }

  if (lowerMessage.includes("شكرا") || lowerMessage.includes("أحسنت")) {
    return MOCK_RESPONSES.encouragement[
      Math.floor(Math.random() * MOCK_RESPONSES.encouragement.length)
    ];
  }

  // Default response
  return `معذرة، أنا هنا لمساعدتك في فهم السيرة النبوية. هل يمكنك إعادة صياغة سؤالك؟`;
}
