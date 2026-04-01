import React, { useState } from "react";
import { Search } from "lucide-react";
import { TOPICS } from "../constants/data";
import TopicCard from "../components/Common/TopicCard";

/**
 * Topics Explorer Page
 * Shows all available topics with search and filter
 */
export default function TopicsExplorer({ setSelectedTopic, setCurrentPage }) {
  const [search, setSearch] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("all");

  const filteredTopics = TOPICS.filter((topic) => {
    const matchesSearch =
      topic.title.includes(search) || topic.description.includes(search);
    const matchesDifficulty =
      filterDifficulty === "all" || topic.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setCurrentPage("topic-detail");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-slate-900 dark:text-white">
          المواضيع
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          اختر الموضوع الذي تود تعلمه
        </p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute right-4 top-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن موضوع..."
            className="w-full pl-4 pr-12 py-3 border-2 border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:border-primary-500 focus:outline-none"
          />
        </div>

        {/* Difficulty Filter */}
        <div className="flex gap-2 flex-wrap">
          {["all", "سهل", "متوسط", "صعب"].map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => setFilterDifficulty(difficulty)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filterDifficulty === difficulty
                  ? "bg-primary-500 text-white"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600"
              }`}
            >
              {difficulty === "all" ? "الكل" : difficulty}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      <div
        className="grid md:grid-cols-2 gap-6 animate-slideUp"
        style={{ animationDelay: "0.2s" }}
      >
        {filteredTopics.length > 0 ? (
          filteredTopics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              onClick={() => handleTopicSelect(topic)}
              onStartQuiz={() => {
                setSelectedTopic(topic);
                setCurrentPage("quiz");
              }}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-2xl text-slate-500">لم نجد مواضيع تطابق البحث</p>
          </div>
        )}
      </div>
    </div>
  );
}
