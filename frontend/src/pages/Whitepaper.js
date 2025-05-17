import React, { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"

const WhitePaper = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling effect
    });
  };

  const contentRef = useRef(); // Reference to the whitepaper content

  const handleDownloadPDF = async () => {
    const element = contentRef.current;

    if (element) {
      try {
        // Use html2canvas to capture the content as an image
        const canvas = await html2canvas(element, { scale: 2 }); // Higher scale for better quality
        const imgData = canvas.toDataURL("image/png");

        // Create a jsPDF instance
        const pdf = new jsPDF("p", "mm", "a4");

        // Add the image to the PDF (auto-scaling to fit A4)
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        // Save the PDF
        pdf.save("FractionaX_Whitepaper.pdf");
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    }
  };

  const [isVisible, setIsVisible] = useState(false); // Initialize isVisible with useState

  useEffect(() => {
    const handleScroll = () => {
      const ctaSection = document.getElementById("cta-section");
      if (ctaSection) {
        const rect = ctaSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    { id: "section-1", title: "1. Executive Summary" },
    { id: "section-2", title: "2. Company Overview" },
    { id: "section-3", title: "3. Market Opportunity" },
    { id: "section-4", title: "4. Business Model" },
    { id: "section-5", title: "5. Competitive Advantage" },
    { id: "section-6", title: "6. Risk Management and Mitigation" },
    { id: "section-7", title: "7. Revenue Model and Financial Sustainability" },
    { id: "section-8", title: "8. Governance and Management Structure" },
    { id: "section-9", title: "9. Technology and Security" },
    { id: "section-10", title: "10. Marketing and User Acquisition Strategy" },
    { id: "section-11", title: "11. Expansion Strategy" },
    { id: "section-12", title: "12. Risk Mitigation in Expansion" },
    { id: "section-13", title: "13. Financial Sustainability and Growth" },
    { id: "section-14", title: "14. Long-Term Vision and Strategic Goals" },
    { id: "section-15", title: "15. Conclusion and Call to Action" },
  ];

  return (
    <div className="bg-gray-900 text-white">
      <Navbar />
      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Contents */}
          <nav className="bg-gray-900 text-white p-4 rounded-md shadow-lg lg:col-span-1">
            <h2 className="text-lg text-white font-bold mb-4">Contents</h2>
            <ul className="space-y-2 text-sm">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.getElementById(section.id);
                      if (target) {
                        target.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Abstract Section */}
          <div id="top" className="lg:col-span-3">
            {/* Adjusted margin for the gap */}
            <h1 className="text-4xl font-bold text-blue-400 text-center mt-6 mb-4">
              FractionaX Whitepages
            </h1>
            {/* Reduced margin below the title */}
            <p className="text-gray-300 mb-6 leading-loose text-center">
              FractionaX is a blockchain-powered platform designed to democratize access to high-value investments through fractional ownership. By leveraging our dual-token ecosystem and compliance-first approach, we create a secure, transparent, and inclusive investment ecosystem.
            </p>

            {/* Call to Action Section */}
            <section
              id="cta-section"
              className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12 md:py-16 px-4 transition-opacity duration-600 ${isVisible ? "opacity-100" : "opacity-0"
                }`}
            >
              <div className="container mx-auto text-center">
                {/* Title */}
                <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
                  Ready to Transform Your Investments?
                </h2>

                {/* Description */}
                <p className="text-lg sm:text-xl text-white mb-8">
                  Join the FractionaX platform to access tokenized investments,
                  fractional ownership, and innovative tools for wealth creation. Take
                  the first step towards financial empowerment today.
                </p>

                {/* Call to Action Buttons */}
                <div className="flex flex-wrap justify-center space-x-4">
                  <button
                    onClick={handleDownloadPDF}
                    className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
                  >
                    Download Whitepages
                  </button>
                </div>
              </div>
            </section>






          </div>
        </div>
      </section>

      {/* Executive Summary Section */}
      <div ref={contentRef}>
        <section id="section-1" className="py-8 px-6 md:px-12 lg:px-20 bg-gray-900 text-white">
          <div className="container mx-auto max-w-7xl">
            {/* Title */}
            <h2 className="text-4xl font-bold text-blue-400 mb-6 text-center">
              1. Executive Summary
            </h2>

            {/* Overview */}
            <p className="text-gray-300 leading-loose mb-8 text-center">
              FractionaX is a revolutionary blockchain-powered investment platform designed to democratize access to high-value assets. This summary highlights the platform’s mission, innovative features, and strategic advantages in transforming global investing.
            </p>

            {/* 1.1 Introducing FractionaX */}
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-blue-400 mb-4">1.1 Introducing FractionaX</h3>
              <p className="text-gray-300 leading-loose">
                FractionaX bridges the gap between traditional investing and blockchain technology, empowering users to own fractions of premium assets such as real estate, renewable energy projects, and luxury goods. Built on the energy-efficient Hedera Hashgraph network, FractionaX ensures scalable, transparent, and compliant operations.
              </p>
            </div>

            {/* 1.2 Mission Statement */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">1.2 Mission Statement</h3>
              <p className="text-gray-300 leading-loose mb-4">
                <strong>Our Mission:</strong> To make wealth creation accessible, inclusive, and transparent by tokenizing high-value investments, enabling fractional ownership for individuals across the globe.
              </p>
              <p className="text-gray-300 leading-loose">
                <strong>Our Vision:</strong> To lead the global transformation of investing, where technology and transparency empower individuals to achieve financial independence.
              </p>
            </div>

            {/* 1.3 The Problem We’re Solving */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">1.3 The Problem We’re Solving</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>High Entry Barriers: Significant upfront capital excludes most individuals.</li>
                <li>Illiquidity: Long holding periods and limited secondary market options.</li>
                <li>Lack of Transparency: Limited visibility into asset performance and decisions.</li>
                <li>Geographic Restrictions: Regulatory complexities hinder cross-border investments.</li>
              </ul>
            </div>

            {/* 1.4 The FractionaX Solution */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">1.4 The FractionaX Solution</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>
                  <strong>Fractional Ownership:</strong> Invest in premium assets with as little as $10.
                </li>
                <li>
                  <strong>Dual-Token Ecosystem:</strong>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      <strong>FCT:</strong> A utility token for accessing platform services, staking, and governance.
                    </li>
                    <li>
                      <strong>FST:</strong> A security token representing fractional ownership of tokenized assets.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Liquidity and Transparency:</strong> Blockchain-backed trading and immutable records ensure trust.
                </li>
                <li>
                  <strong>Compliance and Security:</strong> Adheres to Reg CF and Reg A+ with robust KYC/AML protocols.
                </li>
              </ul>
            </div>

            {/* 1.5 Key Features and Benefits */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">1.5 Key Features and Benefits</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Access to diverse tokenized assets, including real estate, renewable energy, and luxury goods.</li>
                <li>AI-powered personalized investment recommendations.</li>
                <li>Built on Hedera Hashgraph for fast, secure, and eco-friendly operations.</li>
                <li>Passive income through rental yields, dividends, and asset appreciation.</li>
              </ul>
            </div>

            {/* 1.6 Market Opportunity */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">1.6 Market Opportunity</h3>
              <p className="text-gray-300 leading-loose mb-6">
                FractionaX is uniquely positioned to capitalize on the growing demand for tokenized investments and accessible financial solutions. The platform addresses key barriers in traditional investing—such as high entry costs, limited liquidity, and lack of transparency—through blockchain technology and fractional ownership.
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Tokenization market expected to grow to $16 billion by 2030.</li>
                <li>ESG-aligned projects prioritized for sustainable growth.</li>
                <li>Rising demand for inclusive financial platforms by Millennials and Gen Z.</li>
              </ul>
            </div>

            {/* 1.7 Key Milestones */}
            <div>
              <h3 className="text-3xl font-bold text-blue-400 mb-6">1.7 Key Milestones</h3>
              <table className="w-full text-left border-collapse border border-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-blue-400">Milestone</th>
                    <th className="px-4 py-2 text-blue-400">Target Date</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-700">
                  <tr>
                    <td className="px-4 py-2">Finalize Whitepaper & Legal Setup</td>
                    <td className="px-4 py-2">March 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">FCT and FST Token Development</td>
                    <td className="px-4 py-2">December 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Beta Marketplace Launch</td>
                    <td className="px-4 py-2">March 2026</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Public Launch of Marketplace</td>
                    <td className="px-4 py-2">April 2027</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Global Market Expansion</td>
                    <td className="px-4 py-2">April 2028 – March 2030</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              onClick={scrollToTop}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Back to Top
            </button>
          </div>
        </section>

        <section id="section-2" className="py-16 px-6 md:px-12 lg:px-20 bg-gray-900 text-white">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-4xl font-bold text-blue-400 mb-8 text-center">
              2. Company Overview
            </h2>
            <p className="text-gray-300 leading-loose mb-10 text-center">
              FractionaX is a pioneering blockchain-powered investment platform established in Houston, Texas, USA. Committed to transforming the investment landscape, FractionaX bridges the gap between traditional investing and blockchain innovation, empowering individuals worldwide to participate in fractional ownership with confidence and transparency.
            </p>

            {/* Founding Principles */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">2.1 Founding Principles</h3>
              <p className="text-gray-300 leading-loose">
                FractionaX was founded on three core principles:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
                <li>
                  <strong>Accessibility:</strong> Empowering individuals to participate in high-value investments with minimal capital requirements.
                </li>
                <li>
                  <strong>Transparency:</strong> Utilizing blockchain technology to provide unparalleled visibility and trust in every transaction.
                </li>
                <li>
                  <strong>Inclusivity:</strong> Removing barriers that have historically excluded small-scale investors from premium opportunities.
                </li>
              </ul>
              <p className="text-gray-300 mt-4">
                <strong>Vision:</strong> A world where financial independence is accessible to all, and investment opportunities are no longer reserved for the wealthy.
              </p>
            </div>

            {/* Dual-Token Ecosystem */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">2.2 Dual-Token Ecosystem</h3>
              <div>
                <h4 className="text-2xl font-semibold text-white mb-3">
                  Fractional Collateral Token (FCT)
                </h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>Utility:</strong> Enables access to platform services, staking, and governance participation.</li>
                  <li><strong>Capped Supply:</strong> 1 billion tokens, locked at launch to maintain scarcity and value.</li>
                  <li><strong>Collateralization:</strong> Backed 1:1 by reserves initially, with a target ratio of 1:1.5 within three years.</li>
                  <li><strong>Staking Benefits:</strong> FCT holders earn rewards, incentivizing long-term token holding and platform engagement.</li>
                </ul>
                <h4 className="text-2xl font-semibold text-white mb-3 mt-6">
                  Fractional Security Token (FST)
                </h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>Ownership:</strong> Represents fractional ownership in tokenized assets.</li>
                  <li><strong>Dynamic Supply:</strong> Minted when assets are tokenized and burned upon liquidation.</li>
                  <li><strong>Income Streams:</strong> Dividends, rental income, or profit from asset appreciation.</li>
                  <li><strong>Lifecycle:</strong> Automated smart contracts handle payouts and asset governance.</li>
                </ul>
              </div>
            </div>

            {/* Business Model */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">2.3 Business Model</h3>
              <p className="text-gray-300 leading-loose mb-4">
                FractionaX employs a diversified revenue model to ensure financial sustainability and scalability:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li><strong>Transaction Fees:</strong> Scaled between 0.1% and 0.5% on FCT and FST transactions.</li>
                <li><strong>Marketplace Commissions:</strong> 1%–3% of fully funded investment vehicles.</li>
                <li><strong>Subscription Services:</strong> Premium analytics tools at $10/month.</li>
                <li><strong>Asset Management Fees:</strong> 1%–2% annually on tokenized assets under management (AUM).</li>
                <li><strong>Performance-Based Commissions:</strong> Up to 5% of asset sale proceeds retained as platform fees.</li>
              </ul>
            </div>

            {/* Core Features */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">2.4 Core Features</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li><strong>Accessibility:</strong> Invest with as little as $10.</li>
                <li><strong>Blockchain Transparency:</strong> Transactions are immutably recorded on Hedera Hashgraph.</li>
                <li><strong>Liquidity:</strong> Trade FST tokens on secondary markets.</li>
                <li><strong>Real-Time Tracking:</strong> Dashboards provide real-time insights into asset performance.</li>
                <li><strong>Decentralized Governance:</strong> FCT holders participate in platform-wide governance decisions.</li>
              </ul>
            </div>

            {/* Leadership and Governance */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">2.5 Leadership and Governance</h3>
              <p className="text-gray-300 leading-loose mb-4">
                FractionaX is managed by a team of industry experts committed to transparency, innovation, and growth.
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li><strong>Board of Directors:</strong> Founders and key investors provide strategic direction.</li>
                <li><strong>Voting Rights:</strong> FCT holders vote on platform-wide decisions, while FST holders influence asset-specific governance.</li>
              </ul>
            </div>

            {/* Market Opportunity */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">2.6 Market Opportunity</h3>
              <p className="text-gray-300 leading-loose mb-4">
                FractionaX targets individual investors, high-net-worth individuals, and institutions, particularly in emerging markets. The global real estate tokenization market is projected to grow significantly, driven by increasing blockchain adoption.
              </p>
            </div>

            {/* Vision for the Future */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">2.7 Vision for the Future</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Onboard 1 million active users globally by 2030.</li>
                <li>Manage over $5 billion in tokenized assets.</li>
                <li>Transition to a Decentralized Autonomous Organization (DAO).</li>
                <li>Achieve carbon neutrality in operations.</li>
              </ul>
            </div>

            {/* Why Choose FractionaX */}
            <div>
              <h3 className="text-3xl font-bold text-blue-400 mb-6">2.8 Why Choose FractionaX?</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li><strong>For Individual Investors:</strong> Low entry barriers, liquidity, and blockchain-backed transparency.</li>
                <li><strong>For Institutional Investors:</strong> Diversification, automated processes, and scalable opportunities.</li>
              </ul>
            </div>
            <button
              onClick={scrollToTop}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Back to Top
            </button>
          </div>
        </section>
        <section id="section-3" className="py-16 px-6 md:px-12 lg:px-20 bg-gray-900 text-white">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-4xl font-bold text-blue-400 mb-8 text-center">
              3. Market Opportunity
            </h2>
            <p className="text-gray-300 leading-loose mb-10 text-center">
              FractionaX operates at the crossroads of three transformative trends: the democratization of finance, the adoption of blockchain technology, and the rising demand for alternative investments. By leveraging these shifts, FractionaX is positioned to disrupt traditional investment markets and empower a new generation of investors.
            </p>

            {/* Challenges in the Current Investment Landscape */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">3.1 Challenges in the Current Investment Landscape</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>
                  <strong>Exclusive Access:</strong> Institutional investors dominate high-value asset classes, sidelining retail investors.
                </li>
                <li>
                  <strong>High Capital Requirements:</strong> Premium assets often require investments exceeding $100,000.
                </li>
                <li>
                  <strong>Complex Processes:</strong> Intermediaries increase costs and reduce efficiency.
                </li>
                <li>
                  <strong>Transparency Issues:</strong> Limited visibility into asset performance erodes investor confidence.
                </li>
                <li>
                  <strong>Limited Liquidity:</strong> Illiquid assets lock up capital and restrict exits.
                </li>
              </ul>
            </div>

            {/* The Global Shift Toward Fractional Ownership */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">3.2 The Global Shift Toward Fractional Ownership</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li><strong>Lower Entry Barriers:</strong> Tokenization reduces the minimum investment to $10.</li>
                <li><strong>Broader Participation:</strong> Retail investors gain access to previously inaccessible opportunities.</li>
                <li><strong>Streamlined Processes:</strong> Blockchain eliminates intermediaries, reducing costs.</li>
                <li><strong>Improved Liquidity:</strong> Secondary markets enable real-time trading of tokenized assets.</li>
              </ul>
            </div>

            {/* FractionaX’s Addressable Market */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">3.3 FractionaX’s Addressable Market</h3>
              <div className="mb-6">
                <h4 className="text-2xl font-semibold text-white mb-3">Market Segmentation</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>
                    <strong>Retail Investors:</strong> Millennials and Gen Z, who prioritize transparency and low-cost entry.
                  </li>
                  <li>
                    <strong>Institutional Investors:</strong> Family offices and hedge funds seeking blockchain-backed opportunities.
                  </li>
                  <li>
                    <strong>Emerging Economies:</strong> High mobile penetration regions with limited traditional financial services.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-2xl font-semibold text-white mb-3">Market Size</h4>
                <p className="text-gray-300">
                  The global market for tokenized assets is projected to reach $24 trillion by 2027, driven by real estate, renewable energy, and commodities.
                </p>
              </div>
            </div>

            {/* Geographic Market Focus */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">3.4 Geographic Market Focus</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li><strong>North America:</strong> High blockchain adoption and supportive regulations (e.g., Reg CF, Reg A+).</li>
                <li><strong>Europe:</strong> Demand for ESG investments and tokenization-friendly frameworks like MiCA.</li>
                <li><strong>Asia-Pacific:</strong> Rapid urbanization and blockchain adoption in emerging economies.</li>
                <li><strong>Latin America and Africa:</strong> Limited traditional finance access paired with high demand for affordable housing and renewable energy.</li>
              </ul>
            </div>
            {/* Competitive Landscape */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">
                3.5 Competitive Landscape
              </h3>
              <p className="text-gray-300 mb-4">
                FractionaX stands out in a competitive market due to its innovative features and user-first approach:
              </p>

              {/* Table for Large Screens */}
              <div className="hidden lg:block">
                <table className="w-full text-gray-300 border border-gray-700">
                  <thead className="bg-gray-800 text-blue-400">
                    <tr>
                      <th className="p-3 text-left">Feature</th>
                      <th className="p-3 text-left">FractionaX</th>
                      <th className="p-3 text-left">Competitor A</th>
                      <th className="p-3 text-left">Competitor B</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3">Dual-Token Ecosystem</td>
                      <td className="p-3">Yes</td>
                      <td className="p-3">No</td>
                      <td className="p-3">No</td>
                    </tr>
                    <tr>
                      <td className="p-3">Minimum Investment</td>
                      <td className="p-3">$10</td>
                      <td className="p-3">$100</td>
                      <td className="p-3">$1,000</td>
                    </tr>
                    <tr>
                      <td className="p-3">Secondary Market Access</td>
                      <td className="p-3">Yes</td>
                      <td className="p-3">Partial</td>
                      <td className="p-3">Limited</td>
                    </tr>
                    <tr>
                      <td className="p-3">Transparency</td>
                      <td className="p-3">Fully Transparent</td>
                      <td className="p-3">Partial Transparency</td>
                      <td className="p-3">Low Transparency</td>
                    </tr>
                    <tr>
                      <td className="p-3">Asset Diversity</td>
                      <td className="p-3">High</td>
                      <td className="p-3">Medium</td>
                      <td className="p-3">Low</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Stacked View for Mobile */}
              <div className="lg:hidden">
                {[
                  {
                    feature: "Dual-Token Ecosystem",
                    FractionaX: "Yes",
                    CompetitorA: "No",
                    CompetitorB: "No",
                  },
                  {
                    feature: "Minimum Investment",
                    FractionaX: "$10",
                    CompetitorA: "$100",
                    CompetitorB: "$1,000",
                  },
                  {
                    feature: "Secondary Market Access",
                    FractionaX: "Yes",
                    CompetitorA: "Partial",
                    CompetitorB: "Limited",
                  },
                  {
                    feature: "Transparency",
                    FractionaX: "Fully Transparent",
                    CompetitorA: "Partial Transparency",
                    CompetitorB: "Low Transparency",
                  },
                  {
                    feature: "Asset Diversity",
                    FractionaX: "High",
                    CompetitorA: "Medium",
                    CompetitorB: "Low",
                  },
                ].map((row, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 border border-gray-700 rounded-lg bg-gray-800"
                  >
                    <h4 className="text-blue-400 font-bold mb-2">{row.feature}</h4>
                    <p>
                      <strong>FractionaX:</strong> {row.FractionaX}
                    </p>
                    <p>
                      <strong>Competitor A:</strong> {row.CompetitorA}
                    </p>
                    <p>
                      <strong>Competitor B:</strong> {row.CompetitorB}
                    </p>
                  </div>
                ))}
              </div>
            </div>



            {/* Long-Term Growth Potential */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">3.7 Long-Term Growth Potential</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li><strong>1 Million Active Users:</strong> A diverse, engaged investor base by 2030.</li>
                <li><strong>$5 Billion AUM:</strong> Scaling tokenized assets across industries.</li>
                <li><strong>Global Expansion:</strong> Operating in 50+ countries by 2030.</li>
                <li><strong>Strategic Partnerships:</strong> Collaborations with asset managers, blockchain innovators, and compliance experts.</li>
              </ul>
            </div>
            <button
              onClick={scrollToTop}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Back to Top
            </button>
          </div>
        </section>
        <section id="section-4" className="py-16 px-6 md:px-12 lg:px-20 bg-gray-900 text-white">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-4xl font-bold text-blue-400 mb-8 text-center">
              4. Business Model
            </h2>
            <p className="text-gray-300 leading-loose mb-10 text-center">
              FractionaX is a next-generation investment platform designed to
              democratize access to high-value assets through tokenization. Its
              business model integrates blockchain technology, a dual-token
              ecosystem, and a multi-stream revenue approach, ensuring scalability,
              compliance, and long-term sustainability.
            </p>

            {/* Foundational Components */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">
                4.1 Foundational Components of the Business Model
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-4">
                <li>
                  <strong>Dual-Token Ecosystem:</strong>
                  <ul className="list-inside ml-6 space-y-2">
                    <li>
                      <strong>FCT (Fractional Collateral Token):</strong> A utility
                      token used for transactions, staking, and governance. Capped
                      at 1 billion tokens with a collateral ratio targeted to reach
                      1:1.5 by Year 3.
                    </li>
                    <li>
                      <strong>FST (Fractional Security Token):</strong> A security
                      token representing ownership in tokenized assets. Holders earn
                      dividends, rental income, and profit from asset appreciation.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Blockchain Technology:</strong> Powered by Hedera
                  Hashgraph for fast, secure, and eco-friendly transactions. Smart
                  contracts automate income distribution, asset governance, and
                  compliance.
                </li>
                <li>
                  <strong>Liquidity and Accessibility:</strong> Secondary market
                  trading enables liquidity, and global accessibility includes both
                  accredited and non-accredited investors.
                </li>
              </ul>
            </div>
            {/* Revenue Streams */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">
                4.2 Revenue Streams
              </h3>

              {/* Table for Large Screens */}
              <div className="hidden lg:block">
                <table className="w-full text-gray-300 border border-gray-700 mb-8">
                  <thead className="bg-gray-800 text-blue-400">
                    <tr>
                      <th className="p-3 text-left">Revenue Stream</th>
                      <th className="p-3 text-left">Details</th>
                      <th className="p-3 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3">Transaction Fees</td>
                      <td className="p-3">Scaled 0.1%–0.5% on FCT and FST trades.</td>
                      <td className="p-3">$100M in trades generates $500K at 0.5%.</td>
                    </tr>
                    <tr>
                      <td className="p-3">Marketplace Commissions</td>
                      <td className="p-3">
                        1%–3% on fully funded investment vehicles.
                      </td>
                      <td className="p-3">$10M real estate generates $200K at 2%.</td>
                    </tr>
                    <tr>
                      <td className="p-3">Subscription Services</td>
                      <td className="p-3">$10/month for premium analytics tools.</td>
                      <td className="p-3">50K subscribers yield $6M annually.</td>
                    </tr>
                    <tr>
                      <td className="p-3">Asset Management Fees</td>
                      <td className="p-3">1%–2% annually on AUM.</td>
                      <td className="p-3">$500M AUM generates $7.5M at 1.5%.</td>
                    </tr>
                    <tr>
                      <td className="p-3">Performance-Based Commissions</td>
                      <td className="p-3">
                        Retains up to 5% of asset liquidation proceeds.
                      </td>
                      <td className="p-3">$20M sale generates $1M at 5%.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Stacked Cards for Mobile */}
              <div className="lg:hidden">
                {[
                  {
                    stream: "Transaction Fees",
                    details: "Scaled 0.1%–0.5% on FCT and FST trades.",
                    example: "$100M in trades generates $500K at 0.5%.",
                  },
                  {
                    stream: "Marketplace Commissions",
                    details: "1%–3% on fully funded investment vehicles.",
                    example: "$10M real estate generates $200K at 2%.",
                  },
                  {
                    stream: "Subscription Services",
                    details: "$10/month for premium analytics tools.",
                    example: "50K subscribers yield $6M annually.",
                  },
                  {
                    stream: "Asset Management Fees",
                    details: "1%–2% annually on AUM.",
                    example: "$500M AUM generates $7.5M at 1.5%.",
                  },
                  {
                    stream: "Performance-Based Commissions",
                    details: "Retains up to 5% of asset liquidation proceeds.",
                    example: "$20M sale generates $1M at 5%.",
                  },
                ].map((row, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 border border-gray-700 rounded-lg bg-gray-800"
                  >
                    <h4 className="text-blue-400 font-bold mb-2">{row.stream}</h4>
                    <p className="text-gray-300 mb-2">
                      <strong>Details:</strong> {row.details}
                    </p>
                    <p className="text-gray-300">
                      <strong>Example:</strong> {row.example}
                    </p>
                  </div>
                ))}
              </div>
            </div>


            {/* Investor Journey */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">
                4.3 Investor Journey: Step-by-Step
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-4">
                <li>
                  <strong>Exploring Investment Opportunities:</strong> Browse assets
                  categorized by industry, ROI potential, and ESG metrics.
                </li>
                <li>
                  <strong>Making an Investment:</strong> Users purchase FST tokens
                  using FCT, fiat, or cryptocurrency. Smart contracts secure the
                  transaction.
                </li>
                <li>
                  <strong>Income Distribution:</strong> Earnings are distributed to
                  FST holders via automated smart contracts.
                </li>
                <li>
                  <strong>Tracking and Trading:</strong> Real-time portfolio
                  dashboards allow monitoring and trading of FST tokens.
                </li>
              </ul>
            </div>

            {/* Operational Structure */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">
                4.4 Operational Structure
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-4">
                <li>
                  <strong>Asset Onboarding:</strong> Partnering with developers and
                  managers to tokenize high-value assets based on ROI and ESG
                  compliance.
                </li>
                <li>
                  <strong>Compliance and Security:</strong> Operating under U.S. Reg
                  CF and Reg A+ exemptions, with global alignment to MiCA and FATF
                  guidelines.
                </li>
                <li>
                  <strong>Governance Model:</strong> FCT holders vote on
                  platform-wide decisions, while FST holders influence
                  asset-specific governance.
                </li>
              </ul>
            </div>

            {/* Key Metrics for Success */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">
                4.5 Key Metrics for Success
              </h3>

              {/* Table for Large Screens */}
              <div className="hidden lg:block">
                <table className="w-full text-gray-300 border border-gray-700">
                  <thead className="bg-gray-800 text-blue-400">
                    <tr>
                      <th className="p-3 text-left">Metric</th>
                      <th className="p-3 text-left">Year 1 Target</th>
                      <th className="p-3 text-left">Year 3 Target</th>
                      <th className="p-3 text-left">Year 5 Target</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3">Active Users</td>
                      <td className="p-3">5,000</td>
                      <td className="p-3">50,000</td>
                      <td className="p-3">200,000</td>
                    </tr>
                    <tr>
                      <td className="p-3">Assets Under Management (AUM)</td>
                      <td className="p-3">$10M</td>
                      <td className="p-3">$500M</td>
                      <td className="p-3">$2B</td>
                    </tr>
                    <tr>
                      <td className="p-3">Transaction Volume</td>
                      <td className="p-3">$50M</td>
                      <td className="p-3">$200M</td>
                      <td className="p-3">$1B</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Stacked Cards for Mobile */}
              <div className="lg:hidden">
                {[
                  {
                    metric: "Active Users",
                    year1: "5,000",
                    year3: "50,000",
                    year5: "200,000",
                  },
                  {
                    metric: "Assets Under Management (AUM)",
                    year1: "$10M",
                    year3: "$500M",
                    year5: "$2B",
                  },
                  {
                    metric: "Transaction Volume",
                    year1: "$50M",
                    year3: "$200M",
                    year5: "$1B",
                  },
                ].map((row, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 border border-gray-700 rounded-lg bg-gray-800"
                  >
                    <h4 className="text-blue-400 font-bold mb-2">{row.metric}</h4>
                    <p className="text-gray-300 mb-2">
                      <strong>Year 1 Target:</strong> {row.year1}
                    </p>
                    <p className="text-gray-300 mb-2">
                      <strong>Year 3 Target:</strong> {row.year3}
                    </p>
                    <p className="text-gray-300">
                      <strong>Year 5 Target:</strong> {row.year5}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={scrollToTop}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Back to Top
            </button>
          </div>
        </section>
        <section id="section-5" lassName="py-16 px-6 md:px-12 lg:px-20 bg-gray-900 text-white">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-4xl font-bold text-blue-400 mb-8 text-center">
              5. Competitive Advantage
            </h2>
            <p className="text-gray-300 leading-loose mb-10 text-center">
              FractionaX is redefining investing through innovative technology,
              user-centric features, and a commitment to transparency and
              sustainability. This section explores how FractionaX outpaces
              competitors by addressing key market challenges and delivering
              unmatched value to its users.
            </p>

            {/* Addressing Core Market Challenges */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">
                5.1 Addressing Core Market Challenges
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-4">
                <li>
                  <strong>Accessibility:</strong> FractionaX lowers barriers with
                  $10 minimum investments and a user-friendly platform.
                </li>
                <li>
                  <strong>Liquidity:</strong> Secondary markets enable early exits
                  for FST token holders.
                </li>
                <li>
                  <strong>Transparency:</strong> Blockchain-backed tracking ensures
                  visibility into asset performance and transaction histories.
                </li>
                <li>
                  <strong>Compliance:</strong> Built-in KYC/AML protocols and
                  adherence to frameworks like Reg CF ensure legal alignment.
                </li>
              </ul>
            </div>

            {/* Blockchain Superiority */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">
                5.2 Blockchain Superiority
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-4">
                <li>
                  <strong>Powered by Hedera Hashgraph:</strong> Fast, secure, and
                  energy-efficient with up to 10,000 transactions per second.
                </li>
                <li>
                  <strong>Real-Time Transactions:</strong> Automated smart contracts
                  handle income distributions, governance votes, and asset
                  liquidations.
                </li>
                <li>
                  <strong>Transparent Operations:</strong> Immutable transaction
                  records ensure trust and accountability.
                </li>
              </ul>
            </div>

            {/* Dual-Token Model */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">
                5.3 Dual-Token Model
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-4">
                <li>
                  <strong>FCT (Fractional Collateral Token):</strong> A utility
                  token for fees, staking, and governance, backed by reserves with a
                  1:1.5 collateral ratio target.
                </li>
                <li>
                  <strong>FST (Fractional Security Token):</strong> Represents
                  ownership of tokenized assets, providing income and capital
                  appreciation opportunities.
                </li>
              </ul>
            </div>

            {/* ESG Leadership */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">
                5.4 ESG Leadership
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-4">
                <li>
                  <strong>Commitment to Sustainability:</strong> Prioritizing
                  renewable energy, affordable housing, and green infrastructure.
                </li>
                <li>
                  <strong>Social Impact:</strong> Enabling investments that
                  contribute to environmental and social outcomes.
                </li>
                <li>
                  <strong>Transparency:</strong> ESG impact metrics such as carbon
                  savings and housing units developed are accessible to investors.
                </li>
              </ul>
            </div>

            {/* Superior User Experience */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">
                5.5 Superior User Experience
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-4">
                <li>
                  <strong>Tailored Onboarding:</strong> Guided tutorials and
                  personalized dashboards simplify investing.
                </li>
                <li>
                  <strong>AI-Powered Tools:</strong> Personalized investment
                  recommendations and market trend predictions.
                </li>
                <li>
                  <strong>Comprehensive Support:</strong> 24/7 assistance through
                  live chat, email, and phone.
                </li>
              </ul>
            </div>

            {/* Liquidity and Flexibility */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">
                5.6 Liquidity and Flexibility
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-4">
                <li>
                  <strong>Secondary Market Trading:</strong> Partnerships with
                  regulated ATS ensure robust token liquidity.
                </li>
                <li>
                  <strong>Early Exit Options:</strong> Investors can liquidate
                  positions before maturity.
                </li>
                <li>
                  <strong>Liquidity Reserve:</strong> Stabilizes trading and
                  supports investor activity.
                </li>
              </ul>
            </div>

            {/* Governance and Community Empowerment */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">
                5.7 Governance and Community Empowerment
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-4">
                <li>
                  <strong>Decentralized Governance:</strong> FCT holders vote on
                  platform decisions, while FST holders influence asset-specific
                  governance.
                </li>
                <li>
                  <strong>Transparent Decision-Making:</strong> Blockchain-based
                  voting ensures accountability.
                </li>
              </ul>
            </div>

            {/* Competitive Landscape */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">
                5.9 Competitive Landscape
              </h3>

              {/* Table for Large Screens */}
              <div className="hidden lg:block">
                <table className="w-full text-gray-300 border border-gray-700 mb-8">
                  <thead className="bg-gray-800 text-blue-400">
                    <tr>
                      <th className="p-3 text-left">Feature</th>
                      <th className="p-3 text-left">FractionaX</th>
                      <th className="p-3 text-left">Competitor A</th>
                      <th className="p-3 text-left">Competitor B</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3">Dual-Token Ecosystem</td>
                      <td className="p-3">Yes</td>
                      <td className="p-3">No</td>
                      <td className="p-3">No</td>
                    </tr>
                    <tr>
                      <td className="p-3">Minimum Investment</td>
                      <td className="p-3">$10</td>
                      <td className="p-3">$100</td>
                      <td className="p-3">$1,000</td>
                    </tr>
                    <tr>
                      <td className="p-3">ESG Commitment</td>
                      <td className="p-3">Strong Focus</td>
                      <td className="p-3">Moderate Focus</td>
                      <td className="p-3">No Focus</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Stacked Cards for Mobile */}
              <div className="lg:hidden">
                {[
                  {
                    feature: "Dual-Token Ecosystem",
                    FractionaX: "Yes",
                    CompetitorA: "No",
                    CompetitorB: "No",
                  },
                  {
                    feature: "Minimum Investment",
                    FractionaX: "$10",
                    CompetitorA: "$100",
                    CompetitorB: "$1,000",
                  },
                  {
                    feature: "ESG Commitment",
                    FractionaX: "Strong Focus",
                    CompetitorA: "Moderate Focus",
                    CompetitorB: "No Focus",
                  },
                ].map((row, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 border border-gray-700 rounded-lg bg-gray-800"
                  >
                    <h4 className="text-blue-400 font-bold mb-2">{row.feature}</h4>
                    <p className="text-gray-300 mb-2">
                      <strong>FractionaX:</strong> {row.FractionaX}
                    </p>
                    <p className="text-gray-300 mb-2">
                      <strong>Competitor A:</strong> {row.CompetitorA}
                    </p>
                    <p className="text-gray-300">
                      <strong>Competitor B:</strong> {row.CompetitorB}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={scrollToTop}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Back to Top
            </button>
          </div>
        </section>
        <section id="section-6" className="bg-gray-900 text-gray-200 py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">6. Risk Management and Mitigation</h2>
            <p className="mb-6 leading-loose">
              As a platform at the forefront of innovation, FractionaX recognizes that comprehensive risk management is critical to maintaining investor confidence and ensuring operational resilience. By addressing potential challenges proactively, FractionaX provides a secure, scalable, and compliant environment for tokenized investing.
            </p>

            {/* 6.1 Identifying Potential Risks */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">6.1 Identifying Potential Risks</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>
                  <strong>Legal and Regulatory Risks:</strong> The evolving regulatory landscape for blockchain and tokenized assets may lead to uncertainties or non-compliance risks, resulting in penalties or reputational damage.
                </li>
                <li>
                  <strong>Market Volatility:</strong> Price fluctuations in tokenized assets and cryptocurrencies can impact investor returns during downturns.
                </li>
                <li>
                  <strong>Operational Risks:</strong> Dependence on technology infrastructure increases vulnerability to cyberattacks, data breaches, and technical failures.
                </li>
                <li>
                  <strong>Liquidity Risks:</strong> Limited liquidity in tokenized markets may hinder users’ ability to trade FST tokens on secondary markets.
                </li>
                <li>
                  <strong>Adoption Risks:</strong> User trust, education, and market acceptance are critical for platform adoption and growth.
                </li>
                <li>
                  <strong>Asset Performance Risks:</strong> Tokenized assets, such as real estate or renewable energy projects, may underperform due to various factors, reducing returns for FST holders.
                </li>
              </ul>
            </div>

            {/* 6.2 Proactive Mitigation Strategies */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">6.2 Proactive Mitigation Strategies</h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h4 className="text-xl font-bold text-blue-300 mb-2">1. Legal and Regulatory Compliance</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Compliance with major frameworks such as Reg CF, Reg A+, and MiCA for European operations.</li>
                    <li>Partnerships with top-tier legal firms specializing in blockchain.</li>
                    <li>Built-in compliance features, including automated KYC/AML and smart contract governance.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-blue-300 mb-2">2. Managing Market Volatility</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Stable collateralization of FCT tokens with reserves increasing to a 1:1.5 ratio.</li>
                    <li>Diversification across asset classes like real estate, renewable energy, and collectibles.</li>
                    <li>Investor education to provide insights and analytics for informed decision-making.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-blue-300 mb-2">3. Cybersecurity and Operational Resilience</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Multi-signature wallets, end-to-end encryption, and penetration testing.</li>
                    <li>Dedicated incident response team for addressing issues promptly.</li>
                    <li>Robust infrastructure to maintain 99.9% uptime.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-blue-300 mb-2">4. Enhancing Liquidity</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Liquidity pools to stabilize trading and support investor exits.</li>
                    <li>Secondary market integration with regulated alternative trading systems (ATS).</li>
                    <li>Gradual release of tokenized assets to ensure sufficient market activity.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-blue-300 mb-2">5. Adoption and User Engagement</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Educational campaigns and influencer partnerships to drive awareness.</li>
                    <li>Incentivized participation through staking rewards and discounts.</li>
                    <li>Localized strategies for underserved markets.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-blue-300 mb-2">6. Ensuring Asset Performance</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Rigorous due diligence on ROI potential, ESG impact, and market demand.</li>
                    <li>Professional asset management through partnerships with industry experts.</li>
                    <li>Reserve funds to address asset underperformance.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 6.3 Risk Monitoring Framework */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">6.3 Risk Monitoring Framework</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>
                  <strong>Real-Time Analytics:</strong> Blockchain tools provide insights into platform activity and asset performance.
                </li>
                <li>
                  <strong>Continuous Audits:</strong> Regular smart contract and reserve audits ensure compliance and security.
                </li>
                <li>
                  <strong>Governance Oversight:</strong> FCT and FST holders influence decisions at both platform and asset levels.
                </li>
                <li>
                  <strong>Scenario Testing:</strong> Stress tests simulate market downturns, cyber threats, and regulatory changes.
                </li>
              </ul>
            </div>

            {/* 6.4 Example Risk Mitigation in Action */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">6.4 Example Risk Mitigation in Action</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>
                  <strong>Regulatory Crackdown:</strong> Focus shifts to compliant asset classes like renewable energy.
                </li>
                <li>
                  <strong>Market Downturn:</strong> Offerings adjust to focus on stable, high-demand investments.
                </li>
                <li>
                  <strong>Cybersecurity Threat:</strong> Security protocols isolate affected systems, and issues are resolved within 24 hours.
                </li>
              </ul>
            </div>

            {/* 6.5 Building Investor Confidence */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">6.5 Building Investor Confidence</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Monthly disclosures on platform performance and asset metrics.</li>
                <li>Open communication during market volatility or platform updates.</li>
                <li>Comprehensive resources for informed decision-making.</li>
              </ul>
            </div>

            {/* 6.6 Long-Term Risk Mitigation Strategy */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">6.6 Long-Term Risk Mitigation Strategy</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Gradual expansion ensures operational stability and compliance.</li>
                <li>Regular updates to features, protocols, and governance models.</li>
                <li>Collaborations with experts reinforce resilience and adaptability.</li>
              </ul>
            </div>
            <button
              onClick={scrollToTop}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Back to Top
            </button>
          </div>
        </section>
        <section id="section-7" className="bg-gray-900 text-gray-200 py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">7. Revenue Model and Financial Sustainability</h2>
            <p className="mb-6 leading-loose">
              FractionaX has designed a diversified and scalable revenue model to ensure financial sustainability while delivering value to investors and platform users. By leveraging multiple income streams, FractionaX can grow alongside its user base, maintain operational stability, and reinvest in future innovations.
            </p>

            {/* 7.1 Core Revenue Streams */}
            <div className="mb-10">
              <h3 className="text-3xl font-bold text-blue-400 mb-6">7.1 Core Revenue Streams</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-6">
                <li>
                  <strong className="text-white">Transaction Fees:</strong>
                  Scaled fees (<span className="text-blue-400">0.1%–0.5%</span>) apply to all transactions involving FCT and FST tokens.
                  <ul className="list-inside list-disc pl-6 mt-2 space-y-2">
                    <li><strong>Example:</strong> A user purchasing <span className="text-blue-400">$10,000</span> in FST tokens incurs a <span className="text-blue-400">$50</span> fee (<span className="text-blue-400">0.5%</span>).</li>
                    <li><strong>Purpose:</strong> Generates <strong className="text-white">predictable revenue</strong> proportional to platform activity.</li>
                  </ul>
                </li>
                <li>
                  <strong className="text-white">Marketplace Commissions:</strong>
                  Earns <span className="text-blue-400">1%–3%</span> on successfully funded investment vehicles.
                  <ul className="list-inside list-disc pl-6 mt-2 space-y-2">
                    <li><strong>Example:</strong> A <span className="text-blue-400">$10 million</span> real estate project generates <span className="text-blue-400">$200,000</span> in commissions at a <span className="text-blue-400">2%</span> rate.</li>
                    <li><strong>Purpose:</strong> Supports operations and incentivizes <strong className="text-white">quality asset listings</strong>.</li>
                  </ul>
                </li>
                <li>
                  <strong className="text-white">Subscription Services:</strong>
                  Offers premium tools, early access, and support for <span className="text-blue-400">$10/month</span>.
                  <ul className="list-inside list-disc pl-6 mt-2 space-y-2">
                    <li><strong>Example:</strong> <span className="text-blue-400">50,000</span> users subscribing generate <span className="text-blue-400">$6 million</span> annually.</li>
                    <li><strong>Purpose:</strong> Provides <strong className="text-white">recurring income</strong> while enhancing user experience.</li>
                  </ul>
                </li>
                <li>
                  <strong className="text-white">Asset Management Fees:</strong>
                  Annual fees of <span className="text-blue-400">1%–2%</span> on tokenized assets under management (<strong>AUM</strong>).
                  <ul className="list-inside list-disc pl-6 mt-2 space-y-2">
                    <li><strong>Example:</strong> Managing <span className="text-blue-400">$500 million</span> generates <span className="text-blue-400">$7.5 million</span> at <span className="text-blue-400">1.5%</span>.</li>
                    <li><strong>Purpose:</strong> Covers <strong className="text-white">operational costs</strong> for asset optimization.</li>
                  </ul>
                </li>
                <li>
                  <strong className="text-white">Performance-Based Commissions:</strong>
                  Retains up to <span className="text-blue-400">5%</span> of proceeds from liquidated tokenized assets.
                  <ul className="list-inside list-disc pl-6 mt-2 space-y-2">
                    <li><strong>Example:</strong> A <span className="text-blue-400">$20 million</span> property sale generates <span className="text-blue-400">$1 million</span> at <span className="text-blue-400">5%</span>.</li>
                    <li><strong>Purpose:</strong> Aligns platform success with <strong className="text-white">investor returns</strong>.</li>
                  </ul>
                </li>
                <li>
                  <strong className="text-white">Residual Stakes:</strong>
                  Retains a <span className="text-blue-400">2%</span> equity stake in tokenized assets for ongoing revenue.
                  <ul className="list-inside list-disc pl-6 mt-2 space-y-2">
                    <li><strong>Example:</strong> A <span className="text-blue-400">$15 million</span> property resale generates <span className="text-blue-400">$300,000</span> in residual revenue.</li>
                    <li><strong>Purpose:</strong> Ensures <strong className="text-white">long-term income</strong> tied to asset performance.</li>
                  </ul>
                </li>
                <li>
                  <strong className="text-white">Staking Rewards Allocation:</strong>
                  Funded through platform revenues to incentivize FCT holding.
                  <ul className="list-inside list-disc pl-6 mt-2 space-y-2">
                    <li><strong>Example:</strong> <span className="text-blue-400">$1 million</span> annually allocated for staking rewards.</li>
                    <li><strong>Purpose:</strong> Encourages <strong className="text-white">long-term platform loyalty</strong>.</li>
                  </ul>
                </li>
              </ul>
            </div>



            {/* 7.2 Projected Revenue Growth */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">7.2 Projected Revenue Growth</h3>
              <p className="mb-4">
                FractionaX projects significant revenue growth as the platform scales:
              </p>
              <table className="w-full text-left text-gray-300 bg-gray-800 border border-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Metric</th>
                    <th className="px-4 py-2">Short-Term (Year 1–3)</th>
                    <th className="px-4 py-2">Long-Term (Year 4–6)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border border-gray-700">Active Users</td>
                    <td className="px-4 py-2 border border-gray-700">50,000</td>
                    <td className="px-4 py-2 border border-gray-700">200,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-700">AUM</td>
                    <td className="px-4 py-2 border border-gray-700">$500M</td>
                    <td className="px-4 py-2 border border-gray-700">$2B</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-700">Annual Revenue</td>
                    <td className="px-4 py-2 border border-gray-700">$30M</td>
                    <td className="px-4 py-2 border border-gray-700">$120M</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 7.3 Expense Allocation */}
            <div className="mb-10 px-4">
              <h3 className="text-2xl font-semibold text-white mb-4">7.3 Expense Allocation</h3>
              {/* For larger screens */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-gray-300 bg-gray-800 border border-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-4 py-2">Category</th>
                      <th className="px-4 py-2">Percentage</th>
                      <th className="px-4 py-2">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border border-gray-700">Platform Development</td>
                      <td className="px-4 py-2 border border-gray-700">30%</td>
                      <td className="px-4 py-2 border border-gray-700">Feature updates, security, scalability.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border border-gray-700">Marketing</td>
                      <td className="px-4 py-2 border border-gray-700">20%</td>
                      <td className="px-4 py-2 border border-gray-700">Campaigns, education, and engagement.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border border-gray-700">Staking Rewards</td>
                      <td className="px-4 py-2 border border-gray-700">20%</td>
                      <td className="px-4 py-2 border border-gray-700">Encourages long-term token holding.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border border-gray-700">Compliance</td>
                      <td className="px-4 py-2 border border-gray-700">10%</td>
                      <td className="px-4 py-2 border border-gray-700">Regulatory alignment and audits.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border border-gray-700">Operational Costs</td>
                      <td className="px-4 py-2 border border-gray-700">10%</td>
                      <td className="px-4 py-2 border border-gray-700">Infrastructure, salaries, and support.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border border-gray-700">Reserve Fund</td>
                      <td className="px-4 py-2 border border-gray-700">10%</td>
                      <td className="px-4 py-2 border border-gray-700">Liquidity and contingencies.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* For small screens */}
              <div className="block md:hidden">
                {[
                  {
                    category: "Platform Development",
                    percentage: "30%",
                    details: "Feature updates, security, scalability.",
                  },
                  {
                    category: "Marketing",
                    percentage: "20%",
                    details: "Campaigns, education, and engagement.",
                  },
                  {
                    category: "Staking Rewards",
                    percentage: "20%",
                    details: "Encourages long-term token holding.",
                  },
                  {
                    category: "Compliance",
                    percentage: "10%",
                    details: "Regulatory alignment and audits.",
                  },
                  {
                    category: "Operational Costs",
                    percentage: "10%",
                    details: "Infrastructure, salaries, and support.",
                  },
                  {
                    category: "Reserve Fund",
                    percentage: "10%",
                    details: "Liquidity and contingencies.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 bg-gray-800 border border-gray-700 rounded-lg text-gray-300"
                  >
                    <p>
                      <span className="font-semibold">Category:</span> {item.category}
                    </p>
                    <p>
                      <span className="font-semibold">Percentage:</span> {item.percentage}
                    </p>
                    <p>
                      <span className="font-semibold">Details:</span> {item.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={scrollToTop}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Back to Top
            </button>
          </div>
        </section>
        <section id="section-8" className="bg-gray-900 text-gray-200 py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">8. Governance and Management Structure</h2>
            <p className="mb-6 leading-loose">
              FractionaX prioritizes transparency, accountability, and decentralized decision-making through a dual-layered governance and management framework. This structure empowers token holders, ensures operational excellence, and aligns the company’s strategic goals with the interests of its global investor base.
            </p>

            {/* 8.1 Governance Overview */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">8.1 Governance Overview</h3>
              <p className="mb-4">
                FractionaX operates under a decentralized governance model, complemented by a professional management team. This hybrid approach balances community-driven input with expert oversight to maintain platform stability and growth.
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-4">
                <li><strong>Community Governance:</strong> Token holders influence major decisions, ensuring alignment with user interests.</li>
                <li><strong>Professional Oversight:</strong> An experienced executive team manages day-to-day operations and long-term strategy.</li>
                <li><strong>Board of Directors:</strong> A balanced mix of founders, investors, and industry experts guides strategic direction.</li>
              </ul>
            </div>

            {/* 8.2 Voting Rights and Community Participation */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">8.2 Voting Rights and Community Participation</h3>
              <p className="mb-4">Governance empowers both FCT and FST holders to shape platform and asset decisions.</p>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-white">1. FCT (Fractional Collateral Token) Holders</h4>
                  <ul className="list-disc list-inside pl-6 text-gray-300">
                    <li>Participate in platform-wide decisions (e.g., transaction fees, asset class expansions, R&D funding).</li>
                    <li>Voting power is proportional to staked FCT tokens, incentivizing long-term commitment.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">2. FST (Fractional Security Token) Holders</h4>
                  <ul className="list-disc list-inside pl-6 text-gray-300">
                    <li>Influence asset-specific decisions (e.g., renovations, liquidation timing).</li>
                    <li>Participate in discussions about the performance and lifecycle management of tokenized assets.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">3. Decentralized Proposal System</h4>
                  <p>Both FCT and FST holders can submit governance proposals:</p>
                  <ul className="list-disc list-inside pl-6 text-gray-300">
                    <li>Proposals undergo a defined voting period to ensure community participation.</li>
                    <li>Example: A proposal to add tokenized healthcare infrastructure as an asset class passes with 65% approval.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 8.3 Management Structure */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">8.3 Management Structure</h3>
              <p className="mb-4">FractionaX’s leadership ensures operational efficiency and strategic execution:</p>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-white">1. Executive Team</h4>
                  <ul className="list-disc list-inside pl-6 text-gray-300">
                    <li><strong>CEO:</strong> Oversees the platform’s vision, growth, and overall strategy.</li>
                    <li><strong>CTO:</strong> Leads blockchain development, security, and scalability.</li>
                    <li><strong>CFO:</strong> Manages financial planning, compliance, and risk mitigation.</li>
                    <li><strong>CMO:</strong> Drives user acquisition, brand awareness, and engagement.</li>
                    <li><strong>CCO:</strong> Ensures adherence to global regulations and oversees KYC/AML protocols.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">2. Board of Directors</h4>
                  <p>Comprised of founders, investors, and independent experts:</p>
                  <ul className="list-disc list-inside pl-6 text-gray-300">
                    <li>Provides strategic guidance and oversight.</li>
                    <li>Ensures alignment with investor interests.</li>
                    <li>Maintains veto power over critical decisions (e.g., equity issuance or mergers).</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">3. Advisory Board</h4>
                  <ul className="list-disc list-inside pl-6 text-gray-300">
                    <li>Offers expert insights on blockchain technology, tokenization trends, and regulatory developments.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 8.4 Decentralized Governance Features */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">8.4 Decentralized Governance Features</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-4">
                <li><strong>Blockchain-Enabled Voting:</strong> All governance votes are recorded immutably for transparency.</li>
                <li><strong>Governance Incentives:</strong> FCT holders earn additional staking rewards for participation.</li>
                <li><strong>Community-Driven Initiatives:</strong> Revenue allocation supports user-proposed projects and education.</li>
              </ul>
            </div>

            {/* 8.5 Decision-Making Workflow */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">8.5 Decision-Making Workflow</h3>
              <ol className="list-decimal list-inside text-gray-300 pl-6 space-y-2">
                <li>Proposal Submission: Token holders draft proposals for new features or strategic shifts.</li>
                <li>Review Period: Proposals are evaluated for feasibility and compliance.</li>
                <li>Community Voting: Token holders cast votes, with results recorded on the blockchain.</li>
                <li>Implementation: Approved proposals are executed with regular updates to the community.</li>
              </ol>
            </div>

            {/* 8.6 Long-Term Vision for Governance */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">8.6 Long-Term Vision for Governance</h3>
              <p>FractionaX aims to transition into a Decentralized Autonomous Organization (DAO) by 2030:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-4">
                <li><strong>Full Decentralization:</strong> Shift all governance decisions to token holders.</li>
                <li><strong>Global Representation:</strong> Ensure diverse participation across demographics and regions.</li>
                <li><strong>Autonomous Operations:</strong> Leverage smart contracts to automate processes.</li>
              </ul>
            </div>
            <button
              onClick={scrollToTop}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Back to Top
            </button>
          </div>
        </section>
        <section id="section-9" className="bg-gray-900 text-gray-200 py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">9. Technology and Security</h2>
            <p className="mb-6">
              FractionaX is built on a foundation of cutting-edge technology and rigorous security measures. By leveraging
              the scalability and efficiency of Hedera Hashgraph, FractionaX delivers a secure, transparent, and reliable
              platform for tokenized investing.
            </p>

            {/* 9.1 Platform Architecture */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">9.1 Platform Architecture</h3>
              <h4 className="text-xl font-semibold text-gray-300 mb-3">1. Hedera Hashgraph Foundation</h4>
              <ul className="list-disc list-inside pl-4 mb-4 space-y-2">
                <li><strong>Speed:</strong> Processes up to 10,000 transactions per second.</li>
                <li><strong>Energy Efficiency:</strong> Proof-of-stake model aligns with sustainability goals.</li>
                <li><strong>Scalability:</strong> Effortlessly scales with user demand and transaction volume.</li>
                <li><strong>Immutability:</strong> Provides a tamper-proof ledger for secure transaction records.</li>
              </ul>

              <h4 className="text-xl font-semibold text-gray-300 mb-3">2. Smart Contracts</h4>
              <ul className="list-disc list-inside pl-4 mb-4 space-y-2">
                <li><strong>Automation:</strong> Executes transactions, income distributions, and governance votes seamlessly.</li>
                <li><strong>Compliance:</strong> Built-in KYC/AML features ensure regulatory alignment.</li>
                <li><strong>Efficiency:</strong> Reduces processing times and operational costs.</li>
              </ul>

              <h4 className="text-xl font-semibold text-gray-300 mb-3">3. Token Infrastructure</h4>
              <ul className="list-disc list-inside pl-4 mb-4 space-y-2">
                <li><strong>FCT (Fractional Collateral Token):</strong> Utility token for transactions, staking, and governance.</li>
                <li><strong>FST (Fractional Security Token):</strong> Represents ownership in tokenized assets with dynamic minting and burning.</li>
              </ul>
            </div>

            {/* 9.2 User Experience Features */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">9.2 User Experience Features</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li><strong>Intuitive Interface:</strong> Designed for novice and experienced investors with real-time asset tracking and AI-powered recommendations.</li>
                <li><strong>Mobile and Web Compatibility:</strong> Accessible on all devices for seamless interaction.</li>
                <li><strong>Advanced Analytics:</strong> Provides detailed insights into token performance, ROI, and market trends.</li>
              </ul>
            </div>

            {/* 9.3 Security Protocols */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">9.3 Security Protocols</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li><strong>Data Protection:</strong> End-to-end encryption and zero-knowledge proofs safeguard user information.</li>
                <li><strong>Multi-Signature Wallets:</strong> Ensures multiple approvals for high-value transactions.</li>
                <li><strong>Authentication:</strong> Two-factor authentication (2FA) and optional biometrics for enhanced security.</li>
                <li><strong>Infrastructure Resilience:</strong> Distributed architecture with 99.9% uptime for continuous platform availability.</li>
              </ul>
            </div>

            {/* 9.4 Cybersecurity Measures */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">9.4 Cybersecurity Measures</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li><strong>Penetration Testing:</strong> Regular third-party audits to identify and resolve vulnerabilities.</li>
                <li><strong>Incident Response Plan:</strong> A 24/7 dedicated team addresses potential threats immediately.</li>
                <li><strong>Smart Contract Audits:</strong> Independent reviews ensure contract security and functionality.</li>
              </ul>
            </div>

            {/* 9.5 Compliance and Regulatory Features */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">9.5 Compliance and Regulatory Features</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li><strong>Automated KYC/AML:</strong> Blockchain-integrated identity verification ensures regulatory compliance.</li>
                <li><strong>Compliance Integration:</strong> Smart contracts enforce regional regulations automatically.</li>
                <li><strong>Reserve Transparency:</strong> Regular audits ensure FCT tokens maintain collateral backing.</li>
              </ul>
            </div>

            {/* 9.6 Environmental Sustainability */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">9.6 Environmental Sustainability</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li><strong>Low Carbon Footprint:</strong> Hedera Hashgraph’s energy efficiency supports ESG goals.</li>
                <li><strong>Green Infrastructure:</strong> Hosted on energy-efficient servers to reduce emissions.</li>
              </ul>
            </div>

            {/* 9.7 Scalability and Future Enhancements */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">9.7 Scalability and Future Enhancements</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li><strong>Adaptive Technology:</strong> Scales with user demand, ensuring minimal latency.</li>
                <li><strong>AI and Machine Learning:</strong> Enhancements include predictive analytics and fraud detection.</li>
                <li><strong>Cross-Platform Integration:</strong> Future integrations with DeFi platforms and alternative trading systems.</li>
              </ul>
            </div>

            {/* 9.8 Technology in Action */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">9.8 Technology in Action: Example Scenarios</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li><strong>Passive Income Distribution:</strong> Smart contracts automatically distribute rental income to token holders.</li>
                <li><strong>Governance Voting:</strong> Blockchain-enabled voting ensures transparent and efficient decision-making.</li>
                <li><strong>Real-Time Asset Tracking:</strong> Dashboards provide full visibility into investment performance.</li>
              </ul>
            </div>
            <button
              onClick={scrollToTop}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Back to Top
            </button>
          </div>
        </section>
        <section id="section-10" className="bg-gray-900 text-gray-200 py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">
              10. Marketing and User Acquisition Strategy
            </h2>
            <p className="mb-6">
              The success of FractionaX hinges on building a diverse and engaged community of investors who recognize
              the transformative potential of tokenized assets. Our strategy combines digital innovation, strategic partnerships,
              and community-driven initiatives to position FractionaX as a leader in tokenized investing.
            </p>

            {/* 10.1 Marketing Objectives */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">10.1 Marketing Objectives</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li><strong>Build Awareness:</strong> Establish FractionaX as a trusted brand in blockchain-based investing.</li>
                <li>
                  <strong>Educate and Empower:</strong> Simplify complex concepts like tokenization and smart contracts through
                  user-friendly content.
                </li>
                <li>
                  <strong>Drive User Acquisition:</strong> Attract a wide range of investors through targeted campaigns and incentives.
                </li>
                <li>
                  <strong>Retain and Engage Users:</strong> Cultivate long-term loyalty through rewards, exclusive opportunities,
                  and superior user experiences.
                </li>
              </ul>
            </div>

            {/* 10.2 Target Audiences */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">10.2 Target Audiences</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  <strong>Retail Investors:</strong> Millennials and Gen Z seeking accessible, tech-driven investment opportunities.
                </li>
                <li>
                  <strong>Institutional Investors:</strong> Family offices, hedge funds, and asset managers seeking diversification.
                </li>
                <li>
                  <strong>Emerging Markets:</strong> Regions with limited financial services but high internet penetration.
                </li>
              </ul>
            </div>

            {/* 10.3 Marketing Channels */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">10.3 Marketing Channels</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  <strong>Digital Advertising:</strong> SEM, social media ads, and display banners on platforms like Facebook, LinkedIn, and Twitter.
                </li>
                <li>
                  <strong>Content Marketing:</strong> Blogs, videos, podcasts, and case studies to educate and inspire users.
                </li>
                <li>
                  <strong>Influencer Partnerships:</strong> Collaborations with blockchain advocates and financial influencers.
                </li>
                <li>
                  <strong>Social Media Engagement:</strong> Interactive content tailored for platforms like Instagram and TikTok.
                </li>
                <li>
                  <strong>Email Campaigns:</strong> Personalized newsletters to announce updates and new opportunities.
                </li>
                <li>
                  <strong>SEO:</strong> Optimize content to rank for terms like "best fractional investing platforms."
                </li>
              </ul>
            </div>

            {/* 10.4 User Acquisition Tactics */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">10.4 User Acquisition Tactics</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li><strong>Early Adopter Incentives:</strong> Discounted FCT tokens and staking bonuses for pre-sale participants.</li>
                <li>
                  <strong>Referral Program:</strong> Bonuses in FCT tokens and reduced fees for users who invite friends.
                </li>
                <li>
                  <strong>Freemium Model:</strong> Free access to basic features, with premium tools offered via subscription.
                </li>
                <li>
                  <strong>Gamified Onboarding:</strong> Interactive tutorials and quizzes to educate users while rewarding them.
                </li>
                <li>
                  <strong>Localized Campaigns:</strong> Regional strategies focusing on specific needs like affordable housing in Latin America.
                </li>
              </ul>
            </div>

            {/* 10.5 Strategic Partnerships */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">10.5 Strategic Partnerships</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  <strong>Financial Institutions:</strong> Collaborations with banks and asset managers to onboard institutional clients.
                </li>
                <li>
                  <strong>Blockchain Innovators:</strong> Partnerships with DeFi platforms to enhance liquidity.
                </li>
                <li>
                  <strong>ESG Organizations:</strong> Sourcing impactful investments with sustainability-focused groups.
                </li>
                <li>
                  <strong>Media Outlets:</strong> Partnering with financial news platforms like CNBC and CoinDesk for broader reach.
                </li>
              </ul>
            </div>

            {/* 10.6 Community Engagement */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">10.6 Community Engagement</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li><strong>FractionaX Forums:</strong> Online spaces for user discussions and governance proposals.</li>
                <li>
                  <strong>Ambassador Program:</strong> Recruiting users to promote FractionaX within their networks.
                </li>
                <li>
                  <strong>Events and Meetups:</strong> Virtual and in-person events to connect users and showcase platform updates.
                </li>
                <li>
                  <strong>Transparent Communication:</strong> Regular updates on developments and performance metrics.
                </li>
              </ul>
            </div>

            {/* 10.7 Key Performance Indicators (KPIs) */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">10.7 Key Performance Indicators (KPIs)</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li><strong>User Acquisition:</strong> 50,000 active users in Year 1.</li>
                <li><strong>Monthly Active Users (MAU):</strong> 200,000 by Year 5.</li>
                <li><strong>Subscriber Growth:</strong> 100,000 premium subscribers by Year 3.</li>
                <li><strong>AUM:</strong> $500 million by Year 3.</li>
                <li><strong>Social Media Engagement:</strong> 10% monthly growth.</li>
              </ul>
            </div>

            {/* 10.8 Example Campaigns */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">10.8 Example Campaigns</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  <strong>Campaign 1: “Own the Future”</strong> - Highlights accessible tokenized investments via social media.
                </li>
                <li>
                  <strong>Campaign 2: “Tokenize Your Impact”</strong> - Promotes ESG-focused projects with influencer partnerships.
                </li>
                <li>
                  <strong>Campaign 3: “FractionaX Pre-Sale Countdown”</strong> - Drives excitement for FCT token pre-sale with bonuses.
                </li>
              </ul>
            </div>
            <button
              onClick={scrollToTop}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Back to Top
            </button>
          </div>
        </section>
        <section id="section-11" className="bg-gray-900 text-gray-200 py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">
              11. Expansion Strategy
            </h2>
            <p className="mb-6">
              FractionaX is committed to scaling its operations globally, diversifying its offerings, and adapting to
              emerging market trends. By leveraging technology, partnerships, and market localization, the platform is
              creating a seamless and inclusive ecosystem for investors worldwide.
            </p>

            {/* 11.1 Geographic Expansion */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">11.1 Geographic Expansion</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  <strong>Prioritizing Emerging Markets:</strong> Focus on Africa, Latin America, and Southeast Asia with
                  localized offerings like affordable housing and renewable energy projects.
                </li>
                <li>
                  <strong>Entering Developed Markets:</strong> Target North America, Europe, and Asia-Pacific with high-value
                  tokenized assets and strict regulatory compliance.
                </li>
              </ul>
            </div>

            {/* 11.2 Asset Class Diversification */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">11.2 Asset Class Diversification</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  <strong>Real Estate:</strong> Expanding from residential and commercial properties to tokenized REITs
                  and landmark properties.
                </li>
                <li>
                  <strong>Renewable Energy:</strong> Introducing carbon capture technologies and expanding into clean energy innovations.
                </li>
                <li>
                  <strong>Alternative Assets:</strong> Tokenizing luxury goods, art, collectibles, and commodities like gold and silver.
                </li>
                <li>
                  <strong>ESG Investments:</strong> Focusing on projects aligned with environmental, social, and governance standards.
                </li>
              </ul>
            </div>

            {/* 11.3 Technology and Platform Expansion */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">11.3 Technology and Platform Expansion</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  <strong>Enhanced Platform Features:</strong> AI-powered recommendations, predictive analytics, and real-time tracking tools.
                </li>
                <li>
                  <strong>DeFi Integration:</strong> Partnering with DeFi platforms to enhance liquidity and introduce staking options.
                </li>
                <li>
                  <strong>Interoperability:</strong> Supporting cross-chain capabilities to enable investments across multiple blockchains.
                </li>
                <li>
                  <strong>Security Upgrades:</strong> Continual investment in advanced cybersecurity measures as the platform scales.
                </li>
              </ul>
            </div>

            {/* 11.4 Strategic Partnerships */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">11.4 Strategic Partnerships</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li><strong>Institutional Collaborations:</strong> Partnering with banks and asset managers to source high-quality investments.</li>
                <li><strong>Technology Alliances:</strong> Working with blockchain providers to ensure platform scalability and reliability.</li>
                <li><strong>ESG Organizations:</strong> Collaborating with sustainability-focused groups to tokenize impactful projects.</li>
                <li><strong>Regional Partners:</strong> Building relationships with local businesses and governments for streamlined operations.</li>
              </ul>
            </div>

            {/* 11.5 Community and User Growth */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">11.5 Community and User Growth</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  <strong>Localized Marketing:</strong> Tailored campaigns for specific regions, with translated content for accessibility.
                </li>
                <li>
                  <strong>Education Initiatives:</strong> Hosting webinars and partnering with universities to promote financial literacy.
                </li>
                <li>
                  <strong>Incentivizing Adoption:</strong> Offering referral programs, staking rewards, and exclusive pre-sale access.
                </li>
              </ul>
            </div>

            {/* 11.6 Regulatory Compliance */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">11.6 Regulatory Compliance</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  <strong>Licensing:</strong> Registering as a Virtual Asset Service Provider (VASP) in key jurisdictions.
                </li>
                <li>
                  <strong>Automated Compliance:</strong> Leveraging smart contracts for KYC/AML and regulatory adherence.
                </li>
                <li>
                  <strong>Proactive Engagement:</strong> Open communication with regulatory bodies to stay ahead of legal developments.
                </li>
              </ul>
            </div>

            {/* 11.7 Milestones and Timeline */}
            <div className="mb-10 px-4">
              <h3 className="text-2xl font-semibold text-white mb-4">11.7 Milestones and Timeline</h3>

              {/* Table for larger screens */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-600">
                  <thead className="bg-gray-700 text-gray-300">
                    <tr>
                      <th className="border border-gray-600 px-4 py-2">Milestone</th>
                      <th className="border border-gray-600 px-4 py-2">Target Date</th>
                      <th className="border border-gray-600 px-4 py-2">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-400">
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Launch in Key Markets</td>
                      <td className="border border-gray-600 px-4 py-2">Late 2025</td>
                      <td className="border border-gray-600 px-4 py-2">
                        Establish presence in North America, Europe, and Asia-Pacific.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Expand to Emerging Markets</td>
                      <td className="border border-gray-600 px-4 py-2">2026</td>
                      <td className="border border-gray-600 px-4 py-2">
                        Target Africa, Latin America, and Southeast Asia with localized offerings.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Cross-Chain Integration</td>
                      <td className="border border-gray-600 px-4 py-2">Early 2027</td>
                      <td className="border border-gray-600 px-4 py-2">
                        Enable investments and trades across multiple blockchains.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Stacked layout for mobile screens */}
              <div className="block md:hidden">
                {[
                  {
                    milestone: "Launch in Key Markets",
                    date: "Late 2025",
                    description: "Establish presence in North America, Europe, and Asia-Pacific.",
                  },
                  {
                    milestone: "Expand to Emerging Markets",
                    date: "2026",
                    description: "Target Africa, Latin America, and Southeast Asia with localized offerings.",
                  },
                  {
                    milestone: "Cross-Chain Integration",
                    date: "Early 2027",
                    description: "Enable investments and trades across multiple blockchains.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 bg-gray-800 border border-gray-600 rounded-lg text-gray-300"
                  >
                    <p>
                      <span className="font-semibold">Milestone:</span> {item.milestone}
                    </p>
                    <p>
                      <span className="font-semibold">Target Date:</span> {item.date}
                    </p>
                    <p>
                      <span className="font-semibold">Description:</span> {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>


            {/* 11.8 Why FractionaX’s Expansion Stands Out */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">11.8 Why FractionaX’s Expansion Stands Out</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li><strong>Comprehensive Approach:</strong> Balances geographic growth, asset diversification, and technological innovation.</li>
                <li><strong>ESG Alignment:</strong> Focus on sustainability attracts socially conscious investors.</li>
                <li><strong>Localized Execution:</strong> Adapts to unique needs and regulations of each market.</li>
                <li><strong>Long-Term Vision:</strong> Built on scalability, interoperability, and decentralization.</li>
              </ul>
            </div>
            <button
              onClick={scrollToTop}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Back to Top
            </button>
          </div>
        </section>
        <section id="section-12" className="bg-gray-900 text-gray-200 py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">
              12. Risk Mitigation in Expansion
            </h2>
            <p className="mb-6">
              As FractionaX scales its platform globally, proactive risk management is crucial to maintaining stability and resilience. By addressing potential challenges early and implementing robust mitigation strategies, FractionaX ensures protection for its users, assets, and reputation while fostering sustainable growth.
            </p>

            {/* 12.1 Key Risks in Expansion */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">12.1 Key Risks in Expansion</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  <strong>Regulatory and Compliance Risks:</strong> Navigating diverse legal frameworks across jurisdictions, potentially delaying market entry or causing operational restrictions.
                </li>
                <li>
                  <strong>Market Adoption Risks:</strong> Variability in user adoption rates due to unfamiliarity with tokenized investing.
                </li>
                <li>
                  <strong>Operational Risks:</strong> Challenges in scaling technology and operations to support a growing user base.
                </li>
                <li>
                  <strong>Liquidity Risks:</strong> Insufficient market liquidity for newly tokenized assets or regions.
                </li>
                <li>
                  <strong>Reputational Risks:</strong> Potential issues in compliance, data protection, or platform reliability impacting user trust.
                </li>
              </ul>
            </div>

            {/* 12.2 Proactive Risk Mitigation Strategies */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">12.2 Proactive Risk Mitigation Strategies</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  <strong>Regulatory and Compliance Management:</strong> Employ regional legal experts, register as a VASP, and integrate smart contracts for automated compliance.
                </li>
                <li>
                  <strong>User Education and Adoption:</strong> Tailor localized campaigns, offer demo features, and incentivize early adopters with staking bonuses and referral rewards.
                </li>
                <li>
                  <strong>Operational Scalability:</strong> Invest in infrastructure, conduct regular stress testing, and provide 24/7 support.
                </li>
                <li>
                  <strong>Liquidity Enhancement:</strong> Maintain liquidity reserves, partner with DeFi platforms, and introduce assets gradually.
                </li>
                <li>
                  <strong>Reputation Management:</strong> Foster transparency through regular updates, proactive communication, and community engagement initiatives.
                </li>
              </ul>
            </div>

            {/* 12.3 Real-World Risk Mitigation Scenarios */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">12.3 Real-World Risk Mitigation Scenarios</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  <strong>Scenario 1: Regulatory Change in a Target Market</strong>
                  <p>
                    A new law redefines tokenized securities, requiring additional licensing. FractionaX deploys a localized compliance team to update policies, secures approvals, and informs users to minimize disruption.
                  </p>
                </li>
                <li>
                  <strong>Scenario 2: Technology Scaling During Peak Demand</strong>
                  <p>
                    High user activity during a pre-sale event causes platform slowdowns. FractionaX pre-scales infrastructure and implements load balancing to ensure smooth operations.
                  </p>
                </li>
                <li>
                  <strong>Scenario 3: Liquidity Challenges for a New Asset Class</strong>
                  <p>
                    A newly tokenized asset class experiences low market activity. FractionaX integrates with DeFi platforms to boost liquidity and allocates reserves to stabilize trading.
                  </p>
                </li>
              </ul>
            </div>

            {/* 12.4 Long-Term Risk Management Framework */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">
                12.4 Long-Term Risk Management Framework
              </h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  <strong>Continuous Monitoring:</strong> Use blockchain analytics and a global compliance dashboard to track transactions and regulatory developments.
                </li>
                <li>
                  <strong>Iterative Improvements:</strong> Regularly integrate user feedback and adopt AI-driven risk assessment tools.
                </li>
                <li>
                  <strong>Strategic Partnerships:</strong> Collaborate with legal experts and market leaders to reinforce credibility and trust.
                </li>
              </ul>
            </div>

            {/* 12.5 Risk Mitigation Metrics */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">
                12.5 Risk Mitigation Metrics
              </h3>
              <table className="w-full table-auto border-collapse border border-gray-600">
                <thead>
                  <tr>
                    <th className="border border-gray-600 px-4 py-2">Metric</th>
                    <th className="border border-gray-600 px-4 py-2">Target</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2">Compliance Alignment</td>
                    <td className="border border-gray-600 px-4 py-2">
                      Maintain 100% regulatory compliance in all active regions.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2">Platform Uptime</td>
                    <td className="border border-gray-600 px-4 py-2">Achieve 99.9% uptime.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2">Liquidity Reserves</td>
                    <td className="border border-gray-600 px-4 py-2">
                      Ensure a minimum of 1.5:1 collateral backing for FCT tokens.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2">User Satisfaction</td>
                    <td className="border border-gray-600 px-4 py-2">Maintain 95% satisfaction rate.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2">Issue Resolution Time</td>
                    <td className="border border-gray-600 px-4 py-2">
                      Resolve 90% of issues within 24 hours.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 12.6 Why FractionaX Excels in Risk Mitigation */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">
                12.6 Why FractionaX Excels in Risk Mitigation
              </h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li><strong>Holistic Approach:</strong> Addresses regulatory, operational, and market risks comprehensively.</li>
                <li><strong>Transparent Operations:</strong> Regular audits and open communication build trust.</li>
                <li><strong>Future-Proof Systems:</strong> Adaptive technology ensures resilience in dynamic markets.</li>
                <li><strong>Resilient Growth:</strong> Iterative risk management fosters stability and scalability.</li>
              </ul>
            </div>
            <button
              onClick={scrollToTop}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Back to Top
            </button>
          </div>
        </section>
        <section id="section-13" className="bg-gray-900 text-gray-100 py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">
              13. Financial Sustainability and Growth
            </h2>
            <p className="mb-6">
              FractionaX’s financial framework is designed to ensure long-term sustainability while supporting innovation, scalability, and investor returns. By diversifying revenue streams, optimizing expense allocation, and aligning financial goals with user success, FractionaX creates a resilient foundation for growth.
            </p>

            {/* 13.1 Revenue Streams */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">13.1 Revenue Streams</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  <strong>Transaction Fees:</strong> A scalable fee (0.1%–0.5%) applies to all transactions involving FCT and FST tokens. Example: A $10,000 transaction generates a $50 fee at a 0.5% rate.
                </li>
                <li>
                  <strong>Marketplace Commissions:</strong> FractionaX earns 1%–3% commission on successfully funded investment vehicles. Example: A $5 million real estate project generates $150,000 at a 3% commission rate.
                </li>
                <li>
                  <strong>Subscription Services:</strong> Premium tools and analytics available for $10/month. Example: 100,000 users subscribing to premium services generate $12 million annually.
                </li>
                <li>
                  <strong>Asset Management Fees:</strong> Annual fees of 1%–2% on tokenized assets under management (AUM). Example: Managing $1 billion in assets generates $15 million at a 1.5% rate.
                </li>
                <li>
                  <strong>Performance-Based Commissions:</strong> FractionaX retains up to 5% of proceeds from asset liquidation events. Example: A $20 million property sale generates $1 million at a 5% rate.
                </li>
                <li>
                  <strong>Residual Stake Income:</strong> FractionaX retains a 2% equity stake in tokenized assets, earning returns from appreciation and resale. Example: A $30 million property resale generates $600,000 in residual income.
                </li>
              </ul>
            </div>

            {/* 13.2 Expense Allocation */}
            <div className="mb-10 px-4">
              <h3 className="text-2xl font-semibold text-white mb-4">13.2 Expense Allocation</h3>

              {/* Table for larger screens */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-600">
                  <thead className="bg-gray-700 text-gray-300">
                    <tr>
                      <th className="border border-gray-600 px-4 py-2">Category</th>
                      <th className="border border-gray-600 px-4 py-2">Percentage</th>
                      <th className="border border-gray-600 px-4 py-2">Details</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-400">
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Platform Development</td>
                      <td className="border border-gray-600 px-4 py-2">30%</td>
                      <td className="border border-gray-600 px-4 py-2">
                        Enhancements to scalability, security, and user experience.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Marketing and User Growth</td>
                      <td className="border border-gray-600 px-4 py-2">20%</td>
                      <td className="border border-gray-600 px-4 py-2">
                        Campaigns targeting retail and institutional investors globally.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Staking Rewards</td>
                      <td className="border border-gray-600 px-4 py-2">20%</td>
                      <td className="border border-gray-600 px-4 py-2">
                        Incentives to encourage long-term token holding and community engagement.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Compliance and Audits</td>
                      <td className="border border-gray-600 px-4 py-2">10%</td>
                      <td className="border border-gray-600 px-4 py-2">
                        Ensuring adherence to global regulations and conducting regular audits.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Operational Costs</td>
                      <td className="border border-gray-600 px-4 py-2">10%</td>
                      <td className="border border-gray-600 px-4 py-2">
                        Salaries, technology infrastructure, and customer support.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Reserve Fund</td>
                      <td className="border border-gray-600 px-4 py-2">10%</td>
                      <td className="border border-gray-600 px-4 py-2">
                        Building liquidity and maintaining FCT collateralization ratios.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Stacked layout for mobile screens */}
              <div className="block md:hidden">
                {[
                  {
                    category: "Platform Development",
                    percentage: "30%",
                    details: "Enhancements to scalability, security, and user experience.",
                  },
                  {
                    category: "Marketing and User Growth",
                    percentage: "20%",
                    details: "Campaigns targeting retail and institutional investors globally.",
                  },
                  {
                    category: "Staking Rewards",
                    percentage: "20%",
                    details: "Incentives to encourage long-term token holding and community engagement.",
                  },
                  {
                    category: "Compliance and Audits",
                    percentage: "10%",
                    details: "Ensuring adherence to global regulations and conducting regular audits.",
                  },
                  {
                    category: "Operational Costs",
                    percentage: "10%",
                    details: "Salaries, technology infrastructure, and customer support.",
                  },
                  {
                    category: "Reserve Fund",
                    percentage: "10%",
                    details: "Building liquidity and maintaining FCT collateralization ratios.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 bg-gray-800 border border-gray-600 rounded-lg text-gray-300"
                  >
                    <p>
                      <span className="font-semibold">Category:</span> {item.category}
                    </p>
                    <p>
                      <span className="font-semibold">Percentage:</span> {item.percentage}
                    </p>
                    <p>
                      <span className="font-semibold">Details:</span> {item.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 13.3 Profitability Milestones */}
            <div className="mb-10 px-4">
              <h3 className="text-2xl font-semibold text-white mb-4">13.3 Profitability Milestones</h3>
              <ul className="list-disc list-inside pl-4 space-y-4 text-gray-300">
                <li>
                  <strong>Short-Term (Year 1–3):</strong> User acquisition, platform refinement, and initial market entry. <br />
                  <span className="block">Metrics: 50,000 active users, $500 million in AUM, positive cash flow by Year 3.</span>
                </li>
                <li>
                  <strong>Mid-Term (Year 4–6):</strong> Scaling globally and diversifying assets. <br />
                  <span className="block">Metrics: 200,000 active users, $2 billion in AUM, $120 million in revenue.</span>
                </li>
                <li>
                  <strong>Long-Term (Year 7+):</strong> Full global presence and decentralization through a DAO model. <br />
                  <span className="block">Metrics: $10 billion in AUM, sustainable revenues worldwide.</span>
                </li>
              </ul>
            </div>


            {/* 13.4 Financial Risk Mitigation */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">13.4 Financial Risk Mitigation</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  <strong>Diversified Revenue Streams:</strong> Reduces dependency on any single revenue source.
                </li>
                <li>
                  <strong>Reserve Management:</strong> Maintains liquidity pools and supports collateralization.
                </li>
                <li>
                  <strong>Scalable Expense Model:</strong> Operational costs grow proportionally with user adoption.
                </li>
              </ul>
            </div>

            {/* 13.5 Reinforcing Financial Sustainability */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">
                13.5 Reinforcing Financial Sustainability
              </h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>Reinvesting profits into platform upgrades and market expansion.</li>
                <li>Supporting user-proposed initiatives through a Community Fund.</li>
                <li>Leveraging advanced analytics to monitor and refine financial strategies.</li>
              </ul>
            </div>

            {/* 13.6 Financial Growth Case Studies */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">
                13.6 Financial Growth Case Studies
              </h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  <strong>Scenario 1:</strong> A small-scale investor generates $25 in fees from a $1,000 investment, contributing to steady platform revenue.
                </li>
                <li>
                  <strong>Scenario 2:</strong> A $5 million institutional investment contributes $150,000 in commissions and $75,000 in annual fees.
                </li>
              </ul>
            </div>
            <button
              onClick={scrollToTop}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Back to Top
            </button>
          </div>
        </section>
        <section id="section-14" className="bg-gray-900 text-gray-100 py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">
              14. Long-Term Vision and Strategic Goals
            </h2>
            <p className="mb-6">
              FractionaX is more than a platform—it’s a movement to democratize access to high-value investments and reshape global wealth creation. By combining cutting-edge technology, sustainable practices, and community-driven governance, FractionaX envisions a future where investing is inclusive, impactful, and accessible to everyone, regardless of geographic or financial barriers.
            </p>

            {/* 14.1 The Vision */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">14.1 The Vision</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  <strong>Empower Investors Globally:</strong> Provide tools to invest in high-value assets such as luxury real estate, renewable energy, and rare collectibles.
                </li>
                <li>
                  <strong>Drive Economic Inclusion:</strong> Lower entry barriers to enable underserved communities to participate in wealth generation.
                </li>
                <li>
                  <strong>Foster Transparency and Trust:</strong> Leverage blockchain technology for an open and secure ecosystem.
                </li>
                <li>
                  <strong>Promote Sustainability:</strong> Prioritize ESG investments to align financial returns with environmental and social impact.
                </li>
              </ul>
            </div>

            {/* 14.2 Strategic Goals */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">14.2 Strategic Goals</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  <strong>Scaling Operations Globally:</strong> Enter emerging economies and establish a global presence by 2030.
                </li>
                <li>
                  <strong>Diversifying Investment Opportunities:</strong> Broaden asset classes to include affordable housing, green infrastructure, and tokenized equity.
                </li>
                <li>
                  <strong>Transitioning to Full Decentralization:</strong> Evolve into a Decentralized Autonomous Organization (DAO) by 2030.
                </li>
                <li>
                  <strong>Building an Ecosystem of Collaboration:</strong> Partner with global institutions and ESG organizations.
                </li>
                <li>
                  <strong>Enhancing Financial Inclusion:</strong> Lower investment minimums and develop localized platforms.
                </li>
              </ul>
            </div>

            {/* 14.3 Key Milestones */}
            <div className="mb-10 px-4">
              <h3 className="text-2xl font-semibold text-white mb-4">14.3 Key Milestones</h3>

              {/* Table for larger screens */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-600">
                  <thead className="bg-gray-700 text-gray-300">
                    <tr>
                      <th className="border border-gray-600 px-4 py-2">Milestone</th>
                      <th className="border border-gray-600 px-4 py-2">Target Year</th>
                      <th className="border border-gray-600 px-4 py-2">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-400">
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Global Market Entry</td>
                      <td className="border border-gray-600 px-4 py-2">2026</td>
                      <td className="border border-gray-600 px-4 py-2">
                        Launch localized platforms in Africa, Latin America, and Southeast Asia.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">New Asset Classes</td>
                      <td className="border border-gray-600 px-4 py-2">2027</td>
                      <td className="border border-gray-600 px-4 py-2">
                        Introduce tokenized luxury goods, collectibles, and commodities.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Decentralized Governance (DAO)</td>
                      <td className="border border-gray-600 px-4 py-2">2030</td>
                      <td className="border border-gray-600 px-4 py-2">
                        Transition to a fully decentralized governance structure.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">$10 Billion in AUM</td>
                      <td className="border border-gray-600 px-4 py-2">2032</td>
                      <td className="border border-gray-600 px-4 py-2">
                        Achieve $10 billion in tokenized assets under management globally.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Carbon Neutral Platform</td>
                      <td className="border border-gray-600 px-4 py-2">2035</td>
                      <td className="border border-gray-600 px-4 py-2">
                        Operate a fully carbon-neutral platform through ESG investments and green technology.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Stacked layout for mobile screens */}
              <div className="block md:hidden">
                {[
                  {
                    milestone: "Global Market Entry",
                    year: "2026",
                    description:
                      "Launch localized platforms in Africa, Latin America, and Southeast Asia.",
                  },
                  {
                    milestone: "New Asset Classes",
                    year: "2027",
                    description:
                      "Introduce tokenized luxury goods, collectibles, and commodities.",
                  },
                  {
                    milestone: "Decentralized Governance (DAO)",
                    year: "2030",
                    description:
                      "Transition to a fully decentralized governance structure.",
                  },
                  {
                    milestone: "$10 Billion in AUM",
                    year: "2032",
                    description:
                      "Achieve $10 billion in tokenized assets under management globally.",
                  },
                  {
                    milestone: "Carbon Neutral Platform",
                    year: "2035",
                    description:
                      "Operate a fully carbon-neutral platform through ESG investments and green technology.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 bg-gray-800 border border-gray-600 rounded-lg text-gray-300"
                  >
                    <p>
                      <span className="font-semibold">Milestone:</span> {item.milestone}
                    </p>
                    <p>
                      <span className="font-semibold">Target Year:</span> {item.year}
                    </p>
                    <p>
                      <span className="font-semibold">Description:</span> {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>


            {/* 14.4 Community-Driven Evolution */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">14.4 Community-Driven Evolution</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  <strong>Governance Participation:</strong> Token holders vote on major decisions such as asset class expansions and fee adjustments.
                </li>
                <li>
                  <strong>Educational Initiatives:</strong> Webinars and tutorials to educate users about blockchain and tokenized investments.
                </li>
                <li>
                  <strong>Incentives for Engagement:</strong> Rewards for active participation in governance and referrals.
                </li>
              </ul>
            </div>

            {/* 14.5 Advancing Sustainability Goals */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">14.5 Advancing Sustainability Goals</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  <strong>ESG Integration:</strong> Ensure 50% of tokenized assets align with ESG principles by 2030.
                </li>
                <li>
                  <strong>Environmental Commitment:</strong> Use Hedera Hashgraph for energy-efficient operations and offset emissions.
                </li>
                <li>
                  <strong>Social Impact:</strong> Facilitate investments in affordable housing and renewable energy projects.
                </li>
              </ul>
            </div>

            {/* 14.6 Leveraging Technology for Growth */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">
                14.6 Leveraging Technology for Growth
              </h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  <strong>Blockchain Interoperability:</strong> Integrate with multiple networks to expand liquidity and investment options.
                </li>
                <li>
                  <strong>AI-Driven Personalization:</strong> Predict market trends and provide tailored investment recommendations.
                </li>
                <li>
                  <strong>DeFi Integration:</strong> Enhance staking and yield opportunities for FCT holders.
                </li>
              </ul>
            </div>

            {/* 14.7 FractionaX’s Long-Term Value Proposition */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">
                14.7 FractionaX’s Long-Term Value Proposition
              </h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  <strong>For Investors:</strong> Access high-value, income-generating assets with low entry barriers.
                </li>
                <li>
                  <strong>For Communities:</strong> Economic empowerment through impactful projects.
                </li>
                <li>
                  <strong>For the Global Economy:</strong> Democratizing wealth creation fosters economic growth and financial inclusion.
                </li>
              </ul>
            </div>
            <button
              onClick={scrollToTop}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Back to Top
            </button>
          </div>
        </section>
        <section id="section-15" className="bg-gray-900 text-gray-100 py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">
              15. Conclusion and Call to Action
            </h2>

            <p className="mb-6">
              FractionaX is more than just a platform—it’s a vision for the future
              of investing. By harnessing the power of blockchain technology, a
              dual-token ecosystem, and a commitment to transparency and
              sustainability, FractionaX is democratizing access to high-value
              assets and transforming how people invest.
            </p>

            {/* 15.1 The Journey So Far */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">
                15.1 The Journey So Far
              </h3>
              <p className="mb-4">
                From its beginnings in Houston, Texas, FractionaX was founded on
                the belief that investing should be inclusive, accessible, and
                impactful. Guided by this mission, we have developed an ecosystem
                that empowers investors to own fractions of premium assets,
                participate in global wealth creation, and shape the future of
                finance.
              </p>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  <strong>Innovative Technology:</strong> Built on Hedera Hashgraph,
                  FractionaX ensures scalability, security, and efficiency.
                </li>
                <li>
                  <strong>Transparent Operations:</strong> Every transaction and
                  decision is recorded immutably, fostering trust and
                  accountability.
                </li>
                <li>
                  <strong>Global Ambitions:</strong> By expanding into emerging
                  markets and tokenizing diverse asset classes, FractionaX is
                  opening doors to investment opportunities for all.
                </li>
              </ul>
            </div>

            {/* 15.2 Why Choose FractionaX? */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">
                15.2 Why Choose FractionaX?
              </h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  <strong>Democratized Investing:</strong> Access high-value assets
                  like real estate, renewable energy, and collectibles with a
                  fraction of traditional costs.
                </li>
                <li>
                  <strong>Transparent and Secure:</strong> Blockchain-based
                  technology ensures your investments are secure and transactions
                  are verifiable.
                </li>
                <li>
                  <strong>ESG-Focused Opportunities:</strong> Align your investments
                  with environmental, social, and governance principles,
                  contributing to a sustainable future.
                </li>
                <li>
                  <strong>Community Empowerment:</strong> Participate in platform
                  governance, vote on key decisions, and shape the future of
                  FractionaX.
                </li>
                <li>
                  <strong>Passive Income Potential:</strong> Earn from rental
                  income, dividends, and asset appreciation through tokenized
                  ownership.
                </li>
              </ul>
            </div>

            {/* 15.3 The Call to Action */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">
                15.3 The Call to Action
              </h3>
              <p className="mb-4">
                Be a part of a global revolution in investing. Whether you’re an
                individual looking to diversify your portfolio or an institution
                seeking innovative opportunities, FractionaX is your gateway to the
                future of finance.
              </p>
              <div>
                <h4 className="text-lg font-semibold mb-2">How to Get Started</h4>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>Sign Up: Create an account on the FractionaX platform.</li>
                  <li>
                    Explore Opportunities: Browse tokenized assets, from real estate
                    to renewable energy projects.
                  </li>
                  <li>
                    Invest: Purchase FST tokens to own a fraction of high-value
                    investments.
                  </li>
                  <li>
                    Track and Earn: Use our tools to monitor your portfolio and earn
                    passive income.
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">
                  Pre-Sale Opportunity
                </h4>
                <p>
                  Don’t miss your chance to be an early adopter. Our FCT token
                  pre-sale launches in Q3 2025, offering discounted rates and
                  exclusive staking rewards. Secure your stake in the FractionaX
                  ecosystem today.
                </p>
              </div>
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Stay Connected</h4>
                <p>
                  <strong>Website:</strong>{" "}
                  <a
                    href="https://www.fractionax.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    www.fractionax.io
                  </a>
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:support@fractionax.io"
                    className="text-blue-400 underline"
                  >
                    support@fractionax.io
                  </a>
                </p>
                <p>
                  <strong>Social Media:</strong> Follow us on LinkedIn, Twitter, and
                  Instagram for the latest updates and opportunities.
                </p>
              </div>
            </div>

            {/* 15.4 Vision for the Future */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">
                15.4 Vision for the Future
              </h3>
              <p className="mb-4">
                FractionaX is committed to creating a world where investing is no
                longer a privilege but a right. By fostering innovation,
                transparency, and inclusivity, we aim to redefine global wealth
                creation and empower communities to achieve their financial goals.
              </p>
              <p>
                Together, we can build a future where everyone has the opportunity
                to own a share of prosperity.
              </p>
            </div>

            {/* Final Words */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Final Words</h3>
              <p>
                FractionaX isn’t just a platform; it’s a movement to transform the
                financial landscape. Your journey to financial empowerment starts
                here. Join us in shaping the future of investing—one token at a
                time.
              </p>
            </div>
          </div>
        </section>
        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join the FractionaX Movement</h2>
            <p className="text-lg mb-6">
              Be part of a groundbreaking platform that democratizes wealth creation. Invest, earn, and grow with FractionaX.
            </p>
            <a
              href="/whitepaper.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition"
            >
              Download Whitepaper
            </a>
          </div>
          <button
            onClick={scrollToTop}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Back to Top
          </button>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default WhitePaper;
