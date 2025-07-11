import React, { useState } from 'react'

function Deployment() {
  const [api, setAPI] = useState("");
  const [kind, setKind] = useState("Deployment");
  const [name, setName] = useState("");
  const [namespace, setNamespace] = useState("");
  const [labels, setLabels] = useState({app:"", env:"", tier:""});
  const [specifications, setSpecifications] = useState({
  replicas: "",
  revisionHistoryLimit: "",
  strategy: {
    type: "",
    rollingUpdate: {
      maxSurge: "",
      maxUnavailable: ""
    }
  },
  selector: {
    matchLabels: {
      app: "",
      tier: ""
    }
  },
  template: {
    metadata: {
      labels: {
        app: "",
        tier: ""
      },
      annotations: {
        scrape: "true",
        port: ""
      }
    },
    spec: {
      affinity: {
        podAffinity: {
          preferredDuringSchedulingIgnoredDuringExecution: [
            {
              weight: "",
              podAffinityTerm: {
                topologyKey: ""
              }
            }
          ]
        }
      },
      containers: [
        {
          name: "",
          image: "",
          imagePullPolicy: "IfNotPresent",
          ports: [
            {
              containerPort: "",
              protocol: ""
            }
          ],
          resources: {
            requests: {
              memory: "",
              cpu: ""
            },
            limits: {
              memory: "",
              cpu: ""
            }
          },
          env: [
            {
              name: "",
              value: ""
            },
            {
              name: "db-name",
              valueFrom: {
                secretKeyRef: {
                  name: "",
                  key: ""
                }
              }
            }
          ],
          livenessProbe: {
            httpGet: {
              path: "",
              port: ""
            },
            initialDelaySeconds: "",
            periodSeconds: ""
          },
          readinessProbe: {
            httpGet: {
              path: "",
              port: ""
            },
            initialDelaySeconds: "",
            periodSeconds: ""
          },
          volumeMounts: [
            {
              name: "",
              mountPath: ""
            }
          ]
        }
      ],
      volumes: [
        {
          name: "",
          configMap: {
            name: ""
          }
        }
      ],
      restartPolicy: "",
      terminationGracePeriodSeconds: "",
      tolerations: [
        {
          key: "",
          operator: "",
          value: "",
          effect: ""
        }
      ],
      nodeSelector: {
        disktype: ""
      }
    }
  }
});

const deployment = `
apiVersion: ${api}
kind: ${kind}
metadata:
  name: ${name}
  namespace: ${namespace}
  labels:
    app: ${labels.app}
    env: ${labels.env}
    tier: ${labels.tier}
spec:
  replicas: ${specifications.replicas}
  revisionHistoryLimit: ${specifications.revisionHistoryLimit}
  strategy:
    type: ${specifications.strategy.type}
    rollingUpdate:
      maxSurge: ${specifications.strategy.rollingUpdate.maxSurge}
      maxUnavailable: ${specifications.strategy.rollingUpdate.maxUnavailable}
  selector:
    matchLabels:
      app: ${specifications.selector.matchLabels.app}
      tier: ${specifications.selector.matchLabels.tier}
  template:
    metadata:
      labels:
        app: ${specifications.template.metadata.labels.app}
        tier: ${specifications.template.metadata.labels.tier}
      annotations:
        monitoring.io/scrape: "${specifications.template.metadata.annotations.scrape}"
        monitoring.io/port: "${specifications.template.metadata.annotations.port}"
    spec:
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
            - weight: ${specifications.template.spec.affinity.podAffinity.preferredDuringSchedulingIgnoredDuringExecution[0].weight}
              podAffinityTerm:
                labelSelector:
                  matchExpressions:
                    - key: app
                      operator: In
                      values:
                        - ${labels.app}
                topologyKey: ${specifications.template.spec.affinity.podAffinity.preferredDuringSchedulingIgnoredDuringExecution[0].podAffinityTerm.topologyKey}
      containers:
        - name: ${specifications.template.spec.containers[0].name}
          image: ${specifications.template.spec.containers[0].image}
          imagePullPolicy: ${specifications.template.spec.containers[0].imagePullPolicy}
          ports:
            - containerPort: ${specifications.template.spec.containers[0].ports[0].containerPort}
              protocol: ${specifications.template.spec.containers[0].ports[0].protocol}
          resources:
            requests:
              memory: "${specifications.template.spec.containers[0].resources.requests.memory}"
              cpu: "${specifications.template.spec.containers[0].resources.requests.cpu}"
            limits:
              memory: "${specifications.template.spec.containers[0].resources.limits.memory}"
              cpu: "${specifications.template.spec.containers[0].resources.limits.cpu}"
          env:
            - name: ${specifications.template.spec.containers[0].env[0].name}
              value: "${specifications.template.spec.containers[0].env[0].value}"
            - name: ${specifications.template.spec.containers[0].env[1].name}
              valueFrom:
                secretKeyRef:
                  name: ${specifications.template.spec.containers[0].env[1].valueFrom.secretKeyRef.name}
                  key: ${specifications.template.spec.containers[0].env[1].valueFrom.secretKeyRef.key}
          livenessProbe:
            httpGet:
              path: ${specifications.template.spec.containers[0].livenessProbe.httpGet.path}
              port: ${specifications.template.spec.containers[0].livenessProbe.httpGet.port}
            initialDelaySeconds: ${specifications.template.spec.containers[0].livenessProbe.initialDelaySeconds}
            periodSeconds: ${specifications.template.spec.containers[0].livenessProbe.periodSeconds}
          readinessProbe:
            httpGet:
              path: ${specifications.template.spec.containers[0].readinessProbe.httpGet.path}
              port: ${specifications.template.spec.containers[0].readinessProbe.httpGet.port}
            initialDelaySeconds: ${specifications.template.spec.containers[0].readinessProbe.initialDelaySeconds}
            periodSeconds: ${specifications.template.spec.containers[0].readinessProbe.periodSeconds}
          volumeMounts:
            - name: ${specifications.template.spec.containers[0].volumeMounts[0].name}
              mountPath: ${specifications.template.spec.containers[0].volumeMounts[0].mountPath}
      volumes:
        - name: ${specifications.template.spec.volumes[0].name}
          configMap:
            name: ${specifications.template.spec.volumes[0].configMap.name}
      restartPolicy: ${specifications.template.spec.restartPolicy}
      terminationGracePeriodSeconds: ${specifications.template.spec.terminationGracePeriodSeconds}
      nodeSelector:
        disktype: ${specifications.template.spec.nodeSelector.disktype}
      tolerations:
        - key: "${specifications.template.spec.tolerations[0].key}"
          operator: "${specifications.template.spec.tolerations[0].operator}"
          value: "${specifications.template.spec.tolerations[0].value}"
          effect: "${specifications.template.spec.tolerations[0].effect}"
`;

const handleCopy = () => {
  navigator.clipboard.writeText().then(() => {
    alert("Service.yml content copied to clipboard!");
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

  return (
    <>
    <h1 className="mb-3 mt-3 text-center">Deployment Generator</h1>
    <p className="text-center ">Generate a Kubernetes Deployment configuration file</p>
      <div className="container">
        <div className="data mt-3 bg-light">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Deployment - Basic Details
                </button>
              </h2>

              <div className="accordion-collapse collapse show" id="collapseOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <strong>API Version</strong>
                  <input type="text" className="form-control mb-3" value={api} onChange={(e) => setAPI(e.target.value)} placeholder="v1" />
                  <strong>Kind</strong>
                  <input type="text" className="form-control mb-3" placeholder="Deployment" value={kind} onChange={(e) => setKind(e.target.value)} readOnly />
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMetaData" aria-expanded="true" aria-controls="collapseMetaData">
                        Meta Data
                      </button>
                    </h2>
                    <div className="accordion-collapse collapse show" id="collapseMetaData" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <strong>Name</strong>
                        <input type="text" className="form-control mb-3" placeholder="my-deployment" value={name} onChange={(e) => setName(e.target.value)} />
                        <strong>Namespace</strong>
                        <input type="text" className="form-control mb-3" placeholder="Production" value={namespace} onChange={(e) => setNamespace(e.target.value)} />
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseLabel" aria-expanded="true" aria-controls="collapseLabel">
                              Labels
                            </button>
                          </h2>
                          <div className="accordion-collapse collapse show" id="collapseLabel" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                              <strong>App</strong>
                              <input type="text" className="form-control mb-3" placeholder="my-application" value={labels.app} onChange={(e) => setLabels(...labels, e.target.value)} />
                              <strong>Env</strong>
                              <input type="text" className="form-control mb-3" placeholder="prodt" value={labels.env} onChange={(e) => setLabels(...labels, e.target.value)} />
                              <strong>Tier</strong>
                              <input type="text" className="form-control mb-3" placeholder="V2.1.0" value={labels.tier} onChange={(e) => setLabels(...labels, e.target.value)} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSpec" aria-expanded="true" aria-controls="collapseSpec">Specifications</button>
                    </h2>
                    <div className="accordion-collapse collapse show" id="collapseSpec" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <strong>Replicas</strong>
                        <input
                          type="number"
                          className="form-control mb-3"
                          placeholder="3"
                          value={specifications.replicas}
                          onChange={(e) =>
                            setSpecifications(prev => ({
                              ...prev,
                              replicas: e.target.value
                            }))
                          }
                        />
                        <strong>Revision History Limit</strong>
                        <input type="number" className="form-control mb-3" placeholder="5" value={specifications.revisionHistoryLimit}  onChange={(e) => setSpecifications(prev => ({ ...prev, revisionHistoryLimit: e.target.value }))}/>
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSelector" aria-expanded="true" aria-controls="collapseSelector">Selector</button>
                          </h2>
                          <div className="accordion-collapse collapse show" id="collapseSelector" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                              <strong>Match Label:</strong><br />
                              &nbsp;&nbsp;&nbsp;&nbsp; <strong>APP:</strong> 
                              &nbsp;&nbsp;&nbsp;&nbsp; <input type="text" className="form-control mb-3" placeholder="my-app" value={specifications.selector.matchLabels.app} onChange={(e) => setSpecifications(prev => ({ ...prev, selector: { ...prev.selector, matchLabels: {...prev.selector.matchLabels, app: e.target.value} } }))} />
                              &nbsp;&nbsp;&nbsp;&nbsp; <strong>Tier</strong>
                              &nbsp;&nbsp;&nbsp;&nbsp; <input type="text" className="form-control mb-3" placeholder="frontend" value={specifications.selector.matchLabels.tier} onChange={(e) => setSpecifications(prev => ({ ...prev, selector: { ...prev.selector, matchLabels: {...prev.selector.matchLabels, tier: e.target.value} } }))} />
                            </div>
                          </div>
                        </div>

                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseStrategy" aria-expanded="true" aria-controls="collapseStrategy">
                              Strategy
                            </button>
                          </h2>
                          <div className="accordion-collapse collapse show" id="collapseStrategy" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                              <strong>Type</strong>
                              <input type="text" className="form-control mb-3" placeholder="RollingUpdate" value={specifications.strategy.type}  onChange={(e) => setSpecifications(prev => ({ ...prev, strategy: { ...prev.strategy, type: e.target.value } }))}/>
                              <strong>RollingUpdate:</strong> <br />
                              &nbsp;&nbsp;&nbsp;&nbsp; <strong>MaxSurge</strong>
                              <input type="text" className="form-control mb-3" placeholder="25%" value={specifications.strategy.rollingUpdate.maxSurge} onChange={(e) => setSpecifications(prev => ({ ...prev, strategy: { ...prev.strategy, rollingUpdate: {...prev.strategy.rollingUpdate, maxSurge: e.target.value} } }))} />
                              &nbsp;&nbsp;&nbsp;&nbsp; <strong>MaxUnavailable</strong>
                              <input type="text" className="form-control mb-3" placeholder="25%" value={specifications.strategy.rollingUpdate.maxUnavailable} onChange={(e) => setSpecifications(prev => ({ ...prev, strategy: { ...prev.strategy, rollingUpdate: {...prev.strategy.rollingUpdate, maxUnavailable: e.target.value} } }))} />
                            </div>
                          </div>
                        </div>

                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toogle="collapse" data-bs-target="#collapseTemplate" aria-expanded="true" aria-controls="collapseTemplate">
                              Template
                            </button>
                          </h2>
                          <div className="accordion-collapse collapse show" id="collapseTemplate" data-bs-parent="#accordionSpec">
                            <div className="accordion-body">
                              <strong>Annotations:</strong>
                              <strong>Monitoring.io/scrape</strong>
                              <select className="form-control mb-3" value={specifications.template.metadata.annotations.scrape} onChange={(e) => setSpecifications(prev => ({ ...prev, template: { ...prev.template, metadata: { ...prev.template.metadata, annotations: { ...prev.template.metadata.annotations, scrape: e.target.value } } } }))}>
                                <option value="true">true</option>
                                <option value="false">false</option>
                              </select>
                              <strong>Monitoring.io/port</strong>
                              <input type="text" className="form-control mb-3" placeholder="8080" value={specifications.template.metadata.annotations.port} onChange={(e) => setSpecifications(prev => ({ ...prev, template: { ...prev.template, metadata: { ...prev.template.metadata, annotations: { ...prev.template.metadata.annotations, port: e.target.value } } } }))} />
                              <strong>Weight</strong>
                              <input
                                type="number"
                                className="form-control mb-3"
                                placeholder="400"
                                value={
                                  specifications.template.spec.affinity.podAffinity
                                    .preferredDuringSchedulingIgnoredDuringExecution[0].weight
                                }
                                onChange={(e) =>
                                  setSpecifications((prev) => ({
                                    ...prev,
                                    template: {
                                      ...prev.template,
                                      spec: {
                                        ...prev.template.spec,
                                        affinity: {
                                          ...prev.template.spec.affinity,
                                          podAffinity: {
                                            ...prev.template.spec.affinity.podAffinity,
                                            preferredDuringSchedulingIgnoredDuringExecution: [
                                              {
                                                ...prev.template.spec.affinity.podAffinity
                                                  .preferredDuringSchedulingIgnoredDuringExecution[0],
                                                weight: e.target.value,
                                              },
                                            ],
                                          },
                                        },
                                      },
                                    },
                                  }))
                                }
                              />
                              <strong>Topology Key</strong>
                              <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="kubernetes.io/hostname"
                                value={
                                  specifications.template.spec.affinity.podAffinity
                                    .preferredDuringSchedulingIgnoredDuringExecution[0].podAffinityTerm.topologyKey
                                }
                                onChange={(e) =>
                                  setSpecifications((prev) => ({
                                    ...prev,
                                    template: {
                                      ...prev.template,
                                      spec: {
                                        ...prev.template.spec,
                                        affinity: {
                                          ...prev.template.spec.affinity,
                                          podAffinity: {
                                            ...prev.template.spec.affinity.podAffinity,
                                            preferredDuringSchedulingIgnoredDuringExecution: [
                                              {
                                                ...prev.template.spec.affinity.podAffinity
                                                  .preferredDuringSchedulingIgnoredDuringExecution[0],
                                                podAffinityTerm: {
                                                  ...prev.template.spec.affinity.podAffinity
                                                    .preferredDuringSchedulingIgnoredDuringExecution[0].podAffinityTerm,
                                                  topologyKey: e.target.value,
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      },
                                    },
                                  }))
                                }
                              />

                              <div className="accordion-item">
                                <h2 className="accordion-header">
                                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseContainer" aria-expanded="true" aria-controls="collapseContainer">
                                    Container
                                  </button>
                                </h2>

                                <div className="accordion-collapse collapse show" id="collapseContainer" data-bs-parent="#accordionTemplate">
                                  <div className="accordion-body">
                                    <strong>Container Name</strong>
                                    <input type="text" className="form-control mb-3" placeholder="my-container" value={specifications.template.spec.containers[0].name} onChange={(e) => setSpecifications(prev => ({ ...prev, template: { ...prev.template, spec: { ...prev.template.spec, containers: [{ ...prev.template.spec.containers[0], name: e.target.value }] } } }))} />
                                    <strong>Image</strong>
                                    <input type="text"className="form-control mb-3" placeholder="my-register/my-image:V2.1.0" value={specifications.template.spec.containers[0].image} onChange={(e) => setSpecifications(prev => ({ ...prev, template: { ...prev.template, spec: { ...prev.template.spec, containers: [{ ...prev.template.spec.containers[0], image: e.target.value }] } } }))} />
                                    <strong>Image Pulling Policy</strong>
                                    <select className="form-control mb-3" value={specifications.template.spec.containers[0].imagePullPolicy} onChange={(e) => setSpecifications(prev => ({ ...prev, template: { ...prev.template, spec: { ...prev.template.spec, containers: [{ ...prev.template.spec.containers[0], imagePullPolicy: e.target.value }] } } }))} >
                                      <option value="Always">Always</option>
                                      <option value="IfNotPresent">IfNotPresent</option>
                                      <option value="Never">Never</option>
                                    </select>
                                    
                                    <div className="accordion-item">
                                      <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePorts" aria-expanded="true" aria-controls="collapsePorts">
                                          Port
                                        </button>
                                      </h2>

                                      <div className="accordion-collapse collapse show" id="collapsePorts" data-bs-parent="#accordionContainer" >
                                        <div className="accordion-body">
                                          <strong>Container Port</strong>
                                          <input
                                            type="number"
                                            className="form-control mb-3"
                                            placeholder="8080"
                                            value={specifications.template.spec.containers[0].ports[0].containerPort}
                                            onChange={(e) =>
                                              setSpecifications(prev => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    containers: [
                                                      {
                                                        ...prev.template.spec.containers[0],
                                                        ports: [
                                                          {
                                                            ...prev.template.spec.containers[0].ports[0],
                                                            containerPort: e.target.value
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  }
                                                }
                                              }))
                                            }
                                          />

                                          <strong>Protocol</strong>
                                          <select
                                          className="form-control mb-3"
                                          value={specifications.template.spec.containers[0].ports[0].protocol}
                                          onChange={(e) =>
                                            setSpecifications(prev => ({
                                              ...prev,
                                              template: {
                                                ...prev.template,
                                                spec: {
                                                  ...prev.template.spec,
                                                  containers: [
                                                    {
                                                      ...prev.template.spec.containers[0],
                                                      ports: [
                                                        {
                                                          ...prev.template.spec.containers[0].ports[0],
                                                          protocol: e.target.value  // Corrected this line
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                }
                                              }
                                            }))
                                          }
                                        >
                                          <option value="TCP">TCP</option>
                                          <option value="UDP">UDP</option>
                                        </select>

                                        </div>
                                      </div>
                                    </div>


                                    <div className="accordion-item">
                                      <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseResource" aria-expanded="true" aria-controls="collapseResource">
                                          Resource
                                        </button>
                                      </h2>

                                      <div className="accordion-collapse collapse show" id="collapseResource" data-bs-parent="#accordionContainer" >
                                        <div className="accordion-body">
                                          <strong>Memory</strong>
                                          <input
                                            type="text"
                                            className="form-control mb-3"
                                            placeholder="512Mi"
                                            value={specifications.template.spec.containers[0].resources.requests.memory}
                                            onChange={(e) =>
                                              setSpecifications(prev => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    containers: [
                                                      {
                                                        ...prev.template.spec.containers[0],
                                                        resources: {
                                                          ...prev.template.spec.containers[0].resources,
                                                          requests: {
                                                            ...prev.template.spec.containers[0].resources.requests,
                                                            memory: e.target.value
                                                          }
                                                        }
                                                      }
                                                    ]
                                                  }
                                                }
                                              }))
                                            }
                                          />

                                          <strong>CPU</strong>
                                          <input
                                            type="text"
                                            className="form-control mb-3"
                                            placeholder="500m"
                                            value={specifications.template.spec.containers[0].resources.requests.cpu}
                                            onChange={(e) =>
                                              setSpecifications(prev => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    containers: [
                                                      {
                                                        ...prev.template.spec.containers[0],
                                                        resources: {
                                                          ...prev.template.spec.containers[0].resources,
                                                          requests: {
                                                            ...prev.template.spec.containers[0].resources.requests,
                                                            cpu: e.target.value
                                                          }
                                                        }
                                                      }
                                                    ]
                                                  }
                                                }
                                              }))
                                            }
                                          />

                                        </div>
                                      </div>
                                    </div>

                                    <div className="accordion-item">
                                      <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEnvs" aria-expanded="true" aria-controls="collapseEnvs">
                                          Environment Variables
                                        </button>
                                      </h2>

                                      <div className="accordion-collapse collapse show" id="collapseEnvs" data-bs-parent="#accordionContainer" >
                                        <div className="accordion-body">
                                          <strong>Name</strong>
                                          <input
                                            type="text"
                                            className="form-control mb-3"
                                            placeholder="my-env"
                                            value={specifications.template.spec.containers[0].env[0].name}
                                            onChange={(e) =>
                                              setSpecifications(prev => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    containers: [
                                                      {
                                                        ...prev.template.spec.containers[0],
                                                        env: [
                                                          {
                                                            ...prev.template.spec.containers[0].env[0],
                                                            name: e.target.value
                                                          },
                                                          prev.template.spec.containers[0].env[1]
                                                        ]
                                                      }
                                                    ]
                                                  }
                                                }
                                              }))
                                            }
                                          />

                                          <strong>Value</strong>
                                          <input
                                            type="text"
                                            className="form-control mb-3"
                                            placeholder="Production"
                                            value={specifications.template.spec.containers[0].env[0].value}
                                            onChange={(e) =>
                                              setSpecifications(prev => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    containers: [
                                                      {
                                                        ...prev.template.spec.containers[0],
                                                        env: [
                                                          {
                                                            ...prev.template.spec.containers[0].env[0],
                                                            value: e.target.value
                                                          },
                                                          prev.template.spec.containers[0].env[1]
                                                        ]
                                                      }
                                                    ]
                                                  }
                                                }
                                              }))
                                            }
                                          />

                                          <strong>Name</strong>
                                          <input
                                            type="text"
                                            className="form-control mb-3"
                                            placeholder="DB_HOST"
                                            value={specifications.template.spec.containers[0].env[1].name}
                                            onChange={(e) =>
                                              setSpecifications(prev => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    containers: [
                                                      {
                                                        ...prev.template.spec.containers[0],
                                                        env: [
                                                          prev.template.spec.containers[0].env[0],
                                                          {
                                                            ...prev.template.spec.containers[0].env[1],
                                                            name: e.target.value
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  }
                                                }
                                              }))
                                            }
                                          />

                                          <strong>Secret Name</strong>
                                          <input
                                            type="text"
                                            className="form-control mb-3"
                                            placeholder="db-secret"
                                            value={specifications.template.spec.containers[0].env[1].valueFrom.secretKeyRef.name}
                                            onChange={(e) =>
                                              setSpecifications(prev => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    containers: [
                                                      {
                                                        ...prev.template.spec.containers[0],
                                                        env: [
                                                          prev.template.spec.containers[0].env[0],
                                                          {
                                                            ...prev.template.spec.containers[0].env[1],
                                                            valueFrom: {
                                                              secretKeyRef: {
                                                                ...prev.template.spec.containers[0].env[1].valueFrom.secretKeyRef,
                                                                name: e.target.value
                                                              }
                                                            }
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  }
                                                }
                                              }))
                                            }
                                          />

                                          <strong>Key</strong>
                                          <input
                                            type="text"
                                            className="form-control mb-3"
                                            placeholder="db-password"
                                            value={specifications.template.spec.containers[0].env[1].valueFrom.secretKeyRef.key}
                                            onChange={(e) =>
                                              setSpecifications(prev => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    containers: [
                                                      {
                                                        ...prev.template.spec.containers[0],
                                                        env: [
                                                          prev.template.spec.containers[0].env[0],
                                                          {
                                                            ...prev.template.spec.containers[0].env[1],
                                                            valueFrom: {
                                                              secretKeyRef: {
                                                                ...prev.template.spec.containers[0].env[1].valueFrom.secretKeyRef,
                                                                key: e.target.value
                                                              }
                                                            }
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  }
                                                }
                                              }))
                                            }
                                          />

                                        </div>
                                      </div>
                                    </div>

                                    <div className="accordion-item">
                                      <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseLivenessProb" aria-expanded="true" aria-controls="collapseLivenessProb">
                                          Liveness Prob
                                        </button>
                                      </h2>

                                      <div className="accordion-collapse collapse show" id="collapseLivenessProb" data-bs-parent="#accordionContainer" >
                                        <div className="accordion-body">
                                          <strong>HTTP Get Path</strong>
                                          <input
                                            type="text"
                                            className="form-control mb-3"
                                            placeholder="/"
                                            value={specifications.template.spec.containers[0].livenessProbe.httpGet.path}
                                            onChange={(e) =>
                                              setSpecifications((prev) => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    containers: [
                                                      {
                                                        ...prev.template.spec.containers[0],
                                                        livenessProbe: {
                                                          ...prev.template.spec.containers[0].livenessProbe,
                                                          httpGet: {
                                                            ...prev.template.spec.containers[0].livenessProbe.httpGet,
                                                            path: e.target.value,
                                                          },
                                                        },
                                                      },
                                                    ],
                                                  },
                                                },
                                              }))
                                            }
                                          />

                                          <strong>Port</strong>
                                          <input
                                            type="number"
                                            className="form-control mb-3"
                                            placeholder="8080"
                                            value={specifications.template.spec.containers[0].livenessProbe.httpGet.port}
                                            onChange={(e) =>
                                              setSpecifications((prev) => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    containers: [
                                                      {
                                                        ...prev.template.spec.containers[0],
                                                        livenessProbe: {
                                                          ...prev.template.spec.containers[0].livenessProbe,
                                                          httpGet: {
                                                            ...prev.template.spec.containers[0].livenessProbe.httpGet,
                                                            port: e.target.value,
                                                          },
                                                        },
                                                      },
                                                    ],
                                                  },
                                                },
                                              }))
                                            }
                                          />

                                          <strong>Initial Delay</strong>
                                          <input
                                            type="number"
                                            className="form-control mb-3"
                                            placeholder="10"
                                            value={specifications.template.spec.containers[0].livenessProbe.initialDelaySeconds}
                                            onChange={(e) =>
                                              setSpecifications((prev) => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    containers: [
                                                      {
                                                        ...prev.template.spec.containers[0],
                                                        livenessProbe: {
                                                          ...prev.template.spec.containers[0].livenessProbe,
                                                          initialDelaySeconds: e.target.value,
                                                        },
                                                      },
                                                    ],
                                                  },
                                                },
                                              }))
                                            }
                                          />

                                          <strong>Period Seconds</strong>
                                          <input
                                            type="number"
                                            className="form-control mb-3"
                                            placeholder="10"
                                            value={specifications.template.spec.containers[0].livenessProbe.periodSeconds}
                                            onChange={(e) =>
                                              setSpecifications((prev) => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    containers: [
                                                      {
                                                        ...prev.template.spec.containers[0],
                                                        livenessProbe: {
                                                          ...prev.template.spec.containers[0].livenessProbe,
                                                          periodSeconds: e.target.value,
                                                        },
                                                      },
                                                    ],
                                                  },
                                                },
                                              }))
                                            }
                                          />

                                        </div>
                                      </div>
                                    </div>

                                    <div className="accordion-item">
                                      <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseReadinessProb" aria-expanded="true" aria-controls="collapseReadinessProb">
                                          Readiness Prob
                                        </button>
                                      </h2>

                                      <div className="accordion-collapse collapse show" id="collapseReadinessProb" data-bs-parent="#accordionContainer" >
                                        <div className="accordion-body">
                                          <strong>HTTP Get Path</strong>
                                          <input
                                            type="text"
                                            className="form-control mb-3"
                                            placeholder="/"
                                            value={specifications.template.spec.containers[0].readinessProbe.httpGet.path}
                                            onChange={(e) =>
                                              setSpecifications((prev) => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    containers: [
                                                      {
                                                        ...prev.template.spec.containers[0],
                                                        readinessProbe: {
                                                          ...prev.template.spec.containers[0].readinessProbe,
                                                          httpGet: {
                                                            ...prev.template.spec.containers[0].readinessProbe.httpGet,
                                                            path: e.target.value,
                                                          },
                                                        },
                                                      },
                                                    ],
                                                  },
                                                },
                                              }))
                                            }
                                          />

                                          <strong>Port</strong>
                                          <input
                                            type="number"
                                            className="form-control mb-3"
                                            placeholder="8080"
                                            value={specifications.template.spec.containers[0].readinessProbe.httpGet.port}
                                            onChange={(e) =>
                                              setSpecifications((prev) => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    containers: [
                                                      {
                                                        ...prev.template.spec.containers[0],
                                                        readinessProbe: {
                                                          ...prev.template.spec.containers[0].readinessProbe,
                                                          httpGet: {
                                                            ...prev.template.spec.containers[0].readinessProbe.httpGet,
                                                            port: e.target.value,
                                                          },
                                                        },
                                                      },
                                                    ],
                                                  },
                                                },
                                              }))
                                            }
                                          />

                                          <strong>Initial Delay</strong>
                                          <input
                                            type="number"
                                            className="form-control mb-3"
                                            placeholder="10"
                                            value={specifications.template.spec.containers[0].readinessProbe.initialDelaySeconds}
                                            onChange={(e) =>
                                              setSpecifications((prev) => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    containers: [
                                                      {
                                                        ...prev.template.spec.containers[0],
                                                        readinessProbe: {
                                                          ...prev.template.spec.containers[0].readinessProbe,
                                                          initialDelaySeconds: e.target.value,
                                                        },
                                                      },
                                                    ],
                                                  },
                                                },
                                              }))
                                            }
                                          />

                                          <strong>Period Seconds</strong>
                                          <input
                                            type="number"
                                            className="form-control mb-3"
                                            placeholder="10"
                                            value={specifications.template.spec.containers[0].readinessProbe.periodSeconds}
                                            onChange={(e) =>
                                              setSpecifications((prev) => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    containers: [
                                                      {
                                                        ...prev.template.spec.containers[0],
                                                        readinessProbe: {
                                                          ...prev.template.spec.containers[0].readinessProbe,
                                                          periodSeconds: e.target.value,
                                                        },
                                                      },
                                                    ],
                                                  },
                                                },
                                              }))
                                            }
                                          />

                                          <strong>Volume Mount name</strong>
                                          <input
                                            type="text"
                                            className="form-control mb-3"
                                            placeholder="my-storage"
                                            value={specifications.template.spec.containers[0].volumeMounts[0].name}
                                            onChange={(e) =>
                                              setSpecifications((prev) => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    containers: [
                                                      {
                                                        ...prev.template.spec.containers[0],
                                                        volumeMounts: [
                                                          {
                                                            ...prev.template.spec.containers[0].volumeMounts[0],
                                                            name: e.target.value,
                                                          },
                                                        ],
                                                      },
                                                    ],
                                                  },
                                                },
                                              }))
                                            }
                                          />

                                          <strong>Volume Mount Path</strong>
                                          <input
                                            type="text"
                                            className="form-control mb-3"
                                            placeholder="/data"
                                            value={specifications.template.spec.containers[0].volumeMounts[0].mountPath}
                                            onChange={(e) =>
                                              setSpecifications((prev) => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    containers: [
                                                      {
                                                        ...prev.template.spec.containers[0],
                                                        volumeMounts: [
                                                          {
                                                            ...prev.template.spec.containers[0].volumeMounts[0],
                                                            mountPath: e.target.value,
                                                          },
                                                        ],
                                                      },
                                                    ],
                                                  },
                                                },
                                              }))
                                            }
                                          />

                                        </div>
                                      </div>
                                    </div>

                                    <div className="accordion-item">
                                      <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseVolume" aria-expanded="true" aria-controls="collapseVolume">
                                          Volume
                                        </button>
                                      </h2>

                                      <div className="accordion-collapse collapse show" id="collapseVolume" data-bs-parent="#accordionContainer" >
                                        <div className="accordion-body">
                                          <strong>Name</strong>
                                          <input
                                            type="text"
                                            className="form-control mb-3"
                                            placeholder="Config-Volume"
                                            value={specifications.template.spec.volumes[0].name}
                                            onChange={(e) =>
                                              setSpecifications((prev) => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    volumes: [
                                                      {
                                                        ...prev.template.spec.volumes[0],
                                                        name: e.target.value,
                                                      },
                                                    ],
                                                  },
                                                },
                                              }))
                                            }
                                          />

                                          <strong>Config Map name</strong>
                                          <input
                                            type="text"
                                            className="form-control mb-3"
                                            placeholder="my-config"
                                            value={specifications.template.spec.volumes[0].configMap.name}
                                            onChange={(e) =>
                                              setSpecifications((prev) => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    volumes: [
                                                      {
                                                        ...prev.template.spec.volumes[0],
                                                        configMap: {
                                                          ...prev.template.spec.volumes[0].configMap,
                                                          name: e.target.value,
                                                        },
                                                      },
                                                    ],
                                                  },
                                                },
                                              }))
                                            }
                                          />

                                        </div>
                                      </div>
                                    </div>

                                    <div className="accordion-item">
                                      <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAdvance" aria-expanded="true" aria-controls="collapseAdvance">
                                          Advance
                                        </button>
                                      </h2>

                                      <div className="accordion-collapse collapse show" id="collapseAdvance" data-bs-parent="#accordionContainer" >
                                        <div className="accordion-body">
                                          <strong>Restart Policy</strong>
                                          <select
                                            className="form-select mb-3"
                                            aria-label="Default select example"
                                            value={specifications.template.spec.restartPolicy}
                                            onChange={(e) =>
                                              setSpecifications((prev) => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    restartPolicy: e.target.value,
                                                  },
                                                },
                                              }))
                                            }
                                          >
                                            <option value="Always">Always</option>
                                            <option value="OnFailure">OnFailure</option>
                                            <option value="Never">Never</option>
                                          </select>

                                          <strong>TerminationGracePeriodSeconds</strong>
                                          <input
                                            type="number"
                                            className="form-control mb-3"
                                            placeholder="10"
                                            value={specifications.template.spec.terminationGracePeriodSeconds}
                                            onChange={(e) =>
                                              setSpecifications((prev) => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    terminationGracePeriodSeconds: e.target.value,
                                                  },
                                                },
                                              }))
                                            }
                                          />

                                          <strong>Node Selector Disk Type</strong>
                                          <select
                                            className="form-control mb-3"
                                            value={specifications.template.spec.nodeSelector.disktype}
                                            onChange={(e) =>
                                              setSpecifications((prev) => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    nodeSelector: {
                                                      ...prev.template.spec.nodeSelector,
                                                      disktype: e.target.value,
                                                    },
                                                  },
                                                },
                                              }))
                                            }
                                          >
                                            <option value="SSD">SSD</option>
                                            <option value="HDD">HDD</option>
                                          </select>

                                          <strong>Tolerations</strong> <br />
                                          <strong>Key</strong>
                                          <select
                                            className="form-control mb-3"
                                            value={specifications.template.spec.tolerations[0].key}
                                            onChange={(e) =>
                                              setSpecifications((prev) => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    tolerations: [
                                                      {
                                                        ...prev.template.spec.tolerations[0],
                                                        key: e.target.value,
                                                      },
                                                    ],
                                                  },
                                                },
                                              }))
                                            }
                                          >
                                            <option value="node-role.kubernetes.io/master">node-role.kubernetes.io/master</option>
                                            <option value="node-role.kubernetes.io/worker">node-role.kubernetes.io/worker</option>
                                          </select>

                                          <strong>Operator</strong>
                                          <select
                                            className="form-control mb-3"
                                            value={specifications.template.spec.tolerations[0].operator}
                                            onChange={(e) =>
                                              setSpecifications((prev) => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    tolerations: [
                                                      {
                                                        ...prev.template.spec.tolerations[0],
                                                        operator: e.target.value,
                                                      },
                                                    ],
                                                  },
                                                },
                                              }))
                                            }
                                          >
                                            <option value="Equal">Equal</option>
                                            <option value="Exists">Exists</option>
                                          </select>

                                          <strong>Value</strong>
                                          <input
                                            type="text"
                                            className="form-control mb-3"
                                            placeholder="app-node"
                                            value={specifications.template.spec.tolerations[0].value}
                                            onChange={(e) =>
                                              setSpecifications((prev) => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    tolerations: [
                                                      {
                                                        ...prev.template.spec.tolerations[0],
                                                        value: e.target.value,
                                                      },
                                                    ],
                                                  },
                                                },
                                              }))
                                            }
                                          />

                                          <strong>Effect</strong>
                                          <select
                                            className="form-control mb-3"
                                            value={specifications.template.spec.tolerations[0].effect}
                                            onChange={(e) =>
                                              setSpecifications((prev) => ({
                                                ...prev,
                                                template: {
                                                  ...prev.template,
                                                  spec: {
                                                    ...prev.template.spec,
                                                    tolerations: [
                                                      {
                                                        ...prev.template.spec.tolerations[0],
                                                        effect: e.target.value,
                                                      },
                                                    ],
                                                  },
                                                },
                                              }))
                                            }
                                          >
                                            <option value="NoExecute">NoExecute</option>
                                            <option value="NoSchedule">NoSchedule</option>
                                          </select>

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
                  </div>
                </div>
              </div>
            </div>
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

        <div className="result">
          <div className="preview">
            <textarea
              readOnly
              rows="100"
              cols="100"
              className="form-control"
              value={deployment}
              >

            </textarea>
          </div>
          <div className="cmds">
            <h5>Commands</h5>
            <div className="cmd bg-light mb-4 align-content-center " style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>
              kubectl apply -f deployment.yaml
            </div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "100px", textAlign: "center", borderRadius: "8px"}}>
              kubectl get deployments <br />
              kubectl get pods <br />
              kubectl describe deployment deployment-name <br />
              kubectl logs pod-name <br />
            </div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>
              kubectl apply -f deployment.yaml --dry-run=client
            </div>
            <div className="cmd bg-light mb-4 align-content-center" style={{width: "550px", height: "40px", textAlign: "center", borderRadius: "8px"}}>
              kubectl delete deployment deployment-name
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Deployment
