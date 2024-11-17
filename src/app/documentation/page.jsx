"use client";
import React, { useState } from "react";
import {
  Search,
  Book,
  Code,
  Database,
  Settings,
  Server,
  Shield,
  Terminal,
  ChevronRight,
  Copy,
  Check,
  ChevronDown,
  Menu,
  X,
  Route,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Footer from "../../components/Footer/Footer";
import ParticlesBackground from "../../components/Particles/ParticlesBackground";

const Logo = ({ onclick }) => (
  <div className="flex  my-5 cursor-pointer items-center" onClick={onclick}>
    <div className="relative flex items-center">
      <div className="relative w-8 h-8 mr-3">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(207,8,140,1)] to-purple-600 rounded-lg opacity-80"></div>
        <div className="absolute inset-[2px] bg-black/40 backdrop-blur-sm rounded-lg"></div>
        <svg
          viewBox="0 0 24 24"
          className="absolute inset-0 w-full h-full p-2"
          style={{ filter: "drop-shadow(0 0 4px rgba(207,8,140,0.5))" }}
        >
          <path
            d="M13 3L4 14h7l-2 7 9-11h-7l2-7z"
            fill="none"
            stroke="url(#lightning-gradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient
              id="lightning-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(207,8,140,1)" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 bg-[rgba(207,8,140,0.2)] rounded-lg blur-md"></div>
      </div>

      <div className="flex flex-col">
        <div className="relative">
          <span
            className="text-xl font-bold tracking-wide bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              fontFamily: '"Exo 2", sans-serif',
              letterSpacing: "0.02em",
              filter: "drop-shadow(0 0 8px rgba(207,8,140,0.3))",
            }}
          >
            NEON
          </span>
          <span
            className="text-xl font-bold tracking-wide bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              fontFamily: '"Exo 2", sans-serif',
              letterSpacing: "0.02em",
              filter: "drop-shadow(0 0 8px rgba(147,51,234,0.3))",
            }}
          >
            CLOUD
          </span>
          <div
            className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-[rgba(207,8,140,0.5)] via-purple-500/50 to-blue-500/50"
            style={{
              filter: "blur(0.5px)",
            }}
          ></div>
        </div>
      </div>
    </div>
  </div>
);

function Sidebar({ activeSection, setActiveSection, isOpen, setIsOpen }) {
  const router = useRouter();

  const menuItems = [
    { id: "intro", icon: <Book size={20} />, label: "Introduction" },
    { id: "quickstart", icon: <Terminal size={20} />, label: "Quick Start" },
    { id: "installation", icon: <Settings size={20} />, label: "Installation" },
    { id: "architecture", icon: <Server size={20} />, label: "Architecture" },
    { id: "data-model", icon: <Database size={20} />, label: "Data Model" },
    { id: "security", icon: <Shield size={20} />, label: "Security" },
    { id: "rest-api", icon: <Code size={20} />, label: "REST API" },
    { id: "graphql", icon: <Code size={20} />, label: "GraphQL" },
    { id: "websocket", icon: <Code size={20} />, label: "WebSocket" },
    { id: "cloud-deploy", icon: <Server size={20} />, label: "Cloud Deploy" },
    { id: "docker", icon: <Server size={20} />, label: "Docker" },
    { id: "kubernetes", icon: <Server size={20} />, label: "Kubernetes" },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/5 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <button
        className="fixed top-4 left-4 z-50 p-2 bg-white/10 rounded-md lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-black/5 backdrop-blur-md border-r border-white/10
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="p-4">
          <Logo onclick={() => router.push("/")} />
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search docs..."
              className="w-full bg-white/10 outline-none rounded-md py-2 pl-8 pr-4 text-sm"
            />
            <Search
              size={16}
              className="absolute left-2 top-2.5 text-gray-400"
            />
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsOpen(false); // Close mobile menu when item is selected
                }}
                className={`
                  w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm
                  transition-colors duration-200
                  ${
                    activeSection === item.id
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

// Code Block Component with responsive design
function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-white/10 rounded-md p-4 overflow-x-auto text-sm">
        <code className="text-gray-300">{code}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 rounded-md bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
}

function Page() {
  const [activeSection, setActiveSection] = useState("intro");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex overflow-y-hidden min-h-screen bg-black text-white">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="flex-1 max-h-screen overflow-y-auto">
        <div className="max-w-4xl relative z-10 mx-auto px-8 py-12">
          <div className="space-y-12">
            {activeSection === "intro" && (
              <div className="relative z-10">
                <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Introduction to NeonCloud
                </h1>
                <p className="text-gray-400 mb-6">
                  Welcome to NeonCloud documentation. This guide will help you
                  get started with our cutting-edge cloud platform and explore
                  its powerful features.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                    <h3 className="font-semibold mb-2">What is NeonCloud?</h3>
                    <p className="text-gray-400 text-sm">
                      NeonCloud is a modern cloud platform designed for
                      developers, offering scalable infrastructure, serverless
                      computing, and powerful tools to build, deploy, and manage
                      applications with ease.
                    </p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                    <h3 className="font-semibold mb-2">Key Features</h3>
                    <ul className="text-gray-400 text-sm space-y-2">
                      <li className="flex items-center gap-2">
                        <ChevronRight
                          size={16}
                          className="text-[rgba(207,8,140,1)]"
                        />
                        Serverless Computing
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight
                          size={16}
                          className="text-[rgba(207,8,140,1)]"
                        />
                        Auto-scaling
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight
                          size={16}
                          className="text-[rgba(207,8,140,1)]"
                        />
                        Global CDN
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight
                          size={16}
                          className="text-[rgba(207,8,140,1)]"
                        />
                        Advanced Security
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight
                          size={16}
                          className="text-[rgba(207,8,140,1)]"
                        />
                        Integrated CI/CD
                      </li>
                    </ul>
                  </div>
                </div>
                <h2 className="text-2xl font-semibold mb-4">
                  Why Choose NeonCloud?
                </h2>
                <p className="text-gray-400 mb-4">
                  NeonCloud combines the power of serverless architecture with
                  the flexibility of traditional cloud services. Our platform is
                  designed to help developers focus on writing code, not
                  managing infrastructure.
                </p>
              </div>
            )}

            {activeSection === "quickstart" && (
              <div>
                <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Quick Start Guide
                </h1>
                <p className="text-gray-400 mb-6">
                  Get up and running with NeonCloud in minutes. Follow these
                  steps to deploy your first application.
                </p>
                <ol className="space-y-4 mb-8">
                  <li>
                    <h3 className="text-xl font-semibold mb-2">
                      1. Install the NeonCloud CLI
                    </h3>
                    <CodeBlock
                      code={`# Using npm
npm install -g neoncloud-cli

# Using yarn
yarn global add neoncloud-cli`}
                    />
                  </li>
                  <li>
                    <h3 className="text-xl font-semibold mb-2">
                      2. Initialize your project
                    </h3>
                    <CodeBlock
                      code={`neon init my-project
cd my-project`}
                    />
                  </li>
                  <li>
                    <h3 className="text-xl font-semibold mb-2">
                      3. Deploy your application
                    </h3>
                    <CodeBlock code={`neon deploy`} />
                  </li>
                </ol>
                <p className="text-gray-400">
                  That&apos;s it! Your application is now live on NeonCloud. Visit
                  the URL provided in the CLI output to see your deployed app.
                </p>
              </div>
            )}

            {activeSection === "installation" && (
              <div>
                <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Installation
                </h1>
                <p className="text-gray-400 mb-6">
                  Follow these steps to install and set up NeonCloud on your
                  development machine.
                </p>
                <h2 className="text-2xl font-semibold mb-4">Prerequisites</h2>
                <ul className="list-disc list-inside text-gray-400 mb-6">
                  <li>Node.js (version 14 or later)</li>
                  <li>npm or yarn package manager</li>
                  <li>
                    A NeonCloud account (sign up at neoncloud.com if you haven&apos;t
                    already)
                  </li>
                </ul>
                <h2 className="text-2xl font-semibold mb-4">
                  Installation Steps
                </h2>
                <ol className="space-y-4 mb-8">
                  <li>
                    <h3 className="text-xl font-semibold mb-2">
                      1. Install the NeonCloud CLI
                    </h3>
                    <CodeBlock
                      code={`# Using npm
npm install -g neoncloud-cli

# Using yarn
yarn global add neoncloud-cli`}
                    />
                  </li>
                  <li>
                    <h3 className="text-xl font-semibold mb-2">
                      2. Verify the installation
                    </h3>
                    <CodeBlock code={`neon --version`} />
                  </li>
                  <li>
                    <h3 className="text-xl font-semibold mb-2">
                      3. Configure your NeonCloud account
                    </h3>
                    <CodeBlock code={`neon login`} />
                    <p className="text-gray-400 mt-2">
                      Follow the prompts to log in to your NeonCloud account.
                    </p>
                  </li>
                </ol>
                <p className="text-gray-400">
                  You&apos;re now ready to start using NeonCloud! Check out the Quick
                  Start guide to deploy your first application.
                </p>
              </div>
            )}

            {activeSection === "architecture" && (
              <div>
                <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  NeonCloud Architecture
                </h1>
                <p className="text-gray-400 mb-6">
                  Understanding NeonCloud&apos;s architecture will help you make the
                  most of our platform&apos;s capabilities.
                </p>
                <h2 className="text-2xl font-semibold mb-4">Core Components</h2>
                <ul className="space-y-4 mb-8">
                  <li>
                    <h3 className="text-xl font-semibold mb-2">
                      1. Serverless Functions
                    </h3>
                    <p className="text-gray-400">
                      Event-driven, auto-scaling compute service that forms the
                      backbone of NeonCloud applications.
                    </p>
                  </li>
                  <li>
                    <h3 className="text-xl font-semibold mb-2">
                      2. Edge Network
                    </h3>
                    <p className="text-gray-400">
                      Global CDN that ensures low-latency content delivery and
                      edge computing capabilities.
                    </p>
                  </li>
                  <li>
                    <h3 className="text-xl font-semibold mb-2">3. NeonStore</h3>
                    <p className="text-gray-400">
                      Distributed database service offering both relational and
                      NoSQL options with automatic scaling.
                    </p>
                  </li>
                  <li>
                    <h3 className="text-xl font-semibold mb-2">4. NeonQueue</h3>
                    <p className="text-gray-400">
                      Managed message queue service for building decoupled,
                      event-driven applications.
                    </p>
                  </li>
                </ul>
                <h2 className="text-2xl font-semibold mb-4">System Design</h2>
                <p className="text-gray-400 mb-4">
                  NeonCloud uses a microservices architecture, allowing for high
                  scalability and flexibility. Each component is designed to
                  work seamlessly together while being independently scalable.
                </p>
              </div>
            )}

            {activeSection === "data-model" && (
              <div>
                <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Data Model
                </h1>
                <p className="text-gray-400 mb-6">
                  NeonCloud offers flexible data storage options to suit various
                  application needs.
                </p>
                <h2 className="text-2xl font-semibold mb-4">
                  NeonStore Options
                </h2>
                <ul className="space-y-4 mb-8">
                  <li>
                    <h3 className="text-xl font-semibold mb-2">1. NeonSQL</h3>
                    <p className="text-gray-400">
                      Fully managed relational database service compatible with
                      PostgreSQL.
                    </p>
                    <CodeBlock
                      code={`// Example NeonSQL query
const result = await neonSQL.query('SELECT * FROM users WHERE status = $1', ['active']);`}
                    />
                  </li>
                  <li>
                    <h3 className="text-xl font-semibold mb-2">
                      2. NeonDocument
                    </h3>
                    <p className="text-gray-400">
                      Schemaless document database for flexible data storage.
                    </p>
                    <CodeBlock
                      code={`// Example NeonDocument operation
const doc = await neonDocument.collection('users').insertOne({
name: 'Alice',
age: 30,
preferences: { theme: 'dark', language: 'en' }
});`}
                    />
                  </li>
                  <li>
                    <h3 className="text-xl font-semibold mb-2">
                      3. NeonKey-Value
                    </h3>
                    <p className="text-gray-400">
                      High-performance key-value store for caching and simple
                      data structures.
                    </p>
                    <CodeBlock
                      code={`// Example NeonKey-Value operation
await neonKV.set('user:1234', { name: 'Bob', lastLogin: Date.now() });
const user = await neonKV.get('user:1234');`}
                    />
                  </li>
                </ul>
                <h2 className="text-2xl font-semibold mb-4">
                  Data Modeling Best Practices
                </h2>
                <ul className="list-disc list-inside text-gray-400 mb-6">
                  <li>Choose the right data store for your use case</li>
                  <li>Design for scalability from the start</li>
                  <li>Use indexing strategically for better performance</li>
                  <li>Implement data validation at the application level</li>
                  <li>
                    Consider data access patterns when structuring your data
                  </li>
                </ul>
              </div>
            )}

            {activeSection === "security" && (
              <div>
                <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Security
                </h1>
                <p className="text-gray-400 mb-6">
                  NeonCloud prioritizes the security of your applications and
                  data. We provide multiple layers of security to protect your
                  resources.
                </p>
                <h2 className="text-2xl font-semibold mb-4">
                  Key Security Features
                </h2>
                <ul className="space-y-4 mb-8">
                  <li>
                    <h3 className="text-xl font-semibold mb-2">
                      1. Encryption
                    </h3>
                    <p className="text-gray-400">
                      All data is encrypted at rest and in transit using
                      industry-standard encryption protocols.
                    </p>
                  </li>
                  <li>
                    <h3 className="text-xl font-semibold mb-2">
                      2. Identity and Access Management (IAM)
                    </h3>
                    <p className="text-gray-400">
                      Fine-grained access control for your NeonCloud resources.
                    </p>
                    <CodeBlock
                      code={`// Example IAM policy
{
"Version": "2023-05-01",
"Statement": [
  {
    "Effect": "Allow",
    "Action": [
      "neonstore:Read",
      "neonstore:Write"
    ],// ... continuing from where we left off

    "Resource": [
      "arn:neoncloud:store:*:*:table/users",
      "arn:neoncloud:store:*:*:table/profiles"
    ]
  }
]
}`}
                    />
                  </li>
                  <li>
                    <h3 className="text-xl font-semibold mb-2">
                      3. Network Security
                    </h3>
                    <p className="text-gray-400">
                      Virtual Private Cloud (VPC) isolation and firewall rules
                      to protect your resources.
                    </p>
                    <CodeBlock
                      code={`// Example Network Policy
{
"networkPolicy": {
  "allowedIPs": ["192.168.1.0/24"],
  "allowedPorts": [443, 8080],
  "enableVPCPeering": true
}
}`}
                    />
                  </li>
                </ul>
                <h2 className="text-2xl font-semibold mb-4">
                  Security Best Practices
                </h2>
                <ul className="list-disc list-inside text-gray-400 mb-6">
                  <li>Enable Multi-Factor Authentication (MFA)</li>
                  <li>Regularly rotate access keys</li>
                  <li>Follow the principle of least privilege</li>
                  <li>Monitor and audit access logs</li>
                  <li>Keep your dependencies up to date</li>
                </ul>
              </div>
            )}

            {activeSection === "rest-api" && (
              <div>
                <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  REST API Reference
                </h1>
                <p className="text-gray-400 mb-6">
                  The NeonCloud REST API provides programmatic access to all
                  platform features.
                </p>
                <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
                <CodeBlock
                  code={`// Example API request with authentication
const response = await fetch('https://api.neoncloud.dev/v1/functions', {
headers: {
  'Authorization': 'Bearer your-api-key',
  'Content-Type': 'application/json'
}
});`}
                />
                <h2 className="text-2xl font-semibold mb-4 mt-8">
                  Common Endpoints
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Functions</h3>
                    <CodeBlock
                      code={`# List all functions
GET /v1/functions

# Create a new function
POST /v1/functions
{
"name": "my-function",
"runtime": "nodejs16.x",
"handler": "index.handler",
"memory": 128
}`}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Deployments</h3>
                    <CodeBlock
                      code={`# Deploy a function
POST /v1/functions/{functionId}/deployments
{
"code": "base64-encoded-zip",
"environment": {
  "NODE_ENV": "production"
}
}`}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === "graphql" && (
              <div>
                <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  GraphQL API
                </h1>
                <p className="text-gray-400 mb-6">
                  NeonCloud provides a powerful GraphQL API for flexible data
                  querying and manipulation.
                </p>
                <h2 className="text-2xl font-semibold mb-4">Schema Overview</h2>
                <CodeBlock
                  code={`type Function {
id: ID!
name: String!
runtime: String!
memory: Int!
environment: [EnvVar!]
deployments: [Deployment!]
}

type Deployment {
id: ID!
version: String!
status: DeploymentStatus!
createdAt: DateTime!
}

enum DeploymentStatus {
PENDING
IN_PROGRESS
COMPLETED
FAILED
}`}
                />
                <h2 className="text-2xl font-semibold mb-4 mt-8">
                  Example Queries
                </h2>
                <CodeBlock
                  code={`# Query functions and their deployments
query {
functions {
  name
  runtime
  deployments {
    version
    status
    createdAt
  }
}
}

# Create a new function
mutation {
createFunction(input: {
  name: "api-handler"
  runtime: "nodejs16.x"
  memory: 256
}) {
  id
  name
  runtime
}
}`}
                />
              </div>
            )}

            {activeSection === "websocket" && (
              <div>
                <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  WebSocket API
                </h1>
                <p className="text-gray-400 mb-6">
                  Real-time communication with NeonCloud services using
                  WebSocket connections.
                </p>
                <h2 className="text-2xl font-semibold mb-4">
                  Connection Setup
                </h2>
                <CodeBlock
                  code={`// Example WebSocket connection
const ws = new WebSocket('wss://ws.neoncloud.dev/v1/events');

ws.onopen = () => {
// Subscribe to function logs
ws.send(JSON.stringify({
  type: 'subscribe',
  channel: 'function-logs',
  functionId: 'my-function'
}));
};

ws.onmessage = (event) => {
const data = JSON.parse(event.data);
console.log('Received:', data);
};`}
                />
                <h2 className="text-2xl font-semibold mb-4 mt-8">
                  Event Types
                </h2>
                <ul className="space-y-4">
                  <li>
                    <h3 className="text-xl font-semibold mb-2">
                      Function Logs
                    </h3>
                    <CodeBlock
                      code={`{
"type": "log",
"functionId": "my-function",
"timestamp": "2024-11-17T14:30:00Z",
"level": "info",
"message": "Function executed successfully"
}`}
                    />
                  </li>
                  <li>
                    <h3 className="text-xl font-semibold mb-2">
                      Deployment Status
                    </h3>
                    <CodeBlock
                      code={`{
"type": "deployment",
"functionId": "my-function",
"deploymentId": "dep-123",
"status": "completed",
"timestamp": "2024-11-17T14:35:00Z"
}`}
                    />
                  </li>
                </ul>
              </div>
            )}

            {activeSection === "cloud-deploy" && (
              <div>
                <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Cloud Deployment
                </h1>
                <p className="text-gray-400 mb-6">
                  Learn how to deploy your applications to NeonCloud&apos;s global
                  infrastructure.
                </p>
                <h2 className="text-2xl font-semibold mb-4">
                  Deployment Options
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      1. CLI Deployment
                    </h3>
                    <CodeBlock
                      code={`# Deploy using CLI
neon deploy --stage production

# Deploy with custom configuration
neon deploy --config neon.config.js --env production`}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      2. GitHub Actions
                    </h3>
                    <CodeBlock
                      code={`name: Deploy to NeonCloud
on:
push:
  branches: [ main ]

jobs:
deploy:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v2
    - uses: neoncloud/deploy-action@v1
      with:
        api-key: \${{ secrets.NEON_API_KEY }}
        stage: production`}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === "docker" && (
              <div>
                <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Docker Integration
                </h1>
                <p className="text-gray-400 mb-6">
                  Deploy containerized applications on NeonCloud using Docker.
                </p>
                <h2 className="text-2xl font-semibold mb-4">
                  Docker Configuration
                </h2>
                <CodeBlock
                  code={`# Example Dockerfile
FROM node:16-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "start"]

# Build and push
docker build -t neoncloud.registry.dev/myapp:latest .
docker push neoncloud.registry.dev/myapp:latest`}
                />
                <h2 className="text-2xl font-semibold mb-4 mt-8">
                  Container Management
                </h2>
                <CodeBlock
                  code={`# Deploy container
neon container deploy --image myapp:latest --env production

# Scale containers
neon container scale --replicas 3 --name myapp

# View logs
neon container logs --name myapp --tail 100`}
                />
              </div>
            )}

            {activeSection === "kubernetes" && (
              <div>
                <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Kubernetes Integration
                </h1>
                <p className="text-gray-400 mb-6">
                  Deploy and manage applications using Kubernetes on NeonCloud.
                </p>
                <h2 className="text-2xl font-semibold mb-4">
                  Kubernetes Configuration
                </h2>
                <CodeBlock
                  code={`# Example deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
name: myapp
spec:
replicas: 3
selector:
  matchLabels:
    app: myapp
template:
  metadata:
    labels:
      app: myapp
  spec:
    containers:
    - name: myapp
      image: neoncloud.registry.dev/myapp:latest
      ports:
      - containerPort: 3000`}
                />
                <h2 className="text-2xl font-semibold mb-4 mt-8">
                  Kubernetes Commands
                </h2>
                <CodeBlock
                  code={`# Configure kubectl
neon kubernetes config

# Deploy application
kubectl apply -f deployment.yaml

# View pods
kubectl get pods

# View logs
kubectl logs deployment/myapp`}
                />
              </div>
            )}
          </div>
        </div>
        {/* <Footer /> */}
        <ParticlesBackground />
      </main>
    </div>
  );
}

export default Page;

// Sidebar Component with responsive design

// Main Page Component
// function Page() {
//   const [activeSection, setActiveSection] = useState("intro");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   return (
//     <div className="flex min-h-screen bg-black text-white">
//       <Sidebar
//         activeSection={activeSection}
//         setActiveSection={setActiveSection}
//         isOpen={isSidebarOpen}
//         setIsOpen={setIsSidebarOpen}
//       />

//       <main className="flex-1 overflow-y-auto">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//           <div className="space-y-8 sm:space-y-12">
//             {activeSection === "intro" && (
//               <div>
//                 <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent">
//                   Introduction to NeonCloud
//                 </h1>
//                 <p className="text-gray-400 mb-4 sm:mb-6">
//                   Welcome to NeonCloud documentation. This guide will help you get started
//                   with our cutting-edge cloud platform and explore its powerful features.
//                 </p>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
//                   <div className="p-4 sm:p-6 bg-white/5 rounded-xl border border-white/10">
//                     <h3 className="font-semibold mb-2">What is NeonCloud?</h3>
//                     <p className="text-gray-400 text-sm">
//                       NeonCloud is a modern cloud platform designed for developers,
//                       offering scalable infrastructure, serverless computing, and powerful tools
//                       to build, deploy, and manage applications with ease.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Page;
