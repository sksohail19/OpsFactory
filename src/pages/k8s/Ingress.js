import React, { useState } from 'react';
import yaml from "js-yaml";

function Ingress() {
const handleCopy = () => {
  navigator.clipboard.writeText().then(() => {
    alert("Ingress.yml content copied to clipboard!");
  });
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

   const generateYaml = () => {
  const annotationsMap = {};
  annotations.forEach(({ key, value }) => {
    if (key) annotationsMap[key] = value;
  });

  const labelMap = {};
  if (labels.app) labelMap["app"] = labels.app;
  if (labels.env) labelMap["environment"] = labels.env;
  if (labels.tier) labelMap["tier"] = labels.tier;

  const ruleMap = [];

  const groupedByHost = rules.reduce((acc, rule) => {
    if (!acc[rule.host]) acc[rule.host] = [];
    acc[rule.host].push({
      path: rule.path,
      pathType: rule.pathType,
      backend: {
        service: {
          name: rule.backend,
          port: isNaN(rule.backendPort)
            ? { name: rule.backendPort }
            : { number: parseInt(rule.backendPort) },
        },
      },
    });
    return acc;
  }, {});

  for (const host in groupedByHost) {
    ruleMap.push({
      host,
      http: {
        paths: groupedByHost[host],
      },
    });
  }

  const ingress = {
    apiVersion: api || "networking.k8s.io/v1",
    kind: kind || "Ingress",
    metadata: {
      name,
      namespace,
      labels: labelMap,
      annotations: annotationsMap,
    },
    spec: {
      ingressClassName: "nginx",
      rules: ruleMap,
      ...(defaultBackend && defaultBackendPort
        ? {
            defaultBackend: {
              service: {
                name: defaultBackend,
                port: isNaN(defaultBackendPort)
                  ? { name: defaultBackendPort }
                  : { number: parseInt(defaultBackendPort) },
              },
            },
          }
        : {}),
    },
  };

  const yamlContent = yaml.dump(ingress);
  setYamlOutput(yamlContent); // Store the YAML to show in the UI
};



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
                                  </div>
                                ))}
                                <strong>Secret</strong>
                                <input type="text" placeholder="secret" clasName="form-control mb-3"/>
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
            <button className="btn btn-primary" type="button" onClick={generateYaml}>
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
            value={yamlOutput}
            readOnly></textarea>
          </div>
          <div className="cmds">
            <h5>Commands</h5>
            <div className="cmd bg-light mb-4 align-content-center " style={{width: "250px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl apply -f service.yaml</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "250px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl get services</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "250px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl describe service myservice</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "250px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl delete service myservice</div>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Ingress
