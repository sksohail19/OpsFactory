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
              <input type="text" className="form-control mb-3" value={setAPI} placeholder="v1" />
              <strong>Kind</strong>
              <input type="text" className="form-control mb-3" placeholder="Service" readOnly />
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
                        <input type="text" className="form-control mb-3" placeholder="my-service" />
                        <strong>Namespace</strong>
                        <input type="text" className="form-control mb-3" placeholder="default" readOnly />

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
                              <input type="text" className="form-control mb-3" placeholder="my-app" />
                              <strong>Environment</strong>
                              <input type="text" className="form-control mb-3" placeholder="production" />
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
                              <input type="text" className="form-control mb-3" placeholder="key" />
                              <strong>Value</strong>
                              <input type="text" className="form-control mb-3" placeholder="value" />
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
                              <input type="text" className="form-control mb-3" placeholder="ClusterIP" readOnly />

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
                                    <input type="text" className="form-control mb-3" placeholder="my-app" />
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
                                    <input type="text" className="form-control mb-3" placeholder="http" />
                                    <strong>Protocol</strong>
                                    <input type="text" className="form-control mb-3" placeholder="TCP" />
                                    <strong>Port</strong>
                                    <input type="text" className="form-control mb-3" placeholder="80" />
                                    <strong>Target Port</strong>
                                    <input type="text" className="form-control mb-3" placeholder="8080" />
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
                              <select className="form-select mb-3">
                                <option value="None">None</option>
                                <option value="ClientIP">ClientIP</option>
                              </select>
                              <strong>IP Family Policy</strong>
                              <select className="form-select mb-3">
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
                                    value="IPv4"
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
                                    value="IPv6"
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
                        <input type="text" className="form-control mb-3" placeholder="my-service" />
                        <strong>Namespace</strong>
                        <input type="text" className="form-control mb-3" placeholder="default" readOnly />

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
                              <input type="text" className="form-control mb-3" placeholder="my-app" />
                              <strong>Environment</strong>
                              <input type="text" className="form-control mb-3" placeholder="production" />
                              <strong>tier</strong>
                              <input type="text" className="form-control mb-3" placeholder="backend" />
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
                              <input type="text" className="form-control mb-3" placeholder="key" />
                              <strong>Value</strong>
                              <input type="text" className="form-control mb-3" placeholder="value" />
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
                              <input type="text" className="form-control mb-3" placeholder="ClusterIP" readOnly />

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
                                    <input type="text" className="form-control mb-3" placeholder="my-app" />
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
                                    <input type="text" className="form-control mb-3" placeholder="http" />
                                    <strong>Protocol</strong>
                                    <input type="text" className="form-control mb-3" placeholder="TCP" />
                                    <strong>Port</strong>
                                    <input type="text" className="form-control mb-3" placeholder="80" />
                                    <strong>Target Port</strong>
                                    <input type="text" className="form-control mb-3" placeholder="8080" />
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
                              <select className="form-select mb-3">
                                <option value="None">None</option>
                                <option value="ClientIP">ClientIP</option>
                              </select>
                              <strong>IP Family Policy</strong>
                              <select className="form-select mb-3">
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
                                    value="IPv4"
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
                                    value="IPv6"
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
                        <input type="text" className="form-control mb-3" placeholder="my-service" />
                        <strong>Namespace</strong>
                        <input type="text" className="form-control mb-3" placeholder="default" readOnly />

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
                              <input type="text" className="form-control mb-3" placeholder="my-app" />
                              <strong>Environment</strong>
                              <input type="text" className="form-control mb-3" placeholder="production" />
                              <strong>tier</strong>
                              <input type="text" className="form-control mb-3" placeholder="public" />
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
                              <input type="text" className="form-control mb-3" placeholder="key" />
                              <strong>Value</strong>
                              <input type="text" className="form-control mb-3" placeholder="value" />
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
                              <input type="text" className="form-control mb-3" placeholder="LoadBalancer" value="LoadBalancer" readOnly />

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
                                    <input type="text" className="form-control mb-3" placeholder="my-app" />
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
                                    <input type="text" className="form-control mb-3" placeholder="http" />
                                    <strong>Protocol</strong>
                                    <input type="text" className="form-control mb-3" placeholder="TCP" />
                                    <strong>Port</strong>
                                    <input type="text" className="form-control mb-3" placeholder="80" />
                                    <strong>Target Port</strong>
                                    <input type="text" className="form-control mb-3" placeholder="8080" />
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
                              <input type="text" className="form-control mb-3" placeholder="192.2.3.100" />
                              <strong>External Traffic Policy</strong>
                              <select className="form-select mb-3">
                                <option value="Local">Local</option>
                                <option value="Cluster">Cluster</option>
                              </select>
                              <strong>Session Affinity</strong>
                              <select className="form-select mb-3">
                                <option value="None">None</option>
                                <option value="ClientIP">ClientIP</option>
                              </select>
                              <strong>IP Family Policy</strong>
                              <select className="form-select mb-3">
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
                                    value="IPv4"
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
                                    value="IPv6"
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
          
          readOnly
        ></textarea>
      </div>

      
    </div>
    </div>
    </>
  );
}

export default Service;
