import React from "react";
import Header from "../components/Header";

const HomePage = () => {
  return (
    <div>
      <Header />
      <main>
        <section className="homepage-section">
          <div className="homepage-container">
            <h1 className="homepage-title">
              Own the Future of Investment
            </h1>
            <p className="homepage-description">
              FractionaX empowers you to unlock premium investments through blockchain-powered fractional ownership. Join us to revolutionize how the world invests and earns.
            </p>
            <div className="homepage-video">
              <video 
                src="/videos/invideo-ai.mp4" 
                controls 
                className="homepage-video-element"
              />
            </div>
          </div>
          <div class="col text-center">
            <h8>FractionaX is a blockchain-powered platform revolutionizing access to premium investments through fractional ownership
              <p></p>
              With our dual-token system—FCT (Fractional Collateral Token), over-collateralized at 1:1.5 by cryptocurrencies and stablecoins.
              and FST (Fractional Security Token), directly tied to high-value assets like real estate
              <p></p>
              Investors can securely access opportunities while earning consistent passive income. 
              Built on Hedera Hashgraph, FractionaX ensures scalability, transparency, and security, unlocking new pathways for wealth creation.”
              <p></p>
              </h8>
          </div>
        </section>
        <div className="b-example-divider"></div>
        <section className="features-section">
          <div className="features-row">
            <div className="feature-item">
              <div className="feature-icon">
                <svg className="bi" width="1em" height="1em"><use xlinkHref="#toggles2" /></svg>
              </div>
              <div>
                <img src="/images/Duel-Token Logo.png" alt="FractionaX Features" />
                <h3>Dual-Token Ecosystem</h3>
                <p>Combines FCT (Utility Token) for platform transactions and staking with FST (Security Token) for direct ownership in tokenized assets like real estate, offering flexibility and functionality.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg className="bi" width="1em" height="1em"><use xlinkHref="#cpu-fill" /></svg>
              </div>
              <div>
                <img src="https://iv-prod-pro-generatives.s3.amazonaws.com/d8cc9443-121d-44fd-bbdb-28b9ab241970/d8cc9443-121d-44fd-bbdb-28b9ab241970?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAYPWI4T73NQFCUYDR%2F20250101%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250101T000611Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIEmwRK4E6UlytAsk%2BtyNhf9QODovCycLw5xUtZS%2F3KX1AiEAjQsWFa0dWcbzL4V0DzGD%2FaqUg471B3bptrAk3%2Br0EGgq%2FAQIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAEGgw1ODM0NjMxMTY3OTAiDHR9QZJtCW%2BW1Ctt4SrQBABdMu2DA7mEHeM4%2BNIA1HBLVVto%2BEfr4Z%2BSJHjf7eS92dTaZrfH0ib5wm9nKQ6DASgGZ%2FXY%2BsnFz5O%2BhcNhgycTzsBOuy7jqWblTIM1wsUnZP68QenuvMUk8dO3vRb6Ia9cpU3gLtHMmYEsYVbu5IFsSqJyXolRdc%2Fx6e3LcUc6LqQiUNjSytR6Cr3Fjmj0sAAcFMUbqRHDGOeCZHCCZqNVw7t%2Fx%2BqXLXZ6Opb97feUo5KY9TpFX0gk0rDFuDyWJcoOnZlTr57C05Xsc9wtPJCXZgEXj0%2F70T%2BcyjawlR7FC7wpBpUgUCUkIma6QqiKTf5g7t4fXMpI26MSV3ZfCERC9w4%2BvNqdkl%2FgN%2B5SXPDiSJcBAdGNhktdKgZ%2Bv07GgKed7KNYqnMG9zO0l5putIVnKqaWk0SlJ3GTmN7Yyqgm9YJinDU%2FaLbmWN2PcUMtA7514L%2Fu3RbrvF4Y7F8Bvv%2BQNIoBsCXdssat%2BIueEJZ9dFeu42222YSO5mhGcrbgLc3gNccs%2FYl17mo3sZFRUYboZIivU575MImizjwTXF37T%2FRM%2FLlHuXrbesUIlCZICXDOt3%2BBVivpDmIsycOnAAxwdmu0GvyvYQPym5fJPFpjamU2MspIeeySKoiT%2F4PBjW7FGXjYHv8SFaxYhMjpSdDSiRS0bnS3bpyzRXmvbdysttDXIMSgFSut1aymYfNEqUroqkKJ3TWbePxXEHmcYV46cY%2F8917JEbuJewF%2Bd8dXTRh40b4SE8pue4BDO5dUqvOrXjav9Nu8QfUWDKmH1Y8w543SuwY6mgE8Jl%2FKgmMihQqKBhvYBX%2BTTrbz5egaCUYM0V8SjzE86tLRykwPYJFwW4qnV4CHxdCUZwvbOAf7ac3tYP04wsTYFCM5b1uEZP%2Ff8Qc%2FHsVzxgJ3djQYeA%2FLgRblaw4r8N%2BD9xAD1XZFpWE8ouBEh9eHjFAN9kK22n0Pr5Q7EmIEJIIkiWrEA0o%2FH5ehaw%2BJCJdXoETGxAWz%2BXje&X-Amz-SignedHeaders=host&X-Amz-Signature=f6c519c5ec4e45ab7d423ffd7523de941e61b0fecb5aa8e1721840d0a70f5b9c" alt="FractionaX Features" />
                <h3>Investment Tokenization</h3>
                <p>Fractionalizes high-value assets, enabling access to premium investments previously reserved for large-scale investors.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg className="bi" width="1em" height="1em"><use xlinkHref="#tools" /></svg>
              </div>
              <div>
                <img src='https://iv-prod-pro-generatives.s3.amazonaws.com/861530a3-343d-4189-84b9-37f4aae7764e/861530a3-343d-4189-84b9-37f4aae7764e?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAYPWI4T73E5YW6FZA%2F20250101%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250101T001042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCICDmNzgXg0%2BcfihYfHJFoXV33%2FpVYj9a8kqjqa46NLoVAiEAoanIfmgl9YlJeIUAtqevfEXuGM%2F8Lj%2BmCPcQXN2a48kq%2FAQIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAEGgw1ODM0NjMxMTY3OTAiDOe2WYJR%2FKM%2BaDAfXyrQBGlrDbdqG7hpqJIVydJ4O1d2fcrRl2AhBrXknpZn9WgUs%2FJjdk4HwM6B3GTqE9KPpWRHV3zKe89HPIjC%2FxFqkGu4iQQdqzZBpq8b83SWSMAU31ZijBh9QPJNnUozVJMODcMM%2BzF6cfjsdRXJja32WNrheVPZIY7plwtn5DGs3vatv3qOVr4BjxJVP1m8btKH8FRumUn0epJZ7D0l0VnGrVyXJPJQ%2B2r2I0A9b4CkDf2voffJimZL6zg1iLKZYNh%2F9i0RNvm6etabXlfPGrDzODvVatny24vR23VUpf3ja4vZkYZFeM%2FdLruRaCyswOPv2giWsO8mp6Q8XSuVWwCkexS4e73QmeCtAOqVHtntoluAeHLCBsEyOewvkg%2Bdao53vOAGn1FpOWSIvkAD%2F1iYg%2BmhfoSPpgg78iR%2F5Zw4t%2BBwBtDy4GrdIUzEV3%2FUUfi8MxqvEiVFCA7vEiTeDrbsfC5Ksfo9B7u6%2Bl4AkyjpCDD9MiiI4k%2F8vAuSA%2FwPXpbTwR8dDAeLl5gFbdo%2FZD2JscXhKKvfcBKqDa%2FuyWaZKMi1Tln38SXLpghw2R6pdXoiVOU40bZj8ythEEkmqblBM8ZpGUPabkEvBu%2BN23aKpxKLZMoEzR4BAu0FI%2B658%2BGDMiduGm38C3Xbliu5Eij%2BwpyF4lsbggA9EbHJ94D6Ukc232gVNRAa94U6yBafi5FbQ1eB9PVQwB3kLtbsHI4yqwUtoEyUeqyEEbZ6%2FLld0LikvGVxTknnqDOiWRVYol4rZwMU8OpcsQCl7GsoCpDFIBcw9o%2FSuwY6mgFfffm9EKXbUVGrPFcBaJQCTPqitb4OSAkQyZvDX4uu%2FyKrqV4GXCQVmNnZy8FNKx5oPrI0Fj6q6%2BUIi%2Bn%2FNasFjMLcZSWLiR8Ox4EYS356B7%2Bh%2B%2B%2BIPa8ZXIlYHpYJWQKjjL82Kdtgvb9AG0XMvAzVYjoG82ANkFBv7xQpw64Smt7da0JDgAs6Np%2BMnjQiRY3NewerydSKZcLT&X-Amz-SignedHeaders=host&X-Amz-Signature=3d2add31c0c63a731aeb7ffd83543e8bea2b12276c905a1bc1f47b9f9be994d2' alt="FractionaX Features" /> 
                <h3>Compliance and Transparency</h3>
                <p>Built with KYC/AML integration and adherence to securities regulations, ensuring secure and lawful investment opportunities on a blockchain-powered platform.</p>
              </div>
            </div>
          </div>
        </section>
        <div className="b-example-divider"></div>
        <section className="properties-section">
        <div class="col text-center">
          <h1>Income Revenue Examples</h1>
          </div>
          <div className="container">
            <div className="properties-row">
              <div className="property-item">
                <img src="https://photos.zillowstatic.com/fp/47383d6aba5b2fe0c9b7fbe118db4455-uncropped_scaled_within_1536_1152.webp" alt="Property 1" />
                <div className="property-details">
                  <h5>The ReHab Project</h5>
                  <p>Fractional ownership available. Invest in a $1,000,000 luxury villa. Each FST token represents $100 of ownership.</p>
                  <ul>
                    <li>Current Value: $1,000,000</li>
                    <li>Tokens Available: 10,000</li>
                    <li>Rental Yield: 5% annually</li>
                  </ul>
                  <div className="actions">
                    <button>View Details</button>
                    <button>Invest Now</button>
                  </div>
                </div>
              </div>
              <div className="property-item">
                <img src="https://photos.zillowstatic.com/fp/1c77268941c53110bdcc36348516ba50-uncropped_scaled_within_1536_1152.webp" alt="Property 2" />
                <div className="property-details">
                  <h5>The New Project</h5>
                  <p>Own a share of a $500,000 urban apartment. Each FST token is $50.</p>
                  <ul>
                    <li>Current Value: $500,000</li>
                    <li>Tokens Available: 10,000</li>
                    <li>Rental Yield: 6% annually</li>
                  </ul>
                  <div className="actions">
                    <button>View Details</button>
                    <button>Invest Now</button>
                  </div>
                </div>
              </div>
              <div className="property-item">
                <img src="https://photos.zillowstatic.com/fp/a9f52e718eb135c27a6d4d8920ffc79b-uncropped_scaled_within_1536_1152.webp" alt="Property 3" />
                <div className="property-details">
                  <h5>The Establish Project</h5>
                  <p>Invest in a $750,000 beachfront condo. Each FST token is $75.</p>
                  <ul>
                    <li>Current Value: $750,000</li>
                    <li>Tokens Available: 10,000</li>
                    <li>Rental Yield: 4.5% annually</li>
                  </ul>
                  <div className="actions">
                    <button>View Details</button>
                    <button>Invest Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="benefits-section">
          <h2>Benefits of Using FractionaX</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <svg className="benefit-icon">
                <use xlinkHref="#bootstrap" />
              </svg>
              <div>
                <h3>Affordable Access to Premium Assets</h3>
                <p>Paragraph of text beneath the heading to explain the heading.</p>
              </div>
            </div>
            <div className="benefit-item">
              <svg className="benefit-icon">
                <use xlinkHref="#cpu-fill" />
              </svg>
              <div>
                <h3>Passive Income Opportunities</h3>
                <p>Paragraph of text beneath the heading to explain the heading.</p>
              </div>
            </div>
            <div className="benefit-item">
              <svg className="benefit-icon">
                <use xlinkHref="#calendar3" />
              </svg>
              <div>
                <h3>Staking Rewards</h3>
                <p>Paragraph of text beneath the heading to explain the heading.</p>
              </div>
            </div>
            <div className="benefit-item">
              <svg className="benefit-icon">
                <use xlinkHref="#home" />
              </svg>
              <div>
                <h3>Global Participation</h3>
                <p>Paragraph of text beneath the heading to explain the heading.</p>
              </div>
            </div>
            <div className="benefit-item">
              <svg className="benefit-icon">
                <use xlinkHref="#speedometer2" />
              </svg>
              <div>
                <h3>Transparency and Security</h3>
                <p>Paragraph of text beneath the heading to explain the heading.</p>
              </div>
            </div>
            <div className="benefit-item">
              <svg className="benefit-icon">
                <use xlinkHref="#toggles2" />
              </svg>
              <div>
                <h3>Revenue-Driven Growth</h3>
                <p>Paragraph of text beneath the heading to explain the heading.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
