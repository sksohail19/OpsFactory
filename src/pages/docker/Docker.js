import { useState } from "react";
import "../../styles/docker.css";

export default function Docker({ mode }) {
  const bgColor = mode === "dark" ? "bg-dark" : "bg-light";
  const textColor = mode === "dark" ? "text-light" : "text-dark";

  const [title, setTitle] = useState("");
  const [applicationName, setApplicationName] = useState("");
  const [baseImage, setBaseImage] = useState("");
  const [ports, setPorts] = useState("");
  const [volumes, setVolumes] = useState("");
  const [healthCheck, setHealthCheck] = useState("");
  const [healthCheckPath, setHealthCheckPath] = useState("");
  const [healthCheckPort, setHealthCheckPort] = useState("");
  const [interval, setInterval] = useState("");
  const [timeout, setTimeout] = useState("");
  const [retries, setRetries] = useState("");
  const [startPeriod, setStartPeriod] = useState("");
  const [disable, setDisable] = useState("");
  const [memory, setMemory] = useState("");
  const [cpu, setCpu] = useState("");
  
  const [envVars, setEnvVars] = useState([""]);
  const [args, setArgs] = useState([{ name: "", value: "" }]);
  const [cmds, setCmds] = useState([""]);
  const [stages, setStages] = useState([{ name: "", baseImage: "", workdir: "", copycmd: "", runcmd: "" }]);
  const [dockerfileContent, setDockerfileContent] = useState("");


  const handleCopy = () => {
  navigator.clipboard.writeText(dockerfileContent).then(() => {
    alert("Dockerfile content copied to clipboard!");
  });
};

const handleDownload = () => {
  const blob = new Blob([dockerfileContent], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Dockerfile";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  const handleSubmit = (e) => {
  e.preventDefault();

  let dockerfile = "";

  // Title as comment
  if (title) dockerfile += `# ${title}\n`;

  // Basic Base Image
  if (baseImage) dockerfile += `FROM ${baseImage} AS base\n`;

  // Stages
  stages.forEach((stage, index) => {
    if (stage.baseImage) {
      dockerfile += `\nFROM ${stage.baseImage} AS ${stage.name || `stage${index}`}\n`;
      if (stage.workdir) dockerfile += `WORKDIR ${stage.workdir}\n`;
      if (stage.copycmd) dockerfile += `COPY ${stage.copycmd}\n`;
      if (stage.runcmd) dockerfile += `RUN ${stage.runcmd}\n`;
    }
  });

  // Arguments
  if (args.length > 0) {
    args.forEach((arg) => {
      if (arg.name) {
        dockerfile += `ARG ${arg.name}${arg.value ? `=${arg.value}` : ""}\n`;
      }
    });
  }

  // Environment Variables
  if (envVars.length > 0) {
    envVars.forEach((env) => {
      if (env) dockerfile += `ENV ${env}\n`;
    });
  }

  // Application workdir
  if (applicationName) {
    dockerfile += `WORKDIR /app/${applicationName}\n`;
  }

  // Ports
  if (ports) {
    ports.split(",").forEach((p) => {
      dockerfile += `EXPOSE ${p.trim()}\n`;
    });
  }

  // Volumes
  if (volumes) {
    volumes.split(",").forEach((v) => {
      dockerfile += `VOLUME ${v.trim()}\n`;
    });
  }

  // CMD
  if (cmds.length > 0) {
    dockerfile += `CMD [${cmds.map((cmd) => `"${cmd}"`).join(", ")}]\n`;
  }

  // Healthcheck
  if (healthCheck || healthCheckPath || healthCheckPort) {
    dockerfile += `\nHEALTHCHECK `;
    if (disable === "true") {
      dockerfile += `NONE\n`;
    } else {
      const options = [];
      if (interval) options.push(`--interval=${interval}`);
      if (timeout) options.push(`--timeout=${timeout}`);
      if (startPeriod) options.push(`--start-period=${startPeriod}`);
      if (retries) options.push(`--retries=${retries}`);
      dockerfile += `${options.join(" ")} CMD `;
      if (healthCheck) {
        dockerfile += `${healthCheck}\n`;
      } else if (healthCheckPath && healthCheckPort) {
        dockerfile += `curl -f http://localhost:${healthCheckPort}${healthCheckPath} || exit 1\n`;
      }
    }
  }

  // Resource Limits (comments since Dockerfile doesn't support limits directly)
  if (memory) dockerfile += `# Memory Limit: ${memory}\n`;
  if (cpu) dockerfile += `# CPU Limit: ${cpu}\n`;

  setDockerfileContent(dockerfile);
};


  const updateEnvVar = (index, value) => {
    const updated = [...envVars];
    updated[index] = value;
    setEnvVars(updated);
  };

  const addEnvVar = () => setEnvVars([...envVars, ""]);

  const updateArg = (index, key, value) => {
    const updated = [...args];
    updated[index][key] = value;
    setArgs(updated);
  };

  const addArg = () => setArgs([...args, { name: "", value: "" }]);

  const updateCmd = (index, value) => {
    const updated = [...cmds];
    updated[index] = value;
    setCmds(updated);
  };

  const addCmd = () => setCmds([...cmds, ""]);

  const updateStage = (index, key, value) => {
    const updated = [...stages];
    updated[index][key] = value;
    setStages(updated);
  };

  const addStage = () => setStages([...stages, { name: "", baseImage: "", workdir: "", copycmd: "", runcmd: "" }]);

  const removeStage = (index) => {
    const updated = stages.filter((_, i) => i !== index);
    setStages(updated);
  };

  return (
    <div className="holder">
      <div className="data">
        <div className={`accordion ${bgColor} ${textColor}`} id="accordionExample">
          <form onSubmit={handleSubmit}>
            {/* Basic Section */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#basic">
                  Basic
                </button>
              </h2>
              <div id="basic" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  <input name="title" className="form-control mb-3" placeholder="Dockerfile Title" />
                  <input name="applicationName" className="form-control mb-3" placeholder="Application Name" />
                  <input name="baseImage" className="form-control mb-3" placeholder="Base Image (e.g., node:14)" />
                </div>
              </div>
            </div>

            {/* Stages Section */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#stages">
                  Stages
                </button>
              </h2>
              <div id="stages" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  {stages.map((stage, i) => (
                    <div className="mb-3" key={i}>
                      <input
                        className="form-control mb-2"
                        placeholder="Stage Name"
                        value={stage.name}
                        onChange={(e) => updateStage(i, "name", e.target.value)}
                      />
                      <input
                        className="form-control mb-2"
                        placeholder="Base Image"
                        value={stage.baseImage}
                        onChange={(e) => updateStage(i, "baseImage", e.target.value)}
                      />
                      <input
                        className="form-control mb-2"
                        placeholder="Workdir"
                        value={stage.workdir || ""}
                        onChange={(e) => updateStage(i, "workdir", e.target.value)}
                      />
                      <input
                        className="form-control mb-2"
                        placeholder="Copy Command"
                        value={stage.copycmd || ""}
                        onChange={(e) => updateStage(i, "copycmd", e.target.value)}
                      />
                      <input
                        className="form-control mb-2"
                        placeholder="Run Command"
                        value={stage.runcmd || ""}
                        onChange={(e) => updateStage(i, "runcmd", e.target.value)}
                      />
                      {i > 0 && (
                        <button
                          type="button"
                          onClick={() => removeStage(i)}
                          className="btn btn-sm btn-danger mt-2"
                        >
                          - Remove Stage
                        </button>
                      )}

                    </div>
                  ))}
                  <button type="button" onClick={addStage} className="btn btn-sm btn-secondary mt-2">
                    + Add Stage
                  </button>
                </div>
              </div>
            </div>

            {/* Environment Variables */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#envs">
                  Environment Variables
                </button>
              </h2>
              <div id="envs" className="accordion-collapse collapse">
                <div className="accordion-body">
                  {envVars.map((env, i) => (
                    <input
                      key={i}
                      className="form-control mb-2"
                      placeholder="ENV VAR"
                      value={env}
                      onChange={(e) => updateEnvVar(i, e.target.value)}
                    />
                  ))}
                  <button type="button" onClick={addEnvVar} className="btn btn-sm btn-secondary">
                    + Add ENV
                  </button>
                </div>
              </div>
            </div>

            {/* Build Arguments */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#args">
                  Build Arguments
                </button>
              </h2>
              <div id="args" className="accordion-collapse collapse">
                <div className="accordion-body">
                  {args.map((arg, i) => (
                    <div className="d-flex mb-2" key={i}>
                      <input
                        className="form-control me-2"
                        placeholder="ARG NAME"
                        value={arg.name}
                        onChange={(e) => updateArg(i, "name", e.target.value)}
                      />
                      <input
                        className="form-control"
                        placeholder="DEFAULT VALUE"
                        value={arg.value}
                        onChange={(e) => updateArg(i, "value", e.target.value)}
                      />
                    </div>
                  ))}
                  <button type="button" onClick={addArg} className="btn btn-sm btn-secondary">
                    + Add ARG
                  </button>
                </div>
              </div>
            </div>

            {/* Container Commands */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#cmds">
                  Container Commands
                </button>
              </h2>
              <div id="cmds" className="accordion-collapse collapse">
                <div className="accordion-body">
                  {cmds.map((cmd, i) => (
                    <input
                      key={i}
                      className="form-control mb-2"
                      placeholder="CMD"
                      value={cmd}
                      onChange={(e) => updateCmd(i, e.target.value)}
                    />
                  ))}
                  <button type="button" onClick={addCmd} className="btn btn-sm btn-secondary">
                    + Add CMD
                  </button>
                </div>
              </div>
            </div>

            {/* Ports */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ports">
                  Ports
                </button>
              </h2>
              <div id="ports" className="accordion-collapse collapse">
                <div className="accordion-body">
                  <input name="ports" className="form-control mb-2" placeholder="Ports (e.g., 80,443)" />
                </div>
              </div>
            </div>

            {/* Volumes */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#volumes">
                  Volumes
                </button>
              </h2>
              <div id="volumes" className="accordion-collapse collapse">
                <div className="accordion-body">
                  <input name="volumes" className="form-control mb-2" placeholder="Volumes (e.g., /data)" />
                </div>
              </div>
            </div>

            {/* Health Check */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#health">
                  Health Check
                </button>
              </h2>
              <div id="health" className="accordion-collapse collapse">
                <div className="accordion-body">
                  <input name="healthCheck" className="form-control mb-2" placeholder="Health Check Command (e.g., curl -f http://localhost/health)" />
                  <input name="healthCheckPath" className="form-control mb-2" placeholder="Health Check Path (e.g., /health)" />
                  <input name="healthCheckPort" className="form-control mb-2" placeholder="Health Check Port (e.g., 8080)" />
                  <input name="interval" className="form-control mb-2" placeholder="Interval (e.g., 30s)" />
                  <input name="timeout" className="form-control mb-2" placeholder="Timeout (e.g., 10s)" />
                  <input name="retries" className="form-control mb-2" placeholder="Retries (e.g., 3)" />
                  <input name="startPeriod" className="form-control mb-2" placeholder="Start Period (e.g., 5s)" />
                  <input name="disable" className="form-control mb-2" placeholder="Disable (e.g., false)" />
                  <input name="memory" className="form-control mb-2" placeholder="Memory Limit (e.g., 512m)" />
                  <input name="cpu" className="form-control mb-2" placeholder="CPU Limit (e.g., 0.5)" />
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary">
                Generate Dockerfile
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="result">
        <div className="preview">
          <textarea
            className={`form-control ${bgColor} ${textColor}`}
            rows="20"
            value={dockerfileContent}
            readOnly
          />
        </div>

        <div className="text-center mt-3 mb-3">
          <button type="button" onClick={handleCopy} className="btn btn-outline-secondary me-2">
            📋 Copy to Clipboard
          </button>
          <button type="button" onClick={handleDownload} className="btn btn-outline-success">
            ⬇️ Download Dockerfile
          </button>
        </div>

        <div className="commands">
          <h3 className={`text-center ${textColor}`}>Commands</h3>
          <div className="command-list">
            <p className={textColor}>
              docker build -t {applicationName || "your-image-name"} .
            </p>
            <p className={textColor}>
              docker run -d
              {ports && ports.split(',').map((p, i) => (
                <span key={i}> -p {p.trim()}:{p.trim()}</span>
              ))} {applicationName || "your-image-name"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
