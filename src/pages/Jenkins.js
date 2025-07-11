import React from 'react';
import "../styles/jenkins.css";

export default function Jenkins() {
    const copyToClipboard = () => {
    navigator.clipboard.writeText(jenkins).then(() => {
      alert("Config Map YAML copied to clipboard!");
    });
  };
  
  const downloadYAML = () => {
    const blob = new Blob([jenkins], { type: "text" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Jenkins";
    a.click();
    URL.revokeObjectURL(url);
  };

    const jenkins = `
    `

    return (
        <>
            <h1 className="display-4 text-center mb-3 mt-3">Jenkins Pipeline Generator</h1>
            <p className="text-center mb-5">Generate a Jenkins pipeline configuration file.</p>

            <div className="container  ">
                <div className="data">
                    <div className="details d-flex justify-content-center bg-light p-3 mb-4">
                        
                    </div>
                <div className="controls d-flex justify-content-center mt-3 p-3 gap-5">
                    <button type="button" onClick={copyToClipboard} className="btn btn-outline-secondary me-2">
                    📋 Copy to Clipboard
                    </button>
                    <button type="button" onClick={downloadYAML} className="btn btn-outline-success">
                    ⬇️ Download Dockerfile
                    </button>
                </div>
                </div>
                <div className="result">
                    <div className="preview">
                        <textarea 
                        rows="100"
                        cols="100"
                        value={jenkins} readOnly
                        className="form-control bg-light"
                        ></textarea>
                    </div>
                </div>
            </div>
        </>
    )
}