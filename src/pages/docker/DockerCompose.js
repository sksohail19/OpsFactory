import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dockerComposeImg from '../../assets/docker-compose.png';
import "../../styles/docker.css";

function DockerCompose({ mode }) {
  const bgColor = mode === "dark" ? "bg-dark" : "light-theme";
  const textColor = mode === "dark" ? "text-light" : "light-text";

  const horizontalLine = (
    <div className="horizontal">
      <h6></h6>
    </div>
  );

  const [args, setArgs] = useState([{ arg: '', value: '' }]);
  const [vars, setVars] = useState([{ key: '', value: '' }]);
  const [vols, setVols] = useState([{ key: '' }]);
  const [dependencies, setDependencies] = useState([{ key: '' }]);
  const [network, setNetwork] = useState([{ key: '' }]);
  const [secrets, setSecrets] = useState([{ key: '' }]);
  const [preview, setPreview] = useState('');

  const handleAdd = (setter, newItem) => () =>
    setter(prev => [...prev, newItem]);

  const handleRemove = (setter) => (index) =>
    setter(prev => prev.filter((_, i) => i !== index));

  const handleArgChange = (index, field, value) => {
    const newArgs = [...args];
    newArgs[index][field] = value;
    setArgs(newArgs);
  };

  const handleVolChange = (index, value) => {
    const newVols = [...vols];
    newVols[index].key = value;
    setVols(newVols);
  };

  const handleDependencyChange = (index, value) => {
    const newDependencies = [...dependencies];
    newDependencies[index].key = value;
    setDependencies(newDependencies);
  };

  const handleNetworkChange = (index, value) => {
    const newNetwork = [...network];
    newNetwork[index].key = value;
    setNetwork(newNetwork);
  };

  const handlevarsChange = (index, field, value) => {
    const newVars = [...vars];
    newVars[index][field] = value;
    setVars(newVars);
  };

  const handleSecretChange = (index, value) => {
    const newSecrets = [...secrets];
    newSecrets[index].key = value;
    setSecrets(newSecrets);
  };

    return (
    <div className={`${bgColor} ${textColor} holder-compose`}>
      <div className="heading p-5">
        <h3 className="display-4">Docker Compose</h3>
      </div>

      <div className="docker-features">
        <div className="dockercompose">
          <img loading="lazy" src={dockerComposeImg} alt="Docker Compose logo" />
        </div>
      </div>

      {horizontalLine}

      <div className="container mb-5 ">
        <div className="data">
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className="accordion-heading">Basic Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Title</Typography>
              <input type="text" className="form-control" placeholder="Enter title" />
              <Typography>Application Name</Typography>
              <input type="text" className="form-control" placeholder="Enter app name" />
              <Typography>Version</Typography>
              <input type="text" className="form-control" placeholder="Enter version" />
              <Typography>Description</Typography>
              <textarea className="form-control" placeholder="Enter description" />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Services</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Service Name</Typography>
              <input type="text" className="form-control" placeholder="Enter service name" />
              <Typography>Image</Typography>
              <input type="text" className="form-control" placeholder="Enter image" />
              <Typography>Ports</Typography>
              <input type="text" className="form-control" placeholder="Enter ports" />

              <div className="container d-flex align-items-center mt-3 mb-3">
                <input type="checkbox" /> &nbsp;
                <Typography>Enable init process</Typography>
              </div>

              <Typography>Environment Variables</Typography>
              {vars.map((item, i) => (
                <div key={i} className="var-item d-flex gap-2 my-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Key ${i + 1}`}
                    value={item.key}
                    onChange={(e) => handlevarsChange(i, 'key', e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Value ${i + 1}`}
                    value={item.value}
                    onChange={(e) => handlevarsChange(i, 'value', e.target.value)}
                  />
                  <button className="btn btn-danger" onClick={() => handleRemove(setVars)(i)}>Remove</button>
                </div>
              ))}
              <button className="btn btn-primary mt-2" onClick={handleAdd(setVars, { key: '', value: '' })}>+ Add Env Var</button>
                            <Typography className="mt-4">Build Configuration</Typography>
              <input type="text" className="form-control" placeholder="Build Context" />
              <input type="text" className="form-control" placeholder="Dockerfile Path" />

              <Typography className="mt-3">Build Arguments</Typography>
              {args.map((item, i) => (
                <div key={i} className="var-item d-flex gap-2 my-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Arg ${i + 1}`}
                    value={item.arg}
                    onChange={(e) => handleArgChange(i, 'arg', e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Value ${i + 1}`}
                    value={item.value}
                    onChange={(e) => handleArgChange(i, 'value', e.target.value)}
                  />
                  <button className="btn btn-danger" onClick={() => handleRemove(setArgs)(i)}>Remove</button>
                </div>
              ))}
              <button className="btn btn-primary mt-2" onClick={handleAdd(setArgs, { arg: '', value: '' })}>+ Add Build Arg</button>

              <Typography className="mt-3">Volumes</Typography>
              {vols.map((item, i) => (
                <div key={i} className="var-item d-flex gap-2 my-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Volume ${i + 1}`}
                    value={item.key}
                    onChange={(e) => handleVolChange(i, e.target.value)}
                  />
                  <button className="btn btn-danger" onClick={() => handleRemove(setVols)(i)}>Remove</button>
                </div>
              ))}
              <button className="btn btn-primary mt-2" onClick={handleAdd(setVols, { key: '' })}>+ Add Volume</button>

              <Typography className="mt-3">Dependencies</Typography>
              {dependencies.map((item, i) => (
                <div key={i} className="var-item d-flex gap-2 my-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Dependency ${i + 1}`}
                    value={item.key}
                    onChange={(e) => handleDependencyChange(i, e.target.value)}
                  />
                  <button className="btn btn-danger" onClick={() => handleRemove(setDependencies)(i)}>Remove</button>
                </div>
              ))}
              <button className="btn btn-primary mt-2" onClick={handleAdd(setDependencies, { key: '' })}>+ Add Dependency</button>

              <Typography className="mt-3">Network</Typography>
              {network.map((item, i) => (
                <div key={i} className="var-item d-flex gap-2 my-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Network ${i + 1}`}
                    value={item.key}
                    onChange={(e) => handleNetworkChange(i, e.target.value)}
                  />
                  <button className="btn btn-danger" onClick={() => handleRemove(setNetwork)(i)}>Remove</button>
                </div>
              ))}
              <button className="btn btn-primary mt-2" onClick={handleAdd(setNetwork, { key: '' })}>+ Add Network</button>

              <Typography className="mt-3">Secrets</Typography>
              {secrets.map((item, i) => (
                <div key={i} className="var-item d-flex gap-2 my-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Secret ${i + 1}`}
                    value={item.key}
                    onChange={(e) => handleSecretChange(i, e.target.value)}
                  />
                  <button className="btn btn-danger" onClick={() => handleRemove(setSecrets)(i)}>Remove</button>
                </div>
              ))}
              <button className="btn btn-primary mt-2" onClick={handleAdd(setSecrets, { key: '' })}>+ Add Secret</button>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Run Commands</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>docker compose up -d</Typography>
              <Typography>docker compose down</Typography>
              <Typography>docker compose logs</Typography>
              <Typography>docker compose up --build -d</Typography>
              <Typography>docker compose up --scale service_name=num</Typography>
            </AccordionDetails>
          </Accordion>
        </div>

        <div className="result-compose mt-4">
          <div className="preview">
            <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{preview}</pre>
            
          </div>
        </div>
      </div>
      <div className="d-flex gap-3 mb-3 justify-content-center">
            <button className="btn btn-success" onClick={generateYAML}>Generate</button>
            <button className="btn btn-warning" onClick={copyToClipboard}>Copy</button>
            <button className="btn btn-info" onClick={downloadYAML}>Download</button>
      </div>
    </div>
  );

  function generateYAML() {
    let yaml = `version: "3"\nservices:\n  service:\n    image: your_image\n`;

    if (vars.some(v => v.key)) {
      yaml += `    environment:\n`;
      vars.forEach(({ key, value }) => key && (yaml += `      ${key}: "${value}"\n`));
    }

    if (args.some(a => a.arg)) {
      yaml += `    build:\n      args:\n`;
      args.forEach(({ arg, value }) => arg && (yaml += `        ${arg}: "${value}"\n`));
    }

    if (vols.some(v => v.key)) {
      yaml += `    volumes:\n`;
      vols.forEach(({ key }) => key && (yaml += `      - ${key}\n`));
    }

    if (dependencies.some(d => d.key)) {
      yaml += `    depends_on:\n`;
      dependencies.forEach(({ key }) => key && (yaml += `      - ${key}\n`));
    }

    if (network.some(n => n.key)) {
      yaml += `    networks:\n`;
      network.forEach(({ key }) => key && (yaml += `      - ${key}\n`));
    }

    if (secrets.some(s => s.key)) {
      yaml += `    secrets:\n`;
      secrets.forEach(({ key }) => key && (yaml += `      - ${key}\n`));
    }

    setPreview(yaml);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(preview).then(() =>
      alert("Copied to clipboard!")
    );
  }

  function downloadYAML() {
    const blob = new Blob([preview], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'docker-compose.yml';
    a.click();
    URL.revokeObjectURL(url);
  }
}

export default DockerCompose;
