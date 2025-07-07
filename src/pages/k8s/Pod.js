import React, { useState } from 'react'

function Pod() {

  const copyToClipboard = () => {
  navigator.clipboard.writeText(pod).then(() => {
    alert("Pod YAML copied to clipboard!");
  });
};

const downloadYAML = () => {
  const blob = new Blob([pod], { type: "text/yaml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pod.yaml";
  a.click();
  URL.revokeObjectURL(url);
};

  const [api, setAPI] = useState("");
  const [kind, setKind] = useState("Pod");
  const [name, setName] = useState("");
  const [namespace, setNamespace] = useState("");
  const [labels, setLabels] = useState({app:"", env:"", tier:""});
  const [annotations, setAnnotations] = useState([{key: "", value: ""}]);
  const [restartPolicy, setRestartPolicy] = useState("Always");
  const [terminationGracePeriodSeconds, setTerminationGracePeriodSeconds] = useState(30);
  const [diskType, setDiskType] = useState("ssd");
  const [tolerationsKey, setTolerationsKey] = useState("");
  const [tolerationsOperator, setTolerationsOperator] = useState("Equal");
  const [tolerationValue, setTolerationValue] = useState("");
  const [tolerationEffect, setTolerationEffect] = useState("NoSchedule");
  const [matchExpressionsKey, setMatchExpressionsKey] = useState("Equal");
  const [weight, setWeight] = useState(100);
  const [podAffinityKey, setPodAffinityKey] = useState("app");
  const [podAffinityOperator, setPodAffinityOperator] = useState("Equal");
  const [podAffinityValue, setPodAffinityValue] = useState("");
  const [topologyKey, setTopologyKey] = useState("kubernetes.io/hostname");
  const [runAsUser, setRunAsUser] = useState(1000);
  const [runAsGroup, setRunAsGroup] = useState(3000);
  const [fsGroup, setFsGroup] = useState(2000);
  const [volumeName, setVolumeName] = useState("my-volume");
  const [configMapName, setConfigMapName] = useState("my-configmap");
  const [mountPath, setMountPath] = useState("/etc/config");
  const [subPath, setSubPath] = useState("config-file");
  const [volumeSecretName, setVolumeSecretName] = useState("my-secret");
  const [secretName, setSecretName] = useState("my-secret");
  const [secretKey, setSecretKey] = useState("my-secret-key");
  const [containerName, setContainerName] = useState("my-container");
  const [containerImage, setContainerImage] = useState("nginx:latest");
  const [containerPort, setContainerPort] = useState(80);
  const [containerProtocol, setContainerProtocol] = useState("TCP");
  const [envName, setEnvName] = useState("ENV_NAME");
  const [envValue, setEnvValue] = useState("ENV_VALUE");
  const [dbUser, setDbUser] = useState("DB_USER");

  const [dbPassword, setDbPassword] = useState("DB_PASSWORD");
  const [requestMemory, setRequestMemory] = useState("512Mi");
  const [requestCPU, setRequestCPU] = useState("500m");
  const [limitMemory, setLimitMemory] = useState("1Gi");
  const [limitCPU, setLimitCPU] = useState("1");
  const [healthPath, setHealthPath] = useState("/healthz");
  const [healthPort, setHealthPort] = useState(80);
  const [initialDelaySeconds, setInitialDelaySeconds] = useState(10);
  const [periodSeconds, setPeriodSeconds] = useState(10);
  const [readinessHealthPath, setReadinessHealthPath] = useState("/ready");
  const [readinessHealthPort, setReadinessHealthPort] = useState(80);
  const [readinessInitialDelaySeconds, setReadinessInitialDelaySeconds] = useState(10);
  const [readinessPeriodSeconds, setReadinessPeriodSeconds] = useState(10);
  const [mountPathSecret, setMountPathSecret] = useState("/etc/secret-volume");
  const [secretVolumeMountPath, setSecretVolumeMountPath] = useState("/etc/secret-volume");
  const [allowPrivilegeEscalation, setAllowPrivilegeEscalation] = useState(false);
  const [advName, setAdvName] = useState("init-container");
  const [advImage, setAdvImage] = useState("busybox");
  const [advCommand, setAdvCommand] = useState(["sh", "-c", "echo Hello from init container"]);
  const [advVolumeName, setAdvVolumeName] = useState("init-volume");
  const [advMountPath, setAdvMountPath] = useState("/init");
  const [advCommandInput, setAdvCommandInput] = useState("");


  const addAnnotation = () => {
    setAnnotations(prev => [...prev, { key: '', value: '' }]);
  };

  const handleAnnotationChange = (index, field, value) => {
    const newAnnotations = [...annotations];
    newAnnotations[index][field] = value;
    setAnnotations(newAnnotations);
  };

  const pod=`
apiVersion: ${api || "v1"}
kind: ${kind}
metadata:
  name: ${name}
  namespace: ${namespace}
  labels:
    app: ${labels.app}
    env: ${labels.env}
    tier: ${labels.tier}
  annotations:
    ${annotations.map((annotation) => `    ${annotation.key}: ${annotation.value}`).join('\n')}
spec:
  restartPolicy: ${restartPolicy}
  terminationGracePeriodSeconds: ${terminationGracePeriodSeconds}
  nodeSelector:
    diskType: ${diskType}
  tolerations:
    - key: ${tolerationsKey}
      operator: ${tolerationsOperator}
      value: ${tolerationValue}
      effect: ${tolerationEffect}

  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
              - key: "diskType"
                operator: ${matchExpressionsKey}
                values:
                  - ${diskType}
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
        - weight: ${weight}
          podAffinityTerm:
            labelSelector:
              matchExpressions:
                - key: ${podAffinityKey}
                  operator: ${podAffinityOperator}
                  values:
                    - ${podAffinityValue}
            topologyKey: ${topologyKey || "kubernetes.io/hostname"}
  securityContext:
    runAsUser: ${runAsUser}
    runAsGroup: ${runAsGroup}
    fsGroup: ${fsGroup}
  volumes:
    - name: ${volumeName}
      configMap:
        name: ${configMapName}
    - name: ${secretName}
      secret:
        secretName: ${secretKey}
  containers:
    - name: ${containerName}
      image: ${containerImage}
      imagePullPolicy: ${containerImage ? "IfNotPresent" : "Always"}
      ports:
        - containerPort: ${containerPort}
          protocol: ${containerProtocol}
      env:
        - name: ${envName}
          value: ${envValue}
        - name: "DB_USER"
          valueFrom:
            secretKeyRef:
              name: ${secretName}
              key: ${dbUser}
        - name: DB_PASS
          valueFrom:
            secretKeyRef:
              name: my-secret
              key: ${dbPassword}
      envFrom:
        - configMapRef:
            name: ${configMapName}
        - secretRef:
            name: ${secretName}
      resources:
        requests:
          memory: "${requestMemory}"
          cpu: "${requestCPU}"
        limits:
          memory: "${limitMemory}"
          cpu: "${limitCPU}"
      livenessProbe:
        httpGet:
          path: ${healthPath}
          port: ${healthPort}
        initialDelaySeconds: ${initialDelaySeconds || 10}
        periodSeconds: ${periodSeconds || 10}
      readinessProbe:
        httpGet:
          path: ${readinessHealthPath || "/ready"}
          port: ${readinessHealthPort || 80}
        initialDelaySeconds: ${readinessInitialDelaySeconds || 10}
        periodSeconds: ${readinessPeriodSeconds || 10}
      volumeMounts:
        - name: ${volumeName}
          mountPath: ${mountPath}
          subPath: ${subPath}
        - name: ${volumeSecretName}
          mountPath: ${secretVolumeMountPath || "/etc/secret-volume"}
      securityContext:
        allowPrivilegeEscalation: ${allowPrivilegeEscalation || false}
        capabilities:
          drop:
            - ALL
  initContainers:
    - name: ${advName || "init-container"}
      image: ${advImage || "busybox"}
      command: ${advCommand || ["sh", "-c", "echo Hello from init container"]}
      volumeMounts:
        - name: ${advVolumeName || "init-volume"}
          mountPath: ${advMountPath || "/init"}
      
`;

  return (
    <>
      <h1 className="text-center mt-3 mb-3 ">Pod.yml file Generator</h1>
      <div className="container">
        <div className="data">
          <div className="details bg-light">
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
                          <strong>Restart Policy</strong>
                          <select className="form-select mb-3" aria-label="Default select example" onChange={(e) => setRestartPolicy(e.target.value)}>
                            <option value="Always">Always</option>
                            <option value="OnFailure">OnFailure</option>
                            <option value="Never">Never</option>
                          </select>
                          <strong>Termination Grace Period Seconds</strong>
                          <input type="number" className="form-control mb-3" placeholder="30" value={terminationGracePeriodSeconds} onChange={(e) => setTerminationGracePeriodSeconds(e.target.value)} />

                          <strong>nodeSelector/</strong><br/> 
                          <strong className='ms-3'>Disk Type</strong>
                          <select className="form-select mb-3 ms-3" aria-label="Default select example" onChange={(e) => setDiskType(e.target.value)}>
                            <option value="ssd">SSD</option>
                            <option value="hdd">HDD</option>
                          </select>

                          <strong>Toleration/</strong><br />
                          <strong className="ms-3">Key</strong>
                          <input 
                            type="text" 
                            className="form-control mb-3 ms-3" 
                            placeholder="key" 
                            value={tolerationsKey} 
                            onChange={(e) => setTolerationsKey(e.target.value)}
                            />
                          <strong className="ms-3">Operator</strong>
                          <select className="form-select mb-3 ms-3" aria-label="Default select example" onChange={(e) => setTolerationsOperator(e.target.value)}>
                            <option value="Equal">Equal</option>
                            <option value="Exists">Exists</option>
                            <option value="In">In</option>
                            <option value="NotIn">NotIn</option>
                          </select>
                          <strong className="ms-3">Value</strong>
                          <input 
                            type="text" 
                            className="form-control mb-3 ms-3" 
                            placeholder="value" 
                            value={tolerationValue} 
                            onChange={(e) => setTolerationValue(e.target.value)}
                            />
                          <strong className="ms-3">Effect</strong>
                          <select className="form-select mb-3 ms-3" aria-label="Default select example"
                            onChange={(e) => setTolerationEffect(e.target.value)}>
                            <option value="NoSchedule">NoSchedule</option>
                            <option value="PreferNoSchedule">PreferNoSchedule</option>
                            <option value="NoExecute">NoExecute</option>
                          </select>
                          <strong className="ms-3">/matchExpressions</strong> <br />
                          <strong className="ms-3">Operator</strong>
                          <select className="form-select mb-3 ms-3 " aria-label="Default select example" onChange={(e) => setMatchExpressionsKey(e.target.value)}>
                            <option value="Equal">Equal</option>
                            <option value="Exists">Exists</option>
                            <option value="In">In</option>
                            <option value="NotIn">NotIn</option>
                          </select>
                          <strong>PodAffinity/</strong> <br />
                          <strong className="ms-3">Weight</strong>
                          <input type="number" className="form-control mb-3 ms-3" placeholder="100" value={weight} onChange={(e) => setWeight(e.target.value)} />
                          <strong className="ms-3">Key</strong>
                          <input type="text" className="form-control mb-3 ms-3" placeholder="app" value={podAffinityKey} onChange={(e) => setPodAffinityKey(e.target.value)} />
                          <strong className="ms-3">Operator</strong>
                          <select className="form-select mb-3 ms-3 " aria-label="Default select example" onChange={(e) => setPodAffinityOperator(e.target.value)}>
                            <option value="Equal">Equal</option>
                            <option value="Exists">Exists</option>
                            <option value="In">In</option>
                            <option value="NotIn">NotIn</option>
                          </select>
                          <strong className="ms-3">Value</strong>
                          <input 
                            type="text" 
                            className="form-control mb-3 ms-3" 
                            placeholder="value" 
                            value={podAffinityValue} 
                            onChange={(e) => setPodAffinityValue(e.target.value)}
                            />
                            <strong className="ms-3">Topology Key</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="kubernetes.io/hostname" value={topologyKey} onChange={(e) => setTopologyKey(e.target.value)} />

                            <strong>/Security Context</strong> <br />
                            <strong className="ms-3">Run As User</strong>
                            <input type="number" className="form-control mb-3 ms-3" placeholder="1000" value={runAsUser} onChange={(e)=> setRunAsUser(e.target.value)} />
                            <strong className="ms-3">Run As Group</strong>
                            <input type="number" className="form-control mb-3 ms-3" placeholder="3000" value={runAsGroup} onChange={(e)=> setRunAsGroup(e.target.value)} />
                            <strong className="ms-3">FS Group</strong>
                            <input type="number" className="form-control mb-3 ms-3" placeholder="2000" value={fsGroup} onChange={(e)=> setFsGroup(e.target.value)} />
                            <strong>Volume</strong> <br />
                            <strong className="ms-3">Volume Name</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="my-volume" value={volumeName} onChange={(e)=> setVolumeName(e.target.value)} />
                            <strong className="ms-3">ConfigMap Name</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="my-configmap" value={configMapName} onChange={(e)=> setConfigMapName(e.target.value)} />
                            <strong className="ms-3">Mount Path</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="/etc/config" value={mountPath} onChange={(e)=> setMountPath(e.target.value)} />
                            <strong className="ms-3">Sub Path</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="config-file" value={subPath} onChange={(e)=> setSubPath(e.target.value)} />
                            <strong className="ms-3">Secret name</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="my-secret" value={secretName} onChange={(e)=> setSecretName(e.target.value)} />
                            <strong className="ms-3">Secret Key</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="my-secret-key" value={secretKey} onChange={(e)=> setSecretKey(e.target.value)} />
                            <strong>Container/</strong> <br />
                            <strong className="ms-3">Name</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="my-container" value={containerName} onChange={(e) => setContainerName(e.target.value)} />
                            <strong className="ms-3">Image</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="nginx:latest" value={containerImage} onChange={(e) => setContainerImage(e.target.value)} />
                            <strong className="ms-3">Port Number</strong>
                            <input type="number" className="form-control mb-3 ms-3" placeholder="80" value={containerPort} onChange={(e) => setContainerPort(e.target.value)} />
                            <strong className="ms-3">Protocol</strong>
                            <select className="form-select mb-3 ms-3" aria-label="Default select example" onChange={(e) => setContainerProtocol(e.target.value)}>
                              <option value="TCP">TCP</option>
                              <option value="UDP">UDP</option>
                            </select>
                            <strong className="ms-3">Env Variables/</strong> <br />
                            <strong className="ms-3">Env Name</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="ENV_NAME" value={envName} onChange={(e) => setEnvName(e.target.value)} />
                            <strong className="ms-3">Env Value</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="ENV_VALUE" value={envValue} onChange={(e) => setEnvValue(e.target.value)} />
                            <strong className="ms-3">DB UserName</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="DB_USER" value={dbUser} onChange={(e) => setDbUser(e.target.value)} />
                            <strong className="ms-3">DB Password</strong>
                            <input type="password" className="form-control mb-3 ms-3" placeholder="DB_PASSWORD" value={dbPassword} onChange={(e) => setDbPassword(e.target.value)} />
                            <strong className="ms-3">Env From/</strong> <br />
                            <strong className="ms-3">ConfigMap Ref</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="my-configmap" value={configMapName} onChange={(e) => setConfigMapName(e.target.value)} />
                            <strong className="ms-3">Secret Ref</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="my-secret" value={secretName} onChange={(e) => setSecretName(e.target.value)} />
                            <strong className="ms-3">Resource/</strong> <br />
                            <strong className="ms-3">Request Memory</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="512Mi" value={requestMemory} onChange={(e) => setRequestMemory(e.target.value)} />
                            <strong className="ms-3">Request CPU</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="500m" value={requestCPU} onChange={(e) => setRequestCPU(e.target.value)} />
                            <strong className="ms-3">Limit Memory</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="1Gi" value={limitMemory} onChange={(e) => setLimitMemory(e.target.value)} />
                            <strong className="ms-3">Limit CPU</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="1" value={limitCPU} onChange={(e) => setLimitCPU(e.target.value)} />
                            <strong className="ms-3">Liveness Probe/</strong> <br />
                            <strong className="ms-3">Health Path</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="/health" value={healthPath} onChange={(e) => setHealthPath(e.target.value)} />
                            <strong className="ms-3">Health Port</strong>
                            <input type="number" className="form-control mb-3 ms-3" placeholder="80" value={healthPort} onChange={(e) => setHealthPort(e.target.value)} />
                            <strong className="ms-3">Initial Delay Seconds</strong>
                            <input type="number" className="form-control mb-3 ms-3" placeholder="10" value={initialDelaySeconds} onChange={(e) => setInitialDelaySeconds(e.target.value)} />
                            <strong className="ms-3">Period Seconds</strong>
                            <input type="number" className="form-control mb-3 ms-3" placeholder="10" value={periodSeconds} onChange={(e) => setPeriodSeconds(e.target.value)} />
                            <strong className="ms-3">Readiness Probe/</strong> <br />
                            <strong className="ms-3">Health Path</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="/ready" value={readinessHealthPath} onChange={(e) => setReadinessHealthPath(e.target.value)} />
                            <strong className="ms-3">Health Port</strong>
                            <input type="number" className="form-control mb-3 ms-3" placeholder="80" value={readinessHealthPort} onChange={(e) => setReadinessHealthPort(e.target.value)} />
                            <strong className="ms-3">Initial Delay Seconds</strong>
                            <input type="number" className="form-control mb-3 ms-3" placeholder="10" value={readinessInitialDelaySeconds} onChange={(e) => setReadinessInitialDelaySeconds(e.target.value)} />
                            <strong className="ms-3">Period Seconds</strong>
                            <input type="number" className="form-control mb-3 ms-3" placeholder="10" value={readinessPeriodSeconds} onChange={(e) => setReadinessPeriodSeconds(e.target.value)} />
                            <strong className="ms-3">Volume Mounts/</strong> <br />
                            <strong className="ms-3">Mount Path</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="/etc/config" value={mountPath} onChange={(e) => setMountPath(e.target.value)} />
                            <strong className="ms-3">Secret Volume Name</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="my-secret" value={volumeSecretName} onChange={(e) => setVolumeSecretName(e.target.value)} />
                            <strong className="ms-3">Secret Volume Mount Path</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="/etc/secret-volume" value={secretVolumeMountPath} onChange={(e) => setSecretVolumeMountPath(e.target.value)} />
                            <strong className="ms-3">Mount Path Secret</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="/etc/secret-volume" value={mountPathSecret} onChange={(e) => setMountPathSecret(e.target.value)} />
                            <strong className="ms-3">Allow Privilege Escalation</strong>
                            <select className="form-select mb-3 ms-3" aria-label="Default select example" onChange={(e) => setAllowPrivilegeEscalation(e.target.value === "true")}>
                              <option value={true}>True</option>
                              <option value={false}>False</option>
                            </select>
                        </div>
                      </div>
                    </div>

                    {/* Advanced Section */}
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAdvance" aria-expanded="false" aria-controls="collapseAdvance">Advanced</button>
                      </h2>
                      <div className="accordion-collapse collapse show" id="collapseAdvance" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <strong>Init Container</strong>
                          <input type="text" className="form-control mb-3" placeholder="init-container" value={advName} onChange={(e) => setAdvName(e.target.value)} />
                          <strong>Image</strong>
                          <input type="text" className="form-control mb-3" placeholder="busybox" value={advImage} onChange={(e) => setAdvImage(e.target.value)} />
                          <strong>Command</strong>
                          <input 
                            type="text" 
                            className="form-control mb-3" 
                            placeholder="sh -c 'echo Hello from init container'" 
                            value={advCommandInput} 
                            onChange={(e) => setAdvCommandInput(e.target.value)}
                            onBlur={() => setAdvCommand(advCommandInput.split(" "))}
                          />
                          <strong>Volume Mounts</strong>
                          <strong>Volume Name</strong>
                          <input type="text" className="form-control mb-3" placeholder="init-volume" value={advVolumeName} onChange={(e) => setAdvVolumeName(e.target.value)} />
                          <strong>Mount Path</strong>
                          <input type="text" className="form-control mb-3" placeholder="/init" value={advMountPath} onChange={(e) => setAdvMountPath(e.target.value)} />
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
          <div className="preview">
            <textarea 
              rows="100"
              cols="100"
              value={pod}
            ></textarea>
          </div>
          <div className="cmds">
            <h5>Commands</h5>
            <div className="cmd bg-light mb-4 align-content-center " style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl apply -f pod.yaml</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl get pods -n {namespace}</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl get describe pod {name} -n {namespace} -o yaml</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl run {name} --image={containerImage} --port={containerPort}</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl exec -it {name} -n {namespace} -- /bin/sh</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl delete pod {name} -n {namespace}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Pod
