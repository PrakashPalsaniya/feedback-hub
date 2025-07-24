"use client"
import { useEffect, useState } from "react"
import {
  Calendar,
  User,
  MessageSquare,
  AlertCircle,
  Trash2,
  BrainCircuit,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  FileText,
} from "lucide-react"
import Navbar from ".././Navbar/Navbar.js"
import toast from "react-hot-toast"

export default function AdminDashboard() {
  const [admin, setAdmin] = useState("")
  const [feedbacks, setFeedbacks] = useState([])
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [analysis, setAnalysis] = useState({})
  const [analyzingId, setAnalyzingId] = useState(null)
  const [expandedAnalysis, setExpandedAnalysis] = useState({})

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("http://localhost:3005/api/admin/dashboard", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || "Failed to load dashboard")
        setAdmin(data.admin)
        setFeedbacks(data.feedbacks)
        setFilteredFeedbacks(data.feedbacks)
      } catch (err) {
        setError("Please Register/Login To Proceed")
      } finally {
        setLoading(false)
      }
    }
    fetchDashboard()
  }, [])

  useEffect(() => {
    let filtered = feedbacks
    if (selectedCategory !== "all") {
      filtered = filtered.filter((fb) => fb.category === selectedCategory)
    }
    setFilteredFeedbacks(filtered)
  }, [feedbacks, selectedCategory])

  const categories = [...new Set(feedbacks.map((fb) => fb.category))]

  const handleDeleteFeedback = async (id) => {
    try {
      const res = await fetch(`http://localhost:3005/api/admin/feedback/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      if (res.ok) {
        setFeedbacks(feedbacks.filter((fb) => fb.pageId !== id))
        toast.success("Feedback deleted successfully")
      }
    } catch (err) {
      console.error("Error deleting feedback:", err)
      toast.error("Failed to delete feedback")
    }
  }

  const handleAnalyze = async (id, content) => {
    setAnalyzingId(id)
    try {
      const res = await fetch("http://localhost:3005/api/analyze-sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: content }),
      })
      const data = await res.json()
      setAnalysis((prev) => ({ ...prev, [id]: data }))
    } catch (err) {
      alert("Error analyzing feedback")
    } finally {
      setAnalyzingId(null)
    }
  }

  const toggleAnalysisExpansion = (id) => {
    setExpandedAnalysis((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const getCategoryColor = (category) => {
    const colors = {
      bug: "bg-rose-100 text-rose-800 ring-rose-200", 
      feature: "bg-sky-100 text-sky-800 ring-sky-200", 
      improvement: "bg-emerald-100 text-emerald-800 ring-emerald-200", 
      general: "bg-slate-100 text-slate-800 ring-slate-200", 
      complaint: "bg-amber-100 text-amber-800 ring-amber-200", 
    }
    return colors[category] || "bg-slate-100 text-slate-800 ring-slate-200"
  }

  const getToneStyle = (tone) => {
    const toneLower = tone?.toLowerCase() || ""

    if (toneLower.includes("angry") || toneLower.includes("frustrated") || toneLower.includes("annoyed")) {
      return {
        bg: "bg-gradient-to-r from-rose-100 to-rose-200",
        text: "text-rose-800",
        border: "border-rose-300",
        icon: "🔥",
      }
    }
    if (
      toneLower.includes("happy") ||
      toneLower.includes("satisfied") ||
      toneLower.includes("pleased") ||
      toneLower.includes("excited")
    ) {
      return {
        bg: "bg-gradient-to-r from-emerald-100 to-emerald-200",
        text: "text-emerald-800",
        border: "border-emerald-300",
        icon: "✨",
      }
    }
    if (toneLower.includes("concerned") || toneLower.includes("worried") || toneLower.includes("anxious")) {
      return {
        bg: "bg-gradient-to-r from-amber-100 to-amber-200",
        text: "text-amber-800",
        border: "border-amber-300",
        icon: "⚠️",
      }
    }
    if (toneLower.includes("professional") || toneLower.includes("formal") || toneLower.includes("neutral")) {
      return {
        bg: "bg-gradient-to-r from-sky-100 to-sky-200",
        text: "text-sky-800",
        border: "border-sky-300",
        icon: "💼",
      }
    }
    if (toneLower.includes("sad") || toneLower.includes("disappointed") || toneLower.includes("upset")) {
      return {
        bg: "bg-gradient-to-r from-slate-100 to-slate-200",
        text: "text-slate-800",
        border: "border-slate-300",
        icon: "😔",
      }
    }
    if (toneLower.includes("curious") || toneLower.includes("interested") || toneLower.includes("questioning")) {
      return {
        bg: "bg-gradient-to-r from-violet-100 to-violet-200",
        text: "text-violet-800",
        border: "border-violet-300",
        icon: "🤔",
      }
    }
    if (toneLower.includes("urgent") || toneLower.includes("critical") || toneLower.includes("important")) {
      return {
        bg: "bg-gradient-to-r from-orange-100 to-orange-200",
        text: "text-orange-800",
        border: "border-orange-300",
        icon: "🚨",
      }
    }

    
    return {
      bg: "bg-gradient-to-r from-gray-100 to-gray-200",
      text: "text-gray-700",
      border: "border-gray-300",
      icon: "💭",
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>{" "}
        
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }
if (error) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={admin} setUser={setAdmin} /> 

      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4"> 
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <AlertCircle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{error}</h2>
          <button
            onClick={() => window.location.reload()}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={admin} setUser={setAdmin} />
    
<div className="bg-gray-50 border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">Welcome, {admin.name}</h1>
      <div className="flex items-center mt-2 sm:mt-0 text-sm text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-300 shadow-sm">
        <User className="h-4 w-4 mr-2 text-gray-400" />
        <span>{admin.name}</span>
      </div>
    </div>
  </div>
</div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          {" "}
          
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-gray-800 shadow-sm appearance-none bg-white pr-8 transition-all duration-200 hover:border-gray-400 cursor-pointer" // Changed focus ring to teal
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {" "}
          
          <div className="px-6 py-4 border-b border-gray-200">
            {" "}
          
            <h2 className="text-lg font-semibold text-gray-900">Feedback ({filteredFeedbacks.length})</h2>
          </div>
          {filteredFeedbacks.length === 0 ? (
            <div className="p-12 text-center">
              <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No feedback found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredFeedbacks.map((fb) => (
                <div
                  key={fb._id}
                  className="p-6 transition-all duration-200 ease-in-out hover:bg-teal-50 hover:shadow-md" // Changed hover background to teal
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      {" "}
                    
                      <div className="flex items-center space-x-3 mb-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${getCategoryColor(
                            fb.category,
                          )}`}
                        >
                          {fb.category}
                        </span>
                        <span className="text-sm text-gray-500">Page ID: {fb.pageId}</span>
                      </div>
                      <p className="text-gray-800 mb-3 leading-relaxed">{fb.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(fb.createdAt).toLocaleDateString()}
                        </span>
                        <span>{new Date(fb.createdAt).toLocaleTimeString()}</span>
                      </div>
                      {analysis[fb._id] && (
                        <div className="mt-4 border rounded-lg shadow-md bg-gradient-to-r from-cyan-50 to-emerald-50 transition-all duration-300 ease-in-out">
                          {" "}
                          
                          <div className="p-4">
                          
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3 flex-wrap">
                                {" "}
                                
                               
                                {analysis[fb._id].tone &&
                                  (() => {
                                    const toneStyle = getToneStyle(analysis[fb._id].tone)
                                    return (
                                      <div
                                        className={`inline-flex items-center gap-2 px-3 py-1.5 ${toneStyle.bg} border ${toneStyle.border} rounded-full shadow-sm transition-all duration-200 hover:shadow-md`}
                                      >
                                        <span className="text-sm">{toneStyle.icon}</span>
                                        <span className={`text-sm font-semibold ${toneStyle.text}`}>
                                          {toneStyle.text.includes("rose") ? "😡 " : ""}{" "}
                                          {toneStyle.text.includes("emerald") ? "😊 " : ""}{" "}
                                          {toneStyle.text.includes("amber") ? "😟 " : ""}{" "}
                                          {toneStyle.text.includes("sky") ? "🧐 " : ""}{" "}
                                          {toneStyle.text.includes("slate") ? "😐 " : ""}{" "}
                                          {toneStyle.text.includes("violet") ? "💡 " : ""}{" "}
                                          {toneStyle.text.includes("orange") ? "⚠️ " : ""} {analysis[fb._id].tone}
                                        </span>
                                      </div>
                                    )
                                  })()}
                              </div>

                              <button
                                onClick={() => toggleAnalysisExpansion(fb._id)}
                                className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors px-2 py-1 rounded-md hover:bg-gray-100"
                              >
                                {expandedAnalysis[fb._id] ? (
                                  <>
                                    Less <ChevronUp className="h-3 w-3" />
                                  </>
                                ) : (
                                  <>
                                    More <ChevronDown className="h-3 w-3" />
                                  </>
                                )}
                              </button>
                            </div>
                            {/* Expanded content */}
                            {expandedAnalysis[fb._id] && (
                              <div className="space-y-4 border-t pt-4 transition-all duration-300 ease-in-out">
                                {analysis[fb._id].insights && (
                                  <div className="bg-white/60 rounded-lg p-3 border border-cyan-100 shadow-sm">
                                    {" "}
                                    {/* Changed border to cyan */}
                                    <div className="flex items-center gap-2 mb-2">
                                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                                      <span className="text-sm font-semibold text-gray-700">Key Insights</span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">{analysis[fb._id].insights}</p>
                                  </div>
                                )}
                                {analysis[fb._id].summary && (
                                  <div className="bg-white/60 rounded-lg p-3 border border-emerald-100 shadow-sm">
                                    {" "}
                                  
                                    <div className="flex items-center gap-2 mb-2">
                                      <FileText className="h-4 w-4 text-blue-500" />
                                      <span className="text-sm font-semibold text-gray-700">Summary</span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">{analysis[fb._id].summary}</p>
                                  </div>
                                )}
                                {analysis[fb._id].score !== undefined && (
                                  <div className="bg-white/60 rounded-lg p-3 border border-gray-100 shadow-sm">
                                    {" "}
                                    
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm font-semibold text-gray-700">Sentiment Score</span>
                                      <span className="text-sm font-mono font-bold text-teal-600">
                                        {" "}
                                        
                                        {typeof analysis[fb._id].score === "number"
                                          ? analysis[fb._id].score.toFixed(2)
                                          : analysis[fb._id].score}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                      <button
                        onClick={() => handleAnalyze(fb._id, fb.content)}
                        disabled={analyzingId === fb._id}
                        className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-white bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-700 hover:to-cyan-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg" // Changed gradient to teal/cyan
                      >
                        {analyzingId === fb._id ? (
                          <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4zm2 5.3A7.96 7.96 0 014 12H0c0 3 1.1 5.8 3 7.9l3-2.6z"
                            />
                          </svg>
                        ) : (
                          <>
                            <BrainCircuit className="h-4 w-4" />
                            Analyze
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteFeedback(fb.pageId)}
                        className="p-2 text-rose-600 hover:bg-rose-50 hover:text-rose-800 rounded-lg transition-colors" 
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
