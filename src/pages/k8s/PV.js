import React, { useState } from 'react'

function PV() {

  const copyToClipboard = () => {
  navigator.clipboard.writeText(pv).then(() => {
    alert("PV YAML copied to clipboard!");
  });
};

const downloadYAML = () => {
  const blob = new Blob([pv], { type: "text/yaml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pv.yaml";
  a.click();
  URL.revokeObjectURL(url);
};

  const [api, setAPI] = useState("");
  const [kind, setKind] = useState("pv");
  const [name, setName] = useState("");
  const [namespace, setNamespace] = useState("");
  const [labels, setLabels] = useState({app:"", env:"", tier:""});
  const [annotations, setAnnotations] = useState([{key: "", value: ""}]);
  const [mountPath, setMountPath] = useState([]);
  const [accessModes, setAccessModes] = useState("ReadWriteOnce");
  const [storageClassName, setStorageClassName] = useState("standard");
  const [storageSize, setStorageSize] = useState("1Gi");
  const [server, setServer] = useState("");
  const [mountOptions, setMountOptions] = useState([]);
  const [matchExpressionsKey, setMatchExpressionsKey] = useState("kubernetes.io/hostname");
  const [matchExpressionsOperator, setMatchExpressionsOperator] = useState("In");
  const [matchExpressionsValue, setMatchExpressionsValue] = useState("value");
  const [pvReclaimPolicy, setPVReclaimPolicy] = useState("Retain");

  const addAnnotation = () => {
    setAnnotations(prev => [...prev, { key: '', value: '' }]);
  };

  const handleAnnotationChange = (index, field, value) => {
    const newAnnotations = [...annotations];
    newAnnotations[index][field] = value;
    setAnnotations(newAnnotations);
  };

const addMountOption = () => {
  setMountOptions(prev => [...prev, '']);
}

const handleMountOptionChange = (index, value) => {
  const newMountOptions = [...mountOptions];
  newMountOptions[index] = value;
  setMountOptions(newMountOptions);
}

const pv = `
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
  
  capacity:
    storage: ${storageSize}
  accessModes:
    - ${accessModes}
  persistentVolumeReclaimPolicy: ${pvReclaimPolicy}
  storageClassName: ${storageClassName}
  mountOptions:
    - hard
    - nfsvers=4.1
    ${mountOptions ? `-${mountOptions}` : ""}
  nfs:
    path: ${mountPath}
    server: ${server}
  nodeAffinity:
    required:
      nodeSelectorTerms:
        - matchExpressions:
            - key: ${matchExpressionsKey}
              operator: ${matchExpressionsOperator}
              values:
                - ${matchExpressionsValue}


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
                          <strong>Persistent Volume Reclaim Policy</strong>
                          <select className="form-select mb-3" value={pvReclaimPolicy} onChange={(e) => setPVReclaimPolicy(e.target.value)}>
                            <option value="Retain">Retain</option>
                            <option value="Recycle">Recycle</option>
                            <option value="Delete">Delete</option>
                          </select>
                          <strong>Storage Class Name</strong>
                          <input type="text" className="form-control mb-3" placeholder="standard" value={storageClassName} onChange={(e) => setStorageClassName(e.target.value)} />
                          
                          {/* Mount Options Section */}
                          <div className="accordion-item mb-3">
                            <h2 className="accordion-header">
                              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMountOptions" aria-expanded="true" aria-controls="collapseMountOptions">
                                Mount Options
                              </button>
                            </h2>
                            <div className="accordion-collapse collapse show" id="collapseMountOptions" aria-labelledby="headingMountOptions" data-bs-parent="#accordionMountOptions">
                              <div className="accordion-body">
                                {mountOptions.map((option, index) => (
                                  <div className="mb-3" key={index}>
                                    <input 
                                      type="text" 
                                      className="form-control mb-3" 
                                      placeholder={`Option ${index + 1}`} 
                                      value={option} 
                                      onChange={(e) => handleMountOptionChange(index, e.target.value)} 
                                    />
                                  </div>
                                ))}
                                <button type="button" className="btn btn-outline-primary mb-3" onClick={addMountOption}>Add Mount Option</button>
                              </div>
                            </div>
                          </div>

                          <strong>Mount Path</strong>
                          <input type="text" className="form-control mb-3" placeholder="/mnt/data" value={mountPath} onChange={(e) => setMountPath(e.target.value)} />
                          <strong>Server</strong>
                          <input type="text" className="form-control mb-3" placeholder="nfs-server.example.com" value={server} onChange={(e) => setServer(e.target.value)} />
                          
                          {/* Node Affinity Section */}
                          <div className="accordion-item mb-3">
                            <h2 className="accordion-header">
                              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNodeAffinity" aria-expanded="true" aria-controls="collapseNodeAffinity">
                                Node Affinity
                              </button>
                            </h2>
                            <div className="accordion-collapse collapse show" id="collapseNodeAffinity" aria-labelledby="headingNodeAffinity" data-bs-parent="#accordionNodeAffinity">
                              <div className="accordion-body">
                                <strong>Match Expressions Key</strong>
                                <input type="text" className="form-control mb-3" placeholder="kubernetes.io/hostname" value={matchExpressionsKey} onChange={(e) => setMatchExpressionsKey(e.target.value)} />
                                <strong>Match Expressions Operator</strong>
                                <select className="form-select mb-3" value={matchExpressionsOperator} onChange={(e) => setMatchExpressionsOperator(e.target.value)}>
                                  <option value="In">In</option>
                                  <option value="NotIn">NotIn</option>
                                  <option value="Exists">Exists</option>
                                  <option value="DoesNotExist">DoesNotExist</option>
                                </select>
                                <strong>Match Expressions Value</strong>
                                <input type="text" className="form-control mb-3" placeholder="value" value={matchExpressionsValue} onChange={(e) => setMatchExpressionsValue(e.target.value)} />
                              </div>
                            </div>
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
              value={pv}
            ></textarea>
          </div>
          <div className="cmds">
            <h5>Commands</h5>
            <div className="cmd bg-light mb-4 align-content-center " style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl apply -f pv.yaml</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl get PV</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl get describe PV {name}</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl delete -f pv.yml</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PV;
