import React, { useState } from 'react'

function CronJob() {

  const copyToClipboard = () => {
  navigator.clipboard.writeText(cronjob).then(() => {
    alert("cronjob YAML copied to clipboard!");
  });
};

const downloadYAML = () => {
  const blob = new Blob([cronjob], { type: "text/yaml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "cronjob.yaml";
  a.click();
  URL.revokeObjectURL(url);
};

  const [api, setAPI] = useState("");
  const [kind, setKind] = useState("Job");
  const [name, setName] = useState("");
  const [namespace, setNamespace] = useState("");
  const [labels, setLabels] = useState({app:"", env:"", tier:""});
  const [annotations, setAnnotations] = useState([{key: "", value: ""}]);
  const [cronSchedule, setCronSchedule] = useState("0 * * * *");
  const [timeZone, setTimeZone] = useState("UTC");
  const [startingDeadlineSeconds, setStartingDeadlineSeconds] = useState(60);
  const [concurrencyPolicy, setConcurrencyPolicy] = useState("Allow");
  const [suspend, setSuspend] = useState(false);
  const [successfulJobsHistoryLimit, setSuccessfulJobsHistoryLimit] = useState(3);
  const [failedJobsHistoryLimit, setFailedJobsHistoryLimit] = useState(1);
  const [jobgroup, setJobGroup] = useState("default");
  const [completions, setCompletions] = useState(1);
  const [parallelism, setParallelism] = useState(1);
  const [backoffLimit, setBackoffLimit] = useState(6);
  const [activeDeadlineSeconds, setActiveDeadlineSeconds] = useState(3600);
  const [ttlSecondsAfterFinished, setTtlSecondsAfterFinished] = useState(300);
  const [maunalSelector, setMaunalSelector] = useState(false);
  
  const [restartPolicy, setRestartPolicy] = useState("Always");
  const [terminationGracePeriodSeconds, setTerminationGracePeriodSeconds] = useState(30);
  const [diskType, setDiskType] = useState("ssd");
  const [tolerationsKey, setTolerationsKey] = useState("");
  const [tolerationsOperator, setTolerationsOperator] = useState("Equal");
  const [tolerationValue, setTolerationValue] = useState("");
  const [tolerationEffect, setTolerationEffect] = useState("NoSchedule");
  const [weight, setWeight] = useState(100);
  const [minReadySeconds, setMinReadySeconds] = useState(0);
  const [metadata, setMetadata] = useState({app: "", tier: ""});
  const [imagePullPolicy, setImagePullPolicy] = useState("IfNotPresent");
 
  const [podAffinityValue, setPodAffinityValue] = useState("");
  const [topologyKey, setTopologyKey] = useState("kubernetes.io/hostname");
  
  const [volumeName, setVolumeName] = useState("my-volume");
  const [configMapName, setConfigMapName] = useState("my-configmap");
  const [mountPath, setMountPath] = useState("/etc/config");
  const [subPath, setSubPath] = useState("config-file");
  
  const [containerName, setContainerName] = useState("my-container");
  const [containerImage, setContainerImage] = useState("nginx:latest");
  const [containerPort, setContainerPort] = useState(80);
  const [containerProtocol, setContainerProtocol] = useState("TCP");
  const [envName, setEnvName] = useState("ENV_NAME");
  const [envValue, setEnvValue] = useState("ENV_VALUE");
  
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
  const [purpose, setPurpose] = useState("");
  const [podAffinityKey, setPodAffinityKey] = useState("app");
  const [podAffinityOperator, setPodAffinityOperator] = useState("Equal");

  const addAnnotation = () => {
    setAnnotations(prev => [...prev, { key: '', value: '' }]);
  };

  const handleAnnotationChange = (index, field, value) => {
    const newAnnotations = [...annotations];
    newAnnotations[index][field] = value;
    setAnnotations(newAnnotations);
  };



const cronjob = `
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
  schedule: ${cronSchedule}
  timeZone: ${timeZone}
  startingDeadlineSeconds: ${startingDeadlineSeconds}
  concurrencyPolicy: ${concurrencyPolicy}
  suspend: ${suspend}
  successfulJobsHistoryLimit: ${successfulJobsHistoryLimit}
  failedJobsHistoryLimit: ${failedJobsHistoryLimit}
  jobTemplate:
    metadata:
      labels:
        app: ${labels.app}
        jobgroup: ${jobgroup}
      annotations:
        purpose: ${purpose}
    spec:
      completions: ${completions}
      parallelism: ${parallelism}
      backoffLimit: ${backoffLimit}
      activeDeadlineSeconds: ${activeDeadlineSeconds}
      ttlSecondsAfterFinished: ${ttlSecondsAfterFinished}
      manualSelector: ${maunalSelector}
      
      selector:
        matchLabels:
          app: ${labels.app}
          tier: ${labels.tier}
      minReadySeconds: ${minReadySeconds}
      template:
        metadata:
          labels:
            app: ${metadata.app}
            tier: ${metadata.tier}
          annotations:
            purpose: ${purpose}
      restartPolicy: ${restartPolicy}
      terminationGracePeriodSeconds: ${terminationGracePeriodSeconds}
      nodeSelector:
        disktype: ${diskType}
      tolerations:
        - key: "${tolerationsKey}"
          operator: ${tolerationsOperator}
          value: ${tolerationValue}
          effect: ${tolerationEffect}
      affinity:
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
                topologyKey: ${topologyKey}
      containers:
        - name: ${containerName}
          image: ${containerImage}
          imagePullPolicy: ${imagePullPolicy}
          ports:
            - containerPort: ${containerPort}
              protocol: ${containerProtocol}
          env:
            - name: ${envName}
              value: "${envValue}"
          resources:
            requests:
              memory: "${requestMemory}"
              cpu: ${requestCPU}
            limits:
              memory: "${limitMemory}"
              cpu: ${limitCPU}
          livenessProbe:
            httpGet:
              path: ${healthPath}
              port: ${healthPort}
            initialDelaySeconds: ${initialDelaySeconds}
            periodSeconds: ${periodSeconds}
          readinessProbe:
            httpGet:
              path: ${readinessHealthPath}
              port: ${readinessHealthPort}
            initialDelaySeconds: ${readinessInitialDelaySeconds}
            periodSeconds: ${readinessPeriodSeconds}
          volumeMounts:
            - name: ${volumeName}
              mountPath: ${mountPath}
              subPath: ${subPath}
      volumes:
        - name: ${volumeName}
          configMap:
            name: ${configMapName}
      
      

`;
  return (
    <>
      <h1 className="text-center mt-5">Kubernetes Cron Job Generator</h1>
      <p className="text-center mb-5">Generate a Kubernetes Cron Job YAML file with custom metadata and labels.</p>
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
                          <strong>Schedule</strong>
                          <input type="text" className="form-control mb-3" placeholder="0 * * * *" value={cronSchedule} onChange={(e) => setCronSchedule(e.target.value)} />
                          <strong>Time Zone</strong>
                          <input type="text" className="form-control mb-3" placeholder="Asa/Kolkata" value={timeZone} onChange={(e) => setTimeZone(e.target.value)} />
                          <strong>Starting Deadline Seconds</strong>
                          <input type="number" className="form-control mb-3" placeholder="60" value={startingDeadlineSeconds} onChange={(e) => setStartingDeadlineSeconds(e.target.value)} />

                          <strong>Concurrency Policy</strong>
                          <select className="form-select mb-3" aria-label="Default select example" onChange={(e) => setConcurrencyPolicy(e.target.value)}>
                            <option value="Allow">Allow</option>
                            <option value="Forbid">Forbid</option>
                            <option value="Replace">Replace</option>
                          </select>

                          <strong>Suspend</strong>
                          <select className="form-select mb-3" aria-label="Default select example" onChange={(e) => setSuspend(e.target.value === 'true')}>
                            <option value="false">False</option>
                            <option value="true">True</option>
                          </select>

                          <strong>Successful Jobs History Limit</strong>
                          <input type="number" className="form-control mb-3" placeholder="3" value={successfulJobsHistoryLimit} onChange={(e) => setSuccessfulJobsHistoryLimit(e.target.value)} />
                          <strong>Failed Jobs History Limit</strong>
                          <input type="number" className="form-control mb-3" placeholder="1" value={failedJobsHistoryLimit} onChange={(e) => setFailedJobsHistoryLimit(e.target.value)} />
                          <strong>Job Group</strong>
                          <input type="text" className="form-control mb-3" placeholder="default" value={jobgroup} onChange={(e) => setJobGroup(e.target.value)} />
                          <strong>Purpose</strong>
                          <input type="text" className="form-control mb-3" placeholder='web server' value={purpose} onChange={(e) => setPurpose(e.target.value)} />
                          <strong>Completions</strong>
                          <input type="number" className="form-control mb-3" placeholder="1" value={completions} onChange={(e) => setCompletions(e.target.value)} />
                          <strong>Parallelism</strong>
                          <input type="number" className="form-control mb-3" placeholder="1" value={parallelism} onChange={(e) => setParallelism(e.target.value)} />
                          <strong>Backoff Limit</strong>
                          <input type="number" className="form-control mb-3" placeholder="6" value={backoffLimit} onChange={(e) => setBackoffLimit(e.target.value)} />
                          <strong>Active Deadline Seconds</strong>
                          <input type="number" className="form-control mb-3" placeholder="3600" value={activeDeadlineSeconds} onChange={(e) => setActiveDeadlineSeconds(e.target.value)} />
                          <strong>TTL Seconds After Finished</strong>
                          <input type="number" className="form-control mb-3" placeholder="300" value={ttlSecondsAfterFinished} onChange={(e) => setTtlSecondsAfterFinished(e.target.value)} />
                          <strong>Manual Selector</strong>
                          <select className="form-select mb-3" aria-label="Default select example" onChange={(e) => setMaunalSelector(e.target.value === 'true')}>
                            <option value="false">False</option>
                            <option value="true">True</option>
                          </select>

                          <strong>Restart Policy</strong>
                          <select className="form-select mb-3" aria-label="Default select example" onChange={(e) => setRestartPolicy(e.target.value)}>
                            <option value="Always">Always</option>
                            <option value="OnFailure">OnFailure</option>
                            <option value="Never">Never</option>
                          </select>

                          <strong>METADATA</strong> <br />
                          <strong className="ms-3">APP</strong>
                          <input type="text" className="form-control mb-3 ms-3" placeholder="app" value={metadata.app} onChange={(e) => setMetadata({...metadata, app: e.target.value})} />
                          <strong className="ms-3">TIER</strong>
                          <input type="text" className="form-control mb-3 ms-3" placeholder="tier" value={metadata.tier} onChange={(e) => setMetadata({...metadata, tier: e.target.value})} />
                          
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

                            
                            <strong>Volume</strong> <br />
                            <strong className="ms-3">Volume Name</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="my-volume" value={volumeName} onChange={(e)=> setVolumeName(e.target.value)} />
                            <strong className="ms-3">ConfigMap Name</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="my-configmap" value={configMapName} onChange={(e)=> setConfigMapName(e.target.value)} />
                            <strong className="ms-3">Mount Path</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="/etc/config" value={mountPath} onChange={(e)=> setMountPath(e.target.value)} />
                            <strong className="ms-3">Sub Path</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="config-file" value={subPath} onChange={(e)=> setSubPath(e.target.value)} />
                            
                            <strong>Container/</strong> <br />
                            <strong className="ms-3">Name</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="my-container" value={containerName} onChange={(e) => setContainerName(e.target.value)} />
                            <strong className="ms-3">Image</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="nginx:latest" value={containerImage} onChange={(e) => setContainerImage(e.target.value)} />
                            <strong>Image Pull Policy</strong>
                            <select className="form-select mb-3 ms-3" aria-label="Default select example" onChange={(e) => setImagePullPolicy(e.target.value)}>
                              <option value="IfNotPresent">IfNotPresent</option>
                              <option value="Always">Always</option>
                              <option value="Never">Never</option>
                            </select>

                            <strong>Set Min Ready Seconds</strong>
                            <input type="number" className="form-control mb-3 ms-3" placeholder="0" value={minReadySeconds} onChange={(e) => setMinReadySeconds(e.target.value)} />
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
                            
                            <strong className="ms-3">Env From/</strong> <br />
                            <strong className="ms-3">ConfigMap Ref</strong>
                            <input type="text" className="form-control mb-3 ms-3" placeholder="my-configmap" value={configMapName} onChange={(e) => setConfigMapName(e.target.value)} />
                            
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
              value={cronjob}
            ></textarea>
          </div>
          <div className="cmds">
            <h5>Commands</h5>
            <div className="cmd bg-light mb-4 align-content-center " style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl apply -f cronjob.yaml</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl get cronjobs</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl get describe cronjob {name}</div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>kubectl delete -f cronjob.yml</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CronJob
