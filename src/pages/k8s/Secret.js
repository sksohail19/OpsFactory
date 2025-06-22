import React, { useState } from 'react'

function Secret() {
  const [name, setName] = useState("");
  const [namespace, setNamespace] = useState("");
  const [api, setAPI] = useState("");
  const [kind, setKind] = useState("Secret");
  const [labels, setLables] = useState({ app: "", env: "", tier: "" });
  const [plainTextValue, setPlainTextValue] = useState("");
  const [type, setType] = useState("Opaque");
  const [data, setData] = useState([
    { username: "", password: "", apikey: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = value;
    setData(updatedData);
  };

  const addData = () => {
    setData([...data, { username: "", password: "", apikey: "" }]);
  };


  const secret = `
apiVersion: ${api || "v1"}
kind: ${kind}
metadata:
  name: ${name}
  namespace: ${namespace}
  labels:
    app: ${labels.app}
    environment: ${labels.env}
    tier: ${labels.tier}
type: ${type}
data:
${data
  .map((item) => {
    const encoded = {
      username: btoa(item.username || ""),
      password: btoa(item.password || ""),
      'api-key': btoa(item.apikey || ""),
    };
    return Object.entries(encoded)
      .map(([key, value]) => `  ${key}: ${value}`)
      .join("\n");
  })
  .join("\n")}
stringData:
  plain-text-key: ${plainTextValue}
`;


const copyToClipboard = () => {
    navigator.clipboard.writeText(secret).then(() => {
      alert("Secret YAML copied to clipboard!");
    });
  };

  const downloadYAML = () => {
    const blob = new Blob([secret], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "secret.yaml";
    a.click();
    URL.revokeObjectURL(url);
  };


  return (
    <>
      <div className="container">
        <div className="data">
          <div className="details bg-light">
            <div className="accordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Basic Details</button>
                </h2>
                <div className="accordion-collapse collapse show" id="collapseOne" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <strong>API Version</strong>
                    <input type="text" className="form-control mb-3" placeholder="networking.k8s.io/v1" value={api} onChange={(e) => setAPI(e.target.value)} />
                    <strong>Kind</strong>
                    <input type="text" className="form-control mb-3" placeholder="Ingress" value={kind} onChange={(e) => setKind(e.target.value)} />
                    <strong>Type</strong>
                    <select className="form-select mb-3" aria-label="Default select example" onChange={(e) => setType(e.target.value)} value={type} >
                      <option selected>Opaque</option>
                      <option value="1">kubernetes.io/dockerconfigjson</option>
                      <option value="2">kubernetes.io/tls</option>
                      <option value="3">bootstrap.kubernetes.io/token</option>
                    </select>
                    <strong>String Data: Plain-Text Value</strong>
                    <input type="password" className="form-control mb-3" placeholder="plain-text" value={plainTextValue} onChange={(e) => setPlainTextValue(e.target.value)} />
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
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseData" aria-expanded="true" aria-controls="collapseData">Data</button>
                      </h2>
                      <div className="accordion-collapse collapse show" id="collapseData" data-bs-parent="#collapseOne">
                        <div className="accordion-body">
                          {data.map((item, index) => (
                            <div key={index} className="mb-4 border p-3 rounded">
                              <strong>Username</strong>
                              <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="ingress-username"
                                value={item.username}
                                onChange={(e) =>
                                  handleChange(index, "username", e.target.value)
                                }
                              />
                              <strong>Password</strong>
                              <input
                                type="password"
                                className="form-control mb-3"
                                placeholder="ingress-password"
                                value={item.password}
                                onChange={(e) =>
                                  handleChange(index, "password", e.target.value)
                                }
                              />
                              <strong>API Key</strong>
                              <input
                                type="password"
                                className="form-control mb-3"
                                placeholder="ingress-apikey"
                                value={item.apikey}
                                onChange={(e) =>
                                  handleChange(index, "apikey", e.target.value)
                                }
                              />
                            </div>
                          ))}

                          <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={addData}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" controls d-flex justify-content-center mt-3 p-3 gap-5">
            <button type="button" onChange={copyToClipboard} className="btn btn-outline-secondary me-2">
            📋 Copy to Clipboard
            </button>
            <button type="button" onChange={downloadYAML}  className="btn btn-outline-success">
              ⬇️ Download Dockerfile
            </button>
          </div>
        </div>
        <div className="result">
          <div className="preview">
            <textarea name="" id=""
            rows="40"
            cols="100"
            value={secret}
            readOnly></textarea>
          </div>
          <div className="cmds">
            <h5>Commands</h5>
            <div className="cmd bg-light mb-4 align-content-center " style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl apply -f secret.yaml</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl get secret my-secret -n {namespace}</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl get secret my-secret -n {namespace} -o yaml</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl get secret my-secret -n production -o jsonpath="{data.username}" | base64 --decode</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Secret
