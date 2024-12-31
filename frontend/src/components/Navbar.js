import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">BrandName</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
          <li className="nav-item"><a className="nav-link" href="/about">About</a></li>
          <li className="nav-item"><a className="nav-link" href="/portfolio">Portfolio</a></li>
          <li className="nav-item"><a className="nav-link" href="/contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
