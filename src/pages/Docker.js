import { useState } from "react";
import "../styles/docker.css";

export default function Docker({ mode }) {
  const bgColor = mode === "dark" ? "bg-dark" : "bg-light";
  const textColor = mode === "dark" ? "text-light" : "text-dark";

  const [envVars, setEnvVars] = useState([""]);
  const [args, setArgs] = useState([{ name: "", value: "" }]);
  const [cmds, setCmds] = useState([""]);
  const [stages, setStages] = useState([{ name: "", baseImage: "", workdir: "", copycmd: "", runcmd: "" }]);
  const [dockerfileContent, setDockerfileContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dockerfile generation logic goes here
    setDockerfileContent("FROM ");
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
                      <button type="button" onClick={() => removeStage(i)} className="btn btn-sm btn-danger">
                        Remove Stage
                      </button>
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

        <div className="commands">
          <h3 className={`text-center ${textColor}`}>Commands</h3>
          <div className="command-list">
            <p className={textColor}>docker build -t your-image-name .</p>
            <p className={textColor}>docker run -d -p 80:80 your-image-name</p>
          </div>
        </div>
      </div>
    </div>
  );
}
