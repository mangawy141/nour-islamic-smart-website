import React, { useState, useRef, useEffect } from "react";
import { Send, X } from "lucide-react";
import { TIMELINE_EVENTS, AI_MESSAGES } from "../../constants/data";

/**
 * Chat Widget Component - Professional Edition
 * Local AI with predefined messages and smooth animations
 * No API calls - optimized performance and reliability
 */
export default function ChatWidget({
  onClose,
  chatHistory,
  setChatHistory,
  onMessage,
}) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  // Show initial greeting only once
  useEffect(() => {
    if (!hasGreeted && chatHistory.length === 0) {
      const greetings = AI_MESSAGES.greetings;
      const greeting = greetings[Math.floor(Math.random() * greetings.length)];
      const greetingMessage = {
        sender: "ai",
        text: greeting,
        timestamp: new Date(),
      };
      setChatHistory([greetingMessage]);
      setHasGreeted(true);
    }
  }, [hasGreeted, chatHistory.length, setChatHistory]);

  /**
   * Get AI response from predefined messages
   * Smart matching based on keywords
   */
  const getAIResponseLocal = (userMessage) => {
    const messageLower = userMessage.toLowerCase().trim();

    // Greeting detection
    if (
      messageLower.includes("مرحبا") ||
      messageLower.includes("السلام") ||
      messageLower.includes("hello") ||
      messageLower.includes("hi")
    ) {
      return AI_MESSAGES.greetings[
        Math.floor(Math.random() * AI_MESSAGES.greetings.length)
      ];
    }

    // Birth/childhood
    if (
      messageLower.includes("ولاد") ||
      messageLower.includes("وُلد") ||
      messageLower.includes("ولد") ||
      messageLower.includes("طفول") ||
      messageLower.includes("نشأ")
    ) {
      return AI_MESSAGES.about_birth[
        Math.floor(Math.random() * AI_MESSAGES.about_birth.length)
      ];
    }

    // Youth
    if (
      messageLower.includes("شباب") ||
      messageLower.includes("شاب") ||
      messageLower.includes("خديج")
    ) {
      return AI_MESSAGES.about_youth[
        Math.floor(Math.random() * AI_MESSAGES.about_youth.length)
      ];
    }

    // Revelation
    if (
      messageLower.includes("وحي") ||
      messageLower.includes("بعث") ||
      messageLower.includes("جبريل") ||
      messageLower.includes("غار")
    ) {
      return AI_MESSAGES.about_revelation[
        Math.floor(Math.random() * AI_MESSAGES.about_revelation.length)
      ];
    }

    // Hijra
    if (
      messageLower.includes("هجرة") ||
      messageLower.includes("مدين") ||
      messageLower.includes("مكة")
    ) {
      return AI_MESSAGES.about_hijra[
        Math.floor(Math.random() * AI_MESSAGES.about_hijra.length)
      ];
    }

    // Battles
    if (
      messageLower.includes("غزو") ||
      messageLower.includes("معرك") ||
      messageLower.includes("بدر") ||
      messageLower.includes("أحد") ||
      messageLower.includes("خندق")
    ) {
      return AI_MESSAGES.about_battles[
        Math.floor(Math.random() * AI_MESSAGES.about_battles.length)
      ];
    }

    // Conquest
    if (messageLower.includes("فتح") || messageLower.includes("منتصر")) {
      return AI_MESSAGES.about_conquest[
        Math.floor(Math.random() * AI_MESSAGES.about_conquest.length)
      ];
    }

    // Farewell/Death
    if (
      messageLower.includes("وداع") ||
      messageLower.includes("حج") ||
      messageLower.includes("وفا")
    ) {
      return AI_MESSAGES.about_farewell[
        Math.floor(Math.random() * AI_MESSAGES.about_farewell.length)
      ];
    }

    // Seerah general
    if (
      messageLower.includes("سير") ||
      messageLower.includes("نبي") ||
      messageLower.includes("محمد")
    ) {
      return AI_MESSAGES.about_seerah[
        Math.floor(Math.random() * AI_MESSAGES.about_seerah.length)
      ];
    }

    // Encouragement
    if (
      messageLower.includes("شكر") ||
      messageLower.includes("أحسنت") ||
      messageLower.includes("شكراً")
    ) {
      return AI_MESSAGES.encouragement[
        Math.floor(Math.random() * AI_MESSAGES.encouragement.length)
      ];
    }

    // Help/Questions
    if (
      messageLower.includes("ساعد") ||
      messageLower.includes("أسئل") ||
      messageLower.includes("كيف")
    ) {
      return AI_MESSAGES.questions_help[
        Math.floor(Math.random() * AI_MESSAGES.questions_help.length)
      ];
    }

    // Default response
    return "شكراً على سؤالك! 😊 أنا متخصص في السيرة النبوية. يمكنك أن تسأل عن أي جزء من حياة النبي محمد صلى الله عليه وسلم، والهجرة، الغزوات، أو أي موضوع إسلامي آخر. 📖✨";
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input, timestamp: new Date() };
    setChatHistory([...chatHistory, userMessage]);
    setInput("");
    setIsLoading(true);
    onMessage();

    // Simulate slight delay for professional feel
    setTimeout(() => {
      const response = getAIResponseLocal(input);
      const aiMessage = { sender: "ai", text: response, timestamp: new Date() };
      setChatHistory((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 300);
  };

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="fixed bottom-24 left-8 w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-40 animate-slideUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">نور</h3>
            <p className="text-xs opacity-90">مساعدك التعليمي الذكي</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages - With Slide Down Animation */}
        <div className="flex-1 overflow-y-auto p-4 h-96 space-y-4">
          {chatHistory.length === 0 ? (
            <div className="text-center text-slate-500 dark:text-slate-400 py-8 animate-fadeIn">
              <p className="text-2xl mb-2">👋</p>
              <p>السلام عليكم! أنا نور</p>
              <p className="text-sm mt-2">كيف يمكنني مساعدتك؟</p>
            </div>
          ) : (
            chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-start" : "justify-end"} animate-slideDown`}
                style={{
                  animation: `slideDown 0.4s ease-out forwards`,
                  animationDelay: `${idx * 0.05}s`,
                }}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg ${
                    msg.sender === "user"
                      ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-br-none"
                      : "bg-gradient-to-br from-primary-500 to-secondary-500 text-white rounded-bl-none shadow-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-end">
              <div className="bg-primary-500 text-white px-4 py-2 rounded-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-3 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="اكتب رسالتك..."
            className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:border-primary-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600 disabled:opacity-50 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
