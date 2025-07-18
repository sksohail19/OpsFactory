import React, { useState } from "react";

export default function GCP() {
    const copyToClipboard = () => {
    navigator.clipboard.writeText(terraform).then(() => {
      alert("erraform copied to clipboard!");
    });
  };
  
  const downloadYAML = () => {
    const blob = new Blob([terraform], { type: "text" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Terraform.tf";
    a.click();
    URL.revokeObjectURL(url);
  };

  const terraform = `
  `
    return (
        <>
            <h1 className="display-4 text-center mb-3 mt-3">GCP Terraform Generator</h1>
            <p className="text-center mb-5">Generate a GCP Terraform file Generator.</p>
            <div className="container">
                <div className="data">
                    <div className="details bg-light"></div>
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
                        value={terraform} readOnly
                        className="form-control"
                        ></textarea>
                    </div>
                </div>
            </div>
        </>
    )
}