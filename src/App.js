import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
import Home from './pages/home';
import Docker from './pages/docker/Docker';
import DockerFileGenerator from './pages/docker/DockerFileGenerator';
import DockerCompose from "./pages/docker/DockerCompose";
import Kubernetes from './pages/Kubernetes';
import Ansible from './pages/Ansible';
import Terraform from './pages/Terraform';
import AWS from "./pages/terraform/AWS";
import GCP from "./pages/terraform/GCP";
import Azure from "./pages/terraform/Azure";
import Jenkins from './pages/Jenkins';
import Contact from './pages/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Service from './pages/k8s/Service';
import Deployment from './pages/k8s/Deployment';
import Ingress from './pages/k8s/Ingress';
import Secret from './pages/k8s/Secret';
import Pod from './pages/k8s/Pod';
import ConfigMap from './pages/k8s/ConfigMap';
import Namespace from './pages/k8s/Namespace';
import ReplicaSet from './pages/k8s/ReplicaSet';
import Job from './pages/k8s/Job';
import CronJob from './pages/k8s/CronJob';
import DaemonSet from './pages/k8s/DaemonSet';
import StatefulSet from './pages/k8s/Stateful';
import PV from './pages/k8s/PV';
import PVC from './pages/k8s/PVC';
import HPA from './pages/k8s/HPA';

function App() {
  const [mode, setMode] = useState(() => localStorage.getItem("mode") || "light");

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(prevMode => (prevMode === "light" ? "dark" : "light"));
  };

  const themeClass = mode === "dark" ? "light-theme" : "dark-theme";


  

  return (
    <div className={themeClass}>
      
      <Router>
        <Navbar title="Ops Factory" mode={mode} toggleMode={toggleMode} />
        <Routes>
          <Route path="/" element={<Home mode={mode} />} />
          <Route path="/features/docker" element={<DockerFileGenerator  />} />
          <Route path="/features/docker/file" element={<Docker mode={mode} />} />
          <Route path="/features/docker/compose" element={<DockerCompose mode = {mode} /> } />
          <Route path="/features/k8s" element={<Kubernetes mode={mode} />} />
          <Route path="/features/k8s/service" element={<Service mode={mode} />} />
          <Route path="/features/k8s/deployment" element={<Deployment mode={mode} />} />
          <Route path="/features/k8s/ingress" element={<Ingress mode={mode} />} />
          <Route path="/features/k8s/secret" element={<Secret mode={mode} />} />
          <Route path="/features/k8s/pod" element={<Pod mode={mode} />} />
          <Route path="/features/k8s/configmap" element={<ConfigMap mode={mode} />} />
          <Route path="/features/k8s/namespace" element={<Namespace mode={mode} />} />
          <Route path="/features/k8s/replicaset" element={<ReplicaSet mode={mode} />} />
          <Route path="/features/k8s/job" element={<Job mode={mode} />} />
          <Route path="/features/k8s/cronjob" element={<CronJob mode={mode} />} />
          <Route path="/features/k8s/daemonset" element={<DaemonSet mode={mode} />} />
          <Route path="/features/k8s/statefulset" element={<StatefulSet mode={mode} />} />
          <Route path="/features/k8s/pv" element={<PV mode={mode} />} />
          <Route path="/features/k8s/pvc" element={<PVC mode={mode} />} />
          <Route path="/features/k8s/hpa" element={<HPA mode={mode} />} />
          <Route path="/features/ansible" element={<Ansible mode={mode} />} />
          <Route path="/features/terraform" element={<Terraform mode={mode} />} />
          <Route path="/feartures/terraform/aws" element={<AWS mode={mode} />} />
          <Route path="/features/terraform/azure" element={<Azure />} />
          <Route path="/features/terraform/gcp" element={<GCP />} />
          <Route path="/features/jenkins" element={<Jenkins mode={mode} />} />
          <Route path="/contact" element={<Contact mode={mode} />} />
          
        </Routes>
        <Footer mode={mode} />
      </Router>
    </div>
  );
}

export default App;
