import React, { useState } from 'react'

function Namespace() {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(Namespace).then(() => {
      alert("Namespace YAML copied to clipboard!");
    });
  };
  
  const downloadYAML = () => {
    const blob = new Blob([Namespace], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "namespace.yaml";
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const [api, setAPI] = useState("");
  const [kind, setKind] = useState("Namespace");
  const [name, setName] = useState("");
  const [namespace, setNamespace] = useState("");
  const [env, setEnv] = useState("");
  const [team, setTeam] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");


  const Namespace = `
apiVersion: ${api}
kind: ${kind}
metadata:
  name: ${name}
  labels:
    environment: ${env}
    team: ${team}
  annotations:
    description: "${description}"
    owner: "${owner}"

  `;
  return (
    <>
      <h1 className="text-center mt-5">Kubernetes Namespace Generator</h1>
      <p className="text-center mb-5">Generate a Kubernetes Namespace YAML file with custom metadata and labels.</p>
      <div className="container">
        <div className="data">
          <div className="details bg-light" style={{borderRadius: "8px"}}>
            <div className="accordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Basic Information
                  </button>
                </h2>
                
                <div className="accordion-collapse collapse show" id="collapseOne" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <strong>API Version</strong>
                    <input 
                      type="text" 
                      className="form-control mb-2" 
                      placeholder="Enter API Version" 
                      value={api} 
                      onChange={(e) => setAPI(e.target.value)}
                    />

                    <strong>Kind</strong>
                    <input 
                      type="text" 
                      className="form-control mb-2" 
                      placeholder="Enter Kind" 
                      value={kind} 
                      onChange={(e) => setKind(e.target.value)}
                    />
                    <strong>METADATA/</strong> <br />
                    <strong className="ms-3">Name</strong>
                    <input type="text" 
                      className="form-control mb-2 ms-3"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <strong className="ms-3">Namespace</strong>
                    <input type="text" 
                      className="form-control mb-2 ms-3"
                      placeholder="Enter Namespace"
                      value={namespace}
                      onChange={(e) => setNamespace(e.target.value)}
                    />
                    <strong className="ms-3">Labels/</strong> <br />
                    <strong className="ms-3">Environment</strong>
                    <input type="text" className="form-control mb-2 ms-3" placeholder="production" value={env} onChange={(e) => setEnv(e.target.value)} />
                    <strong className="ms-3">team</strong>
                    <input type="text" className="form-control mb-2 ms-3" placeholder="backend" value={team} onChange={(e) => setTeam(e.target.value)} />

                    <strong className="ms-3">Annotations/</strong> <br />
                    <strong className="ms-3">Description</strong>
                    <input type="text" className="form-control mb-2 ms-3" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <strong className="ms-3">Owner</strong>
                    <input type="text" className="form-control mb-2 ms-3" placeholder="Enter Owner" value={owner} onChange={(e) => setOwner(e.target.value)} />

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
              value={Namespace}
            ></textarea>
          </div>
          <div className="cmds">
            <h5>Commands</h5>
            <div className="cmd bg-light mb-4 align-content-center " style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl apply -f namespace.yaml</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl get namespace</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl describe namespace <span className="text-danger">{name}</span></div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl delete namespace <span className="text-danger">{name}</span></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Namespace
