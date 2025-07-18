import React, { useState } from 'react';
import "../styles/jenkins.css";

export default function Jenkins() {
    const copyToClipboard = () => {
    navigator.clipboard.writeText(jenkins).then(() => {
      alert("Jenkins YAML copied to clipboard!");
    });
  };
  
  const downloadYAML = () => {
    const blob = new Blob([jenkins], { type: "text" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Jenkins";
    a.click();
    URL.revokeObjectURL(url);
  };

  
  const [input, setInput] = useState("");
  const [labels, setLabels] = useState([]);
  const [newLabel, setNewLabel] = useState('');
  const [workspace, setWorkspace] = useState("");
  const [timeout, setTimeout] = useState("");
  const [buildDiscarder, setBuildDiscarder] = useState({numToKeepStr: "", artifactNumToKeepStr: ""});
  const [disableConcurrentBuilds, setDisableConcurrentBuilds] = useState(false);
  const [skipDefaultCheckout, setSkipDefaultCheckout] = useState(false);
  const [timestamps, setTimeStamps] = useState(false);
  const [ansiColor, setAnsiColor] = useState("");
  const [stashBuilds, setStashBuilds] = useState("");
  const [rateLimitBuilds, setRateLimitBuilds] = useState({count: "", durationName: ""});
  const [retry, setRetry] = useState({count: ""});
  const [parallelsAlwaysFailFast, setParallelsAlwaysFailFast] = useState(false);
  const [quitePeriod, setQuitePeriod] = useState("");
  const [disableResume, setDisableResume] = useState(false);
  const [env, setEnv] = useState({globalENV:"", secret:"", path:"", jobName:"", buildNumber:""});
  const [params, setParams] = useState({BRANCH: "main", RUN_TESTS: true, DEBUG: false, ENVIRONMENT: "prod", DEPLOY_PASSWORD: "", RELEASE_NOTE: ""});
  const [trigger, setTrigger] = useState({triggerType: "cron",
    cronSchedule: "0 * * * *",
    timeZone: "UTC",
    upstreamProject: "",
    threshold:"Success",
    pollSCMSchedule: ""});
  const [tools, setTools] = useState([{ toolName: "", toolVersion: "" }]);
  const [method, setMethod] = useState("");
  const [config, setConfig] = useState({});
  const [dockerImage, setDockerImage] = useState(false);
  const [k8s, setK8S] = useState(false);
  const [plugins, setPlugins] = useState({
    docker: false,
    kubernetes: false,
    terraform: false,
    ansible: false
  });

  const [dockerConfig, setDockerConfig] = useState({
    imageName: "",
    dockerHubUsername: "",
    dockerfilePath: "Dockerfile"
  });

  const [k8sConfig, setK8sConfig] = useState({
    deploymentFile: "k8s/deployment.yaml",
    namespace: "default"
  });

  const [terraformConfig, setTerraformConfig] = useState({
    workingDir: "infra/terraform"
  });

  const [ansibleConfig, setAnsibleConfig] = useState({
    playbookFile: "ansible/playbook.yml",
    inventoryFile: "ansible/inventory.ini"
  });

  const handleToggle = (tool) => {
    setPlugins((prev) => ({
      ...prev,
      [tool]: !prev[tool]
    }));
  };
  
  const addLabel = () => {
    if (newLabel.trim() !== "" && !labels.includes(newLabel)) {
        setLabels([...labels, newLabel]);
        setNewLabel('');
    }
  };

  const removeLabel = (labelToRemove) => {
    setLabels(labels.filter(label => label !== labelToRemove));
  };

  const handleRunTestsChange = (event) => {
    setParams({
      ...params,
      RUN_TESTS: event.target.checked,
    });
  };
 
  const handleToolChange = (index, field, value) => {
    const updatedTools = [...tools];
    updatedTools[index][field] = value;
    setTools(updatedTools);
  };

  const addTool = () => {
    setTools([...tools, { toolName: "", toolVersion: "" }]);
  };

  const removeTool = (index) => {
    const updatedTools = tools.filter((_, i) => i !== index);
    setTools(updatedTools);
  };
  
  

  const handleConfigChange = (key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const renderFields = () => {
    switch (method) {
      case "email":
        return (
          <>
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Recipient Email (to)"
              onChange={(e) => handleConfigChange("to", e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Email Subject"
              onChange={(e) => handleConfigChange("subject", e.target.value)}
            />
            <textarea
              className="form-control mb-2"
              placeholder="Email Body"
              onChange={(e) => handleConfigChange("body", e.target.value)}
            />
          </>
        );
      case "slack":
        return (
          <>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Slack Channel (e.g. #devops)"
              onChange={(e) => handleConfigChange("channel", e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Slack Message"
              onChange={(e) => handleConfigChange("message", e.target.value)}
            />
          </>
        );
      case "telegram":
        return (
          <>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Bot Token"
              onChange={(e) => handleConfigChange("botToken", e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Chat ID"
              onChange={(e) => handleConfigChange("chatId", e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Telegram Message"
              onChange={(e) => handleConfigChange("message", e.target.value)}
            />
          </>
        );
      case "webhook":
        return (
          <>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Webhook URL"
              onChange={(e) => handleConfigChange("url", e.target.value)}
            />
            <textarea
              className="form-control mb-2"
              placeholder="Payload Body (JSON)"
              onChange={(e) => handleConfigChange("payload", e.target.value)}
            />
          </>
        );
      default:
        return null;
    }
  };

   const jenkins = `
pipeline {
    agent {
        label '${labels.join(' && ') || 'linux'}'
        ${workspace ? `customWorkspace '${workspace}'` : ''}
    }

    options {
        ${timeout ? `timeout(time: ${timeout}, unit: 'MINUTES')` : ''}
        ${buildDiscarder.numToKeepStr || buildDiscarder.artifactNumToKeepStr
            ? `buildDiscarder(logRotator(${buildDiscarder.numToKeepStr ? `numToKeepStr: '${buildDiscarder.numToKeepStr}'` : ''}${buildDiscarder.numToKeepStr && buildDiscarder.artifactNumToKeepStr ? ', ' : ''}${buildDiscarder.artifactNumToKeepStr ? `artifactNumToKeepStr: '${buildDiscarder.artifactNumToKeepStr}'` : ''}))`
            : ''}
        ${disableConcurrentBuilds ? 'disableConcurrentBuilds()' : ''}
        ${skipDefaultCheckout ? 'skipDefaultCheckout()' : ''}
        ${timestamps ? 'timestamps()' : ''}
        ${ansiColor ? `ansiColor('${ansiColor}')` : ''}
        ${stashBuilds ? `preserveStashes(buildCount: ${stashBuilds})` : ''}
        ${rateLimitBuilds.count && rateLimitBuilds.durationName
            ? `rateLimitBuilds(throttle: [count: ${rateLimitBuilds.count}, durationName: '${rateLimitBuilds.durationName}'])`
            : ''}
        ${retry.count ? `retry(count: ${retry.count})` : ''}
        ${parallelsAlwaysFailFast ? 'parallelsAlwaysFailFast()' : ''}
        ${quitePeriod ? `quietPeriod(${quitePeriod})` : ''}
        ${disableResume ? 'disableResume()' : ''}
    }

    environment {
        ${env.globalENV ? `GLOBAL_ENV = '${env.globalENV}'` : ''}
        ${env.secret ? `SECRET = credentials('${env.secret}')` : ''}
        ${env.path ? `PATH = "${env.path}:\${env.PATH}"` : ''}
        ${env.jobName ? `JOB_NAME = '${env.jobName}'` : ''}
        ${env.buildNumber ? `BUILD_NUMBER = '${env.buildNumber}'` : ''}
    }

    parameters {
        ${params.BRANCH ? `string(name: 'BRANCH', defaultValue: '${params.BRANCH}', description: 'Git branch to build')` : ''}
        booleanParam(name: 'RUN_TESTS', defaultValue: ${params.RUN_TESTS}, description: 'Run tests?')
        booleanParam(name: 'DEBUG', defaultValue: ${params.DEBUG}, description: 'Enable debug logging')
        ${params.ENVIRONMENT ? `choice(name: 'ENVIRONMENT', choices: ['dev', 'staging', 'prod'], description: 'Deployment environment')` : ''}
        ${params.DEPLOY_PASSWORD ? `password(name: 'DEPLOY_PASSWORD', defaultValue: '', description: 'Password for deployment')` : ''}
        ${params.RELEASE_NOTE ? `text(name: 'RELEASE_NOTES', defaultValue: '', description: 'Release notes')` : ''}
    }

    triggers {
        ${trigger.triggerType === 'cron' && trigger.cronSchedule
            ? `cron('${trigger.cronSchedule}')`
            : ''}
        ${trigger.triggerType === 'pollSCM' && trigger.pollSCMSchedule
            ? `pollSCM('${trigger.pollSCMSchedule}')`
            : ''}
        ${trigger.triggerType === 'upstream' && trigger.upstreamProject
            ? `upstream(upstreamProjects: '${trigger.upstreamProject}', threshold: hudson.model.Result.${trigger.threshold.toUpperCase()})`
            : ''}
    }

    tools {
        ${tools
            .filter(tool => tool.toolName)
            .map(tool => `${tool.toolName} '${tool.toolVersion}'`)
            .join('\n        ')}
    }

    stages {
        stage('Preparation') {
            steps {
                checkout scm
                echo "Checked out branch: \${params.BRANCH}"
                sh 'printenv'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the application...'
            }
        }

        ${params.RUN_TESTS ? `
        stage('Test') {
            steps {
                echo 'Running tests...'
            }
        }` : ''}

        ${plugins.docker ? `
        stage('Docker Build & Push') {
            steps {
                sh 'docker build -t ${dockerConfig.dockerHubUsername}/${dockerConfig.imageName} -f ${dockerConfig.dockerfilePath} .'
                sh 'docker push ${dockerConfig.dockerHubUsername}/${dockerConfig.imageName}'
            }
        }` : ''}

        ${plugins.kubernetes ? `
        stage('Kubernetes Deploy') {
            steps {
                sh 'kubectl apply -f ${k8sConfig.deploymentFile} -n ${k8sConfig.namespace}'
            }
        }` : ''}

        ${plugins.terraform ? `
        stage('Terraform Apply') {
            steps {
                dir('${terraformConfig.workingDir}') {
                    sh 'terraform init'
                    sh 'terraform apply -auto-approve'
                }
            }
        }` : ''}

        ${plugins.ansible ? `
        stage('Ansible Playbook') {
            steps {
                sh 'ansible-playbook -i ${ansibleConfig.inventoryFile} ${ansibleConfig.playbookFile}'
            }
        }` : ''}
    }

    post {
        always {
            cleanWs()
            echo 'Pipeline completed.'
        }
    success {
        echo 'Build succeeded!'
        ${method === 'email' && config.to ? 
            `mail to: '${config.to}', subject: '${config.subject || 'Build Succeeded'}', body: '${config.body || 'Your Jenkins build completed successfully.'}'` 
            : ''}
        ${method === 'slack' && config.channel ? 
            `slackSend channel: '${config.channel}', message: '${config.message || 'Build succeeded!'}'` 
            : ''}
        ${method === 'telegram' && config.botToken && config.chatId ? 
            `sh '''
                curl -s -X POST https://api.telegram.org/bot${config.botToken}/sendMessage \\
                -d chat_id=${config.chatId} \\
                -d text="${config.message || 'Build succeeded!'}"
                '''` 
            : ''}
        ${method === 'webhook' && config.url ? 
            `httpRequest httpMode: 'POST', url: '${config.url}', requestBody: '''${config.payload || '{}'}'''`
            : ''}
    }
    failure {
        echo 'Build failed!'
        ${method === 'email' && config.to ? 
            `mail to: '${config.to}', subject: 'Build Failed', body: '${config.body || 'Your Jenkins build failed.'}'` 
            : ''}
        ${method === 'slack' && config.channel ? 
            `slackSend channel: '${config.channel}', message: '${config.message || 'Build failed!'}'` 
            : ''}
        ${method === 'telegram' && config.botToken && config.chatId ? 
            `sh '''
                curl -s -X POST https://api.telegram.org/bot${config.botToken}/sendMessage \\
                -d chat_id=${config.chatId} \\
                -d text="${config.message || 'Build failed!'}"
                '''` 
            : ''}
        ${method === 'webhook' && config.url ? 
            `httpRequest httpMode: 'POST', url: '${config.url}', requestBody: '''${config.payload || '{}'}'''`
            : ''}
        }
    }

}
`;


    return (
        <>
            <h1 className="display-4 text-center mb-3 mt-3">Jenkins Pipeline Generator</h1>
            <p className="text-center mb-5">Generate a Jenkins pipeline configuration file.</p>

            <div className="container">
                <div className="data">
                    <div className="details bg-light" style={{borderRadius: "8px"}}>
                        <div className="accordion">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Pipeline Configuration
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <strong className="mb-">Agent</strong>
                                        <input
                                            type="text"
                                            value={newLabel}
                                            onChange={(e) => setNewLabel(e.target.value)}
                                            placeholder="Enter new label"
                                            className="form-control mb-2"
                                        />
                                        <button onClick={addLabel} className="btn btn-primary mt-2">
                                            Add Label
                                        </button>
                                        
                                        {labels.map((label, index) => (
                                            
                                            <span key={index} className="badge bg-secondary m-2"> 
                                                {label}
                                                <button
                                                onClick={() => removeLabel(label)}
                                                className="btn btn-sm btn-danger ms-2 mb-3"
                                                >
                                                ✕
                                                </button>
                                            </span>
                                        ))}

                                        <br />
                                        <strong className="mt-3">Custom Work Space</strong>
                                        <input type="text" className="form-control mb-3" placeholder="/temp/my-dir" value={workspace} onChange={(e) => setWorkspace(e.target.value)} />

                                        <div className="accordion-item mb-3">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                                    Options
                                                </button>
                                            </h2>
                                            <div id="collapseTwo" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                        
                                                        <strong>Timeout</strong>
                                                        <input type="number" className="form-control mb-3" placeholder="10" value={timeout} onChange={(e) => setTimeout(e.target.value)} />
                                                        <strong>Num To Keep Str</strong>
                                                        <input type="number" className="form-control mb-3" placeholder="5" value={buildDiscarder.numToKeepStr} onChange={(e) => setBuildDiscarder({ ...buildDiscarder, numToKeepStr: e.target.value })} />
                                                        <strong>Artificat Number To Keep Str</strong>
                                                        <input type="number" className="form-control mb-3" placeholder="5" value={buildDiscarder.artifactNumToKeepStr} onChange={(e) => setBuildDiscarder({ ...buildDiscarder, artifactNumToKeepStr: e.target.value })} />
                                                        <input type="checkbox" className="form-check-input mb-3"  id="flexSwitchCheckDefault" checked={disableConcurrentBuilds} onChange={setDisableConcurrentBuilds} />
                                                        <strong>Disable Concurrent Builds</strong>
                                                        <br />
                                                        <input type="checkbox" className="form-check-input mb-3"  id="flexSwitchCheckDefault" checked={skipDefaultCheckout} onChange={setSkipDefaultCheckout} />
                                                        <strong>Skip Default Checkout</strong>
                                                        <br />
                                                        <input type="checkbox" className="form-check-input mb-3"  id="flexSwitchCheckDefault" checked={timestamps} onChange={setTimeStamps} />
                                                        <strong>Time Stamps</strong>
                                                        <br />
                                                        <strong>Ansi Color</strong>
                                                        <input type="text" className="form-control mb-3" placeholder="xterm" value={ansiColor} onChange={(e) => setAnsiColor(e.target.value)} />

                                                        <strong>Preserve Stashes (Build Count)</strong>
                                                        <input type="number" className="form-control mb-3" placeholder="5" value={stashBuilds} onChange={(e) => setStashBuilds(e.target.value)} />
                                                        <strong>Rate Limit Builds Throttle Count</strong>
                                                        <input type="number" className="form-control mb-3" placeholder="5" value={rateLimitBuilds.throttleCount} onChange={(e) => setRateLimitBuilds({ ...rateLimitBuilds, throttleCount: e.target.value })} />
                                                        <strong>Rate Limit Builds Throttle Duration Name</strong>
                                                        <select className="form-control mb-3" value={rateLimitBuilds.throttleDurationName} onChange={(e) => setRateLimitBuilds({ ...rateLimitBuilds, throttleDurationName: e.target.value })}>
                                                            <option value="hour">Hour</option>
                                                            <option value="day">Day</option>
                                                        </select>
                                                        <strong>Retry</strong>
                                                        <input type="number" className="form-control mb-3" placeholder="5" value={retry} onChange={(e) => setRetry(e.target.value)} />
                                                        <input type="checkbox" className="form-check-input mb-3 "  id="flexSwitchCheckDefault" checked={parallelsAlwaysFailFast} onChange={setParallelsAlwaysFailFast} /> <strong>Parallel Always Fail Fast</strong>
                                                        <br />
                                                        <input type="checkbox" className="form-check-input mb-3 "  id="flexSwitchCheckDefault" checked={disableResume} onChange={setDisableResume} /> <strong>Disable Resume</strong>
                                                        <br />
                                                        <input type="checkbox" className="form-check-input mb-3" id="flexSwitchCheckDefault" checked={quitePeriod} onChange={setQuitePeriod} /> <strong>Quite Period</strong>
                                                        <br />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion-item mb-3">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    Environment
                                                </button>
                                            </h2>
                                            <div className="accordion-collapse collapse show" id="collapseThree" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <strong>GLOBAL ENV</strong>
                                                    <select className="form-control mb-3" value={env.globalEnv} onChange={(e) => setEnv({ ...env, globalEnv: e.target.value })}>
                                                        <option value="local">local</option>
                                                        <option value="dev">dev</option>
                                                        <option value="stage">stage</option>
                                                        <option value="prod">prod</option>
                                                    </select>
                                                    <strong>SECRET ID</strong>
                                                    <input type="password" className="form-control mb-3" placeholder="secretId" value={env.secretId} onChange={(e) => setEnv({ ...env, secretId: e.target.value })} />
                                                    <strong>PATH</strong>
                                                    <input type="text" className="form-control mb-3" placeholder="/var/run/docker.sock" value={env.path} onChange={(e) => setEnv({ ...env, path: e.target.value })} />
                                                    <strong>Job Name</strong>
                                                    <input type="text" className="form-control mb-3" placeholder="jenkins" value={env.jobName} onChange={(e) => setEnv({ ...env, jobName: e.target.value })} />
                                                    <strong>Build Number</strong>
                                                    <input type="number" className="form-control mb-3" placeholder="1" value={env.buildNumber} onChange={(e) => setEnv({ ...env, buildNumber: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">Trigger</button>
                                            </h2>
                                            <div className="accordion-collapse collapse show" id="collapseFive" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                   <strong>Trigger Type</strong>
                                                    <select className="form-control mb-3" value={trigger.triggerType} onChange={(e) => setTrigger({ ...trigger, triggerType: e.target.value })}>
                                                        <option value="cron">cron</option>
                                                        <option value="upstream">upstream</option>
                                                        <option value="pollSCM">Poll SCM</option>
                                                    </select>
                                                    {/* CRON Trigger */}
                                                    {trigger.triggerType === "cron" && (
                                                        <>
                                                        <strong>Set Cron Schedule</strong>
                                                        <input
                                                            type="text"
                                                            className="form-control mb-3"
                                                            placeholder="e.g., H 4/* 0 0 1-5"
                                                            value={trigger.cronSchedule}
                                                            onChange={(e) =>
                                                            setTrigger({ ...trigger, cronSchedule: e.target.value })
                                                            }
                                                        />
                                                        <strong>Set TimeZone</strong>
                                                        <select
                                                            className="form-control mb-3"
                                                            value={trigger.timeZone}
                                                            onChange={(e) =>
                                                            setTrigger({ ...trigger, timeZone: e.target.value })
                                                            }
                                                        >
                                                            <option value="UTC">UTC</option>
                                                            <option value="Asia/Kolkata">Asia/Kolkata</option>
                                                            <option value="America/New_York">America/New_York</option>
                                                            {/* Add more time zones as needed */}
                                                        </select>
                                                        </>
                                                    )}

                                                    {/* UPSTREAM Trigger */}
                                                    {trigger.triggerType === "upstream" && (
                                                        <>
                                                        <strong>Upstream Project Name</strong>
                                                        <input
                                                            type="text"
                                                            className="form-control mb-3"
                                                            placeholder="Enter upstream project name"
                                                            value={trigger.upstreamProject}
                                                            onChange={(e) =>
                                                            setTrigger({ ...trigger, upstreamProject: e.target.value })
                                                            }
                                                        />
                                                        <strong>Threshold</strong>
                                                        <select className="form-control mb-3" value={trigger.threshold} onChange={(e) => setTrigger({ ...trigger, threshold: e.target.value })}>
                                                            <option value="Success">Success</option>
                                                            <option value="Failure">Failure</option>
                                                            
                                                        </select>
                                                        </>
                                                    )}

                                                    {/* POLL SCM Trigger */}
                                                    {trigger.triggerType === "pollSCM" && (
                                                        <>
                                                        <strong>SCM Polling Schedule</strong>
                                                        <input
                                                            type="text"
                                                            className="form-control mb-3"
                                                            placeholder="e.g., H/15 * * * *"
                                                            value={trigger.pollSCMSchedule}
                                                            onChange={(e) =>
                                                            setTrigger({ ...trigger, pollSCMSchedule: e.target.value })
                                                            }
                                                        />
                                                        </>
                                                    )}
                                                    
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion-item mb-3">
                                            <h2 className="accordin-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">Parameters</button>
                                            </h2>
                                            <div className="accordion-collapse collapse show" id="collapseFour" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <strong>GIT Branch</strong>
                                                    <input type="text" className="form-control mb-3" placeholder="master" value={params.BRANCH} onChange={(e) => setParams({ ...params, BRANCH: e.target.value })} />
                                                    <input className="form-check-input mb-3" type="checkbox" id="flexSwitchCheckDefault" checked={params.RUN_TESTS} onChange={handleRunTestsChange} />
                                                    <strong className="form-check-label" htmlFor="flexSwitchCheckDefault">Run Tests</strong>
                                                    <br />
                                                    {env.globalENV === "Production" && (
                                                        <>
                                                            <strong>Deployment Password</strong>
                                                            <input type="password" className="form-control mb-3" placeholder="Enter password" value={params.DEPLOY_PASSWORD} onChange={(e) => setParams({ ...params, DEPLOY_PASSWORD: e.target.value })} />
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="accordion-item mb-3">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                                    Tools
                                                </button>
                                            </h2>
                                            <div className="accordion-collapse collapse show" id="collapseFive" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <strong className="mb-3">Tools</strong>
                                                    {tools.map((tool, index) => (
                                                        <div key={index} className="mb-3 p-3 border rounded">
                                                        <strong>Tool {index + 1}</strong>
                                                        <input
                                                            type="text"
                                                            className="form-control mb-2"
                                                            placeholder="Enter tool name"
                                                            value={tool.toolName}
                                                            onChange={(e) => handleToolChange(index, "toolName", e.target.value)}
                                                        />
                                                        <input
                                                            type="text"
                                                            className="form-control mb-2"
                                                            placeholder="Enter tool version"
                                                            value={tool.toolVersion}
                                                            onChange={(e) => handleToolChange(index, "toolVersion", e.target.value)}
                                                        />
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={() => removeTool(index)}
                                                            disabled={tools.length === 1}
                                                        >
                                                            Remove Tool
                                                        </button>
                                                        </div>
                                                    ))}

                                                    <button className="btn btn-primary" onClick={addTool}>
                                                        Add Tool
                                                    </button>   

                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseFive"
                                                aria-expanded="false"
                                                aria-controls="collapseFive"
                                                >
                                                Plugins
                                                </button>
                                            </h2>
                                            <div
                                                className="accordion-collapse collapse show"
                                                id="collapseFive"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">

                                                {/* Docker Plugin */}
                                                <div className="form-check form-switch mb-3">
                                                    <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="dockerSwitch"
                                                    checked={plugins.docker}
                                                    onChange={() => handleToggle("docker")}
                                                    />
                                                    <label className="form-check-label" htmlFor="dockerSwitch">
                                                    <strong>Generate Docker Image and Push to Docker Hub</strong>
                                                    </label>
                                                </div>
                                                {plugins.docker && (
                                                    <div className="mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control mb-2"
                                                        placeholder="Docker Image Name"
                                                        value={dockerConfig.imageName}
                                                        onChange={(e) =>
                                                        setDockerConfig({ ...dockerConfig, imageName: e.target.value })
                                                        }
                                                    />
                                                    <input
                                                        type="text"
                                                        className="form-control mb-2"
                                                        placeholder="Docker Hub Username"
                                                        value={dockerConfig.dockerHubUsername}
                                                        onChange={(e) =>
                                                        setDockerConfig({ ...dockerConfig, dockerHubUsername: e.target.value })
                                                        }
                                                    />
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Path to Dockerfile in Git repo"
                                                        value={dockerConfig.dockerfilePath}
                                                        onChange={(e) =>
                                                        setDockerConfig({ ...dockerConfig, dockerfilePath: e.target.value })
                                                        }
                                                    />
                                                    </div>
                                                )}

                                                {/* Kubernetes Plugin */}
                                                <div className="form-check form-switch mb-3">
                                                    <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="k8sSwitch"
                                                    checked={plugins.kubernetes}
                                                    onChange={() => handleToggle("kubernetes")}
                                                    />
                                                    <label className="form-check-label" htmlFor="k8sSwitch">
                                                    <strong>Deploy using Kubernetes</strong>
                                                    </label>
                                                </div>
                                                {plugins.kubernetes && (
                                                    <div className="mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control mb-2"
                                                        placeholder="Path to Kubernetes deployment YAML"
                                                        value={k8sConfig.deploymentFile}
                                                        onChange={(e) =>
                                                        setK8sConfig({ ...k8sConfig, deploymentFile: e.target.value })
                                                        }
                                                    />
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Kubernetes Namespace"
                                                        value={k8sConfig.namespace}
                                                        onChange={(e) =>
                                                        setK8sConfig({ ...k8sConfig, namespace: e.target.value })
                                                        }
                                                    />
                                                    </div>
                                                )}

                                                {/* Terraform Plugin */}
                                                <div className="form-check form-switch mb-3">
                                                    <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="terraformSwitch"
                                                    checked={plugins.terraform}
                                                    onChange={() => handleToggle("terraform")}
                                                    />
                                                    <label className="form-check-label" htmlFor="terraformSwitch">
                                                    <strong>Use Terraform for Infrastructure Provisioning</strong>
                                                    </label>
                                                </div>
                                                {plugins.terraform && (
                                                    <div className="mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Terraform Working Directory (e.g. infra/terraform)"
                                                        value={terraformConfig.workingDir}
                                                        onChange={(e) =>
                                                        setTerraformConfig({ ...terraformConfig, workingDir: e.target.value })
                                                        }
                                                    />
                                                    </div>
                                                )}

                                                {/* Ansible Plugin */}
                                                <div className="form-check form-switch mb-3">
                                                    <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="ansibleSwitch"
                                                    checked={plugins.ansible}
                                                    onChange={() => handleToggle("ansible")}
                                                    />
                                                    <label className="form-check-label" htmlFor="ansibleSwitch">
                                                    <strong>Run Configuration with Ansible</strong>
                                                    </label>
                                                </div>
                                                {plugins.ansible && (
                                                    <div className="mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control mb-2"
                                                        placeholder="Path to Ansible Playbook (e.g. ansible/playbook.yml)"
                                                        value={ansibleConfig.playbookFile}
                                                        onChange={(e) =>
                                                        setAnsibleConfig({ ...ansibleConfig, playbookFile: e.target.value })
                                                        }
                                                    />
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Path to Inventory File (e.g. ansible/inventory.ini)"
                                                        value={ansibleConfig.inventoryFile}
                                                        onChange={(e) =>
                                                        setAnsibleConfig({ ...ansibleConfig, inventoryFile: e.target.value })
                                                        }
                                                    />
                                                    </div>
                                                )}

                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseSix"
                                                aria-expanded="false"
                                                aria-controls="collapseSix"
                                                >
                                                Messaging Options
                                                </button>
                                            </h2>
                                            <div
                                                className="accordion-collapse collapse show"
                                                id="collapseSix"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                <div className="mb-3">
                                                    <label className="form-label"><strong>Select Messaging Method</strong></label>
                                                    <select
                                                    className="form-control"
                                                    value={method}
                                                    onChange={(e) => {
                                                        setMethod(e.target.value);
                                                        setConfig({});
                                                    }}
                                                    >
                                                    <option value="">-- Select --</option>
                                                    <option value="email">Email</option>
                                                    <option value="slack">Slack</option>
                                                    <option value="telegram">Telegram</option>
                                                    <option value="webhook">Webhook (Custom)</option>
                                                    </select>
                                                </div>

                                                {renderFields()}
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
                        value={jenkins} readOnly
                        className="form-control"
                        ></textarea>
                    </div>
                </div>
            </div>
        </>
    )
}