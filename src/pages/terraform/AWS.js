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

  const [version, setVersion] = useState("");
  const [reqVersion, setReqVersion] = useState("");
  const [region, setRegion] = useState("");
  const [profile, setProfile] = useState("default");
  const [instanceType, setInstanceType] = useState("");
  const [instanceTypeOther, setInstanceTypeOther] = useState("");
  const [ami, setAmi] = useState("");
  const [tag, setTag] = useState([{ key: "", value: "" }]);


  const addTag = () => {
    setTag([...tag, { key: "", value: "" }]);
  };

  const removeTag = (index) => {
    const updatedTags = [...tag];
    updatedTags.splice(index, 1);
    setTag(updatedTags);
  };

  const handleTagChange = (index, key, value) => {
    const updatedTags = [...tag];
    updatedTags[index] = { key, value };
    setTag(updatedTags);
  };

  const updateTag = (index, key, value) => {
    const updatedTags = [...tag];
    updatedTags[index][key] = value;
    setTag(updatedTags);
  };



  const terraform = `
terraform {
 required_providers {
  aws = {
      source  = "hashicorp/aws"
      version = ${version}
    }
  }
  required_version = ${reqVersion}
}

provider "aws" {
  region                  = var.region
  profile                 = var.profile
  shared_credentials_file = var.credentials_file
}

variable "region" {
  description = "AWS region"
  type        = string
  default     = "${region}"
}

variable "profile" {
  description = "AWS CLI profile to use"
  type        = string
  default     = ${profile}
}

variable "credentials_file" {
  description = "Path to AWS credentials file"
  type        = string
  default     = "~/.aws/credentials"
}

variable "instance_type" {
  description = "Type of EC2 instance"
  type        = string
  default     = $${instanceType ==="other" ? instanceTypeOther : instanceType}
}

variable "ami" {
  description = "AMI ID for the EC2 instance"
  type        = string
  default     = ${ami}
}

resource "aws_instance" "web" {
  ami                         = var.ami
  instance_type               = var.instance_type

  tags = {
    ${tag.map((tag, index) => `${tag.key} = "${tag.value}"`).join("\n    ")}
  }
}

output "instance_id" {
  description = "ID of the created EC2 instance"
  value       = aws_instance.web.id
}

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
                                        <strong>AWS Version</strong>
                                        <input type="text" className="form-control mb-3" placeholder="~>5.0" value={version} onChange={(e) => setVersion(e.target.value)} />
                                        <strong>Required Version</strong>
                                        <input type="text" className="form-control mb-3" placeholder=">= 2.5" value={reqVersion} onChange={(e) => setReqVersion(e.target.value)} />
                                        <strong>Region</strong>
                                        <select id="aws-region" name="region" className="form-select mb-3" value={region} onChange={(e) => setRegion(e.target.value)}>
                                            <option value="us-east-1">US East (N. Virginia)</option>
                                            <option value="us-east-2">US East (Ohio)</option>
                                            <option value="us-west-1">US West (N. California)</option>
                                            <option value="us-west-2">US West (Oregon)</option>
                                            <option value="ca-central-1">Canada (Central)</option>
                                            <option value="sa-east-1">South America (São Paulo)</option>
                                            <option value="eu-north-1">Europe (Stockholm)</option>
                                            <option value="eu-west-1">Europe (Ireland)</option>
                                            <option value="eu-west-2">Europe (London)</option>
                                            <option value="eu-west-3">Europe (Paris)</option>
                                            <option value="eu-central-1">Europe (Frankfurt)</option>
                                            <option value="eu-central-2">Europe (Zurich)</option>
                                            <option value="eu-south-1">Europe (Milan)</option>
                                            <option value="eu-south-2">Europe (Spain)</option>
                                            <option value="me-south-1">Middle East (Bahrain)</option>
                                            <option value="me-central-1">Middle East (UAE)</option>
                                            <option value="af-south-1">Africa (Cape Town)</option>
                                            <option value="ap-south-1">Asia Pacific (Mumbai)</option>
                                            <option value="ap-south-2">Asia Pacific (Hyderabad)</option>
                                            <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
                                            <option value="ap-southeast-2">Asia Pacific (Sydney)</option>
                                            <option value="ap-southeast-3">Asia Pacific (Jakarta)</option>
                                            <option value="ap-southeast-4">Asia Pacific (Melbourne)</option>
                                            <option value="ap-northeast-1">Asia Pacific (Tokyo)</option>
                                            <option value="ap-northeast-2">Asia Pacific (Seoul)</option>
                                            <option value="ap-northeast-3">Asia Pacific (Osaka)</option>
                                            <option value="cn-north-1" disabled>China (Beijing) 🔒</option>
                                            <option value="cn-northwest-1" disabled>China (Ningxia) 🔒</option>
                                            <option value="us-gov-west-1" disabled>GovCloud (US-West) 🔒</option>
                                            <option value="us-gov-east-1" disabled>GovCloud (US-East) 🔒</option>
                                        </select>
                                        <strong>Profile</strong>
                                        <input type="text" className="form-control mb-3" placeholder="default/dev/prod" value={profile} onChange={(e) => setProfile(e.target.value)} />
                                        <strong>Instance Type</strong> <br />
                                        <select id="instance-type" name="instance_type" className="form-select" value={instanceType} onChange={(e) => setInstanceType(e.target.value)}>
                                            <option value="t2.nano">t2.nano 1vCPU 1GiB Memory</option>
                                            <option value="t2.micro">t2.micro 1vCPU 1GiB Memory</option>
                                            <option value="t2.small">t2.small 1vCPU 2 GiB Memory</option>
                                            <option value="t2.medium">t2.medium 2 vCPU 4 GiB Memory</option>
                                            <option value="t2.large">t2.large 2 vCPU 8 GiB Memory</option>
                                            <option value="t2.xlarge">t2.xlarge 4 vCPU 16 GiB Memory</option>
                                            <option value="t2.2xlarge">t2.2xlarge 8 vCPU 32 GiB Memory</option>
                                            <option value="t3.nano">t3.nano 2 vCPU 0.5 GiB Memory</option>
                                            <option value="t3.micro">t3.micro 2vCPU 1 GiB Memory</option>
                                            <option value="t3.small">t3.small 2vCPU 2 GiB Memory</option>
                                            <option value="t3.medium">t3.medium 2 vCPU 4 GiB Memory</option>
                                            <option value="t3.large">t3.large 2 vCPU 8 GiB Memory</option>
                                            <option value="t3.xlarge">t3.xlarge 4 vCPU 16 GiB Memory</option>
                                            <option value="t3.2xlarge">t3.2xlarge 8 vCPU 32 GiB Memory</option>
                                            <option value="c5.large">c5.large 2 vCPU 4 GiB Memory</option>
                                            <option value="c5.xlarge">c5.xlarg 4 vCPU 8 GiB Memory</option>
                                            <option value="c5.4xlarge">c5.4xlarge 16 vCPU 32 GiB Memory</option>
                                            <option value="c5.12xlarge">c5.12xlarge 48 vCPU 96 GiB Memory</option>
                                            <option value="c5.24xlarge">c5.24xlarge 96 vCPU 192 GiB Memory</option>
                                            <option value="c5.metal">c5.metal 96 vCPU 192 GiB Memory</option>
                                            <option value="c5.9xlarge">c5.9xlarge 36 vCPU 72 GiB Memory</option>
                                            <option value="c5.2xlarge">c5.2xlarge 8 vCPU 16 GiB Memory</option>
                                            <option value="c5.18xlarge">c5.18xlarge 72 vCPU 144 GiB Memory</option>
                                            <option value="c5a.large">c5a.large 2 vCPU 4 GiB Memory</option>
                                            <option value="c5a.xlarge">c5a.xlarge 4 vCPU 8 GiB Memory</option>
                                            <option value="c5a.4xlarge">c5a.4xlarge 16 vCPU 32 GiB Memory</option>
                                            <option value="c5a.12xlarge">c5a.12xlarge 48 vCPU 96 GiB Memory</option>
                                            <option value="c5a.24xlarge">c5a.24xlarge 96 vCPU 192 GiB Memory</option>
                                            <option value="other">Other</option>
                                        </select>
                                        {instanceType === "other" && <input type="text" className="form-control mb-3" placeholder="Enter Instance Type" value={instanceTypeOther} onChange={(e) => setInstanceTypeOther(e.target.value)} />}
                                        <strong>AMI</strong>
                                        <select id="ami-type" name="ami_type" className="form-select" value={ami} onChange={(e) => setAmi(e.target.value)}>
                                            <optgroup label="Amazon Linux">
                                                <option value="ami-0150ccaf51ab55a51">Amazon Linux 2023 Kernel-6.1 AMI</option>
                                                <option value="ami-050fd976aa387c0d">Amazon Linux 2023 Kernel-6.12 AMI (64-bit)</option>
                                                <option value="ami-00b530caaf8eee2c5">Amazon Linux 2023 (Deep Learning Base OSS Nvidia Driver GPU AMI)</option>
                                                <option value="ami-0025c2ddec381a62b">Amazon Linux 2023 (Deep Learning OSS Nvidia Driver AMI GPU PyTorch 2.7)</option>
                                                <option value="ami-00a53112f12d51df87">Amazon Linux 2023 Deep Learning OSS Nvidia Driver AMI GPU TensorFlow 2.18</option>
                                                <option value="ami-07d8eccf304688344">Amazon Linux 2023 (Deep Learning AMI Neuron)</option>
                                                <option value="ami-08ae91d91a31119d0">Amazon Linux 2 LTS with SQL Server 2019 Standard</option>
                                                <option value="ami-023fd51a5b6c84f9e">Amazon Linux 2 LTS with SQL Server 2017 Standard</option>
                                            </optgroup>

                                            <optgroup label="Ubuntu">
                                                <option value="ami-020cba7c55df1f615">Ubuntu Server 24.04 LTS (HVM), SSD Volume Type</option>
                                                <option value="ami-0a7d80731ae1b2435">Ubuntu Server 22.04 LTS (HVM), SSD Volume Type</option>
                                                <option value="ami-07b7f66b629de9364">Ubuntu Server 22.04 LTS (HVM) with SQL Server 2022 Standard</option>
                                                <option value="ami-013f478ef10960da1">Ubuntur Pro - Ubuntu Server Pro 24.04 LTS (HVM), SSD Volume Type</option>
                                                <option value="ami-0f0b5f003bca0fead">Ubuntu 24.04 Deep Learning Base OSS Nvidia Driver GPU AMI</option>
                                                <option value="ami-02a169a4427f8ac5b">Ubuntu 22.04 Deep Learning OSS Nvidia Driver AMI GPU PyTorch 2.7</option>
                                                <option value="ami-04da727cdfde8ceb8">Ubuntu 22.04 Deep Learning OSS Nvidia Driver AMI GPU TensorFlow 2.18</option>
                                                <option value="ami-0034e664023874efb">Ubuntu 22.04 Deep Learning AMI Neuron</option>
                                            </optgroup>
                                            <optgroup label="Red Hat 64-bit">
                                              <option value="ami-0ec18f6103c5e0491">Red Hat Enterprise Linux 10 (HVM), SSD Volume Type</option>
                                              <option value="ami-0c5d10c64897b15df">Red Hat Enterprise Linux 10 with High Availability</option>
                                              <option value="ami-0dfc569a8686b9320">Red Hat Enterprise Linux 9 (HVM), SSD Volume Type</option>
                                              <option value="ami-09e3cdc22d9c858cc">RHEL 8 with SQL Server 2022 Standard Edition AMI</option>
                                            </optgroup>
                                            <optgroup label="Debain 64-bit">
                                              <option value="ami-0779caf41f9ba54f0">Debian 12 (HVM), SSD Volume Type</option>
                                            </optgroup>
                                            <optgroup label="SUSE Linux 64-bit">
                                              <option value="ami-06528c11a66cef7a8">SUSE Linux Enterprise Server 15 SP7 (HVM), SSD Volume Type</option>
                                              <option value="ami-07122687544266da7">SUSE Linux Enterprise Servr 12 SP5 (HVM), SSD Volume Type</option>
                                            </optgroup>
                                            <optgroup label="Windows 64-bit">
                                              <option value="ami-0c9fb5d338f1eec43">Microsoft Windows Server 2025 Base</option>
                                              <option value="ami-0a643ff39fabd8fe9">Microsoft Windows Server 2025 Core base</option>
                                              <option value="ami-0758218dcb57e4a14">Microsoft Windows Server 2022 Base</option>
                                              <option value="ami-0dcf8128496168525">Microsoft Windows Server 2022 Core Base</option>
                                              <option value="ami-0623bc4c9a53fe562">Microsoft Windows Server 2019 Base</option>
                                              <option value="ami-0fe47ded0ea93b33d">Microsoft Windows Server 2019 Core Base</option>
                                              <option value="ami-0585184f0cbc71d00">Microsoft Wnidows Server 2016 Base</option>
                                              <option value="ami-02b60df36308b4147">Microsoft Windows Server 2016 Core Base</option>
                                              <option value="ami-0bfd13fa4bec60cd2">Microsoft Windows Server 2022 with SQL Server 2022 Standard</option>
                                              <option value="ami-045c4dad0aa7bf7bb">Microsoft Windows Server 2022 with SQL Server 2022 Enterprise</option>
                                              <option value="ami-06634f0cca322e7ab">Microsoft Windows Server 2022 with SQL Server 2022 Web</option>
                                              <option value="ami-08a15c3f84aaf7331">Microsoft Windows Server 2019 with SQL Server 2022 Standard</option>
                                              <option value="ami-01958fed1c83e8402">Microsoft Windows Server 2019 with SQL Server 2022 Enterprise</option>
                                              <option value="ami-0f19d2156139dcf47">Microsoft Windows Server 2022 withSQL Server 2019 Standard</option>
                                              <option value="ami-04d2b85609145c300">Microsoft Windows Server 2022 with SQL Server 2019 Enterprise</option>
                                              <option value="ami-02220657ebad01ba2">Microsoft Windows Server 2019 with SQL Server 2019 Standard</option>
                                              <option value="ami-00307dc167da19510">Microsoft Windows Server 2019 with SQL Server 2019 Enterprise</option>
                                              <option value="ami-0befe6e0faa5f78b0">Microsoft Windows Server 2019 with SQL Server 2019 Web</option>
                                              <option value="ami-0305fef6376b3b67e">Microsft Windows Server 2019 with SQL Server 2017 Standard</option>
                                              <option value="ami-09331bd87b8261e7b">Microsoft Windows Server 2022 with Microsoft Visual Studio Enterprise 2022</option>
                                              <option value="ami-03fd5f567e9754d62">Microsoft Windows Server 2022 with Office Professional Plus</option>
                                            </optgroup>
                                            <optgroup label="Mac OS 64-bit">
                                              <option value="ami-043cfcc8b0832d11a">Mac OS Sequoia</option>
                                              <option value="ami-003b683d4b1ab633b">MacOS Sonoma</option>
                                              <option value="ami-00c438da744fd0f37">MacOS Ventura</option>
                                            </optgroup>
                                        </select>
                                        <strong>Tags</strong>
                                        {tag.map((tag, index) => (
                                            <div key={index} className="input-group mb-3">
                                                <input type="text" className="form-control" placeholder="Tag Key eg., Name" value={tag.key} onChange={(e) => updateTag(index, "key", e.target.value)} />
                                                <input type="text" className="form-control" placeholder="Tag Value eg., Web Server" value={tag.value} onChange={(e) => updateTag(index, "value", e.target.value)} />
                                                <button type="button" className="btn btn-danger" onClick={() => removeTag(index)}>Delete</button>
                                            </div>
                                        ))}
                                        <button type="button" className="btn btn-primary" onClick={addTag}>Add Tag</button>
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
    );
};