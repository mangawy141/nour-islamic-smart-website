import React, { useState, useRef, useEffect } from "react";
import { Send, Trash2 } from "lucide-react";
import { getAIResponse } from "../services/AIService";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";

/**
 * Chat Section Page
 * Full-screen chat interface with AI assistant
 */
export default function ChatSection({ chatHistory, setChatHistory }) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input, timestamp: new Date() };
    setChatHistory([...chatHistory, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await getAIResponse(input, chatHistory);
      const aiMessage = { sender: "ai", text: response, timestamp: new Date() };
      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        sender: "ai",
        text: "معذرة، حدث خطأ. حاول لاحقاً.",
        timestamp: new Date(),
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (window.confirm("هل تريد حذف سجل المحادثة؟")) {
      setChatHistory([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-slate-900 dark:text-white">
          تحدث مع نور
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          اسأل أي سؤال عن السيرة والإسلام
        </p>
      </div>

      {/* Chat Container */}
      <Card className="h-96 flex flex-col overflow-hidden">
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {chatHistory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <p className="text-5xl">✨</p>
              <div>
                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  السلام عليكم
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  أنا نور، كيف يمكنني مساعدتك؟
                </p>
              </div>
            </div>
          ) : (
            chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white"
                      : "bg-gradient-to-br from-primary-500 to-secondary-500 text-white"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString("ar-SA", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex justify-end">
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white px-4 py-3 rounded-2xl">
                <div className="flex gap-2">
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

        {/* Input area */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-4 space-y-3">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="اكتب رسالتك..."
              className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
              disabled={isLoading}
            />
            <Button
              variant="primary"
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="p-3"
            >
              <Send size={20} />
            </Button>
          </div>

          {chatHistory.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearChat}
              className="w-full"
            >
              <Trash2 size={16} className="ml-2" />
              مسح المحادثة
            </Button>
          )}
        </div>
      </Card>

      {/* Suggested questions */}
      {chatHistory.length === 0 && (
        <div>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">
            أسئلة مقترحة:
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "من هو النبي محمد صلى الله عليه وسلم؟",
              "ما أهم أحداث السيرة النبوية؟",
              "ما دروس غزوة بدر؟",
              "كيف كان أخلاق الرسول الكريم؟",
            ].map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInput(q);
                }}
                className="text-right p-3 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm text-slate-700 dark:text-slate-300"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
