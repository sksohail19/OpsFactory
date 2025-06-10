import React, { useState } from 'react'
import '../styles/docker.css';
import { Link } from 'react-router-dom';
import dockerCompose from '../assets/docker-compose.png';
import dockerfile from '../assets/docker-logo.png';
function DockerFileGenerator(mode) {
 /* const bgColor = mode === "dark" ? "bg-dark" : "bg-light";
  const textColor = mode === "dark" ? "text-light" : "text-dark"; */
  const horizontalLine = 
  <div className="horizontal">
    <h6></h6>
  </div>;
  
  const bgColor = "light-theme";
  const textColor = "light-text";

  return (
    <>
      <div className={`${bgColor} ${textColor} holder`}>
        <div className="heading p-5">
          <h3 className="display-4">Dockerfile Generator</h3>
        </div>
        
        <div className="docker-features">
          <div className="dockerfile">
            <Link to="/features/docker/file" className={`cta-button custom-link nav-link ${bgColor} ${textColor}`}>
              <h3 className="display-4">Dockerfile</h3>
              <img 
                loading = "lazy"
                src= {dockerfile}
                alt="Dockerfile icon"
              />
              <figcaption className="cta-button custom-link nav-link">Generate</figcaption>
            </Link>
          </div>

          
          <div className="dockercompose">
            <Link to="/features/docker/compose" className={`cta-button custom-link nav-link ${bgColor} ${textColor}`}> 
              <h3 className="display-4">Docker Compose</h3>
              <img
                loading = "lazy"
                src= {dockerCompose}
                alt="Docker logo"
                />
              <figcaption className="cta-button custom-link nav-link">Generate</figcaption>
              
            </Link>
          </div>

          
        </div>   
      </div>

      { horizontalLine }

      <div className= {`${bgColor} ${textColor} differences`}>
          <h3 className="display-4">Differences</h3>
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Dockerfile</th>
                <th>Docker Compose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Purpose</td>
                <td>Defines how to build a Docker image</td>
                <td>Defines and runs multi-container Docker applications</td>
              </tr>
              <tr>
                <td>File Format</td>
                <td>Plain text file with Docker instructions</td>
                <td>YAML configuration file</td>
              </tr>
              <tr>
                <td>Command Used</td>
                <td><code>docker build</code></td>
                <td><code>docker-compose up</code></td>
              </tr>
              <tr>
                <td>Scope</td>
                <td>Single container/image</td>
                <td>Multi-container orchestration</td>
              </tr>
              <tr>
                <td>Use Case</td>
                <td>Creating a custom image</td>
                <td>Running apps with multiple services (e.g., app + DB)</td>
              </tr>
            </tbody>
          </table>
        </div>


        { horizontalLine }

        <div className="workflow">
          <h3 className="display-4">Workflow</h3>
          <p>To use Dockerfile Generator, follow these steps:</p>
          <ol>
            <li>Select either Docker Compose or Dockerfile.</li>
            <li>Fill in the required fields based on your application needs.</li>
            <li>Click the "Generate" button to create the configuration file.</li>
            <li>Download the generated file and use it in your Docker setup.</li>
          </ol>
        </div>
    </>
  )
}

export default DockerFileGenerator;
