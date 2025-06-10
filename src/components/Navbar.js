import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navbar({ title, mode, toggleMode }) {
  const themeClass = mode === "dark" ? "light-theme" : "dark-theme";

  return (
    <>
      {/* Title Navbar */}
      <nav className={`navbar ${themeClass}`}>
        <div className="container-fluid justify-content-center">
          <span className="navbar-brand mb-0 h1 text-center">{title}</span>
        </div>
      </nav>

      {/* Main Navbar */}
      <nav className={`navbar navbar-expand-md ${themeClass} sticky-top`}>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            <ul className="navbar-nav nav-underline">
              <li className="nav-item">
                <Link className={`nav-link ${themeClass}`} to="/">Home</Link>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${themeClass}`}
                  href="https://sksohail19.github.io/Portfolio/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About Me
                </a>
              </li>
              <li className="nav-item dropdown">
                <Link className={`nav-link dropdown-toggle ${themeClass}`} to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Features
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className={`dropdown-item ${themeClass}`} to="/features/docker">Docker</Link></li>
                  <li><Link className={`dropdown-item ${themeClass}`} to="/features/k8s">Kubernetes</Link></li>
                  <li><Link className={`dropdown-item ${themeClass}`} to="/features/ansible">Ansible</Link></li>
                  <li><Link className={`dropdown-item ${themeClass}`} to="/features/terraform">Terraform</Link></li>
                  <li><Link className={`dropdown-item ${themeClass}`} to="/features/jenkins">Jenkins</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${themeClass}`} to="/contact">Contact Me</Link>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link ${themeClass}`}
                  onClick={toggleMode} disabled={mode === "light"}
                >
                  Enable {mode === "dark" ? "Light" : "Dark"} Mode
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  toggleMode: PropTypes.func.isRequired
};

export default Navbar;
