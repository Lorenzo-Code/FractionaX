import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom"

const AboutPage = () => {
  return (
    <div className="bg-gray-900 text-white">
      <Navbar />
      {/* Our Mission Section */}
      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-400 text-center mb-8">Our Mission</h2>
          <p className="text-gray-300 leading-loose text-center">
            At FractionaX, we believe in breaking barriers to wealth creation. Our goal is to make premium investments accessible, transparent, and secure for everyone. By combining advanced blockchain technology with a clear vision for compliance and inclusivity, we are paving the path for a revolutionary investment experience.
          </p>
        </div>
      </section>


      {/* Key Features Section */}
      <section className="bg-gradient-to-r from-blue-800 to-gray-800 py-16 px-6 md:px-12 lg:px-20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-400 mb-10">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-gray-900 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-white mb-2">Fractional Ownership</h3>
              <p className="text-gray-300">
                Invest in real estate, renewable energy, and more without the need for significant upfront capital.
              </p>
            </div>
            <div className="text-center bg-gray-900 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-white mb-2">Transparency</h3>
              <p className="text-gray-300">
                Blockchain-backed transactions ensure trust and accountability, every step of the way.
              </p>
            </div>
            <div className="text-center bg-gray-900 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-white mb-2">Passive Income</h3>
              <p className="text-gray-300">
                Earn from dividends, rental yields, and long-term asset appreciation.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Dual-Token System Section */}
      <section className="py-16 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-400 text-center mb-8">
            Dual-Token System
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {/* FCT Token */}
            <div className="bg-gray-900 p-6 sm:p-8 rounded-lg shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center">
                <i className="bi bi-check-circle text-blue-500 mr-2"></i> FCT Token
              </h3>

              <ul className="list-disc list-inside text-gray-300 text-sm sm:text-base space-y-2">
                <li>Total Supply: 1 billion tokens</li>
                <li>Utility: Pay fees, stake for rewards, access premium features</li>
                <li>Fully backed by stablecoins and cash reserves</li>
              </ul>
            </div>
            {/* FST Token */}
            <div className="bg-gray-900 p-6 sm:p-8 rounded-lg shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center">
                <i className="bi bi-check-circle text-blue-500 mr-2"></i> FST Token
              </h3>

              <ul className="list-disc list-inside text-gray-300 text-sm sm:text-base space-y-2">
                <li>Dynamic Supply: Minted as assets are tokenized</li>
                <li>Intrinsic Value: Backed by real-world asset ownership</li>
                <li>Equilibrium Maintained: Tokens burned upon asset liquidation</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-blue-400 mb-4">FCT Token Allocation</h2>
          {/* Scrolling Hint for Mobile */}
          <div className="relative">
            <p className="text-gray-400 text-sm text-center mb-2 md:hidden">Swipe left or right to view the table.</p>
            <div className="overflow-x-auto border border-gray-700 rounded-lg">
              <table className="table-auto w-full text-left border-collapse">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-blue-400 text-sm md:text-base">Category</th>
                    <th className="px-4 py-2 text-blue-400 text-sm md:text-base">Percentage</th>
                    <th className="px-4 py-2 text-blue-400 text-sm md:text-base">Tokens Allocated</th>
                    <th className="px-4 py-2 text-blue-400 text-sm md:text-base">Details</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-700">
                  <tr>
                    <td className="px-4 py-2 text-sm md:text-base">Pre-Sale</td>
                    <td className="px-4 py-2 text-sm md:text-base">3.5%</td>
                    <td className="px-4 py-2 text-sm md:text-base">35M</td>
                    <td className="px-4 py-2 text-sm md:text-base">Raise $4.5M–$5M at $0.30 per token.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm md:text-base">Liquidity Pool (Year 1)</td>
                    <td className="px-4 py-2 text-sm md:text-base">2%</td>
                    <td className="px-4 py-2 text-sm md:text-base">20M</td>
                    <td className="px-4 py-2 text-sm md:text-base">Paired with $1.6M cash to stabilize trading at launch.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm md:text-base">Liquidity Growth (Years 3–5)</td>
                    <td className="px-4 py-2 text-sm md:text-base">3%</td>
                    <td className="px-4 py-2 text-sm md:text-base">30M</td>
                    <td className="px-4 py-2 text-sm md:text-base">Gradually added to grow liquidity to 5% by Year 6.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm md:text-base">Operations Reserve</td>
                    <td className="px-4 py-2 text-sm md:text-base">25%</td>
                    <td className="px-4 py-2 text-sm md:text-base">250M</td>
                    <td className="px-4 py-2 text-sm md:text-base">Reserved for upgrades and marketing.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm md:text-base">Founders Allocation</td>
                    <td className="px-4 py-2 text-sm md:text-base">20%</td>
                    <td className="px-4 py-2 text-sm md:text-base">200M</td>
                    <td className="px-4 py-2 text-sm md:text-base">Locked for 4 years, vested at 25% annually.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-5xl text-center">
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link
              to="/whitepaper"
              aria-label="View detailed Whitepaper"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 hover:scale-105 transition-transform"
            >
              Read Our Whitepages
            </Link>


            <a
              href="/tokenomics.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View detailed Tokenomics"
              className="px-6 py-3 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-600 hover:scale-105 transition-transform"
            >
              View Tokenomics
            </a>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="bg-gray-800 py-16 px-6 md:px-12 lg:px-20 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-blue-400 mb-10">Our Roadmap</h2>
          <ul className="space-y-6 text-gray-300">
            <li>
              <div className="text-blue-400 font-bold text-2xl mb-1">2025</div>
              <p>Launch token pre-sale and finalize platform beta testing.</p>
            </li>
            <li>
              <div className="text-blue-400 font-bold text-2xl mb-1">2026:</div>
              <p>Deploy the marketplace with real-time tracking tools and staking features.</p>
            </li>
            <li>
              <div className="text-blue-400 font-bold text-2xl mb-1">2027:</div>
              <p>List FCT tokens on major exchanges and expand offerings.</p>
            </li>
            <li>
              <div className="text-blue-400 font-bold text-2xl mb-1">2028-2030:</div>
              <p>Introduce new asset categories like art, collectibles, and global opportunities.</p>
            </li>
          </ul>
        </div>
      </section>
      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join the FractionaX Movement</h2>
          <p className="text-lg mb-6">
            Be part of a groundbreaking platform that democratizes wealth creation. Invest, earn, and grow with FractionaX.
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-200">
            Sign Up for Pre-Sale
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;
