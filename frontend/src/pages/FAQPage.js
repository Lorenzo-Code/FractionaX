import React, { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

// Base API URL
const BASE_API_URL = `${window.location.protocol}//${window.location.hostname}:8000/api/faq/`;

// Get authentication token
const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// HighlightedSuggestion Component
const HighlightedSuggestion = ({ suggestion, query }) => {
  const regex = new RegExp(`(${query})`, "gi");
  const parts = suggestion.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} className="text-blue-500 font-bold">{part}</span>
        ) : (
          part
        )
      )}
    </>
  );
};

// SearchBar Component
const SearchBar = ({ searchTerm, setSearchTerm, suggestions, handleSuggestionClick }) => (
  <div className="relative mb-8">
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search for a question..."
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {suggestions.length > 0 && (
      <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSuggestionClick(suggestion.question)}
          >
            <HighlightedSuggestion suggestion={suggestion.question} query={searchTerm} />
          </li>
        ))}
      </ul>
    )}
  </div>
);

// FAQList Component
const FAQList = ({ filteredFaqs, expandedQuestion, toggleQuestion }) => (
  <div className="space-y-6">
    {filteredFaqs.map((faq, index) => (
      <motion.div
        key={index}
        className="bg-white shadow-md rounded-lg p-6 transition hover:shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div onClick={() => toggleQuestion(index)} className="flex justify-between items-center cursor-pointer">
          <h2 className="text-xl font-bold text-gray-800">{faq.question}</h2>
          <motion.span animate={{ rotate: expandedQuestion === index ? 45 : 0 }} transition={{ duration: 0.3 }}>+</motion.span>
        </div>
        {expandedQuestion === index && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} transition={{ duration: 0.3 }} className="mt-2 text-gray-600">
            <p>{faq.answer}</p>
          </motion.div>
        )}
      </motion.div>
    ))}
  </div>
);

const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fuse = useMemo(() => new Fuse(faqs, { keys: ["question", "answer"], threshold: 0.4, location: 0, distance: 100 }), [faqs]);

  // Fetch FAQs from backend with authentication
  useEffect(() => {
    const fetchFAQs = async () => {
        setLoading(true);
        try {
            const response = await fetch(BASE_API_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch FAQs: ${response.statusText}`);
            }

            const data = await response.json();
            if (!Array.isArray(data)) {
                throw new Error("Unexpected API response format.");
            }

            setFaqs(data);
            setFilteredFaqs(data.slice(0, 4));
            setError("");
        } catch (err) {
            console.error(err);
            setError("Could not load FAQs. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    fetchFAQs();
}, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredFaqs(faqs.slice(0, 4));
      setSuggestions([]);
    } else {
      const results = fuse.search(searchTerm);
      setFilteredFaqs(results.map((result) => result.item));
      fetchSuggestions(searchTerm);
    }
  }, [searchTerm, faqs, fuse]);

  const fetchSuggestions = async (term) => {
    try {
      const response = await fetch(`${BASE_API_URL}suggestions/?query=${encodeURIComponent(term)}`, { headers: { ...getAuthHeaders(), "Content-Type": "application/json" } });
      if (!response.ok) throw new Error(`Failed to fetch suggestions: ${response.statusText}`);
      const data = await response.json();
      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const toggleQuestion = (index) => setExpandedQuestion(expandedQuestion === index ? null : index);

  const handleQuestionSubmit = async () => {
    if (!newQuestion.trim()) {
      alert("Please enter a question before submitting.");
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch(`${BASE_API_URL}submit/`, {
        method: "POST",
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({ question: newQuestion }),
      });

      if (response.ok) {
        alert("Your question has been submitted. Thank you!");
        setNewQuestion("");
      } else {
        alert("Failed to submit your question. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting question:", error);
      alert("Failed to submit your question. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen py-8">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Frequently Asked Questions</h1>
        <p className="text-center text-gray-600 mb-8">Find answers to common questions or submit your own.</p>
        {loading ? <p className="text-center text-gray-500">Loading FAQs...</p> : error ? <p className="text-center text-red-600">{error}</p> : (
          <>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} suggestions={suggestions} handleSuggestionClick={setSearchTerm} />
            <FAQList filteredFaqs={filteredFaqs} expandedQuestion={expandedQuestion} toggleQuestion={toggleQuestion} />
          </>
        )}
        <div className="mt-12">
          <textarea value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} placeholder="Type your question here..." className="w-full px-4 py-3 rounded-lg border border-gray-300" rows="4" />
          <button onClick={handleQuestionSubmit} disabled={submitting} className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg">{submitting ? "Submitting..." : "Submit Question"}</button>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
