'use client';
import React, { useState, useCallback, useRef, useEffect } from "react";
import { toast } from "sonner";
import {
  Upload,
  Globe,
  Server,
  Database,
  Settings,
  RefreshCw,
  Box,
  Cpu,
  Clock,
  HardDrive,
  Network,
  Zap,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ChevronRight,
  Folder,
  File,
  Monitor,
  Cloud,
  Lock,
  Copy,
  FileCode,
  FileType,
  FileJson,
  Image,
  Trash2,
} from "lucide-react";

const path = require("path");

const isAllowedFileType = (file) => {
  const ignoredPaths = [
    ".vscode",
    ".git",
    ".next",
    "node_modules",
    ".DS_Store",
    ".env",
    ".idea",
    "__MACOSX",
  ];

  const normalizedPath = file.path ? path.normalize(file.path) : "";

  if (normalizedPath) {
    const isIgnoredPath = ignoredPaths.some((ignoredPath) =>
      normalizedPath.includes(path.sep + ignoredPath + path.sep) || 
      normalizedPath.endsWith(path.sep + ignoredPath) 
    );
    if (isIgnoredPath) return false;
  }

  const allowedTypes = [
    "text/html",
    "text/css",
    "text/javascript",
    "application/javascript",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg+xml",
    "image/webp",
    "image/avif",
    "text/plain",
    "application/json",
    "text/markdown",
    "font/ttf",
    "font/woff",
    "font/woff2",
    "application/x-font-ttf",
    "application/x-font-woff",
    "application/font-woff2",
    "", // For folders and files without type
  ];

  // List of allowed file extensions (for cases where MIME type is not reliable)
  const allowedExtensions = [
    ".html",
    ".htm",
    ".css",
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".svg",
    ".webp",
    ".avif",
    ".txt",
    ".md",
    ".json",
    ".ttf",
    ".woff",
    ".woff2",
    ".ico",
    ".favicon",
  ];

  // If it's a folder or doesn't have a type, check the file extension
  if (!file.type || file.type === "") {
    const extension = file.name.toLowerCase().match(/\.[^.]*$/)?.[0];
    if (!extension) return true; // Folders without extension are allowed
    return allowedExtensions.includes(extension);
  }

  // Check if the file type is allowed
  return allowedTypes.includes(file.type);
};


const processDirectory = async (entry) => {
  const files = [];

  async function readEntries(dirReader) {
    const entries = await new Promise((resolve) => {
      dirReader.readEntries(resolve);
    });

    for (let entry of entries) {
      if (entry.isFile) {
        const file = await new Promise((resolve) => {
          entry.file(resolve);
        });
        files.push({
          file,
          path: entry.fullPath,
        });
      } else if (entry.isDirectory) {
        await readEntries(entry.createReader());
      }
    }
  }

  await readEntries(entry.createReader());
  return files;
};

const WebHostingContent = () => {
  const [deployMethod, setDeployMethod] = useState("upload");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [deploymentStatus, setDeploymentStatus] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [deploymentLog, setDeploymentLog] = useState([]);

  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState(null);

  // Add this function to handle deployment
  const handleDeploy = useCallback(async () => {
    if (uploadedFiles.length === 0 || !selectedDomain) return;

    setIsDeploying(true);
    setDeploymentStatus("deploying");
    setDeploymentLog([]);

    const addLog = (message) => {
      setDeploymentLog((prev) => [
        ...prev,
        { timestamp: new Date().toISOString(), message },
      ]);
    };

    try {
      // Step 1: Initialize deployment
      addLog("Initializing deployment...");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Step 2: Validate files
      addLog("Validating uploaded files...");
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Step 3: Process files
      addLog("Processing files for deployment...");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Step 4: Configure domain
      addLog(`Configuring domain: ${selectedDomain}`);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Step 5: Deploy
      addLog("Deploying to production servers...");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Step 6: Final checks
      addLog("Running final checks...");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success
      addLog("🚀 Deployment successful!");
      setDeploymentStatus("success");
      setDeployedUrl(`https://${selectedDomain}`);

      toast.success("Deployment completed successfully!");
    } catch (error) {
      addLog("❌ Deployment failed: " + error.message);
      setDeploymentStatus("error");
      toast.error("Deployment failed. Please try again.");
    } finally {
      setIsDeploying(false);
    }
  }, [uploadedFiles, selectedDomain]);

  const simulateUpload = (files) => {
    files.forEach((file) => {
      // Skip files that already have error status
      if (file.status === "error") return;

      // Initialize progress for this file
      setUploadProgress((prev) => ({
        ...prev,
        [file.id]: 0,
      }));

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;

        setUploadProgress((prev) => ({
          ...prev,
          [file.id]: progress,
        }));

        if (progress >= 100) {
          clearInterval(interval);
          // Update file status to success when upload is complete
          setUploadedFiles((prevFiles) =>
            prevFiles.map((f) =>
              f.id === file.id ? { ...f, status: "success" } : f
            )
          );
        }
      }, 300);
    });
  };

  const handleFiles = async (items) => {
    try {
      const allFiles = [];

      for (let item of items) {
        // Handle DataTransferItem (drag and drop)
        if (item.getAsEntry || item.webkitGetAsEntry) {
          const entry = item.getAsEntry?.() || item.webkitGetAsEntry?.();
          if (entry.isDirectory) {
            const filesInDir = await processDirectory(entry);
            allFiles.push(...filesInDir);
          } else {
            const file = item.getAsFile();
            if (file) allFiles.push({ file, path: `/${file.name}` });
          }
        }
        // Handle regular File objects (file input)
        else if (item instanceof File) {
          allFiles.push({ file: item, path: `/${item.name}` });
        }
      }

      const processedFiles = allFiles.map(({ file, path }) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        path: path,
        size: file.size,
        type: file.type,
        status: isAllowedFileType(file) ? "pending" : "error",
        error: isAllowedFileType(file) ? null : "Unsupported file type",
        file: file,
      }));

      setUploadedFiles((prev) => [...prev, ...processedFiles]);
      simulateUpload(processedFiles);
    } catch (error) {
      console.error("Error processing files:", error);
      setUploadedFiles((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substr(2, 9),
          name: "Error processing files",
          status: "error",
          error: error.message,
        },
      ]);
    }
  };

  // Replace your existing handleDrop function with this one
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);

    const items = Array.from(e.dataTransfer.items || e.dataTransfer.files);
    handleFiles(items);
  }, []);

  // Replace your existing handleFileSelect function with this one
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Web Hosting</h1>
          <p className="text-gray-400 text-sm">
            Deploy and manage your web applications
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Deployment Options */}
        <div className="lg:col-span-2 space-y-6">
          {/* Deployment Method Selection */}
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Deploy Your Website</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DeploymentMethod
                icon={Upload}
                title="Upload Files"
                description="Upload your HTML, CSS, and assets"
                isSelected={deployMethod === "upload"}
                onClick={() => setDeployMethod("upload")}
              />
              <DeploymentMethod
                icon={Globe}
                title="Connect Git"
                description="Deploy from GitHub, GitLab, etc."
                isSelected={deployMethod === "git"}
                onClick={() => setDeployMethod("git")}
              />
              <DeploymentMethod
                icon={Box}
                title="Container"
                description="Deploy using Docker container"
                isSelected={deployMethod === "container"}
                onClick={() => setDeployMethod("container")}
              />
            </div>
          </div>

          {/* File Upload Area */}
          {deployMethod === "upload" && (
            <div className="space-y-6">
              <UploadArea
                isDragging={isDragging}
                setIsDragging={setIsDragging}
                onDrop={handleDrop}
                handleFileSelect={handleFileSelect}
              />

              {uploadedFiles.length > 0 && (
                <FileList
                  files={uploadedFiles}
                  uploadProgress={uploadProgress}
                  setShowLivePreview={setShowLivePreview}
                  setUploadedFiles={setUploadedFiles}
                  onDeploy={handleDeploy}
                  isDeploying={isDeploying}
                  deployedUrl={deployedUrl}
                  canDeploy={!!selectedDomain}
                  selectedDomain={selectedDomain}
                />
              )}
            </div>
          )}

          {/* Git Integration */}
          {deployMethod === "git" && <GitDeployment />}

          {/* Container Deployment */}
          {deployMethod === "container" && <ContainerDeployment />}

          {/* Configuration Section */}
          <DeploymentConfig
            selectedDomain={selectedDomain}
            setSelectedDomain={setSelectedDomain}
          />

          {/* Add new components */}
          <QuickActions />
          <DeploymentGuide />
        </div>

        {/* Right Panel - Status and Resources */}
        <div className="space-y-6">
          {/* Hosting Plans */}
          <HostingPlans
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
          />

          {/* Resource Usage */}
          <ResourceUsage />

          {/* Deployment Status */}
          {deploymentStatus && (
            <DeploymentStatus
              status={deploymentStatus}
              logs={deploymentLog} // Add this line
            />
          )}
        </div>
      </div>

      {/* Live Preview Modal */}
      {showLivePreview && (
        <LivePreview
          url={previewUrl || "about:blank"}
          onClose={() => setShowLivePreview(false)}
        />
      )}
    </div>
  );
};
// Component Definitions

const DeploymentMethod = ({
  icon: Icon,
  title,
  description,
  isSelected,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`p-4 border rounded-lg transition-all duration-200 text-left ${
      isSelected
        ? "border-[rgba(207,8,140,1)] bg-[rgba(207,8,140,0.1)]"
        : "border-white/10 hover:border-white/20 bg-white/5"
    }`}
  >
    <Icon className="w-6 h-6 mb-3" />
    <h3 className="font-medium mb-1">{title}</h3>
    <p className="text-sm text-gray-400">{description}</p>
  </button>
);

const UploadArea = ({
  isDragging,
  setIsDragging,
  onDrop,
  handleFileSelect,
}) => (
  <div
    onDragOver={(e) => {
      e.preventDefault();
      setIsDragging(true);
    }}
    onDragLeave={() => setIsDragging(false)}
    onDrop={onDrop}
    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
      isDragging
        ? "border-[rgba(207,8,140,1)] bg-[rgba(207,8,140,0.1)]"
        : "border-white/10 hover:border-white/20"
    }`}
  >
    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
    <h3 className="text-lg font-medium mb-2">Drag and drop your files here</h3>
    <p className="text-sm text-gray-400 mb-4">
      or click to select files from your device
    </p>
    <label className="cursor-pointer">
      <input
        type="file"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
      <span className="px-4 py-2 bg-[rgba(207,8,140,1)] hover:bg-[rgba(207,8,140,0.8)] rounded-lg transition-colors">
        Select Files
      </span>
    </label>
  </div>
);
const FileList = ({
  files,
  uploadProgress,
  setShowLivePreview,
  setUploadedFiles,
  onDeploy,
  isDeploying,
  deployedUrl,
  canDeploy = true,
  selectedDomain,
}) => {
  const handleRemoveFile = (fileToRemove) => {
    setUploadedFiles((prev) =>
      prev.filter((file) => file.name !== fileToRemove.name)
    );
  };

  const isValidDomain = (domain) => {
    const domainRegex =
      /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return domain && domainRegex.test(domain);
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    switch (extension) {
      case "html":
        return <FileCode className="w-4 h-4" />;
      case "css":
        return <FileType className="w-4 h-4" />;
      case "js":
      case "jsx":
      case "ts":
      case "tsx":
        return <FileJson className="w-4 h-4" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "svg":
      case "webp":
        return <Image className="w-4 h-4" />;
      default:
        return <File className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Uploaded Files</h3>
        <div className="flex gap-3">
          {deployedUrl && (
            <button
              onClick={() => setShowLivePreview(true)}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-2"
            >
              <Monitor className="w-4 h-4" />
              Live Preview
            </button>
          )}
          <button
            onClick={onDeploy}
            disabled={
              isDeploying || !canDeploy || !isValidDomain(selectedDomain)
            }
            className={`px-4 py-1.5 rounded-lg transition-colors flex items-center gap-2
          ${
            isDeploying || !canDeploy || !isValidDomain(selectedDomain)
              ? "bg-white/10 cursor-not-allowed"
              : "bg-[rgba(207,8,140,1)] hover:bg-[rgba(207,8,140,0.8)]"
          }`}
          >
            {isDeploying ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Deploying...
              </>
            ) : (
              <>
                <ArrowUpRight className="w-4 h-4" />
                {!canDeploy || !isValidDomain(selectedDomain)
                  ? "Configure Domain First"
                  : "Deploy"}
              </>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {files.map((file) => (
          <div
            key={file.name}
            className="flex items-center justify-between bg-black/20 border border-white/5 rounded-lg p-3"
          >
            <div className="flex items-center gap-3 flex-1">
              {getFileIcon(file.name)}
              <span className="text-sm truncate">{file.name}</span>
              <span className="text-xs text-gray-400">
                {(file.size / 1024).toFixed(2)} KB
              </span>
            </div>

            <div className="flex items-center gap-4">
              {uploadProgress[file.name] !== undefined &&
              uploadProgress[file.name] < 100 ? (
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[rgba(207,8,140,1)] transition-all duration-300"
                      style={{ width: `${uploadProgress[file.name]}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">
                    {uploadProgress[file.name]}%
                  </span>
                </div>
              ) : (
                <CheckCircle className="w-4 h-4 text-green-400" />
              )}

              <button
                onClick={() => handleRemoveFile(file)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {files.length === 0 && (
        <div className="text-center text-gray-400 py-6">
          No files uploaded yet
        </div>
      )}

      <div className="mt-4 text-sm text-gray-400">
        Total files: {files.length} • Total size:{" "}
        {(files.reduce((acc, file) => acc + file.size, 0) / 1024).toFixed(2)} KB
      </div>
    </div>
  );
};

const FileItem = ({ file, progress }) => (
  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
    <div className="flex items-center gap-3 flex-1">
      <File className="w-5 h-5 text-gray-400" />
      <div className="min-w-0 flex-1">
        <p className="font-medium truncate">{file.path || file.name}</p>
        <p className="text-sm text-gray-400">
          {file.size ? `${(file.size / 1024).toFixed(2)} KB` : ""}
          {file.error && (
            <span className="text-red-400 ml-2">{file.error}</span>
          )}
        </p>
      </div>
    </div>
    {progress !== undefined && progress < 100 ? (
      <div className="w-24">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[rgba(207,8,140,1)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    ) : (
      <StatusBadge status={file.status} />
    )}
  </div>
);

const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: { color: "text-yellow-400 bg-yellow-400/10", icon: Clock },
    uploading: { color: "text-blue-400 bg-blue-400/10", icon: RefreshCw },
    success: { color: "text-green-400 bg-green-400/10", icon: CheckCircle },
    error: { color: "text-red-400 bg-red-400/10", icon: XCircle },
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <span
      className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${config.color}`}
    >
      <Icon size={12} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
const LivePreview = ({ url, onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
    <div className="bg-black/90 border border-white/10 rounded-lg w-full max-w-6xl h-[80vh] flex flex-col">
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Monitor className="w-5 h-5" />
          <h3 className="font-medium">Live Preview</h3>
          <span className="text-sm text-gray-400">{url}</span>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <XCircle className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 p-4">
        {url ? (
          <iframe
            src={url}
            className="w-full h-full border border-white/10 rounded-lg"
            title="Live Preview"
            sandbox="allow-same-origin allow-scripts"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No preview available
          </div>
        )}
      </div>
    </div>
  </div>
);
const GitDeployment = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [githubUsername, setGithubUsername] = useState("");
  const [selectedRepo, setSelectedRepo] = useState("");
  const [branch, setBranch] = useState("main");

  const handleConnect = () => {
    setIsConnecting(true);
    // Here you would typically implement GitHub OAuth flow
    // For now, we'll just simulate it
    setTimeout(() => {
      toast.success("Successfully connected to GitHub");
      setIsConnecting(false);
    }, 2000);
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Connect GitHub Repository</h3>

      <div className="space-y-6">
        {/* GitHub Connection Button */}
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="w-full p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6"
              viewBox="0 0 98 96"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                fill="currentColor"
              />
            </svg>
            <span>
              {isConnecting ? "Connecting..." : "Connect with GitHub"}
            </span>
          </div>
          <ChevronRight size={18} />
        </button>

        {/* Repository Configuration */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Repository</label>
            <input
              type="text"
              value={selectedRepo}
              onChange={(e) => setSelectedRepo(e.target.value)}
              placeholder="username/repository"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Branch</label>
            <input
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="main"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2"
            />
          </div>

          <div className="bg-black/50 rounded-lg p-4">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Build Configuration
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Zap className="w-4 h-4" />
                Auto-deploy enabled
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <RefreshCw className="w-4 h-4" />
                Build on push to main branch
              </div>
            </div>
          </div>
        </div>

        {/* Deploy Button */}
        <button
          className="w-full px-4 py-2 bg-[rgba(207,8,140,1)] hover:bg-[rgba(207,8,140,0.8)] rounded-lg transition-colors flex items-center justify-center gap-2"
          disabled={!selectedRepo || isConnecting}
        >
          <Cloud className="w-4 h-4" />
          Deploy from GitHub
        </button>
      </div>
    </div>
  );
};

const ContainerDeployment = () => (
  <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
    <h3 className="text-lg font-medium mb-4">Container Deployment</h3>
    <div className="space-y-4">
      <div className="bg-black/50 rounded-lg p-4">
        <p className="text-sm font-mono mb-2">Pull and run your container:</p>
        <div className="bg-black rounded-lg p-3 flex justify-between items-center">
          <code className="text-sm text-gray-300">
            docker pull yourimage:tag && docker run -p 80:80 yourimage:tag
          </code>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border border-white/10 rounded-lg">
          <Server className="w-6 h-6 mb-2" />
          <h4 className="font-medium mb-1">Registry Settings</h4>
          <p className="text-sm text-gray-400">
            Configure container registry credentials
          </p>
        </div>
        <div className="p-4 border border-white/10 rounded-lg">
          <Settings className="w-6 h-6 mb-2" />
          <h4 className="font-medium mb-1">Container Config</h4>
          <p className="text-sm text-gray-400">
            Set environment variables and ports
          </p>
        </div>
      </div>
    </div>
  </div>
);
const DeploymentConfig = ({ selectedDomain, setSelectedDomain }) => {
  const [subdomain, setSubdomain] = useState("");
  const baseDomain = "neoncloud.io";

  // Handle subdomain input
  const handleSubdomainChange = (e) => {
    const value = e.target.value.toLowerCase()
      .replace(/[^a-z0-9-]/g, '') // Only allow lowercase letters, numbers, and hyphens
      .replace(/^-+|-+$/g, ''); // Remove hyphens from start and end
    
    setSubdomain(value);
    setSelectedDomain(value ? `${value}.${baseDomain}` : "");
  };

  // Validate subdomain format
  const isValidSubdomain = (subdomain) => {
    const subdomainRegex = /^[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/;
    return subdomainRegex.test(subdomain);
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Deployment Configuration</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-2">
              Subdomain
            </label>
            <div className="relative">
              <input
                type="text"
                value={subdomain}
                onChange={handleSubdomainChange}
                placeholder="your-site"
                className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-400">.{baseDomain}</span>
              </div>
            </div>
            {subdomain && !isValidSubdomain(subdomain) && (
              <p className="text-red-400 text-sm mt-1">
                Subdomain can only contain lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen
              </p>
            )}
            {subdomain && isValidSubdomain(subdomain) && (
              <p className="text-green-400 text-sm mt-1">
                Your site will be available at: {subdomain}.{baseDomain}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Environment
            </label>
            <select className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2">
              <option>Production</option>
              <option>Staging</option>
              <option>Development</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Build Command
          </label>
          <span>hhhh</span>
          <input
            type="text"
            placeholder="npm run build"
            className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2"
          />
        </div>
      </div>
    </div>
  );
};


const HostingPlans = ({ selectedPlan, setSelectedPlan }) => (
  <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
    <h3 className="text-lg font-medium mb-4">Hosting Plans</h3>
    <div className="space-y-3">
      {[
        {
          name: "Starter",
          price: "Free",
          features: ["1GB Storage", "10GB Bandwidth", "2 Deployments"],
        },
        {
          name: "Pro",
          price: "$10/mo",
          features: [
            "10GB Storage",
            "100GB Bandwidth",
            "Unlimited Deployments",
          ],
        },
        {
          name: "Business",
          price: "$29/mo",
          features: ["50GB Storage", "500GB Bandwidth", "Priority Support"],
        },
      ].map((plan) => (
        <div
          key={plan.name}
          className={`p-4 border rounded-lg cursor-pointer transition-all ${
            selectedPlan === plan.name
              ? "border-[rgba(207,8,140,1)] bg-[rgba(207,8,140,0.1)]"
              : "border-white/10 hover:border-white/20"
          }`}
          onClick={() => setSelectedPlan(plan.name)}
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">{plan.name}</h4>
            <span className="text-[rgba(207,8,140,1)]">{plan.price}</span>
          </div>
          <ul className="text-sm text-gray-400">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

const ResourceUsage = () => (
  <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
    <h3 className="text-lg font-medium mb-4">Resource Usage</h3>
    <div className="space-y-4">
      <ResourceBar
        icon={HardDrive}
        label="Storage"
        used={2.5}
        total={10}
        unit="GB"
      />
      <ResourceBar
        icon={Network}
        label="Bandwidth"
        used={45}
        total={100}
        unit="GB"
      />
      <ResourceBar
        icon={Cpu}
        label="CPU Usage"
        used={35}
        total={100}
        unit="%"
      />
    </div>
  </div>
);

const ResourceBar = ({ icon: Icon, label, used, total, unit }) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-gray-400" />
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-sm text-gray-400">
        {used} / {total} {unit}
      </span>
    </div>
    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
      <div
        className="h-full bg-[rgba(207,8,140,1)] transition-all"
        style={{ width: `${(used / total) * 100}%` }}
      />
    </div>
  </div>
);

const QuickActions = () => (
  <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
    <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { icon: RefreshCw, label: "Redeploy" },
        { icon: Shield, label: "SSL Settings" },
        { icon: Database, label: "Backups" },
        { icon: Settings, label: "Configure" },
      ].map(({ icon: Icon, label }) => (
        <button
          key={label}
          className="p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-center"
        >
          <Icon className="w-6 h-6 mx-auto mb-2" />
          <span className="text-sm">{label}</span>
        </button>
      ))}
    </div>
  </div>
);

const DeploymentGuide = () => (
  <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
    <h3 className="text-lg font-medium mb-4">Deployment Guide</h3>
    <div className="space-y-3">
      {[
        {
          title: "Prepare Your Files",
          description:
            "Ensure all your static files are in the correct directory",
        },
        {
          title: "Configure Build Settings",
          description: "Set up your build command and output directory",
        },
        {
          title: "Deploy Your Site",
          description: "Upload files or connect your Git repository",
        },
      ].map((step, index) => (
        <div
          key={step.title}
          className="flex items-start gap-4 p-4 border border-white/10 rounded-lg"
        >
          <div className="w-6 h-6 rounded-full bg-[rgba(207,8,140,1)] flex items-center justify-center flex-shrink-0">
            {index + 1}
          </div>
          <div>
            <h4 className="font-medium mb-1">{step.title}</h4>
            <p className="text-sm text-gray-400">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
const DeploymentStatus = ({ status, logs = [] }) => {
  const logsRef = useRef(null);

  // Auto-scroll to bottom when new logs are added
  useEffect(() => {
    if (logsRef.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
    }
  }, [logs]);

  const statusConfig = {
    pending: {
      icon: Clock,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      text: "Deployment Pending",
    },
    deploying: {
      icon: RefreshCw,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      text: "Deploying...",
    },
    success: {
      icon: CheckCircle,
      color: "text-green-400",
      bg: "bg-green-400/10",
      text: "Deployment Successful",
    },
    error: {
      icon: AlertTriangle,
      color: "text-red-400",
      bg: "bg-red-400/10",
      text: "Deployment Failed",
    },
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Deployment Status</h3>
      <div
        className={`${config.bg} ${config.color} rounded-lg p-4 flex items-center gap-3 mb-4`}
      >
        <Icon className="w-5 h-5" />
        <span>{config.text}</span>
      </div>

      {/* Deployment Logs Section */}
      {logs.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Deployment Logs</h4>
          <div
            ref={logsRef}
            className="bg-black/50 rounded-lg p-4 h-48 overflow-y-auto font-mono text-sm"
          >
            {logs.map((log, index) => (
              <div key={index} className="flex items-start gap-2 mb-2">
                <span className="text-gray-400">
                  [{new Date(log.timestamp).toLocaleTimeString()}]
                </span>
                <span className="text-gray-200">{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WebHostingContent;
