import React, { useState, useEffect } from "react";
import Navbar from "./components/Navigation/Navbar";
import Sidebar from "./components/Navigation/Sidebar";
import FloatingAssistant from "./components/AI/FloatingAssistant";
import ChatWidget from "./components/AI/ChatWidget";
import Toast from "./components/UI/Toast";
import ProgressBar from "./components/UI/ProgressBar";
import QRCodeWidget from "./components/UI/QRCodeWidget";

// Pages
import HomePage from "./pages/HomePage";
import AboutPlatform from "./pages/AboutPlatform";
import Dashboard from "./pages/Dashboard";
import TopicsExplorer from "./pages/TopicsExplorer";
import TopicDetail from "./pages/TopicDetail";
import Timeline from "./pages/Timeline";
import Quiz from "./pages/Quiz";
import ChatSection from "./pages/ChatSection";
import Sources from "./pages/Sources";

/**
 * Main App Component
 * Handles routing, state management, and global UI elements
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatHistory, setChatHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("chatHistory")) || [];
    } catch {
      return [];
    }
  });
  const [userProgress, setUserProgress] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("userProgress")) || {
          completedTopics: [],
          quizScores: [],
          currentTopic: null,
        }
      );
    } catch {
      return {
        completedTopics: [],
        quizScores: [],
        currentTopic: null,
      };
    }
  });
  const [toast, setToast] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [quizTopic, setQuizTopic] = useState(null);

  // Apply theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Save progress
  useEffect(() => {
    localStorage.setItem("userProgress", JSON.stringify(userProgress));
  }, [userProgress]);

  // Save chat history
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  // Show toast notification
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Page components mapping
  const pages = {
    home: (
      <HomePage setCurrentPage={setCurrentPage} setShowChat={setShowChat} />
    ),
    about: <AboutPlatform />,
    dashboard: <Dashboard userProgress={userProgress} />,
    topics: (
      <TopicsExplorer
        setSelectedTopic={setSelectedTopic}
        setCurrentPage={setCurrentPage}
      />
    ),
    "topic-detail": selectedTopic ? (
      <TopicDetail
        topic={selectedTopic}
        setCurrentPage={setCurrentPage}
        setShowChat={setShowChat}
        onProgress={() => {
          setUserProgress((prev) => ({
            ...prev,
            completedTopics: [
              ...new Set([...prev.completedTopics, selectedTopic.id]),
            ],
          }));
          showToast("تم إكمال الموضوع بنجاح! 🎉");
        }}
      />
    ) : null,
    timeline: <Timeline />,
    quiz: (
      <Quiz
        topic={quizTopic}
        setCurrentPage={setCurrentPage}
        onComplete={(score) => {
          setUserProgress((prev) => ({
            ...prev,
            quizScores: [
              ...prev.quizScores,
              { topic: quizTopic?.id, score, date: new Date().toISOString() },
            ],
          }));
          showToast(`حصلت على ${score}% في الاختبار! 🌟`);
        }}
      />
    ),
    chat: (
      <ChatSection chatHistory={chatHistory} setChatHistory={setChatHistory} />
    ),
    sources: <Sources />,
  };

  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}>
      <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors duration-300">
        {/* Progress bar */}
        <ProgressBar />

        {/* Navbar */}
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isMobileMenuOpen={isMobileMenuOpen}
          theme={theme}
          setTheme={setTheme}
        />

        {/* Main content */}
        <main className="relative">
          {/* Sidebar for mobile menu */}
          {isMobileMenuOpen && (
            <Sidebar
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          )}

          {/* Page content */}
          <div className="pt-20 pb-20">
            {pages[currentPage] || (
              <HomePage
                setCurrentPage={setCurrentPage}
                setShowChat={setShowChat}
              />
            )}
          </div>
        </main>

        {/* Floating AI Assistant Button */}
        <FloatingAssistant
          onClick={() => setShowChat(!showChat)}
          isActive={showChat}
        />

        {/* Chat Widget */}
        {showChat && (
          <ChatWidget
            onClose={() => setShowChat(false)}
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            onMessage={() => showToast("تم إرسال رسالتك ✓")}
          />
        )}

        {/* QR Code Widget */}
        <QRCodeWidget />

        {/* Toast notifications */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
}
