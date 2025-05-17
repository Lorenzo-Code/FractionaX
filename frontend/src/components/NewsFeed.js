import React, { useState, useEffect } from "react";

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mockArticles = [
    {
      title: "Global Markets Surge as Tech Stocks Lead the Rally",
      description:
        "Major indices worldwide saw significant gains today, with tech companies driving the rally amidst strong quarterly earnings.",
      url: "https://example.com/global-markets-surge",
      urlToImage: "https://via.placeholder.com/150",
    },
    {
      title: "Blockchain Technology Disrupts Traditional Finance",
      description:
        "Experts predict blockchain will revolutionize the financial industry, offering greater transparency and efficiency.",
      url: "https://example.com/blockchain-finance",
      urlToImage: "https://via.placeholder.com/150",
    },
    {
      title: "Renewable Energy Investments Hit Record High",
      description:
        "Investors poured billions into renewable energy projects last year, marking a milestone in the global shift toward sustainability.",
      url: "https://example.com/renewable-energy-record",
      urlToImage: "https://via.placeholder.com/150",
    },
    {
      title: "Cryptocurrency Market Sees Resurgence",
      description:
        "Bitcoin and Ethereum lead the charge as the cryptocurrency market experiences a renewed bull run.",
      url: "https://example.com/crypto-resurgence",
      urlToImage: "https://via.placeholder.com/150",
    },
    {
      title: "AI Startups Secure Record Funding in 2025",
      description:
        "Venture capitalists are heavily investing in artificial intelligence startups, underscoring the sector's growth potential.",
      url: "https://example.com/ai-startup-funding",
      urlToImage: "https://via.placeholder.com/150",
    },
  ];


  useEffect(() => {
    // Fetch news data from an API
    const fetchNews = async () => {
      try {
        // const response = await fetch(
        //   `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=YOUR_NEWS_API_KEY`
        // );

        // if (!response.ok) {
        //   throw new Error(`Failed to fetch news articles: ${response.statusText}`);
        // }

        // const data = await response.json();
        // setArticles(data.articles);
        setArticles(mockArticles);
      } catch (err) {
        setError("Failed to fetch news articles.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p className="text-white">Loading news...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!articles || articles.length === 0) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-blue-400 mb-4 ">News Feed</h2>
        <p className="text-gray-400">No news articles available.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl text-center font-bold text-blue-400 mb-4">News Feed</h2>
      <div
        className="overflow-y-auto"
        style={{
          maxHeight: "calc(60vh - 300px)", // Dynamically adjusts to screen height
        }}
      >
        <ul className="space-y-4">
          {articles.map((article, index) => (
            <li
              key={index}
              className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
            >
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4"
              >
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div>
                  <h3 className="text-lg font-bold">{article.title}</h3>
                  <p className="text-sm text-gray-400">
                    {article.description || "No description available."}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default NewsFeed;
