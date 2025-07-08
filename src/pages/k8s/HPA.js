import React, { useState } from 'react'

function HPA() {

  const copyToClipboard = () => {
  navigator.clipboard.writeText(hpa).then(() => {
    alert("HPA YAML copied to clipboard!");
  });
};

const downloadYAML = () => {
  const blob = new Blob([hpa], { type: "text/yaml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "hpa.yaml";
  a.click();
  URL.revokeObjectURL(url);
};

  const [api, setAPI] = useState("");
  const [kind, setKind] = useState("hpa");
  const [name, setName] = useState("");
  const [namespace, setNamespace] = useState("");
  const [labels, setLabels] = useState({app:"", env:"", tier:""});
  const [annotations, setAnnotations] = useState([{key: "", value: ""}]);
  const [targetAPIVersion, setTargetAPIVersion] = useState("apps/v1");
  const [targetKind, setTargetKind] = useState("Deployment");
  const [targetName, setTargetName] = useState("");
  const [minReplicas, setMinReplicas] = useState(1);
  const [maxReplicas, setMaxReplicas] = useState(10);
  const [metric, setMetric] = useState([{type:"", resource: {name:"", target: {type:"", averageUtilization: 0}}}]);
  const [stabilizationWindowSeconds, setStabilizationWindowSeconds] = useState
(300);
  const [selectPolicy, setSelectPolicy] = useState("Max");
  const [policyType, setPolicyType] = useState("Pods");
  const [policyValue, setPolicyValue] = useState(4);
  const [policyPeriodSeconds, setPolicyPeriodSeconds] = useState(60);
  const [scaleDownStabilizationWindowSeconds, setScaleDownStabilizationWindowSeconds] = useState(300);
  const [scaleDownSelectPolicy, setScaleDownSelectPolicy] = useState("Min");
  const [scaleDownPolicyType, setScaleDownPolicyType] = useState("Pods");
  const [scaleDownPolicyValue, setScaleDownPolicyValue] = useState(4);
  const [scaleDownPolicyPeriodSeconds, setScaleDownPolicyPeriodSeconds] = useState(60);

  
  const addAnnotation = () => {
    setAnnotations(prev => [...prev, { key: '', value: '' }]);
  };

  const handleAnnotationChange = (index, field, value) => {
    const newAnnotations = [...annotations];
    newAnnotations[index][field] = value;
    setAnnotations(newAnnotations);
  };

  const handleMetricChange = (index, field, value) => {
  const newMetrics = [...metric];
  if (!newMetrics[index]) {
    newMetrics[index] = {
      type: "",
      resource: {
        name: "",
        target: {
          type: "",
          averageUtilization: 0
        }
      }
    };
  }

  if (field === "type") {
    newMetrics[index].type = value;
  } else if (field === "resourceName") {
    newMetrics[index].resource.name = value;
  } else if (field === "targetType") {
    newMetrics[index].resource.target.type = value;
  } else if (field === "averageUtilization") {
    newMetrics[index].resource.target.averageUtilization = Number(value);
  }

  setMetric(newMetrics);
};

const addMetric = () => {
  setMetric(prev => [
    ...prev,
    {
      type: "",
      resource: {
        name: "",
        target: {
          type: "",
          averageUtilization: 0
        }
      }
    }
  ]);
};

const removeAnnotation = (index) => {
  setAnnotations(prev => prev.filter((_, i) => i !== index));
};

const removeMetric = (index) => {
  setMetric(prev => prev.filter((_, i) => i !== index));
};


  const handleResourceChange = (index, field, value) => {
    const newMetrics = [...metric];
    if (!newMetrics[index]) {
      newMetrics[index] = { type: '', resource: { name: '', target: { type: '', averageUtilization: '' } } };
    }
    newMetrics[index].resource[field] = value;
    setMetric(newMetrics);
  }



const hpa = `
apiVersion: ${api}
kind: HorizontalPodAutoscaler
metadata:
  name: ${name}
  namespace: ${namespace}
  labels:
    app: ${labels.app}
    env: ${labels.env}
    tier: ${labels.tier}
  annotations:
${annotations
  .filter(a => a.key)
  .map(a => `    ${a.key}: "${a.value}"`)
  .join('\n') || '    {}'}
spec:
  scaleTargetRef:
    apiVersion: ${targetAPIVersion}
    kind: ${targetKind}
    name: ${targetName}
  minReplicas: ${minReplicas}
  maxReplicas: ${maxReplicas}
  metrics:
${metric
  .filter(m => m.type)
  .map(m => `    - type: ${m.type}
      resource:
        name: ${m.resource?.name}
        target:
          type: ${m.resource?.target?.type}
          averageUtilization: ${m.resource?.target?.averageUtilization}`)
  .join('\n') || ''}
  behavior:
    scaleUp:
      stabilizationWindowSeconds: ${stabilizationWindowSeconds}
      selectPolicy: ${selectPolicy}
      policies:
        - type: ${policyType}
          value: ${policyValue}
          periodSeconds: ${policyPeriodSeconds}
    scaleDown:
      stabilizationWindowSeconds: ${scaleDownStabilizationWindowSeconds}
      selectPolicy: ${scaleDownSelectPolicy}
      policies:
        - type: ${scaleDownPolicyType}
          value: ${scaleDownPolicyValue}
          periodSeconds: ${scaleDownPolicyPeriodSeconds}
`;

  return (
    <>
      <h1 className="text-center mt-5">Kubernetes Horizontalpodautoscaler Generator</h1>
      <p className="text-center mb-5">Generate a Kubernetes Horizontalpodautoscaler  YAML file with custom metadata and labels.</p>
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

                          {/* Scale Target Ref */}
                          <div className="mb-3">
                            <label className="form-label">Target API Version</label>
                            <input type="text" className="form-control" value={targetAPIVersion} onChange={(e) => setTargetAPIVersion(e.target.value)} />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Target Kind</label>
                            <input type="text" className="form-control" value={targetKind} onChange={(e) => setTargetKind(e.target.value)} />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Target Name</label>
                            <input type="text" className="form-control" value={targetName} onChange={(e) => setTargetName(e.target.value)} />
                          </div>

                          {/* Replicas */}
                          <div className="mb-3">
                            <label className="form-label">Min Replicas</label>
                            <input type="number" className="form-control" value={minReplicas} onChange={(e) => setMinReplicas(Number(e.target.value))} />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Max Replicas</label>
                            <input type="number" className="form-control" value={maxReplicas} onChange={(e) => setMaxReplicas(Number(e.target.value))} />
                          </div>

                          {/* Metrics */}
                          <hr />
                          <h5>Metrics</h5>
                          {metric.map((m, i) => (
                            <div key={i} className="border rounded p-3 mb-3">
                              <div className="mb-2">
                                <label className="form-label">Metric Type</label>
                                <input type="text" className="form-control" value={m.type} onChange={(e) => handleMetricChange(i, "type", e.target.value)} />
                              </div>
                              <div className="mb-2">
                                <label className="form-label">Resource Name</label>
                                <input type="text" className="form-control" value={m.resource?.name} onChange={(e) => handleResourceChange(i, "name", e.target.value)} />
                              </div>
                              <div className="mb-2">
                                <label className="form-label">Target Type</label>
                                <input type="text" className="form-control" value={m.resource?.target?.type} onChange={(e) => {
                                  const newMetrics = [...metric];
                                  newMetrics[i].resource.target.type = e.target.value;
                                  setMetric(newMetrics);
                                }} />
                              </div>
                              <div className="mb-2">
                                <label className="form-label">Average Utilization</label>
                                <input type="number" className="form-control" value={m.resource?.target?.averageUtilization} onChange={(e) => {
                                  const newMetrics = [...metric];
                                  newMetrics[i].resource.target.averageUtilization = Number(e.target.value);
                                  setMetric(newMetrics);
                                }} />
                              </div>
                            </div>
                          ))}
                          <button type="button" className="btn btn-outline-primary mb-3" onClick={addMetric}>
                            ➕ Add Metric
                          </button>

                          {/* Behavior Policies */}
                          <hr />
                          <h5>Scale Up Behavior</h5>
                          <div className="mb-2">
                            <label className="form-label">Stabilization Window (sec)</label>
                            <input type="number" className="form-control" value={stabilizationWindowSeconds} onChange={(e) => setStabilizationWindowSeconds(Number(e.target.value))} />
                          </div>
                          <div className="mb-2">
                            <label className="form-label">Select Policy</label>
                            <input type="text" className="form-control" value={selectPolicy} onChange={(e) => setSelectPolicy(e.target.value)} />
                          </div>
                          <div className="mb-2">
                            <label className="form-label">Policy Type</label>
                            <input type="text" className="form-control" value={policyType} onChange={(e) => setPolicyType(e.target.value)} />
                          </div>
                          <div className="mb-2">
                            <label className="form-label">Policy Value</label>
                            <input type="number" className="form-control" value={policyValue} onChange={(e) => setPolicyValue(Number(e.target.value))} />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Policy Period (sec)</label>
                            <input type="number" className="form-control" value={policyPeriodSeconds} onChange={(e) => setPolicyPeriodSeconds(Number(e.target.value))} />
                          </div>

                          <h5>Scale Down Behavior</h5>
                          <div className="mb-2">
                            <label className="form-label">Stabilization Window (sec)</label>
                            <input type="number" className="form-control" value={scaleDownStabilizationWindowSeconds} onChange={(e) => setScaleDownStabilizationWindowSeconds(Number(e.target.value))} />
                          </div>
                          <div className="mb-2">
                            <label className="form-label">Select Policy</label>
                            <input type="text" className="form-control" value={scaleDownSelectPolicy} onChange={(e) => setScaleDownSelectPolicy(e.target.value)} />
                          </div>
                          <div className="mb-2">
                            <label className="form-label">Policy Type</label>
                            <input type="text" className="form-control" value={scaleDownPolicyType} onChange={(e) => setScaleDownPolicyType(e.target.value)} />
                          </div>
                          <div className="mb-2">
                            <label className="form-label">Policy Value</label>
                            <input type="number" className="form-control" value={scaleDownPolicyValue} onChange={(e) => setScaleDownPolicyValue(Number(e.target.value))} />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Policy Period (sec)</label>
                            <input type="number" className="form-control" value={scaleDownPolicyPeriodSeconds} onChange={(e) => setScaleDownPolicyPeriodSeconds(Number(e.target.value))} />
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
              value={hpa}
            ></textarea>
          </div>
          <div className="cmds">
            <h5>Commands</h5>
            <div className="cmd bg-light mb-4 align-content-center " style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl apply -f hpa.yaml</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl get HPA</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl get describe HPA {name}</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl delete -f hpa.yml</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HPA;
