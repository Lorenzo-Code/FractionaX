import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header-sticky">
      <nav className="navbar navbar-expand-xl">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img
              className="light-mode-item"
              src={`${process.env.PUBLIC_URL}/assets/images/fractionaX logo.svg`}   
              alt="logo"
            />
          </Link>

          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar collapse */}
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Services
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/services/design">
                      Design
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/services/development">
                      Development
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <ul className="nav">
            <li className="nav-item">
              <Link to="/sign-up" className="btn btn-sm btn-primary-grad">
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
