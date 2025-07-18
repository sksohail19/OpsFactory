import React, { useState } from "react";

export default function AWS() {
    const copyToClipboard = () => {
    navigator.clipboard.writeText(terraform).then(() => {
      alert("Terraform copied to clipboard!");
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
            <h1 className="display-4 text-center mb-3 mt-3">AWS Terraform Generator</h1>
            <p className="text-center mb-5">Generate a AWS Terraform file Generator.</p>
            <div className="container">
                <div className="data">
                    <div className="details bg-light">
                        <div className="accordion">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        AWS Terraform
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
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
                        value={terraform} readOnly
                        className="form-control"
                        ></textarea>
                    </div>
                </div>
            </div>
        </>
    )
}