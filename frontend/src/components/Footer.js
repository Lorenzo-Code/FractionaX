import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark position-relative pt-6 pt-xl-8" data-bs-theme="dark">
      <div className="container">
        <div className="row g-4">
          {/* Widget 1 */}
          <div className="col-lg-4">
            <a className="navbar-brand me-0" href="/">
              <img
                className="light-mode-item navbar-brand-item h-40px"
                src={`${process.env.PUBLIC_URL}/assets/images/logo.svg`}
                alt="logo"
              />
              <img
                className="dark-mode-item navbar-brand-item h-40px"
                src={`${process.env.PUBLIC_URL}/assets/images/logo-light.svg`}
                alt="logo"
              />
            </a>
            <p className="my-3 my-lg-4">
              A Bootstrap theme that's both stylish and functional, perfect for any type of technology or corporate
              website.
            </p>
          </div>
        </div>

        <hr className="my-4 mt-xl-5 mb-0" />
        <div className="d-md-flex justify-content-between align-items-center text-center text-lg-start py-4">
          <div className="text-body small mb-3 mb-md-0">
            Copyrights ©2024 Folio. Build by {" "}
            <a
              href="https://www.webestica.com/"
              target="_blank"
              rel="noreferrer"
              className="text-body text-primary-hover hover-underline-animation"
            >
              Webestica.
            </a>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section bg-light pt-6">
        <div className="container">
          <h2 className="text-dark">FAQ</h2>
          <div className="accordion" id="accordionFaq">
            {/* Item 1 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  What payment methods do you accept?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionFaq"
              >
                <div className="accordion-body">
                  We accept all major credit cards, PayPal, and bank transfers for custom plans.
                </div>
              </div>
            </div>
            {/* Item 2 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Can I change my plan later?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionFaq"
              >
                <div className="accordion-body">
                  Yes, you can upgrade or downgrade your plan at any time from your account settings.
                </div>
              </div>
            </div>
            {/* Item 3 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Is there a free trial available?
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionFaq"
              >
                <div className="accordion-body">
                  Yes, we offer a 14-day free trial for our Basic and Standard plans. No credit card required.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

