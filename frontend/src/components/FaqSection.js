import React, { useState } from "react";

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleDropdown = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: "What is FractionaX, and how does it work?",
      answer:
        "FractionaX is a blockchain-powered platform that enables fractional ownership of premium assets like real estate. By leveraging a dual-token system, users can invest in high-value assets securely and earn consistent passive income.",
    },
    {
      question: "How secure is my investment on FractionaX?",
      answer:
        "FractionaX ensures security through the Hedera Hashgraph blockchain, known for its scalability and transparency. We also implement over-collateralized tokens, KYC/AML compliance, and strict security protocols.",
    },
    {
      question: "What are FCT and FST tokens, and what are their differences?",
      answer:
        "FCT is a utility token used for transactions and staking, backed by 1.5x collateral. FST represents direct ownership in assets, entitling holders to income and capital appreciation.",
    },
    {
      question: "Is there a minimum investment amount required?",
      answer:
        "Yes, the minimum investment depends on the specific asset. For example, a $1,000,000 property with 10,000 FST tokens has a $100 minimum investment per token.",
    },
    {
      question: "Can I sell my FST tokens or withdraw my funds at any time?",
      answer:
        "Yes, FST tokens can be traded on secondary markets, providing liquidity for investors. FCT tokens can also be redeemed or withdrawn based on platform availability.",
    },
  ];

  return (
    <section className="faq-section">
      <div className="container">
        <div className="row align-items-center">
          {/* Logo Section */}
          {/* <div className="col-lg-4 text-center">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/logo.svg`}
              alt="FractionaX Logo"
              className="faq-logo"
            />
          </div> */}

          {/* FAQ Section */}
          <div className="col-lg-8">
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <div className="faq-accordion">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <button
                    className={`faq-question ${
                      activeIndex === index ? "active" : ""
                    }`}
                    onClick={() => toggleDropdown(index)}
                  >
                    {faq.question}
                    <span className="faq-icon">
                      {activeIndex === index ? "-" : "+"}
                    </span>
                  </button>
                  <div
                    className={`faq-answer ${
                      activeIndex === index ? "show" : ""
                    }`}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;