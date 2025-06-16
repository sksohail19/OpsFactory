import React, { useState } from 'react';

function Service() {
  const bgColor = 'light-theme';
  const textColor = 'light-text';

  const [selectType, setSelectType] = useState('ClusterIP');
  const handleSelectChange = (event) => {
    setSelectType(event.target.value);
  };

  const handleCopy = () => {
  navigator.clipboard.writeText().then(() => {
    alert("Dockerfile content copied to clipboard!");
  });
};

const handleDownload = () => {
  const blob = new Blob([], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Service.yaml";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const [api, setAPI] = useState("");
const [kind, setKind] = useState("");
const [name, setName] = useState("");
const [namespace, setNamespace] = useState("");
const [labels, setLabels] = useState({ app: "", env: "", tier: "" });
const [annotations, setAnnotations] = useState({key: "", value: ""});
const [specifications, setSpec] = useState({ type: "", selector: { app: "" }, ports: [{ port:"" , protocol: "", targetPort: "", name:"" }] });
const [externalIPs, setExternalIPs] = useState([]);
const [externalIPPolicy, setExternalIPPolicy] = useState("");
const [sessionAffinity, setSessionAffinity] = useState("");
const [IPFamilyPolicy, setIPFamilyPolicy] = useState("");
const [IPv4, setIPv4] = useState(true);
const [IPv6, setIPv6] = useState(false);
const [loadBalancer, setLoadBalancer] = useState("");

const serviceYaml = `
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
    ${annotations.key}: "${annotations.value}"
spec:
  type: ${specifications.type}
  selector:
    app: ${specifications.selector.app}
  ports:
    - name: ${specifications.ports[0].name}
      protocol: ${specifications.ports[0].protocol}
      port: ${specifications.ports[0].port}
      targetPort: ${specifications.ports[0].targetPort}
  sessionAffinity: ${sessionAffinity}
  ipFamilyPolicy: ${IPFamilyPolicy}
  ipFamilies:
    ${IPv4 ? '- IPv4' : ''}
    ${IPv6 ? '- IPv6' : ''}
${externalIPs.length > 0 ? `  externalIPs:\n${externalIPs.map(ip => `    - ${ip}`).join('\n')}` : ''}
${loadBalancer ? `  loadBalancerClass: ${loadBalancer}` : ''}
`;




  return (
    <>
    <h1 className="display-4 text-center ">Kubernetes Service Generator</h1>
      <h4 className="text-center display-4 mb-5">Service</h4>
    <div className="holding d-flex justify-content-center ">
    <div className={`${bgColor} ${textColor} kubernetes-holder`}>
      

      <div className="accordion bg-light align-items-center m-5" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Basic Details
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>API Version</strong>
              <input type="text" className="form-control mb-3" value={api} onChange={(e) => setAPI(e.target.value)} placeholder="v1" />
              <strong>Kind</strong>
              <input type="text" className="form-control mb-3" placeholder="Service" value={kind} onChange={(e) => setKind(e.target.value)} readOnly />
              <strong>Type</strong>
              <select className="form-select mb-3 select-type" value={selectType} onChange={handleSelectChange}>
                <option value="ClusterIP">ClusterIP</option>
                <option value="NodePort">NodePort</option>
                <option value="LoadBalancer">LoadBalancer</option>
              </select>

              {selectType === 'ClusterIP' && (
                <>
                  {/* Meta Data */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMetaData" aria-expanded="true" aria-controls="collapseMetaData">
                        Meta Data
                      </button>
                    </h2>
                    <div id="collapseMetaData" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <strong>Name</strong>
                        <input type="text" className="form-control mb-3" placeholder="my-service" value={name}  onChange={(e) => setName(e.target.value)}/>
                        <strong>Namespace</strong>
                        <input type="text" className="form-control mb-3" placeholder="default" value={namespace} onChange={(e) => setNamespace(e.target.value)} readOnly />

                        {/* Labels */}
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseLabels" aria-expanded="true" aria-controls="collapseLabels">
                              Add Labels
                            </button>
                          </h2>
                          <div id="collapseLabels" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                              <strong>App Name</strong>
                              <input type="text" className="form-control mb-3" placeholder="my-app" value={labels.app} onChange={(e) => setLabels({ ...labels, app: e.target.value })} />
                              <strong>Environment</strong>
                              <input type="text" className="form-control mb-3" placeholder="production" value={labels.env} onChange={(e) => setLabels({ ...labels, env: e.target.value })}/>
                            </div>
                          </div>
                        </div>

                        {/* Annotations */}
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAnnotations1" aria-expanded="true" aria-controls="collapseAnnotations1">
                              Add Annotations
                            </button>
                          </h2>
                          <div id="collapseAnnotations1" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                              <strong>Key</strong>
                              <input type="text" className="form-control mb-3" placeholder="key" value={annotations.key} onChange={(e) => setAnnotations({ ...annotations, key: e.target.value })}/>
                              <strong>Value</strong>
                              <input type="text" className="form-control mb-3" placeholder="value" value={annotations.value} onChange={(e) => setAnnotations({ ...annotations, value: e.target.value })} />
                            </div>
                          </div>
                        </div>

                        {/* Specifications */}
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSpecifications" aria-expanded="true" aria-controls="collapseSpecifications">
                              Specifications
                            </button>
                          </h2>
                          <div id="collapseSpecifications" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                              <strong>Type</strong>
                              <input type="text" className="form-control mb-3" placeholder="ClusterIP" value={specifications.type} onChange={(e) => setSpec({ ...specifications, type: e.target.value })} readOnly />

                              {/* Selector */}
                              <div className="accordion-item">
                                <h2 className="accordion-header">
                                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSelector" aria-expanded="true" aria-controls="collapseSelector">
                                    Selector
                                  </button>
                                </h2>
                                <div id="collapseSelector" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                  <div className="accordion-body">
                                    <strong>Name</strong>
                                    <input type="text" className="form-control mb-3" placeholder="my-app" value={specifications.selector.name} onChange={(e) => setSpec({ ...specifications, selector: { ...specifications.selector, name: e.target.value } })} />
                                  </div>
                                </div>
                              </div>

                              {/* Ports */}
                              <div className="accordion-item">
                                <h2 className="accordion-header">
                                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePorts" aria-expanded="true" aria-controls="collapsePorts">
                                    Ports
                                  </button>
                                </h2>
                                <div id="collapsePorts" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                  <div className="accordion-body">
                                    <strong>Name</strong>
                                    <input type="text" className="form-control mb-3" placeholder="http" value={specifications.ports.name} onChange={(e) => setSpec({ ...specifications, ports: { ...specifications.ports, name: e.target.value } })} />
                                    <strong>Protocol</strong>
                                    <input type="text" className="form-control mb-3" placeholder="TCP" value={specifications.ports.protocol} onChange={(e) => setSpec({ ...specifications, ports: { ...specifications.ports, protocol: e.target.value } })}/>
                                    <strong>Port</strong>
                                    <input type="text" className="form-control mb-3" placeholder="80" value={specifications.ports.port} onChange={(e) => setSpec({ ...specifications, ports: { ...specifications.ports, port: e.target.value } })}/>
                                    <strong>Target Port</strong>
                                    <input type="text" className="form-control mb-3" placeholder="8080" value={specifications.ports.targetPort} onChange={(e) => setSpec({ ...specifications, ports: { ...specifications.ports, targetPort: e.target.value } })} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Advanced Settings */}
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAdvanced" aria-expanded="true" aria-controls="collapseAdvanced">
                              Advanced
                            </button>
                          </h2>
                          <div id="collapseAdvanced" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                              <strong>Session Affinity</strong>
                              <select className="form-select mb-3" value={sessionAffinity} onChange={(e) => setSessionAffinity(e.target.value)}>
                                <option value="None">None</option>
                                <option value="ClientIP">ClientIP</option>
                              </select>
                              <strong>IP Family Policy</strong>
                              <select className="form-select mb-3" value={IPFamilyPolicy} onChange={(e) => setIPFamilyPolicy(e.target.value)}>
                                <option value="SingleStack">SingleStack</option>
                                <option value="PreferDualStack">PreferDualStack</option>
                                <option value="RequireDualStack">RequireDualStack</option>
                              </select> 

                              <strong>IP Families</strong>
                              <div className="mb-3">
                                <div className="form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="ipv4"
                                    value= {IPv4}
                                    checked
                                    defaultChecked
                                    onChange = {(e) => setIPv4(e.target.checked)}
                                  />
                                  <label className="form-check-label" htmlFor="ipv4">
                                    IPv4
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="ipv6"
                                    value="IPv6"
                                    onChange={(e) => setIPv6(e.target.checked)}
                                  />
                                  <label className="form-check-label" htmlFor="ipv6">
                                    IPv6
                                  </label>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </>
              )}




            {selectType === 'NodePort' && (
                <>
                  {/* Meta Data */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMetaData" aria-expanded="true" aria-controls="collapseMetaData">
                        Meta Data
                      </button>
                    </h2>
                    <div id="collapseMetaData" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <strong>Name</strong>
                        <input type="text" className="form-control mb-3" placeholder="my-service" value={name} onChange={(e) => setName(e.target.value)}/>
                        <strong>Namespace</strong>
                        <input type="text" className="form-control mb-3" placeholder="default" value={namespace} onChange={(e) => setNamespace(e.target.value)}  readOnly />

                        {/* Labels */}
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseLabels" aria-expanded="true" aria-controls="collapseLabels">
                              Add Labels
                            </button>
                          </h2>
                          <div id="collapseLabels" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                              <strong>App Name</strong>
                              <input type="text" className="form-control mb-3" placeholder="my-app" value={labels.app} onChange={(e) => setLabels({ ...labels, app: e.target.value }) }  />
                              <strong>Environment</strong>
                              <input type="text" className="form-control mb-3" placeholder="production" value={labels.env} onChange={(e) => setLabels({ ...labels, env: e.target.value }) } />
                              <strong>tier</strong>
                              <input type="text" className="form-control mb-3" placeholder="backend"  value={labels.tier} onChange={(e) => setLabels({ ...labels, tier: e.target.value })} />
                            </div>
                          </div>
                        </div>

                        {/* Annotations */}
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAnnotations1" aria-expanded="true" aria-controls="collapseAnnotations1">
                              Add Annotations
                            </button>
                          </h2>
                          <div id="collapseAnnotations1" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                              <strong>Key</strong>
                              <input type="text" className="form-control mb-3" placeholder="key" value={annotations.key} onChange={(e) => setAnnotations({ ...annotations, key: e.target.value })  } />
                              <strong>Value</strong>
                              <input type="text" className="form-control mb-3" placeholder="value" value={annotations.value} onChange={(e) => setAnnotations({ ...annotations, value: e.target.value })} />
                            </div>
                          </div>
                        </div>

                        {/* Specifications */}
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSpecifications" aria-expanded="true" aria-controls="collapseSpecifications">
                              Specifications
                            </button>
                          </h2>
                          <div id="collapseSpecifications" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                              <strong>Type</strong>
                              <input type="text" className="form-control mb-3" placeholder="ClusterIP" value={specifications.type} onChange={(e) => setSpec({ ...specifications, type: e.target.value })} readOnly />

                              {/* Selector */}
                              <div className="accordion-item">
                                <h2 className="accordion-header">
                                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSelector" aria-expanded="true" aria-controls="collapseSelector">
                                    Selector
                                  </button>
                                </h2>
                                <div id="collapseSelector" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                  <div className="accordion-body">
                                    <strong>Name</strong>
                                    <input type="text" className="form-control mb-3" placeholder="my-app" value/>
                                  </div>
                                </div>
                              </div>

                              {/* Ports */}
                              <div className="accordion-item">
                                <h2 className="accordion-header">
                                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePorts" aria-expanded="true" aria-controls="collapsePorts">
                                    Ports
                                  </button>
                                </h2>
                                <div id="collapsePorts" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                  <div className="accordion-body">
                                    <strong>Name</strong>
                                    <input type="text" className="form-control mb-3" placeholder="http"  value={specifications.ports.app} onChange={(e) => setSpec({ ...specifications, ports: e.target.value })} />
                                    <strong>Protocol</strong>
                                    <input type="text" className="form-control mb-3" placeholder="TCP" value={specifications.ports.protocol} onChange={(e) => setSpec({ ...specifications, ports: e.target.value })} />
                                    <strong>Port</strong>
                                    <input type="text" className="form-control mb-3" placeholder="80" value={specifications.ports.port} onChange={(e) => setSpec({ ...specifications, ports: e.target.value })} />
                                    <strong>Target Port</strong>
                                    <input type="text" className="form-control mb-3" placeholder="8080" value={specifications.ports.targetPort} onChange={(e) => setSpec({ ...specifications, ports: e.target.value })} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Advanced Settings */}
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAdvanced" aria-expanded="true" aria-controls="collapseAdvanced">
                              Advanced
                            </button>
                          </h2>
                          <div id="collapseAdvanced" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                              <strong>External IPs</strong>
                              <input type="text" className="form-control mb-3" placeholder="1.2.3.4" value={externalIPs} onChange={(e) => setExternalIPs(e.target.value)} />
                              <strong>External Traffic Policy</strong>
                              <select className="form-select mb-3" value={externalIPPolicy} onChange={(e) => setExternalIPPolicy(e.target.value)} >
                                <option value="Local">Local</option>
                                <option value="Cluster">Cluster</option>
                              </select>
                              <strong>Session Affinity</strong>
                              <select className="form-select mb-3" value={sessionAffinity} onChange={(e) => setSessionAffinity(e.target.value)}>
                                <option value="None">None</option>
                                <option value="ClientIP">ClientIP</option>
                              </select>
                              <strong>IP Family Policy</strong>
                              <select className="form-select mb-3" value={IPFamilyPolicy} onChange={(e) => setIPFamilyPolicy(e.target.value)}>
                                <option value="SingleStack">SingleStack</option>
                                <option value="PreferDualStack">PreferDualStack</option>
                                <option value="RequireDualStack">RequireDualStack</option>
                              </select> 

                              <strong>IP Families</strong>
                              <div className="mb-3">
                                <div className="form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="ipv4"
                                    value={IPv4}
                                    onChange={(e) => setIPv4(e.target.checked)}
                                    defaultChecked
                                  />
                                  <label className="form-check-label" htmlFor="ipv4">
                                    IPv4
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="ipv6"
                                    value={IPv6}
                                    onChange={(e) => setIPv6(e.target.checked)}
                                  />
                                  <label className="form-check-label" htmlFor="ipv6">
                                    IPv6
                                  </label>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </>
              )}
              

              {selectType === 'LoadBalancer' && (
                <>
                  {/* Meta Data */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMetaData" aria-expanded="true" aria-controls="collapseMetaData">
                        Meta Data
                      </button>
                    </h2>
                    <div id="collapseMetaData" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <strong>Name</strong>
                        <input type="text" className="form-control mb-3" placeholder="my-service" value={name} onChange={(e)=> setName(e.target.value)} />
                        <strong>Namespace</strong>
                        <input type="text" className="form-control mb-3" placeholder="default" value={namespace} onChange={(e) => setNamespace(e.target.value)}  readOnly />

                        {/* Labels */}
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseLabels" aria-expanded="true" aria-controls="collapseLabels">
                              Add Labels
                            </button>
                          </h2>
                          <div id="collapseLabels" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                              <strong>App Name</strong>
                              <input type="text" className="form-control mb-3" placeholder="my-app" value={labels.app} onChange={(e) => setLabels({ ...labels, app: e.target.value })} />
                              <strong>Environment</strong>
                              <input type="text" className="form-control mb-3" placeholder="production" value={labels.env} onChange={(e) => setLabels({ ...labels, env: e.target.value })} readOnly />
                              <strong>tier</strong>
                              <input type="text" className="form-control mb-3" placeholder="public" value={labels.tier} onChange={(e) => setLabels({ ...labels, tier: e.target.value }) }/>
                            </div>
                          </div>
                        </div>

                        {/* Annotations */}
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAnnotations1" aria-expanded="true" aria-controls="collapseAnnotations1">
                              Add Annotations
                            </button>
                          </h2>
                          <div id="collapseAnnotations1" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                              <strong>Key</strong>
                              <input type="text" className="form-control mb-3" placeholder="key" value={annotations.key} onChange={(e) => setAnnotations({ ...annotations, key: e.target.value })} />
                              <strong>Value</strong>
                              <input type="text" className="form-control mb-3" placeholder="value" value={annotations.value} onChange={(e) => setAnnotations({ ...annotations, value: e.target.value })} />
                            </div>
                          </div>
                        </div>

                        {/* Specifications */}
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSpecifications" aria-expanded="true" aria-controls="collapseSpecifications">
                              Specifications
                            </button>
                          </h2>
                          <div id="collapseSpecifications" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                              <strong>Type</strong>
                              <input type="text" className="form-control mb-3" placeholder="LoadBalancer" value="LoadBalancer" value={specifications.type} onChange={(e) => setSpec({ ...specifications, type: e.target.value })}  readOnly />

                              {/* Selector */}
                              <div className="accordion-item">
                                <h2 className="accordion-header">
                                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSelector" aria-expanded="true" aria-controls="collapseSelector">
                                    Selector
                                  </button>
                                </h2>
                                <div id="collapseSelector" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                  <div className="accordion-body">
                                    <strong>Name</strong>
                                    <input type="text" className="form-control mb-3" placeholder="my-app" value={specifications.selector.app} onChange={(e) => setSpec({ ...specifications, selector: { ...specifications.selector, app: e.target.value } } )} />
                                  </div>
                                </div>
                              </div>

                              {/* Ports */}
                              <div className="accordion-item">
                                <h2 className="accordion-header">
                                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePorts" aria-expanded="true" aria-controls="collapsePorts">
                                    Ports
                                  </button>
                                </h2>
                                <div id="collapsePorts" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                  <div className="accordion-body">
                                    <strong>Name</strong>
                                    <input type="text" className="form-control mb-3" placeholder="http"  value={specifications.ports.name} onChange={(e) => setSpec({ ...specifications, ports: { ...specifications.ports, name: e.target.value } })} />
                                    <strong>Protocol</strong>
                                    <input type="text" className="form-control mb-3" placeholder="TCP" value={specifications.ports.protocol} onChange={(e) => setSpec({ ...specifications, ports: { ...specifications.ports, protocol: e.target.value } })} />
                                    <strong>Port</strong>
                                    <input type="text" className="form-control mb-3" placeholder="80" value={specifications.ports.port} onChange={(e) => setSpec({ ...specifications, ports: { ...specifications.ports, port: e.target.value } })}/>
                                    <strong>Target Port</strong>
                                    <input type="text" className="form-control mb-3" placeholder="8080"  value={specifications.ports.port} onChange={(e) => setSpec({...specifications, ports: { ...specifications.ports, targetPort: e.target.value }})} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Advanced Settings */}
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAdvanced" aria-expanded="true" aria-controls="collapseAdvanced">
                              Advanced
                            </button>
                          </h2>
                          <div id="collapseAdvanced" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                              <strong>Load Balancer IP</strong>
                              <input type="text" className="form-control mb-3" placeholder="192.2.3.100" value={loadBalancer} onChange={(e) => setLoadBalancer(e.target.value)} />
                              <strong>External Traffic Policy</strong>
                              <select className="form-select mb-3" value={externalIPPolicy} onChange={(e) => setExternalIPPolicy(e.target.value)} >
                                <option value="Local">Local</option>
                                <option value="Cluster">Cluster</option>
                              </select>
                              <strong>Session Affinity</strong>
                              <select className="form-select mb-3" value={sessionAffinity} onChange={(e) => setSessionAffinity(e.target.value)}>
                                <option value="None">None</option>
                                <option value="ClientIP">ClientIP</option>
                              </select>
                              <strong>IP Family Policy</strong>
                              <select className="form-select mb-3" value={IPFamilyPolicy} onChange={(e) => setIPFamilyPolicy(e.target.value)} >
                                <option value="SingleStack">SingleStack</option>
                                <option value="PreferDualStack">PreferDualStack</option>
                                <option value="RequireDualStack">RequireDualStack</option>
                              </select> 
                              <strong>IP Families</strong>
                              <div className="mb-3">
                                <div className="form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="ipv4"
                                    value={IPv4}
                                    onChange = {(e) => setIPv4(e.target.checked)}
                                    defaultChecked
                                  />
                                  <label className="form-check-label" htmlFor="ipv4">
                                    IPv4
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="ipv6"
                                    value={IPv6}
                                    onChange = {(e) => setIPv6(e.target.checked)}
                                  />
                                  <label className="form-check-label" htmlFor="ipv6">
                                    IPv6
                                  </label>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </>
              )}
          </div>

          <div className="controls d-flex justify-content-center mt-3 p-3 gap-5">
            <button className="btn btn-primary" type="button">Generate YAML</button>
            <button type="button" onClick={handleCopy} className="btn btn-outline-secondary me-2">
            📋 Copy to Clipboard
          </button>
          <button type="button" onClick={handleDownload} className="btn btn-outline-success">
            ⬇️ Download Dockerfile
          </button>
          </div>
        </div>
            
        </div>
      </div>
    </div>

    <div className="result mt-5 w-10">
      <div className="preview">
        <textarea
          className="form-control"
          rows="20"
          value={serviceYaml}
          readOnly
        ></textarea>
      </div>

      
    </div>
    </div>
    </>
  );
}

export default Service;
