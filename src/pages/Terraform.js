import React from "react";
import { Link } from "react-router-dom";
import "../styles/terraform.css";

export default function Terraform() {
    const bgColor = "light-theme";
    const textColor = "light-text";
    return (
        <>
                <h1 className="title text-center mb-3 mt-3">Terraform</h1>
                <p className="text-center mb-2">Generate Terraform configuration files for your DevOps workflows</p>
                <p className="text-center mb-3">Features</p>
            <div className={`${bgColor} ${textColor} terraform-container`}>

                
                <div class="parent">
                    <div class="child div1">
                        <Link to="/feartures/terraform/aws" className="link">Amazon Web Services (AWS)</Link>
                    </div>
                    <div class="child div2">
                        <Link to="/features/terraform/azure" className="link">Microsoft Azure</Link>
                    </div>
                    <div class="child div3">
                        <Link to="/features/terraform/gcp" className="link">Google Cloud Provider (GCP)</Link>
                    </div>
                </div>
            </div>
        </>
    );
}