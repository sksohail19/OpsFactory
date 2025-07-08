import React, { useState } from 'react'

function ConfigMap() {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(configMap).then(() => {
      alert("Config Map YAML copied to clipboard!");
    });
  };
  
  const downloadYAML = () => {
    const blob = new Blob([configMap], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "configmap.yaml";
    a.click();
    URL.revokeObjectURL(url);
  };

  const [api, setAPI] = useState("");
  const [kind, setKind] = useState("ConfigMap");
  const [name, setName] = useState("");
  const [namespace, setNamespace] = useState("");
  const [annotations, setAnnotations] = useState([{ key: '', value: '' }]);
  const [app, setApp] = useState("");
  const [environment, setEnvironment] = useState("");
  const [tier, setTier] = useState("");
  const [appMode, setAppMode] = useState("");
  const [logLevel, setLogLevel] = useState("");
  const [dbHost, setDbHost] = useState("");
  const [dbPort, setDbPort] = useState("");
  const [featureFlag, setFeatureFlag] = useState("");
  const [serverPort, setServerPort] = useState("");
  const [serverHost, setServerHost] = useState("");
  const [serverProtocol, setServerProtocol] = useState("");
  const [serverTimeout, setServerTimeout] = useState("");
  const [serverMaxConnections, setServerMaxConnections] = useState("");
  const [serverRetryAttempts, setServerRetryAttempts] = useState("");
  const [serverRetryDelay, setServerRetryDelay] = useState("");
  const [debug, setDebug] = useState("");
  const [dbUser, setDbUser] = useState("");
  const [certificate, setCertificate] = useState("");
  const [privateKey, setPrivateKey] = useState("");


  const addAnnotation = () => {
    setAnnotations(prev => [...prev, { key: '', value: '' }]);
  };

  const handleAnnotationChange = (index, field, value) => {
    const newAnnotations = [...annotations];
    newAnnotations[index][field] = value;
    setAnnotations(newAnnotations);
  };


  const configMap=`
apiVersion: ${api}
kind: ${kind}
metadata:
  name: ${name}
  namespace: ${namespace}
  labels:
    app: ${app}
    environment: ${environment}
    tier: ${tier}
  annotations:
    ${annotations.map((annotation) => `    ${annotation.key}: ${annotation.value}`).join('\n')}
data:
  # Key-value pairs for configuration
  APP_MODE: ${appMode}
  LOG_LEVEL: ${logLevel}
  DB_HOST: ${dbHost}
  DB_PORT: ${dbPort}
  FEATURE_FLAG: ${featureFlag}
  # Multiline value (e.g., config file)
  APP_CONFIG: |
    [server]
    port = ${serverPort}
    debug = ${debug}
    protocol = ${serverProtocol}
    timeout = ${serverTimeout}
    max_connections = ${serverMaxConnections}


    [database]
    host = ${dbHost}
    port = ${dbPort}
    user = ${dbUser}
    

binaryData:
  # Example of binary data (base64-encoded)
  certificate.crt: ${certificate}
  private_key.key: ${privateKey}

  `;
  return (
    <>
      <h1 className="text-center mt-4 mb-4">Kubernetes ConfigMap Generator</h1>
      <p className="text-center mb-4">Generate a ConfigMap YAML file for Kubernetes.</p>
      <div className="container">
        <div className="data">
          <div className="details bg-light p-3 mb-4">
            <div className="accordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Basic Details
                  </button>
                </h2>
                <div className="accordion-collapse collapse show" id="collapseOne" data-bs-parent="#accordionExample" >
                  <div className="accordion-body">
                    <strong>API</strong>
                    <input type="text" className="form-control mb-2" placeholder="Enter API Version" value={api} onChange={(e) => setAPI(e.target.value)} />
                    <strong>Kind</strong>
                    <input type="text" className="form-control mb-2" placeholder="Enter Kind" value={kind} onChange={(e) => setKind(e.target.value)} readOnly/>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Metadata
                  </button>
                </h2>
                <div className="accordion-collapse collapse show" id="collapseTwo" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <strong>Name</strong>
                    <input type="text" className="form-control mb-2" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <strong>Namespace</strong>
                    <input type="text" className="form-control mb-2" placeholder="Enter Namespace" value={namespace} onChange={(e) => setNamespace(e.target.value)} />

                    <strong>Labels/</strong><br />
                    <strong className=" ms-3 mb-2">App</strong>
                    <input type="text" className="form-control ms-3 mb-2" placeholder="Enter App Label" value={app} onChange={(e) => setApp(e.target.value)} />
                    <strong className="ms-3 mb-2">Environment</strong>
                    <input type="text" className="form-control ms-3 mb-2" placeholder="Enter Environment Label" value={environment} onChange={(e) => setEnvironment(e.target.value)} />
                    <strong className=" ms-3 mb-2">Tier</strong>
                    <input type="text" className="form-control ms-3 mb-2" placeholder="Enter Tier Label"  value={tier} onChange={(e) => setTier(e.target.value)}/>

                    <strong>Annotations</strong><br />
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

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Data
                  </button>
                </h2>
                <div className="accordion-collapse collapse show" id="collapseThree" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <strong>APP MODE</strong>
                    <input type="text" className="form-control mb-2" placeholder="production" value={appMode} onChange={(e) => setAppMode(e.target.value)} />
                    <strong>Log Level</strong>
                    <input type="text" className="form-control mb-2" placeholder="debug" value={logLevel} onChange={(e) => setLogLevel(e.target.value)} />
                    <strong>DB HOST</strong>
                    <input type="text" className="form-control mb-2" placeholder="db.example.com" value={dbHost} onChange={(e) => setDbHost(e.target.value)} />
                    <strong>DB PORT</strong>
                    <input type="text" className="form-control mb-2" placeholder="5432" value={dbPort} onChange={(e) => setDbPort(e.target.value)} />
                    <strong>FEATURE FLAG</strong>
                    <input type="text" className="form-control mb-2" placeholder="true" value={featureFlag} onChange={(e) => setFeatureFlag(e.target.value)} />
                    <strong>API CONFIG DETAILS/</strong><br />
                    <strong className=" mb-3 ms-3">Server Port</strong>
                    <input type="text" className="form-control mb-3 ms-3" placeholder="Enter Server Port" value={serverPort} onChange={(e) => setServerPort(e.target.value)} />
                    <strong className=" mb-3 ms-3">Server Host</strong>
                    <input type="text" className="form-control mb-3 ms-3" placeholder="Enter Server Host" value={serverHost} onChange={(e) => setServerHost(e.target.value)} />
                    <strong className=" mb-3 ms-3">Server Protocol</strong>
                    <input type="text" className="form-control mb-3 ms-3" placeholder="Enter Server Protocol" value={serverProtocol} onChange={(e) => setServerProtocol(e.target.value)} />
                    <strong className=" mb-3 ms-3">Server Timeout</strong>
                    <input type="text" className="form-control mb-3 ms-3" placeholder="Enter Server Timeout" value={serverTimeout} onChange={(e) => setServerTimeout(e.target.value)} />
                    <strong className=" mb-3 ms-3">Server Max Connections</strong>
                    <input type="text" className="form-control mb-3 ms-3" placeholder="Enter Server Max Connections" value={serverMaxConnections} onChange={(e) => setServerMaxConnections(e.target.value)} />
                    <strong className=" mb-3 ms-3">Server Retry Attempts</strong> 
                    <input type="text" className="form-control mb-3 ms-3" placeholder="Enter Server Retry Attempts" value={serverRetryAttempts} onChange={(e) => setServerRetryAttempts(e.target.value)} />
                    <strong className=" mb-3 ms-3">Server Retry Delay</strong>
                    <input type="text" className="form-control mb-3 ms-3" placeholder="Enter Server Retry Delay"  value={serverRetryDelay} onChange={(e) => setServerRetryDelay(e.target.value)} />
                    <strong className=" mb-3 ms-3" onChange={(e) => setDebug(e.target.value)}>Debug</strong>
                    <select className="form-select mb-3 ms-3">
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>

                    <strong className="mb-3 ms-3">DB HOST </strong>
                    <input type="text" className="form-control mb-3 ms-3" placeholder="Enter DB Host" value={dbHost} onChange={(e) => setDbHost(e.target.value)} />
                    <strong className="mb-3 ms-3">DB PORT</strong>
                    <input type="text" className="form-control mb-3 ms-3" placeholder="Enter DB Port" value={dbPort} onChange={(e) => setDbPort(e.target.value)} />
                    <strong className=" mb-3 ms-3">DB USER</strong>
                    <input type="text" className="form-control mb-3 ms-3" placeholder="Enter DB User" value={dbUser} onChange={(e) => setDbUser(e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    Binary Data
                  </button>
                </h2>
                <div className="accordion-collapse collapse show" id='collapseFour' data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <strong>Certificate</strong>
                    <input type="text" className="form-control mb-2" placeholder="Enter Certificate" value={certificate} onChange={(e) => setCertificate(e.target.value)} />
                    <strong>Private Key</strong>
                    <input type="text" className="form-control mb-2" placeholder="Enter Private Key"  value={privateKey} onChange={(e) => setPrivateKey(e.target.value)} />
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
              value={configMap} readOnly
              className="form-control bg-light"
            ></textarea>
          </div>
          <div className="cmds">
            <h5>Commands</h5>
            <div className="cmd bg-light mb-4 align-content-center " style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl apply -f configmap.yaml</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl get configmaps -n {namespace}</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl get describe configmap {name} -n {namespace} -o yaml</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl delete pod {name} -n {namespace}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfigMap
