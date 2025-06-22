import React, { useState } from 'react';
import yaml from "js-yaml";


function Ingress() {
const handleCopy = () => {
  // Generate YAML using the same logic as the ingress constant
  const isNumericPort = (port) => port && !isNaN(parseInt(port)) && isFinite(port);
  
  const groupedRules = rules.reduce((acc, rule) => {
    const hostKey = rule.host || '""';
    if (!acc[hostKey]) acc[hostKey] = [];
    acc[hostKey].push(rule);
    return acc;
  }, {});

  const yamlContent = `
apiVersion: ${api}
kind: ${kind}
metadata:
  name: ${name}
  namespace: ${namespace}
  labels:
    app: ${labels.app}
    env: ${labels.env}
    tier: ${labels.tier}
  annotations:
${annotations.filter(a => a.key).map(a => `    ${a.key}: "${a.value}"`).join('\n')}
spec:
${secret && hosts.some(h => h.host) ? `  tls:
  - hosts:
${hosts.filter(h => h.host).map(h => `    - ${h.host}`).join('\n')}
    secretName: ${secret}
` : ''}  rules:
${Object.entries(groupedRules).map(([host, pathRules]) => `  - host: ${host}
    http:
      paths:
      ${pathRules.map(rule => `      - path: ${rule.path}
          pathType: ${rule.pathType}
          backend:
            service:
              name: ${rule.backend}
              port:
                ${isNumericPort(rule.backendPort) ? `number: ${rule.backendPort}` : `name: ${rule.backendPort}`}
`).join('')}`).join('')}
${defaultBackend ? `  defaultBackend:
    service:
      name: ${defaultBackend}
      port:
        ${isNumericPort(defaultBackendPort) ? `number: ${defaultBackendPort}` : `name: ${defaultBackendPort}`}
` : ''}`.trim();

  if (!yamlContent || yamlContent.includes('""') || yamlContent.includes('undefined')) {
    alert("YAML content is incomplete. Please fill all required fields.");
    return;
  }

  navigator.clipboard.writeText(yamlContent)
    .then(() => alert("Ingress.yml content copied to clipboard!"))
    .catch((err) => console.error("Copy failed:", err));
};




const [yamlOutput, setYamlOutput] = useState("");
const handleDownload = () => {
  const blob = new Blob([], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "ingress.yaml";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};  

const [api, setAPI] = useState("");
const [kind, setKind] = useState("Ingress");
const [annotations, setAnnotations] = useState([{ key: "", value: "" }]);
const [secret, setSecret] = useState("");

const handleChange = (index, field, value) => {
    const updatedAnnotations = [...annotations];
    updatedAnnotations[index][field] = value;
    setAnnotations(updatedAnnotations);
  };

const addAnnotation = () => {
    setAnnotations([...annotations, { key: "", value: "" }]);
  };

const [hosts, setHosts] = useState([{ host: "" }]);
  const [rules, setRules] = useState([
    { host: "", path: "", pathType: "", backend: "", backendPort: "" },
  ]);

  const handleHostChange = (index, field, value) => {
    const updatedHosts = [...hosts];
    updatedHosts[index][field] = value;
    setHosts(updatedHosts);
  };

  const addHost = () => {
    setHosts([...hosts, { host: "" }]);
  };

  const handleRuleChange = (index, field, value) => {
    const updatedRules = [...rules];
    updatedRules[index][field] = value;
    setRules(updatedRules);
  };

  const addRule = () => {
    setRules([
      ...rules,
      { host: "", path: "", pathType: "", backend: "", backendPort: "" },
    ]);
  };


  const [defaultBackend, setDefaultBackend] = useState("");
  const [defaultBackendPort, setDefaultBackendPort] = useState("");
  const [name, setName] = useState("");
  const [namespace, setNamespace] = useState("");
  const [labels, setLables] = useState({ app: "", env: "", tier: "" });

  // Helper function to determine port type
const isNumericPort = (port) => port && !isNaN(parseInt(port)) && isFinite(port)

// Group rules by host for correct YAML structure
const groupedRules = rules.reduce((acc, rule) => {
  const hostKey = rule.host || '""'; // Handle empty host
  if (!acc[hostKey]) acc[hostKey] = []
  acc[hostKey].push(rule)
  return acc
}, {})

const ingress = `
apiVersion: ${api}
kind: ${kind}
metadata:
  name: ${name}
  namespace: ${namespace}
  labels:
    app: ${labels.app}
    env: ${labels.env}
    tier: ${labels.tier}
  annotations:
${annotations.filter(a => a.key).map(a => `    ${a.key}: "${a.value}"`).join('\n')}
spec:
${secret && hosts.some(h => h.host) ? `  tls:
  - hosts:
${hosts.filter(h => h.host).map(h => `    - ${h.host}`).join('\n')}
    secretName: ${secret}
` : ''}  rules:
${Object.entries(groupedRules).map(([host, pathRules]) => `  - host: ${host}
    http:
      paths:
      ${pathRules.map(rule => `      - path: ${rule.path}
          pathType: ${rule.pathType}
          backend:
            service:
              name: ${rule.backend}
              port:
                ${isNumericPort(rule.backendPort) ? `number: ${rule.backendPort}` : `name: ${rule.backendPort}`}
`).join('')}`).join('')}
${defaultBackend ? `  defaultBackend:
    service:
      name: ${defaultBackend}
      port:
        ${isNumericPort(defaultBackendPort) ? `number: ${defaultBackendPort}` : `name: ${defaultBackendPort}`}
` : ''}`



  return (
    <>
      <div className="container">
        <div className="data">
          <div className="details bg-light">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Ingress Details
                  </button>
                </h2>

                <div className="accordion-collapse collapse show" id="collapseOne" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <strong>API Version</strong>
                    <input type="text" className="form-control mb-3" placeholder="networking.k8s.io/v1" value={api} onChange={(e) => setAPI(e.target.value)} />
                    <strong>Kind</strong>
                    <input type="text" className="form-control mb-3" placeholder="Ingress" value={kind} onChange={(e) => setKind(e.target.value)} />
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMetadata" aria-expanded="true" aria-controls="collapseMetadata">
                          Metadata
                        </button>
                      </h2>

                      <div className="accordion-collapse collapse show" id="collapseMetadata" data-bs-parent="#collapseOne">
                        <div className="accordion-body">
                          <strong>Name</strong>
                          <input type="text" className="form-control mb-3" placeholder="ingress-name" value={name} onChange={(e) => setName(e.target.value)} />
                          <strong>Namespace</strong>
                          <input type="text" className="form-control mb-3" placeholder="ingress-namespace" value={namespace} onChange={(e) => setNamespace(e.target.value)} />

                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button className="accordion-button" type='button' data-bs-toggle="collapse" data-bs-target="#collapseLabels" aria-expanded="true" aria-controls="collapseLabels">
                                Labels
                              </button>
                            </h2>

                            <div className="accordion-collapse collapse show" id="collapseLabels" data-bs-parent="#collapseMetadata">
                                <div className="accordion-body">
                                  <strong>App</strong>  
                                  <input type="text" className="form-control mb-3" placeholder="ingress-app" value={labels.app} onChange={(e) => setLables({ ...labels, app: e.target.value })} />
                                  <strong>Env</strong>
                                  <input type="text" className="form-control mb-3" placeholder="ingress-env" value={labels.env} onChange={(e) => setLables({ ...labels, env: e.target.value })} />
                                  <strong>Tier</strong>
                                  <input type="text" className="form-control mb-3" placeholder="ingress-tier" value={labels.tier} onChange={(e) => setLables({ ...labels, tier: e.target.value })} />
                                </div>
                              </div>
                          </div>

                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button className="accordion-button" type='button' data-bs-toggle="collapse" data-bs-target="#collapseAnnotations" aria-expanded="true" aria-controls="collapseAnnotations">
                                Annotations
                              </button>
                            </h2>
                            <div className="accordion-collapse collapse show" id="collapseAnnotations" data-bs-parent="#collapseMetadata">
                                <div className="accordion-body">
                                  {annotations.map((annotation, index) => (
                                  <div key={index}>
                                    <strong>Key</strong>
                                    <input
                                      type="text"
                                      className="form-control mb-3"
                                      placeholder="kubernetes.io/ingress.class"
                                      value={annotation.key}
                                      onChange={(e) =>
                                        handleChange(index, "key", e.target.value)
                                      }
                                    />

                                    <strong>Value</strong>
                                    <input
                                      type="text"
                                      className="form-control mb-3"
                                      placeholder="nginx"
                                      value={annotation.value}
                                      onChange={(e) =>
                                        handleChange(index, "value", e.target.value)
                                      }
                                    />
                                  </div>
                                ))}

                                <button
                                  className="btn btn-primary"
                                  onClick={addAnnotation}
                                  type="button"
                                >
                                  Add Annotation
                                </button>
                                </div>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSpec" aria-expanded="true" aria-controls="collapseSpec">
                          Spec
                        </button>
                      </h2>
                      <div className="accordion-collapse collapse show" id="collapseSpec" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <strong>ingressClassName</strong>
                          <input type="text" className="form-control mb-3" placeholder="nginix" />

                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseHost" aria-expanded="true" aria-controls="collapseHost">Hosts</button>
                            </h2>

                            <div className="accordion-collapse collapse show" id="collapseHost" data-bs-parent="#collapseSpec">
                              <div className="accordion-body">
                                {hosts.map((host, index) => (
                                  <div key={index}>
                                    <strong>Host</strong>
                                    <input
                                      type="text"
                                      className="form-control mb-3"
                                      placeholder="example.com"
                                      value={host.host}
                                      onChange={(e) =>
                                        handleHostChange(index, "host", e.target.value)
                                      }
                                    />
                                    <strong>Secret</strong>
                                    <input
                                      type="text"
                                      placeholder="secret"
                                      className="form-control mb-3"
                                      value={secret}
                                      onChange={(e) => setSecret(e.target.value)}
                                    />
                                  </div>
                                ))}

                                <button
                                  className="btn btn-primary"
                                  onClick={addHost}
                                  type="button"
                                >
                                  Add Host
                                </button>
                              </div>

                            </div>
                          </div>

                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseRules" aria-expanded="true" aria-controls="collapseRules">
                                Rules
                              </button>
                            </h2>

                            <div className="accordion-collapse collapse show" id="collapseRules" data-bs-parent="#collapseSpec">
                              <div className="accordion-body">
                                {rules.map((rule, index) => (
                                  <div key={index}>
                                    <strong>Host</strong>
                                    <input
                                      type="text"
                                      className="form-control mb-3"
                                      placeholder="example.com"
                                      value={rule.host}
                                      onChange={(e) =>
                                        handleRuleChange(index, "host", e.target.value)
                                      }
                                    />

                                    <strong>Path</strong>
                                    <input
                                      type="text"
                                      className="form-control mb-3"
                                      placeholder="/api(/|$)(.*)"
                                      value={rule.path}
                                      onChange={(e) =>
                                        handleRuleChange(index, "path", e.target.value)
                                      }
                                    />

                                    <strong>PathType</strong>
                                    <input
                                      type="text"
                                      className="form-control mb-3"
                                      placeholder="Prefix"
                                      value={rule.pathType}
                                      onChange={(e) =>
                                        handleRuleChange(index, "pathType", e.target.value)
                                      }
                                    />

                                    <strong>Backend Service Name</strong>
                                    <input
                                      type="text"
                                      className="form-control mb-3"
                                      placeholder="default-backend"
                                      value={rule.backend}
                                      onChange={(e) =>
                                        handleRuleChange(index, "backend", e.target.value)
                                      }
                                    />

                                    <strong>Backend Service Port</strong>
                                    <input
                                      type="text"
                                      className="form-control mb-3"
                                      placeholder="80"
                                      value={rule.backendPort}
                                      onChange={(e) =>
                                        handleRuleChange(index, "backendPort", e.target.value)
                                      }
                                    />
                                  </div>
                                ))}

                                <button
                                  className="btn btn-primary"
                                  onClick={addRule}
                                  type="button"
                                >
                                  Add Rule
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDefaultBackend" aria-expanded="true" aria-controls="collapseDefaultBackend">Default Backend</button>
                        </h2>
                        <div className="accordion-collapse collapse show" id="collapseDefaultBackend" data-bs-parent="#accordionSpec">
                          <div className="accordion-body">
                            <strong>Service Name</strong>
                            <input type="text" className="form-control mb-3" placeholder="default-backend" value={defaultBackend} onChange={(e) => setDefaultBackend(e.target.value)}/>
                            <strong>Port</strong>
                            <input type="text" className="form-control mb-3" placeholder="80" value={defaultBackendPort} onChange={(e) => setDefaultBackendPort(e.target.value)}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="controls d-flex justify-content-center mt-3 p-3 gap-5">
            <button className="btn btn-primary" type="button" >
              Generate YAML
            </button>
            <button type="button" onClick={handleCopy} className="btn btn-outline-secondary me-2">
            📋 Copy to Clipboard
          </button>
          <button type="button" onClick={handleDownload} className="btn btn-outline-success">
            ⬇️ Download Dockerfile
          </button>
          </div>
        </div>
        <div className="result"> 
          <div className="preview">
            <textarea name="form-control mb-4" id=""
            rows="30"
            cols= "30" 
            value={ingress}
            readOnly></textarea>
          </div>
          <div className="cmds">
            <h5>Commands</h5>
            <div className="cmd bg-light mb-4 align-content-center " style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl apply -f ingress.yaml</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl get ingress -n {namespace}</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl describe ingress {name} -n {namespace}</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl logs -l app.kubernetes.io/name=ingress-nginx -n ingress-nginx</div>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Ingress
