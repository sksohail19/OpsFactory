import React, { useState } from 'react'

function PVC() {

  const copyToClipboard = () => {
  navigator.clipboard.writeText(pvc).then(() => {
    alert("PVC YAML copied to clipboard!");
  });
};

const downloadYAML = () => {
  const blob = new Blob([pvc], { type: "text/yaml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pvc.yaml";
  a.click();
  URL.revokeObjectURL(url);
};

  const [api, setAPI] = useState("");
  const [kind, setKind] = useState("pvc");
  const [name, setName] = useState("");
  const [namespace, setNamespace] = useState("");
  const [labels, setLabels] = useState({app:"", env:"", tier:""});
  const [annotations, setAnnotations] = useState([{key: "", value: ""}]);
  const [accessModes, setAccessModes] = useState("ReadWriteOnce");
  const [storageClassName, setStorageClassName] = useState("standard");
  const [storageSize, setStorageSize] = useState("1Gi");
  
  const [matchLabels, setMatchLabels] = useState("local");
  
  const addAnnotation = () => {
    setAnnotations(prev => [...prev, { key: '', value: '' }]);
  };

  const handleAnnotationChange = (index, field, value) => {
    const newAnnotations = [...annotations];
    newAnnotations[index][field] = value;
    setAnnotations(newAnnotations);
  };



const pvc = `
apiVersion: ${api}
kind: ${kind}
metadata:
  name: ${name}
  namespace: ${namespace}
  labels:
    app: ${labels.app}
    environment: ${labels.env}
    tier: ${labels.tier}
  annotations:
    ${annotations.map((anno) => `${anno.key}: "${anno.value}"`).join(",\n    ")}
spec:
  
  accessModes:
    - ${accessModes}
  storageClassName: ${storageClassName}
  resources:
    requests:
      storage: ${storageSize}
  selector:
    matchLabels:
      type: ${matchLabels}


`;
  return (
    <>
      <h1 className="text-center mt-5">Kubernetes Persistant Volume Generator</h1>
      <p className="text-center mb-5">Generate a Kubernetes Persistant Volume YAML file with custom metadata and labels.</p>
      <div className="container">
        <div className="data">
          <div className="details bg-light" style={{borderRadius: "8px"}}>
            <div className="accordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Basic Details
                  </button>
                </h2>
                <div className="accordion-collapse collapse show" id="collapseOne" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <strong>API Version</strong>
                    <input type="text" className="form-control mb-3" placeholder="v1" value={api} onChange={(e) => setAPI(e.target.value)} />
                    <strong>Kind</strong>
                    <input type="text" className="form-control mb-3" placeholder="Pod"  readOnly/>
                    
                    {/* Metadata Section */}
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMetadata" aria-expanded="true" aria-controls="collapseMetadata">
                          Metadata
                        </button>
                      </h2>
                      <div className="accordion-collapse collapse show" id="collapseMetadata" aria-labelledby="headingMetadata" data-bs-parent="#accordionMetadata">
                        <div className="accordion-body">
                          <strong>Name</strong>
                          <input type="text" className="form-control mb-3" placeholder="my-pod" value={name} onChange={(e) => setName(e.target.value)} />
                          <strong>Namespace</strong>
                          <input type="text" className="form-control mb-3" placeholder='production' value={namespace} onChange={(e) => setNamespace(e.target.value)} />
                          
                          {/* Labels Section */}
                          <div className="accordion-item mb-3">
                            <h2 className="accordion-header">
                              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseLabel" aria-expanded="true" aria-controls="collapseLabel">
                                Labels
                              </button>
                            </h2>

                            <div className="accordion-collapse collapse show" id="collapseLabel" aria-labelledby="headingLabel" data-bs-parent="#accordionLabel">
                              <div className="accordion-body">
                                {["app", "env", "tier"].map((label, index) => (
                                  <div className="mb-3" key={index}>
                                    <strong htmlFor={`label-${label}`} className="form-label mb-3">{label.charAt(0).toUpperCase() + label.slice(1)}</strong>
                                    <input 
                                      type="text" 
                                      className="form-control mb-3" 
                                      id={`label-${label}`} 
                                      placeholder={label} 
                                      value={labels[label]} 
                                      onChange={(e) => setLabels({...labels, [label]: e.target.value})} 
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="accordion-item mb-3">
                            <h2 className="accordion-header">
                              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAnnotations" aria-expanded="true" aria-controls="collapseAnnotations">
                                Annotations
                              </button>
                            </h2>

                            <div className="accordion-collapse collapse show" id="collapseAnnotations" aria-labelledby="headingAnnotations" data-bs-parent="#accordionAnnotations">
                              <div className="accordion-body">
                                {annotations.map((annotation, index) => (
                                  <div className="mb-3" key={index}>
                                    <strong htmlFor={`annotation-${index}-key`} className="form-label mb-3">Key</strong>
                                    <input 
                                      type="text" 
                                      className="form-control mb-3" 
                                      id={`annotation-${index}-key`} 
                                      placeholder="key" 
                                      value={annotation.key} 
                                      onChange={(e) => handleAnnotationChange(index, 'key', e.target.value)} 
                                    />
                                    <strong htmlFor={`annotation-${index}-value`} className="form-label mb-3">Value</strong>
                                    <input 
                                      type="text" 
                                      className="form-control mb-3" 
                                      id={`annotation-${index}-value`} 
                                      placeholder="value" 
                                      value={annotation.value} 
                                      onChange={(e) => handleAnnotationChange(index, 'value', e.target.value)} 
                                    />
                                  </div>
                                ))}
                                <button type="button" className="btn btn-outline-primary" onClick={addAnnotation}>Add Annotation</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


                    {/* Specification Section */}
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSpec" aria-expanded="true" aria-controls="collapseSpec">
                          Specification
                        </button>
                      </h2>
                      <div className="accordion-collapse collapse show" id="collapseSpec" aria-labelledby="headingSpec" data-bs-parent="#accordionSpec">
                        <div className="accordion-body">
                          <strong>Capacity Storage</strong>
                          <input type="text" className="form-control mb-3" placeholder="1Gi" value={storageSize} onChange={(e) => setStorageSize(e.target.value)} />
                          <strong>Access Modes</strong>
                          <select className="form-select mb-3" value={accessModes} onChange={(e) => setAccessModes(e.target.value)}>
                            <option value="ReadWriteOnce">ReadWriteOnce</option>
                            <option value="ReadOnlyMany">ReadOnlyMany</option>
                            <option value="ReadWriteMany">ReadWriteMany</option>
                          </select>
                          
                          <strong>Storage Class Name</strong>
                          <input type="text" className="form-control mb-3" placeholder="standard" value={storageClassName} onChange={(e) => setStorageClassName(e.target.value)} />
              
                          <strong>Selector Match Labels Type</strong>
                          <input type="text" className="form-control mb-3" placeholder="local" value={matchLabels} onChange={(e) => setMatchLabels(e.target.value)} />
                        </div>
                      </div>
                    </div>
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
          <div className="preview vh-10">
            <textarea 
              rows="100"
              cols="100"
              value={pvc}
            ></textarea>
          </div>
          <div className="cmds">
            <h5>Commands</h5>
            <div className="cmd bg-light mb-4 align-content-center " style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl apply -f pvc.yaml</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl get PVC</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl get describe PVC {name}</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl delete -f pvc.yml</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PVC;
