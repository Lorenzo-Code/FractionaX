import React, { useState } from "react";

const RegulatoryComplianceSummary = () => {
  const [expanded, setExpanded] = useState(null);

  const complianceDetails = [
    {
      id: 1,
      title: "Token Classification",
      description:
        "FCT is classified as a utility token to enable platform functionality, while FST is registered as a security token to represent fractional ownership of assets.",
      icon: "🛡️",
      status: "Compliant",
      detailsLink: "/docs/token-classification",
    },
    {
      id: 2,
      title: "Licensing",
      description:
        "FractionaX operates as a Virtual Asset Service Provider (VASP) in blockchain-friendly jurisdictions and has obtained ATS licenses for secondary trading.",
      icon: "📜",
      status: "Compliant",
      detailsLink: "/docs/licensing",
    },
    {
      id: 3,
      title: "KYC/AML Compliance",
      description:
        "The platform enforces Know Your Customer (KYC) and Anti-Money Laundering (AML) protocols to ensure secure and compliant user onboarding.",
      icon: "🔍",
      status: "Pending",
      detailsLink: "/docs/kyc-aml",
    },
    {
      id: 4,
      title: "Transparency",
      description:
        "We provide regular financial disclosures, third-party audits of smart contracts, and maintain detailed records for token holders.",
      icon: "💡",
      status: "Compliant",
      detailsLink: "/docs/transparency",
    },
    {
      id: 5,
      title: "Data Privacy",
      description:
        "FractionaX adheres to GDPR and CCPA standards, utilizing state-of-the-art encryption to protect user data and privacy.",
      icon: "🔒",
      status: "Compliant",
      detailsLink: "/docs/data-privacy",
    },
  ];

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const renderBadge = (status) => {
    const colors = {
      Compliant: "bg-green-500",
      Pending: "bg-yellow-500",
      "In Progress": "bg-blue-500",
    };
    return (
      <span
        className={`text-white text-sm font-bold px-2 py-1 rounded-full ${colors[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-400 mb-6">
        Regulatory and Compliance Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {complianceDetails.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-3xl mr-4">{item.icon}</span>
                <h3 className="text-lg font-bold text-blue-400">
                  {item.title}
                </h3>
              </div>
              {renderBadge(item.status)}
            </div>
            <p className="text-gray-400 mb-4">{item.description}</p>
            <div className="flex items-center justify-between">
              <button
                onClick={() => toggleExpand(item.id)}
                className="text-blue-400 hover:underline"
              >
                {expanded === item.id ? "Show Less" : "Show More"}
              </button>
              <a
                href={item.detailsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Details
              </a>
            </div>
            {expanded === item.id && (
              <div className="mt-4 text-sm text-gray-300">
                <p>
                  For additional information, refer to the detailed documentation
                  linked above. This section provides further clarification on
                  compliance procedures, legal frameworks, and operational
                  processes.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Audit Logs */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold text-blue-400 mb-4">Recent Audits</h3>
        <ul className="space-y-2">
          <li className="flex justify-between text-gray-400">
            <span>Smart Contract Audit - December 2024</span>
            <a
              href="/docs/audit-dec-2024"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Report
            </a>
          </li>
          <li className="flex justify-between text-gray-400">
            <span>Financial Disclosure - Q3 2024</span>
            <a
              href="/docs/financial-q3-2024"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Report
            </a>
          </li>
          <li className="flex justify-between text-gray-400">
            <span>GDPR Compliance Review - 2024</span>
            <a
              href="/docs/gdpr-2024"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Report
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RegulatoryComplianceSummary;
