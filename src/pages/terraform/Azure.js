import React, { useState } from "react";

export default function Azure() {
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

  const [version, setVersion] = useState("");
  const [reqVersion, setReqVersion] = useState("");
  const [sensitive, setSensitive] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [resourceGroupName, setResourceGroupName] = useState("");
  const [location, setLocation] = useState("");

  const terraform = `
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ${version}
    }
  }
  required_version = ${reqVersion}
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
  client_id       = var.client_id
  client_secret   = var.client_secret
  tenant_id       = var.tenant_id
}

variable "subscription_id" {
  description     = "Azure Subscription ID"
  type            = string
  subscription_id = ${subscriptionId}
}

variable "client_id" {
  description = "Service Principal Client ID"
  type        = string
  client_id   = ${clientId}
}

variable "client_secret" {
  description = "Service Principal Client Secret"
  type        = string
  sensitive   = ${sensitive}
  client_secret = ${clientSecret}
}

variable "tenant_id" {
  description = "Azure Tenant ID"
  type        = string
  tenant_id   = ${tenantId}
}

variable "resource_group_name" {
  description = "Name of the Resource Group"
  default     = ${resourceGroupName}
  type        = string
}

variable "location" {
  description = "Azure region"
  default     = ${location}
  type        = string
}

resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location
}

output "resource_group_id" {
  description = "The ID of the resource group"
  value       = azurerm_resource_group.main.id
}

  `
    return (
        <>
            <h1 className="display-4 text-center mb-3 mt-3">Azure Terraform Generator</h1>
            <p className="text-center mb-5">Generate a Azure Terraform file Generator.</p>
            <div className="container">
                <div className="data">
                    <div className="details bg-light">
                      <div className="accordion">
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOne"
                              aria-expanded="false"
                              aria-controls="collapseOne"
                            >
                              Terraform Version
                            </button>

                          </h2>
                          <div className="accordion-collapse collapse show" id="collapseOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                              <strong>Version</strong>
                              <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="~> 3.0.0"
                                value={version}
                                onChange={(e) => setVersion(e.target.value)}
                              />
                              <strong>Required Version</strong>
                              <input type="text" className="form-control mb-3" placeholder=">= 3.0.0" value={reqVersion} onChange={(e) => setReqVersion(e.target.value)} />
                              <strong>Sensitive</strong>
                              <select className="form-select mb-3" value={sensitive} onChange={(e) => setSensitive(e.target.value)}>
                                <option value={false}>false</option>
                                <option value={true}>true</option>
                              </select>
                              <strong>Subscription ID</strong>
                              <input type="text" className="form-control mb-3" placeholder="Subscription ID" value={subscriptionId} onChange={(e) => setSubscriptionId(e.target.value)} />
                              <strong>Client ID</strong>
                              <input type="text" className="form-control mb-3" placeholder="Client ID" value={clientId} onChange={(e) => setClientId(e.target.value)} />
                              <strong>Client Secret</strong>
                              <input type="text" className="form-control mb-3" placeholder="Client Secret" value={clientSecret} onChange={(e) => setClientSecret(e.target.value)} />
                              <strong>Tenant ID</strong>
                              <input type="text" className="form-control mb-3" placeholder="Tenant ID" value={tenantId} onChange={(e) => setTenantId(e.target.value)} />
                              <strong>Resource Group Name</strong>
                              <input type="text" className="form-control mb-3" placeholder="Resource Group Name" value={resourceGroupName} onChange={(e) => setResourceGroupName(e.target.value)} />
                              <strong>Location</strong>
                              <input type="text" className="form-control mb-3" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
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