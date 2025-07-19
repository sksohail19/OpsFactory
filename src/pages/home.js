import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/home.css";
import Contact from "./Contact";

function Home({ mode }) {
  const themeClass = mode === "dark" ? "dark-theme" : "light-theme";

  return (
    <div className={`home ${themeClass}`}>
      <div className="main">
        <h1>About this application</h1>
        <p className={themeClass}>
          DevOps File Generator Application. This application helps you generate deployment configuration files for Jenkins, Docker, Kubernetes, Terraform, Ansible by providing a few inputs to the application.
        </p>
      </div>

      <section id="features" className="features">
        <h2>Supported DevOps Generation Tools</h2>
        <div className="features-grid">
          <div className="feature">
            <img
              loading="lazy"
              src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/144/external-docker-a-set-of-coupled-software-as-a-service-logo-shadow-tal-revivo.png"
              alt="Docker logo"
            />
            <p className={themeClass}>Docker</p><br />
            <Link to="/features/docker" className={`cta-button custom-link nav-link ${themeClass}`}>Explore</Link>
          </div>

          <div className="feature">
            <img
              loading="lazy"
              src="https://img.icons8.com/color/144/kubernetes.png"
              alt="Kubernetes logo"
            />
            <p className={themeClass}>Kubernetes</p><br />
            <Link to="/features/k8s" className={`cta-button custom-link nav-link ${themeClass}`}>Explore</Link>
          </div>

          <div className="feature">
            <img
              loading="lazy"
              src={
                mode === "dark"
                  ? "https://img.icons8.com/color/144/ansible.png"
                  : "https://img.icons8.com/windows/144/ansible.png"
              }
              alt="Ansible logo"
            />
            <p className={themeClass}>Ansible</p><br />
            <Link to="/features/ansible" className={`cta-button custom-link nav-link ${themeClass}`}>Explore</Link>
          </div>

          <div className="feature">
            <img
              loading="lazy"
              src="https://img.icons8.com/color/144/terraform.png"
              alt="Terraform logo"
            />
            <p className={themeClass}>Terraform</p><br />
            <Link to="/features/terraform" className={`cta-button custom-link nav-link ${themeClass}`}>Explore</Link>
          </div>

          <div className="feature">
            <img
              loading="lazy"
              src="https://img.icons8.com/color/144/jenkins.png"
              alt="Jenkins logo"
            />
            <p className={themeClass}>Jenkins</p><br />
            <Link to="/features/jenkins" className={`cta-button custom-link nav-link ${themeClass}`}>Explore</Link>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Choose a Tool</h3>
            <p className={themeClass}>Select from Docker, Kubernetes, Ansible, and more.</p>
          </div>
          <div className="step">
            <h3>2. Customize Config</h3>
            <p className={themeClass}>Enter the values you want in your config files.</p>
          </div>
          <div className="step">
            <h3>3. Generate & Download</h3>
            <p className={themeClass}>Click generate and download your ready-to-use YAML or config file.</p>
          </div>
        </div>
      </section>

      
      <Contact />
    </div>
  );
}

export default Home;
  