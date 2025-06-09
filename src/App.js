import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
import Home from './pages/home';
import Docker from './pages/Docker';
import Kubernetes from './pages/Kubernetes';
import Ansible from './pages/Ansible';
import Terraform from './pages/Terraform';
import Jenkins from './pages/Jenkins';
import Contact from './pages/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
        <Navbar title="DevOps File Generator" mode={mode} toggleMode={toggleMode} />
        <Routes>
          <Route path="/" element={<Home mode={mode} />} />
          <Route path="/features/docker" element={<Docker mode={mode} />} />
          <Route path="/features/k8s" element={<Kubernetes mode={mode} />} />
          <Route path="/features/ansible" element={<Ansible mode={mode} />} />
          <Route path="/features/terraform" element={<Terraform mode={mode} />} />
          <Route path="/features/jenkins" element={<Jenkins mode={mode} />} />
          <Route path="/contact" element={<Contact mode={mode} />} />
        </Routes>
        <Footer mode={mode} />
      </Router>
    </div>
  );
}

export default App;
