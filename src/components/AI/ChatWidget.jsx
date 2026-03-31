import React, { useState, useRef, useEffect } from "react";
import { Send, X } from "lucide-react";
import { getAIResponse } from "../../services/AIService";

/**
 * Chat Widget Component
 * Floating chat interface for AI assistant
 */
export default function ChatWidget({
  onClose,
  chatHistory,
  setChatHistory,
  onMessage,
}) {
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
    onMessage();

    try {
      const response = await getAIResponse(input, chatHistory);
      const aiMessage = { sender: "ai", text: response, timestamp: new Date() };
      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage = {
        sender: "ai",
        text: "معذرة، حدث خطأ في الاتصال.",
        timestamp: new Date(),
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 h-96 space-y-4">
        {chatHistory.length === 0 ? (
          <div className="text-center text-slate-500 dark:text-slate-400 py-8">
            <p className="text-2xl mb-2">👋</p>
            <p>السلام عليكم! أنا نور</p>
            <p className="text-sm mt-2">كيف يمكنني مساعدتك؟</p>
          </div>
        ) : (
          chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white"
                    : "bg-primary-500 text-white"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
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
  );
}
