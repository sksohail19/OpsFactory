import React, { useState } from "react";

export default function Ansible() {

    const copyToClipboard = () => {
        navigator.clipboard.writeText(ansible).then(() => {
          alert("Ansible Map YAML copied to clipboard!");
        });
      };
      
      const downloadYAML = () => {
        const blob = new Blob([ansible], { type: "yaml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "playbook";
        a.click();
        URL.revokeObjectURL(url);
      };

        const [host, setHost] = useState("");
        const [name, setName] = useState("");
        const [remoteUser, setRemoteUser] = useState("");
        const [become, setBecome] = useState("");
        const [becomeMethod, setBecomeMethod] = useState("");
        const [gatherFacts, setGatherFacts] = useState(false);

        // Variables, roles, environment, and tasks
        const [vars, setVars] = useState([{ key: "", value: "" }]);
        const [roles, setRoles] = useState([{ value: "" }]);
        const [env, setENV] = useState([{ key: "", value: "" }]);

        const [preTask, setPreTask] = useState([
            {
            name: "",
            value: [{ key: "", value: "" }]
            }
        ]);

        const [task, setTask] = useState([
            {
            name: "",
            value: "",
            parameters: [{ key: "", value: "" }],
            register: "",
            when: "",
            ignore_errors: false,
            with_items: [{ value: "" }],
            until: "",
            loop: "",
            loop_control: [{ key: "", value: "" }],
            rescue: [{ value: "" }]
            }
        ]);

        const [postTask, setPostTask] = useState([
            {
            name: "",
            value: [{ key: "", value: "" }]
            }
        ]);

        const [handlers, setHandlers] = useState([
            {
            name: "",
            value: [{ key: "", value: "" }],
            when: "",
            failures: "",
            ignore_errors: false,
            one_at_a_time: false,
            retry_files: [{ key: "", value: "" }],
            retry: "",
            retry_delay: ""
            }
        ]);

        // Play-level flags
        const [any_errors_fatal, setAnyErrorsFatal] = useState(false);
        const [serial, setSerial] = useState(0);
        const [max_fail_percentage, setMaxFailPercentage] = useState(0);
        const [strategy, setStrategy] = useState("");

        const handleVarChange = (index, field, value) => {
            const newVars = [...vars];
            newVars[index][field] = value;
            setVars(newVars);
          };
        const addVar = () => setVars([...vars, { key: "", value: "" }]);
        
        const removeVar = (index) => {
        setVars((prevVars) => prevVars.filter((_, i) => i !== index));
        };

        const handleEnvChange = (index, field, value) => {
            const newEnv = [...env];
            newEnv[index][field] = value;
            setENV(newEnv);
        }

        const addEnv = () => setENV([...env, { key: "", value: "" }]);
        
        const removeEnv = (index) => {
        setENV((prevEnv) => prevEnv.filter((_, i) => i !== index));
        }

        const handleRoleChange = (index, field, value) => {
            const newRoles = [...roles];
            newRoles[index][field] = value;
            setRoles(newRoles);
        }

        const addRole = () => setRoles([...roles, { value: "" }]);
        
        const removeRole = (index) => {
        setRoles((prevRoles) => prevRoles.filter((_, i) => i !== index));
        }

        const handlePreTaskChange = (index, field, value) => {
            const newPreTask = [...preTask];
            newPreTask[index][field] = value;
            setPreTask(newPreTask);
        }

        const addPreTask = () => setPreTask([...preTask, { name: "", value: [{ key: "", value: "" }] }]);
        
        const removePreTask = (index) => {
        setPreTask((prevPreTask) => prevPreTask.filter((_, i) => i !== index));
        }

        const handlePreTaskValueChange = (taskIndex, valIndex, field, val) => {
        const updated = [...preTask];
        updated[taskIndex].value[valIndex][field] = val;
        setPreTask(updated);
        };

        const addPreTaskValue = (taskIndex) => {
        const updated = [...preTask];
        updated[taskIndex].value.push({ key: "", value: "" });
        setPreTask(updated);
        };

        const removePreTaskValue = (taskIndex, valIndex) => {
        const updated = [...preTask];
        updated[taskIndex].value.splice(valIndex, 1);
        setPreTask(updated);
        };

        const handleTaskChange = (index, field, value) => {
            const newTask = [...task];
            newTask[index][field] = value;
            setTask(newTask);
        }
        const handleNestedChange = (taskIndex, arrayName, itemIndex, key, value) => {
            const newTasks = [...task];
            newTasks[taskIndex][arrayName][itemIndex][key] = value;
            setTask(newTasks);
        };

        const addTask = () => setTask([...task, { name: "",
            value: "",
            parameters: [{ key: "", value: "" }],
            register: "",
            when: "",
            ignore_errors: false,
            with_items: [{ value: "" }],
            until: "",
            loop: "",
            loop_control: [{ key: "", value: "" }],
            rescue: [{ value: "" }]
            }]);
        
        const removeTask = (index) => {
        setTask((prevTask) => prevTask.filter((_, i) => i !== index));
        }

        const addParameter = (taskIndex) => {
        const newTasks = [...task];
        newTasks[taskIndex].parameters.push({ name: "", value: "" });
        setTask(newTasks);
        };

        const removeParameter = (taskIndex, paramIndex) => {
        const newTasks = [...task];
        newTasks[taskIndex].parameters = newTasks[taskIndex].parameters.filter((_, i) => i !== paramIndex);
        setTask(newTasks);
        };

        const addWithItems = (taskIndex) => {
        const newTasks = [...task];
        newTasks[taskIndex].with_items.push({ value: "" });
        setTask(newTasks);
        };

        const removeWithItems = (taskIndex, itemIndex) => {
        const newTasks = [...task];
        newTasks[taskIndex].with_items = newTasks[taskIndex].with_items.filter((_, i) => i !== itemIndex);
        setTask(newTasks);
        };

        const addLoopControl = (taskIndex) => {
        const newTasks = [...task];
        newTasks[taskIndex].loop_control.push({ name: "", value: "" });
        setTask(newTasks);
        };

        const removeLoopControl = (taskIndex, loopIndex) => {
        const newTasks = [...task];
        newTasks[taskIndex].loop_control = newTasks[taskIndex].loop_control.filter((_, i) => i !== loopIndex);
        setTask(newTasks);
        };

        const addRescue = (taskIndex) => {
        const newTasks = [...task];
        newTasks[taskIndex].rescue.push({ value: "" });
        setTask(newTasks);
        };

        const removeRescue = (taskIndex, rescueIndex) => {
        const newTasks = [...task];
        newTasks[taskIndex].rescue = newTasks[taskIndex].rescue.filter((_, i) => i !== rescueIndex);
        setTask(newTasks);
        };


        const handlePostTaskChange = (index, field, value) => {
            const newPostTask = [...postTask];
            newPostTask[index][field] = value;
            setPostTask(newPostTask);
        }

        const addPostTask = () => setPostTask([...postTask, { name: "", value: [{ key: "", value: "" }] }]);
        
        const removePostTask = (index) => {
        setPostTask((prevPostTask) => prevPostTask.filter((_, i) => i !== index));
        }

        const handleHandlerChange = (index, field, value) => {
            const newHandlers = [...handlers];
            newHandlers[index][field] = value;
            setHandlers(newHandlers);
        }

        const addHandler = () => setHandlers([...handlers, { name: "",
            value: [{ key: "", value: "" }],
            when: "",
            failures: "",
            ignore_errors: false,
            one_at_a_time: false,
            retry_files: [{ key: "", value: "" }],
            retry: "",
            retry_delay: ""
            }]);
        
        const removeHandler = (index) => {
        setHandlers((prevHandlers) => prevHandlers.filter((_, i) => i !== index));
        }

        const handlePostTaskValueChange = (taskIndex, valueIndex, field, newValue) => {
        const newPostTask = [...postTask];
        newPostTask[taskIndex].value[valueIndex][field] = newValue;
        setPostTask(newPostTask);
        };

        const addPostTaskValue = (taskIndex) => {
        const newPostTask = [...postTask];
        newPostTask[taskIndex].value.push({ key: "", value: "" });
        setPostTask(newPostTask);
        };

        const removePostTaskValue = (taskIndex, valueIndex) => {
        const newPostTask = [...postTask];
        newPostTask[taskIndex].value.splice(valueIndex, 1);
        setPostTask(newPostTask);
        };

        const handleHandlerValueChange = (taskIndex, valIndex, field, val) => {
        const updated = [...handlers];
        updated[taskIndex].value[valIndex][field] = val;
        setHandlers(updated);
        };

        const addHandlerValue = (taskIndex) => {
        const updated = [...handlers];
        updated[taskIndex].value.push({ key: "", value: "" });
        setHandlers(updated);
        };

        const removeHandlerValue = (taskIndex, valIndex) => {
        const updated = [...handlers];
        updated[taskIndex].value.splice(valIndex, 1);
        setHandlers(updated);
        };

        const handleRetryFileChange = (taskIndex, valIndex, field, val) => {
        const updated = [...handlers];
        updated[taskIndex].retry_files[valIndex][field] = val;
        setHandlers(updated);
        };

        const addRetryFile = (taskIndex) => {
        const updated = [...handlers];
        updated[taskIndex].retry_files.push({ key: "", value: "" });
        setHandlers(updated);
        };

        const removeRetryFile = (taskIndex, valIndex) => {
        const updated = [...handlers];
        updated[taskIndex].retry_files.splice(valIndex, 1);
        setHandlers(updated);
        };



        // YAML generation
        const ansible = `
        ---
        - name: ${name}
          hosts: ${host}
        ${remoteUser ? `  remote_user: ${remoteUser}` : ""}
        ${become ? `  become: ${become}` : ""}
        ${becomeMethod ? `  become_method: ${becomeMethod}` : ""}
        ${gatherFacts ? `  gather_facts: ${gatherFacts}` : ""}
          vars:
        ${vars.map(v => `    ${v.key}: ${v.value}`).join('\n')}
          roles:
        ${roles.map(r => `    - ${r.value}`).join('\n')}
          pre_tasks:
        ${preTask.map(p => `    - name: ${p.name}\n${p.value.map(v => `        ${v.key}: ${v.value}`).join('\n')}`).join('\n')}
          tasks:
            - name: ${task[0].name}
            ${task[0].value ? `action: ${task[0].value}` : ""}
            ${task[0].parameters.some(p => p.key) ? `args:\n${task[0].parameters.map(p => `        ${p.key}: ${p.value}`).join('\n')}` : ""}
            ${task[0].register ? `register: ${task[0].register}` : ""}
            ${task[0].when ? `when: ${task[0].when}` : ""}
            ${task[0].ignore_errors ? `ignore_errors: ${task[0].ignore_errors}` : ""}
            ${task[0].with_items.some(i => i.value) ? `with_items:\n${task[0].with_items.map(i => `        - ${i.value}`).join('\n')}` : ""}
            ${task[0].until ? `until: ${task[0].until}` : ""}
            ${task[0].loop ? `loop: ${task[0].loop}` : ""}
            ${task[0].loop_control.some(l => l.key) ? `loop_control:\n${task[0].loop_control.map(l => `        ${l.key}: ${l.value}`).join('\n')}` : ""}
            ${task[0].rescue.some(r => r.value) ? `rescue:\n${task[0].rescue.map(r => `        - ${r.value}`).join('\n')}` : ""}
          post_tasks:
        ${postTask.map(p => `    - name: ${p.name}\n${p.value.map(v => `        ${v.key}: ${v.value}`).join('\n')}`).join('\n')}
          handlers:
        ${handlers.map(h => `    - name: ${h.name}
        ${h.value.map(v => `        ${v.key}: ${v.value}`).join('\n')}
        ${h.when ? `        when: ${h.when}` : ""}
        ${h.failures ? `        failures: ${h.failures}` : ""}
        ${h.ignore_errors ? `        ignore_errors: ${h.ignore_errors}` : ""}
        ${h.one_at_a_time ? `        one_at_a_time: ${h.one_at_a_time}` : ""}
        ${h.retry_files.some(r => r.key) ? `        retry_files:\n${h.retry_files.map(r => `          ${r.key}: ${r.value}`).join('\n')}` : ""}
        ${h.retry ? `        retry: ${h.retry}` : ""}
        ${h.retry_delay ? `        retry_delay: ${h.retry_delay}` : ""}`).join('\n')}
          environment:
        ${env.map(e => `    ${e.key}: ${e.value}`).join('\n')}
          any_errors_fatal: ${any_errors_fatal}
          serial: ${serial}
          max_fail_percentage: ${max_fail_percentage}
          strategy: ${strategy}
        `;
    return (
        <>
            <h1 className="display-4 text-center mb-3 mt-3">Ansible Playbook Generator</h1>
            <p className="text-center mb-5">Generate a JAnsible Playbook YAML file.</p>

            <div className="container">
                <div className="data">
                    <div className="details bg-light">
                        <div className="accordion">
                            <div className="accordion-item">
                                <h2 className="accordino-header">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" aria-expanded="true" aria-controls="flush-collapseOne">
                                        Ansible Playbook - Basic Information
                                    </button>
                                </h2>
                                <div className="accordion-collapse collapse show" id="flush-collapseOne" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        <strong>Name</strong>
                                        <input type="text"className="form-control mb-3" placeholder="Description of this playbook" value={name} onChange={(e) => setName(e.target.value)} />
                                        <strong>Hosts</strong>
                                        <input type="text" className="form-control mb-3" placeholder="webserver" value={host} onChange={(e) => setHost(e.target.value)} />
                                        <strong>Remote User <i>(Optional)</i></strong>
                                        <input type="text" className="form-control mb-3" placeholder="username" value={remoteUser} onChange={(e) => setRemoteUser(e.target.value)} />
                                        <strong>Become</strong>
                                        <input type="text" className="form-control mb-3" placeholder="true" value={become} onChange={(e) => setBecome(e.target.value)} />
                                        <strong>Become Method</strong>
                                        <input type="text" className="form-control mb-3" placeholder="sudo|su" value={becomeMethod} onChange={(e) => setBecomeMethod(e.target.value)} />
                                        <strong>Gather Facts</strong>
                                        <select className="form-select mb-3" value={gatherFacts} onChange={(e) => setGatherFacts(e.target.value)}>
                                            <option value="false">No</option>
                                            <option value="true">Yes</option>
                                        </select>
                                        
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" aria-expanded="true" aria-controls="flush-collapseTwo">
                                                    Variables
                                                </button>
                                            </h2>
                                            <div className="accordion-collapse collapse show" id="flush-collapseTwo" data-bs-parent="#accordionFlushExample">
                                                <div className="accordion-body">
                                                    {vars.map((v, index) => (
                                                        <div key={index}>
                                                            <strong>Variable Name</strong>
                                                            <input type="text" className="form-control mb-3" placeholder="http_port" value={v.name} onChange={(e) => handleVarChange(index, 'name', e.target.value)} />
                                                            <strong>Variable Value</strong>
                                                            <input type="text" className="form-control mb-3" placeholder="80" value={v.value} onChange={(e) => handleVarChange(index, 'value', e.target.value)} />
                                                            {index > 0 && <button className="btn btn-danger mb-3" onClick={() => removeVar(index)}>Remove Variable</button>}
                                                        </div>
                                                    ))}
                                                    <button className="btn btn-primary" onClick={addVar}>Add Variable</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" aria-expanded="true" aria-controls="flush-collapseThree">
                                                    Environment
                                                </button>
                                            </h2>
                                            <div className="accordion-collapse collapse show" id="flush-collapseThree" data-bs-parent="#accordionFlushExample">
                                                <div className="accordion-body">
                                                    {env.map((e, index) => (
                                                        <div key={index}>
                                                            <strong>Key</strong>
                                                            <input type="text" className="form-control mb-3" placholder="ENV Name" value={e.key} onChange={(e) => handleEnvChange(index, 'key', e.target.value)} />
                                                            <strong>Value</strong>
                                                            <input type="text" className="form-control mb-3" placeholder="ENV Value" value={e.value} onChange={(e) => handleEnvChange(index, 'value', e.target.value)} />
                                                            {index > 0 && <button className="btn btn-danger mb-3" onClick={() => removeEnv(index)}>Remove Environment Variable</button>}
                                                        </div>
                                                    ))}
                                                    <button className="btn btn-primary" onClick={addEnv}>Add Environment Variable</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" aria-expanded="true" aria-controls="flush-collapseFour">
                                                    Roles
                                                </button>
                                            </h2>
                                            <div className="accordion-collapse collapse show" id="flush-collapseFour" data-bs-parent="#accordionFlushExample">
                                                <div className="accordion-body">
                                                    {roles.map((r, index) => (
                                                        <div key={index}>
                                                            <strong>Role Name</strong>
                                                            <input type="text" className="form-control mb-3" placeholder="common (or) webserver" value={r.name} onChange={(e) => handleRoleChange(index, 'name', e.target.value)} />
                                                            {index > 0 && <button className="btn btn-danger mb-3" onClick={() => removeRole(index)}>Remove Role</button>}
                                                        </div>
                                                    ))}
                                                    <button className="btn btn-primary" onClick={addRole}>Add Role</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#flush-collapseFive"
                                                aria-expanded="true"
                                                aria-controls="flush-collapseFive"
                                                >
                                                Pre Tasks
                                                </button>
                                            </h2>
                                            <div
                                                className="accordion-collapse collapse show"
                                                id="flush-collapseFive"
                                                data-bs-parent="#accordionFlushExample"
                                            >
                                                <div className="accordion-body">
                                                {preTask.map((task, index) => (
                                                    <div key={index} className="border rounded p-3 mb-4 bg-light">
                                                    <strong>Task Name</strong>
                                                    <input
                                                        type="text"
                                                        className="form-control mb-3"
                                                        placeholder="Task Name"
                                                        value={task.name}
                                                        onChange={(e) => handlePreTaskChange(index, "name", e.target.value)}
                                                    />

                                                    <strong>Key-Value Pairs</strong>
                                                    {task.value.map((item, i) => (
                                                        <div className="row g-2 mb-2" key={i}>
                                                        <div className="col">
                                                            <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Key"
                                                            value={item.key}
                                                            onChange={(e) =>
                                                                handlePreTaskValueChange(index, i, "key", e.target.value)
                                                            }
                                                            />
                                                        </div>
                                                        <div className="col">
                                                            <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Value"
                                                            value={item.value}
                                                            onChange={(e) =>
                                                                handlePreTaskValueChange(index, i, "value", e.target.value)
                                                            }
                                                            />
                                                        </div>
                                                        <div className="col-auto">
                                                            <button
                                                            className="btn btn-danger"
                                                            onClick={() => removePreTaskValue(index, i)}
                                                            >
                                                            Remove
                                                            </button>
                                                        </div>
                                                        </div>
                                                    ))}

                                                    <button
                                                        className="btn btn-primary btn-sm mb-3"
                                                        onClick={() => addPreTaskValue(index)}
                                                    >
                                                        Add Key-Value
                                                    </button>

                                                    {index > 0 && (
                                                        <button
                                                        className="btn btn-danger"
                                                        onClick={() => removePreTask(index)}
                                                        >
                                                        Remove Task
                                                        </button>
                                                    )}
                                                    </div>
                                                ))}

                                                <button className="btn btn-success" onClick={addPreTask}>
                                                    Add Task
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
                                            data-bs-target="#flush-collapseSix"
                                            aria-expanded="true"
                                            aria-controls="flush-collapseSix"
                                            >
                                            Task
                                            </button>
                                        </h2>

                                        <div
                                            className="accordion-collapse collapse show"
                                            id="flush-collapseSix"
                                            data-bs-parent="#accordionFlushExample"
                                        >
                                            <div className="accordion-body">
                                            {task.map((t, index) => (
                                                <div key={index} className="mb-4 p-3 border rounded bg-light">
                                                <strong>Task Name</strong>
                                                <input
                                                    type="text"
                                                    className="form-control mb-2"
                                                    placeholder="Install Apache Latest Version"
                                                    value={t.name}
                                                    onChange={(e) => handleTaskChange(index, "name", e.target.value)}
                                                />

                                                <strong>Value</strong>
                                                <input
                                                    type="text"
                                                    className="form-control mb-2"
                                                    
                                                    value={t.value}
                                                    onChange={(e) => handleTaskChange(index, "value", e.target.value)}
                                                />

                                                <strong>Parameters</strong>
                                                {t.parameters.map((p, pIndex) => (
                                                    <div key={pIndex} className="mb-2">
                                                    <input
                                                        type="text"
                                                        className="form-control mb-1"
                                                        placeholder="Parameter Name"
                                                        value={p.key}
                                                        onChange={(e) => handleNestedChange(index, "parameters", pIndex, "key", e.target.value)}
                                                    />
                                                    <input
                                                        type="text"
                                                        className="form-control mb-1"
                                                        placeholder="Parameter Value"
                                                        value={p.value}
                                                        onChange={(e) => handleNestedChange(index, "parameters", pIndex, "value", e.target.value)}
                                                    />
                                                    <button className="btn btn-danger btn-sm mb-2" onClick={() => removeParameter(index, pIndex)}>
                                                        Remove Parameter
                                                    </button>
                                                    </div>
                                                ))}
                                                <button className="btn btn-primary btn-sm mb-3" onClick={() => addParameter(index)}>
                                                    Add Parameter
                                                </button>
                                                <br />
                                                <strong>When</strong>
                                                <input
                                                    type="text"
                                                    className="form-control mb-2"
                                                    value={t.when}
                                                    onChange={(e) => handleTaskChange(index, "when", e.target.value)}
                                                />

                                                <strong>Ignore Errors</strong>
                                                <select
                                                    className="form-select mb-2"
                                                    value={t.ignore_errors}
                                                    onChange={(e) => handleTaskChange(index, "ignore_errors", e.target.value === "true")}
                                                >
                                                    <option value={true}>True</option>
                                                    <option value={false}>False</option>
                                                </select>

                                                <strong>With Items</strong>
                                                {t.with_items.map((item, pIndex) => (
                                                    <div key={pIndex} className="mb-2">
                                                    <input
                                                        type="text"
                                                        className="form-control mb-1"
                                                        value={item.value}
                                                        onChange={(e) => handleNestedChange(index, "with_items", pIndex, "value", e.target.value)}
                                                    />
                                                    <button className="btn btn-danger btn-sm" onClick={() => removeWithItems(index, pIndex)}>
                                                        Remove
                                                    </button>
                                                    </div>
                                                ))}
                                                <button className="btn btn-primary btn-sm mb-3" onClick={() => addWithItems(index)}>
                                                    Add With Item
                                                </button>
                                                <br />
                                                <strong>Until</strong>
                                                <input
                                                    type="text"
                                                    className="form-control mb-2"
                                                    value={t.until}
                                                    onChange={(e) => handleTaskChange(index, "until", e.target.value)}
                                                />

                                                <strong>Loop</strong>
                                                <input
                                                    type="text"
                                                    className="form-control mb-2"
                                                    value={t.loop}
                                                    onChange={(e) => handleTaskChange(index, "loop", e.target.value)}
                                                />

                                                <strong>Loop Control</strong>
                                                {t.loop_control.map((p, pIndex) => (
                                                    <div key={pIndex}>
                                                    <input
                                                        type="text"
                                                        className="form-control mb-1"
                                                        placeholder="Loop Control Name"
                                                        value={p.key}
                                                        onChange={(e) => handleNestedChange(index, "loop_control", pIndex, "key", e.target.value)}
                                                    />
                                                    <input
                                                        type="text"
                                                        className="form-control mb-1"
                                                        placeholder="Loop Control Value"
                                                        value={p.value}
                                                        onChange={(e) => handleNestedChange(index, "loop_control", pIndex, "value", e.target.value)}
                                                    />
                                                    <button className="btn btn-danger btn-sm" onClick={() => removeLoopControl(index, pIndex)}>
                                                        Remove
                                                    </button>
                                                    </div>
                                                ))}
                                                <button className="btn btn-primary btn-sm mb-3" onClick={() => addLoopControl(index)}>
                                                    Add Loop Control
                                                </button>
                                                <br />
                                                <strong>Rescue</strong>
                                                {t.rescue.map((r, rIndex) => (
                                                    <div key={rIndex} className="mb-2">
                                                    <input
                                                        type="text"
                                                        className="form-control mb-1"
                                                        placeholder="Rescue Value"
                                                        value={r.value}
                                                        onChange={(e) => handleNestedChange(index, "rescue", rIndex, "value", e.target.value)}
                                                    />
                                                    <button className="btn btn-danger btn-sm" onClick={() => removeRescue(index, rIndex)}>
                                                        Remove
                                                    </button>
                                                    </div>
                                                ))}
                                                <button className="btn btn-primary btn-sm mb-3" onClick={() => addRescue(index)}>
                                                    Add Rescue
                                                </button>

                                                {index > 0 && (
                                                    <button className="btn btn-danger mb-3" onClick={() => removeTask(index)}>
                                                    Remove Task
                                                    </button>
                                                )}
                                                </div>
                                            ))}

                                            <button className="btn btn-success" onClick={addTask}>
                                                Add Task
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
                                                data-bs-target="#flush-collapseSix"
                                                aria-expanded="true"
                                                aria-controls="flush-collapseSix"
                                                >
                                                Post Tasks
                                                </button>
                                            </h2>
                                            <div
                                                className="accordion-collapse collapse show"
                                                id="flush-collapseSix"
                                                data-bs-parent="#accordionFlushExample"
                                            >
                                                <div className="accordion-body">
                                                {postTask.map((task, index) => (
                                                    <div key={index} className="mb-4 p-3 border rounded bg-light">
                                                    <strong>Task Name</strong>
                                                    <input
                                                        type="text"
                                                        className="form-control mb-2"
                                                        value={task.name}
                                                        onChange={(e) =>
                                                        handlePostTaskChange(index, "name", e.target.value)
                                                        }
                                                    />

                                                    <strong>Key-Value Pairs</strong>
                                                    {task.value.map((pair, pairIndex) => (
                                                        <div key={pairIndex} className="row g-2 mb-2">
                                                        <div className="col">
                                                            <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Key"
                                                            value={pair.key}
                                                            onChange={(e) =>
                                                                handlePostTaskValueChange(index, pairIndex, "key", e.target.value)
                                                            }
                                                            />
                                                        </div>
                                                        <div className="col">
                                                            <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Value"
                                                            value={pair.value}
                                                            onChange={(e) =>
                                                                handlePostTaskValueChange(index, pairIndex, "value", e.target.value)
                                                            }
                                                            />
                                                        </div>
                                                        <div className="col-auto">
                                                            <button
                                                            className="btn btn-danger"
                                                            onClick={() => removePostTaskValue(index, pairIndex)}
                                                            >
                                                            Remove
                                                            </button>
                                                        </div>
                                                        </div>
                                                    ))}

                                                    <button
                                                        className="btn btn-primary btn-sm mb-3"
                                                        onClick={() => addPostTaskValue(index)}
                                                    >
                                                        Add Key-Value Pair
                                                    </button>

                                                    {index > 0 && (
                                                        <button
                                                        className="btn btn-danger d-block"
                                                        onClick={() => removePostTask(index)}
                                                        >
                                                        Remove Post Task
                                                        </button>
                                                    )}
                                                    </div>
                                                ))}

                                                <button className="btn btn-success" onClick={addPostTask}>
                                                    Add Post Task
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
                                                    data-bs-target="#flush-collapseHandler"
                                                    aria-expanded="true"
                                                    aria-controls="flush-collapseHandler"
                                                    >
                                                    Handlers
                                                    </button>
                                                </h2>
                                                <div
                                                    className="accordion-collapse collapse show"
                                                    id="flush-collapseHandler"
                                                    data-bs-parent="#accordionFlushExample"
                                                >
                                                    <div className="accordion-body">
                                                    {handlers.map((handler, index) => (
                                                        <div key={index} className="border rounded p-3 mb-4 bg-light">
                                                        <strong>Handler Name</strong>
                                                        <input
                                                            type="text"
                                                            className="form-control mb-2"
                                                            value={handler.name}
                                                            onChange={(e) =>
                                                            handleHandlerChange(index, "name", e.target.value)
                                                            }
                                                        />

                                                        <strong>Values</strong>
                                                        {handler.value.map((item, i) => (
                                                            <div key={i} className="row g-2 mb-2">
                                                            <div className="col">
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Key"
                                                                value={item.key}
                                                                onChange={(e) =>
                                                                    handleHandlerValueChange(index, i, "key", e.target.value)
                                                                }
                                                                />
                                                            </div>
                                                            <div className="col">
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Value"
                                                                value={item.value}
                                                                onChange={(e) =>
                                                                    handleHandlerValueChange(index, i, "value", e.target.value)
                                                                }
                                                                />
                                                            </div>
                                                            <div className="col-auto">
                                                                <button
                                                                className="btn btn-danger"
                                                                onClick={() => removeHandlerValue(index, i)}
                                                                >
                                                                Remove
                                                                </button>
                                                            </div>
                                                            </div>
                                                        ))}
                                                        <button
                                                            className="btn btn-primary btn-sm mb-3"
                                                            onClick={() => addHandlerValue(index)}
                                                        >
                                                            Add Key-Value
                                                        </button>
                                                        <br />
                                                        <strong>When</strong>
                                                        <input
                                                            type="text"
                                                            className="form-control mb-2"
                                                            value={handler.when}
                                                            onChange={(e) =>
                                                            handleHandlerChange(index, "when", e.target.value)
                                                            }
                                                        />

                                                        <strong>Failures</strong>
                                                        <input
                                                            type="text"
                                                            className="form-control mb-2"
                                                            value={handler.failures}
                                                            onChange={(e) =>
                                                            handleHandlerChange(index, "failures", e.target.value)
                                                            }
                                                        />

                                                        <div className="form-check form-switch mb-2">
                                                            <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            checked={handler.ignore_errors}
                                                            onChange={(e) =>
                                                                handleHandlerChange(index, "ignore_errors", e.target.checked)
                                                            }
                                                            />
                                                            <label className="form-check-label">Ignore Errors</label>
                                                        </div>

                                                        <div className="form-check form-switch mb-2">
                                                            <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            checked={handler.one_at_a_time}
                                                            onChange={(e) =>
                                                                handleHandlerChange(index, "one_at_a_time", e.target.checked)
                                                            }
                                                            />
                                                            <label className="form-check-label">One at a Time</label>
                                                        </div>

                                                        <strong>Retry Files</strong>
                                                        {handler.retry_files.map((file, i) => (
                                                            <div key={i} className="row g-2 mb-2">
                                                            <div className="col">
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Key"
                                                                value={file.key}
                                                                onChange={(e) =>
                                                                    handleRetryFileChange(index, i, "key", e.target.value)
                                                                }
                                                                />
                                                            </div>
                                                            <div className="col">
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Value"
                                                                value={file.value}
                                                                onChange={(e) =>
                                                                    handleRetryFileChange(index, i, "value", e.target.value)
                                                                }
                                                                />
                                                            </div>
                                                            <div className="col-auto">
                                                                <button
                                                                className="btn btn-danger"
                                                                onClick={() => removeRetryFile(index, i)}
                                                                >
                                                                Remove
                                                                </button>
                                                            </div>
                                                            </div>
                                                        ))}
                                                        <button
                                                            className="btn btn-primary btn-sm mb-3"
                                                            onClick={() => addRetryFile(index)}
                                                        >
                                                            Add Retry File
                                                        </button>
                                                        <br />
                                                        <strong>Retry</strong>
                                                        <input
                                                            type="text"
                                                            className="form-control mb-2"
                                                            value={handler.retry}
                                                            onChange={(e) =>
                                                            handleHandlerChange(index, "retry", e.target.value)
                                                            }
                                                        />

                                                        <strong>Retry Delay</strong>
                                                        <input
                                                            type="text"
                                                            className="form-control mb-3"
                                                            value={handler.retry_delay}
                                                            onChange={(e) =>
                                                            handleHandlerChange(index, "retry_delay", e.target.value)
                                                            }
                                                        />

                                                        {index > 0 && (
                                                            <button
                                                            className="btn btn-danger"
                                                            onClick={() => removeHandler(index)}
                                                            >
                                                            Remove Handler
                                                            </button>
                                                        )}
                                                        </div>
                                                    ))}

                                                    <button className="btn btn-success" onClick={addHandler}>
                                                        Add Handler
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
                                                    data-bs-target="#flush-collapseAdvance"
                                                    aria-expanded="true"
                                                    aria-controls="flush-collapseAdvance"
                                                    >
                                                    Advance
                                                    </button>
                                                </h2>

                                            <div className="accordion-collapse collapse show" id="flush-collapseAdvance">
                                                <div className="accordion-body">
                                                    <strong>Any Error Fatal</strong>
                                                    <input type="text" className="form-control mb-3" value={any_errors_fatal} onChange={(e) => setAnyErrorsFatal(e.target.value)}/>
                                                    <strong>Serial</strong>
                                                    <input type="text" className="form-control mb-3" value={serial} onChange={(e) => setSerial(e.target.value)}/>
                                                    <strong>Max Fail Percentage</strong>
                                                    <input type="text" className="form-control mb-3" value={max_fail_percentage} onChange={(e) => setMaxFailPercentage(e.target.value)}/>
                                                    <strong>Strategy</strong>
                                                    <input type="text" className="form-control mb-3" value={strategy} onChange={(e) => setStrategy(e.target.value)}/>
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
                        value={ansible} readOnly
                        className="form-control"
                        ></textarea>
                    </div>
                </div>
            </div>
        </>
    )
}