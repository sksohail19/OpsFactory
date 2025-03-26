document.addEventListener('DOMContentLoaded', function() {
    
    const fileTypeList = document.getElementById('fileTypeList');
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const fileOutput = document.getElementById('fileOutput');
    const successMessage = document.getElementById('successMessage');
    
    // Form elements for Dockerfile
    const baseImage = document.getElementById('baseImage');
    const workDir = document.getElementById('workDir');
    const copyCommand = document.getElementById('copyCommand');
    const runCommands = document.getElementById('runCommands');
    const exposePort = document.getElementById('exposePort');
    const cmdCommand = document.getElementById('cmdCommand');
    
    // Current file type
    let currentFileType = 'docker';
    
    // File type templates
    const templates = {
        docker: generateDockerfile,
        'github-actions': generateGitHubActions,
        jenkins: generateJenkinsfile,
        kubernetes: generateKubernetesDeployment,
        'docker-compose': generateDockerCompose,
        terraform: generateTerraform,
        ansible: generateAnsible,
        nginx: generateNginx
    };
    
    // Handle file type selection
    fileTypeList.addEventListener('click', function(e) {
        if (e.target.tagName === 'LI') {
            // Remove active class from all items
            Array.from(fileTypeList.children).forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked item
            e.target.classList.add('active');
            
            // Update current file type
            currentFileType = e.target.dataset.type;
            
            // Update form container title
            const formContainer = document.querySelector('.form-container');
            formContainer.querySelector('h2').textContent = `Generate ${getFileTypeName(currentFileType)}`;
            
            // Update button text
            generateBtn.textContent = `Generate ${getFileTypeName(currentFileType)}`;
            
            // Generate initial template
            generateTemplate();
        }
    });
    
    // Generate button click
    generateBtn.addEventListener('click', function() {
        generateTemplate();
        showSuccessMessage('File generated successfully!');
    });
    
    // Copy button click
    copyBtn.addEventListener('click', function() {
        fileOutput.select();
        document.execCommand('copy');
        showSuccessMessage('Copied to clipboard!');
    });
    
    // Download button click
    downloadBtn.addEventListener('click', function() {
        const content = fileOutput.value;
        const filename = getFileName();
        const blob = new Blob([content], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        showSuccessMessage(`Downloaded as ${filename}`);
    });
    
    // Generate template based on current file type
    function generateTemplate() {
        const generator = templates[currentFileType];
        if (generator) {
            fileOutput.value = generator();
        }
    }
    
    // Get file type name for display
    function getFileTypeName(type) {
        const names = {
            docker: 'Dockerfile',
            'github-actions': 'GitHub Actions Workflow',
            jenkins: 'Jenkinsfile',
            kubernetes: 'Kubernetes Deployment',
            'docker-compose': 'Docker Compose',
            terraform: 'Terraform Configuration',
            ansible: 'Ansible Playbook',
            nginx: 'Nginx Configuration'
        };
        return names[type] || type;
    }
    
    // Get file name for download
    function getFileName() {
        const fileNames = {
            docker: 'Dockerfile',
            'github-actions': 'github-workflow.yml',
            jenkins: 'Jenkinsfile',
            kubernetes: 'deployment.yaml',
            'docker-compose': 'docker-compose.yml',
            terraform: 'main.tf',
            ansible: 'playbook.yml',
            nginx: 'nginx.conf'
        };
        return fileNames[currentFileType] || 'config.txt';
    }
    
    // Show success message
    function showSuccessMessage(message) {
        successMessage.textContent = message;
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }
    
    // Template generators
    function generateDockerfile() {
        const baseImg = baseImage.value;
        const wDir = workDir.value;
        const copyCmd = copyCommand.value;
        const runCmds = runCommands.value.split('\n').filter(cmd => cmd.trim() !== '');
        const port = exposePort.value;
        const cmd = cmdCommand.value;
        
        let dockerfile = `FROM ${baseImg}\n\n`;
        dockerfile += `WORKDIR ${wDir}\n\n`;
        dockerfile += `${copyCmd}\n\n`;
        
        if (runCmds.length > 0) {
            dockerfile += runCmds.map(cmd => `RUN ${cmd}`).join('\n') + '\n\n';
        }
        
        dockerfile += `EXPOSE ${port}\n\n`;
        dockerfile += `CMD ${cmd}`;
        
        return dockerfile;
    }
    
    function generateGitHubActions() {
        return `name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
    
    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: build-files
        path: build/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Download build artifacts
      uses: actions/download-artifact@v3
      with:
        name: build-files
        path: build/
    
    - name: Deploy to production
      run: |
        # Add your deployment script here
        echo "Deploying to production server"`;
    }
    
    function generateJenkinsfile() {
        return `pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'my-app:latest'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Docker Build') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'docker stop my-app || true'
                sh 'docker rm my-app || true'
                sh 'docker run -d --name my-app -p 3000:3000 $DOCKER_IMAGE'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}`;
    }
    
    function generateKubernetesDeployment() {
        return `apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:
    app: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: my-app:latest
        ports:
        - containerPort: 3000
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
          requests:
            cpu: "200m"
            memory: "256Mi"
        env:
        - name: NODE_ENV
          value: "production"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  selector:
    app: my-app
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer`;
    }
    
    function generateDockerCompose() {
        return `version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
    restart: always
    volumes:
      - ./app:/app
    networks:
      - app-network

  db:
    image: postgres:14
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  postgres_data:
  redis_data:`;
    }
    
    function generateTerraform() {
        return `provider "aws" {
  region = "us-west-2"
}

# VPC
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  
  tags = {
    Name = "main-vpc"
  }
}

# Subnets
resource "aws_subnet" "public" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-west-2a"
  
  tags = {
    Name = "public-subnet"
  }
}

resource "aws_subnet" "private" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "us-west-2b"
  
  tags = {
    Name = "private-subnet"
  }
}

# EC2 Instance
resource "aws_instance" "web_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.public.id
  
  tags = {
    Name = "web-server"
  }
}

# Security Group
resource "aws_security_group" "allow_web" {
  name        = "allow_web_traffic"
  description = "Allow Web inbound traffic"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "allow_web"
  }
}

# Output
output "instance_public_ip" {
  description = "Public IP address of the web server"
  value       = aws_instance.web_server.public_ip
}`;
    }
    
    function generateAnsible() {
        return `---
- name: Deploy Web Application
  hosts: webservers
  become: yes
  vars:
    app_name: myapp
    app_env: production
    deploy_dir: /var/www/html

  tasks:
    - name: Install required packages
      apt:
        name:
          - git
          - nodejs
          - npm
          - nginx
        state: present
        update_cache: yes

    - name: Clone application repository
      git:
        repo: https://github.com/user/repo.git
        dest: "{{ deploy_dir }}/{{ app_name }}"
        version: main
      notify: Restart Nginx

    - name: Install application dependencies
      npm:
        path: "{{ deploy_dir }}/{{ app_name }}"
        state: present

    - name: Build application
      command:
        cmd: npm run build
        chdir: "{{ deploy_dir }}/{{ app_name }}"
      environment:
        NODE_ENV: "{{ app_env }}"

    - name: Configure Nginx
      template:
        src: nginx_site.conf.j2
        dest: /etc/nginx/sites-available/{{ app_name }}
      notify: Restart Nginx

    - name: Enable Nginx site
      file:
        src: /etc/nginx/sites-available/{{ app_name }}
        dest: /etc/nginx/sites-enabled/{{ app_name }}
        state: link
      notify: Restart Nginx

    - name: Remove default Nginx site
      file:
        path: /etc/nginx/sites-enabled/default
        state: absent
      notify: Restart Nginx

  handlers:
    - name: Restart Nginx
      service:
        name: nginx
        state: restarted`;
    }
    
    function generateNginx() {
        return `server {
    listen 80;
    server_name example.com www.example.com;

    root /var/www/html;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location ~* \.(?:jpg|jpeg|gif|png|ico|css|js)$ {
        expires 1M;
        access_log off;
        add_header Cache-Control "public";
    }

    # SSL configuration
    # listen 443 ssl;
    # ssl_certificate /etc/nginx/ssl/cert.pem;
    # ssl_certificate_key /etc/nginx/ssl/key.pem;
    # ssl_protocols TLSv1.2 TLSv1.3;
    # ssl_prefer_server_ciphers on;
    # ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;

    # Logs
    access_log /var/log/nginx/example.com.access.log;
    error_log /var/log/nginx/example.com.error.log;
}`;
    }
    
    // Generate initial template
    generateTemplate();
});
