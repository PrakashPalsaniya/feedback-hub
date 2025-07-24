"use client";

import Navbar from "../Navbar/Navbar.js";
import { Lightbulb, Code, MessageSquare } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#eef4ff] to-[#f7f9ff]">
    
      <Navbar />

      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-12 bg-white mt-10 rounded-3xl shadow-xl border border-gray-200">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-8 text-center leading-tight">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              FeedbackHub
            </span>
          </h1>

          <p className="text-lg text-gray-700 mb-6 text-center leading-relaxed">
            <strong>FeedbackHub</strong> is an AI-powered platform that helps
            developers, product owners, and educators understand feedback in
            real-time. Users can share their honest thoughts anonymously, and
            Gemini Flash 1.5 summarizes them into actionable insights.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 flex items-center gap-3">
            <Lightbulb className="h-6 w-6 text-yellow-500" /> Key Features
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-gray-700">
            <li>Clean and responsive interface for quick feedback</li>
            <li>Anonymous submission — no login required</li>
            <li>Gemini Flash 1.5 provides concise AI summaries</li>
            <li>Admin dashboard for managing all feedback entries</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4 flex items-center gap-3">
            <Code className="h-6 w-6 text-sky-600" /> Tech Stack
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-gray-700">
            <li>Next.js 14 (App Router)</li>
            <li>Tailwind CSS</li>
            <li>Node.js + Express (Backend)</li>
            <li>Gemini Flash 1.5 API</li>
            <li>MongoDB (Database)</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4 flex items-center gap-3">
            <MessageSquare className="h-6 w-6 text-emerald-600" /> Why We Built
            This
          </h2>
          <p className="text-base text-gray-700 leading-relaxed">
            We wanted to make feedback collection smarter and more human.{" "}
            <strong>FeedbackHub</strong> lets users speak their minds safely
            while helping admins extract real meaning using the power of AI —
            saving time and improving outcomes.
          </p>
        </div>
      </main>

      
      <footer className="text-center text-sm text-gray-400 mt-10 pb-6">
        © {new Date().getFullYear()} FeedbackHub. Built with ❤️ by Prakash
        Palsaniya.
      </footer>
    </div>
  );
}
