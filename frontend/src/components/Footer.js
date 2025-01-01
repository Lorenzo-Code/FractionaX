import React from "react";
import FaqSection from "./FaqSection";

const Footer = () => {
  return (
    <footer className="footer">
      {/* FAQ Section */}
      <FaqSection />
      <div className="container">
        <div className="row align-items-center">
          {/* Logo Section */}
          <div className="col-md-2 footer-logo">
            <a href="/">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/logo.svg`}
                alt="Company Logo"
                className="logo-img"
              />
            </a>
          </div>

          <div className="col-md-10">
            <div className="row">
              {/* Widget 1 */}
              <div className="col-6 col-md-3 col-lg-2 text-white">
                <h6>Company</h6>
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a className="nav-link" href="about-v1.html">
                      About us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="contact-us.html">
                      Contact us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="career.html">
                      Career <span className="badge">2 jobs</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="career-single.html">
                      Career detail
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="contact-us-v2.html">
                      Become a partner
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="service-v1.html">
                      Services
                    </a>
                  </li>
                </ul>
              </div>

              {/* Widget 2 */}
              <div className="col-6 col-md-3 col-lg-2 text-white">
                <h6>Resources</h6>
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a className="nav-link" href="portfolio-case-study-v1.html">
                      Case studies
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="pricing-v1.html">
                      Pricing <span className="badge">New</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="blog-minimal.html">
                      Blogs
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="blog-single.html">
                      Blog detail
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Success stories
                    </a>
                  </li>
                </ul>
              </div>

              {/* Widget 3 */}
              <div className="col-md-6 col-lg-4 text-white">
                <h6>Stay connected with us</h6>
                <form className="input-group">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <button type="button" className="btn">
                    <i className="bi bi-send-fill"></i>
                  </button>
                </form>
                <p>No Spam — We Promise!</p>

                <ul className="list-inline">
                  <li className="list-inline-item">Follow on:</li>
                  <li className="list-inline-item">
                    <a className="btn btn-icon" href="#">
                      <i className="bi bi-facebook"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="btn btn-icon" href="#">
                      <i className="bi bi-instagram"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="btn btn-icon" href="#">
                      <i className="bi bi-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="btn btn-icon" href="#">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="footer-bottom d-md-flex justify-content-between">
          <div className="text-body small">
            Copyrights ©2024 Folio. Build by{" "}
            <a href="https://www.webestica.com/">Webestica</a>.
          </div>
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link small" href="#">
                Privacy policy
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link small" href="#">
                Terms &amp; conditions
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
// Compare this snippet from frontend/src/components/Footer.js: