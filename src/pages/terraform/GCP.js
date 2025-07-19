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

  const [version, setVersion] = useState("");
  const [reqVersion, setReqVersion] = useState("");
  const [project, setProject] = useState("");
  const [region, setRegion] = useState("");
  const [credentialsFilePath, setCredentialsFilePath] = useState("");
  const [bucketName, setBucketName] = useState("");
  const [location, setLocation] = useState("");


  const terraform = `
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ${version}
    }
  }
  required_version = ${reqVersion}
}

provider "google" {
  credentials = file(var.credentials_file)
  project     = var.project
  region      = var.region
}

variable "project" {
  description = "GCP project ID"
  type        = string
  project     = ${project}
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = ${region}
}

variable "credentials_file" {
  description = "Path to GCP service account credentials JSON file"
  type        = string
  default     = ${credentialsFilePath}
}

variable "bucket_name" {
  description = "The name of the storage bucket"
  type        = string
  default     = ${bucketName}
}

resource "google_storage_bucket" "default" {
  name     = var.bucket_name
  location = ${location}
}

output "bucket_url" {
  description = "URL of the GCS bucket"
  value       = google_storage_bucket.default.url
}

  `
    return (
        <>
            <h1 className="display-4 text-center mb-3 mt-3">GCP Terraform Generator</h1>
            <p className="text-center mb-5">Generate a GCP Terraform file Generator.</p>
            <div className="container">
              <div className="data">
                <div className="details bg-light">
                  <div className="accordion">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordionGCP" aria-expanded="true" aria-controls="accordionGCP">Terraform GCP Version</button>
                      </h2>

                      <div className="accordion-collapse collapse show" id="accordionGCP" data-bs-toggle="collapse" aria-labelledby="accordionGCP" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <strong>Version</strong>
                          <input type="text" className="form-control mb-3" value={version} onChange={(e) => setVersion(e.target.value)} />
                          <strong>Required Version</strong>
                          <input type="text" className="form-control mb-3" value={reqVersion} onChange={(e) => setReqVersion(e.target.value)} />
                          <strong>Project</strong>
                          <input type="text" className="form-control mb-3" value={project} onChange={(e) => setProject(e.target.value)} />
                          <strong>Region</strong>
                          <input type="text" className="form-control mb-3" value={region} onChange={(e) => setRegion(e.target.value)} />
                          <strong>Credentials File Path</strong>
                          <input type="text" className="form-control mb-3" value={credentialsFilePath} onChange={(e) => setCredentialsFilePath(e.target.value)} />
                          <strong>Bucket Name</strong>
                          <input type="text" className="form-control mb-3" value={bucketName} onChange={(e) => setBucketName(e.target.value)} />
                          <strong>Location</strong>
                          <input type="text" className="form-control mb-3" value={location} onChange={(e) => setLocation(e.target.value)} />
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