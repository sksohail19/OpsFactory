import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/k8s.css";
function Kubernetes(mode) {
  const bgColor = "light-theme";
  const textColor = "light-text";
  return (
    <div className={`${bgColor} ${textColor} kubernetes-holder`}>
      <h1 className="display-4 text-center mb-5">Kubernetes Generator</h1>
      
      <h4 className="text-center display-4 mb-5">Features</h4>
      
        <div class="parent">
            <div class="child div1">
                <Link to = "/features/k8s/service" className="link">Service</Link>
            </div>
            <div class="child div2">
                <Link to = "/features/k8s/deployment" className="link">Deployment</Link>
            </div>
            <div class="child div3">
                <Link to = "/features/k8s/ingress" className="link">Ingress</Link>
            </div>
            <div class="child div4">
                <Link to = "/features/k8s/secret" className="link">Secret</Link>
            </div>
            <div class="child div5">
                <Link to="/features/k8s/pod" className="link">Pod</Link>
            </div>
            <div class="child div6">
                <Link to="/features/k8s/configmap" className="link">ConfigMap</Link>
            </div>
            <div class="child div7">
                <Link to="/features/k8s/namespace" className="link">Namespace</Link>
            </div>
            <div class="child div8">
                <Link to="/features/k8s/replicaset" className="link">Replica Set</Link>
            </div>
            <div class="child div9">
                <Link to="/features/k8s/job" className="link">Job</Link>
            </div>
            <div class="child div10">
                <Link to="/features/k8s/cronjob" className="link">CronJob</Link>
            </div>
            <div class="child div11">
                <Link to="/features/k8s/daemonset" className="link">DaemonSet</Link>
            </div>
            <div class="child div12">
                <Link to="/features/k8s/statefulset" className="link">StatefulSet</Link>
            </div>
            <div class="child div13">
                <Link to="/features/k8s/pv" className="link">Persistance Volume (PV)</Link>
            </div>
            <div class="child div14">
                <Link to="/features/k8s/pvc" className="link">Persistance Volume Claim (PVC)</Link>
            </div>
            <div class="child div15">
                <Link to="/features/k8s/hpa" className="link">Horizontal Pod Autoscaler (HPA)</Link>
            </div>
        </div>
    
    
    
    </div>
  )
}

export default Kubernetes

