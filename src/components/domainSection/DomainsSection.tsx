"use client";
import React, { useState, useEffect } from "react";
import {
  Globe,
  Search,
  Filter,
  Plus,
  Settings,
  MoreVertical,
  ChevronDown,
  Shield,
  RefreshCw,
  ExternalLink,
  Lock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpRight,
  BarChart2,
  Trash2,
  Copy,
  Edit,
} from "lucide-react";

const BASE_DOMAIN = "neoncloud.io";
const RESERVED_SUBDOMAINS = [
  "www",
  "api",
  "admin",
  "mail",
  "smtp",
  "pop",
  "imap",
  "ftp",
  "test",
];

const DomainsContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [domains, setDomains] = useState([]);
  const [domainToDelete, setDomainToDelete] = useState(null);

  // Sample domains data with more fields
  const sampleDomains = [
    {
      id: 1,
      name: `app.${BASE_DOMAIN}`,
      status: "active",
      registrationDate: "2024-01-15",
      ssl: {
        active: true,
        expiryDate: "2024-04-15",
        provider: "Let's Encrypt",
        type: "Wildcard",
      },
      dns: {
        records: [
          { type: "A", value: "192.168.1.1" },
          { type: "CNAME", value: "cdn.example.com" },
        ],
      },
      traffic: {
        monthly: 15000,
        bandwidth: "1.2TB",
      },
    },
    {
      id: 2,
      name: `dashboard.${BASE_DOMAIN}`,
      status: "pending",
      registrationDate: "2024-01-16",
      ssl: {
        active: false,
        expiryDate: "2024-04-16",
        provider: "None",
        type: "None",
      },
      dns: {
        records: [{ type: "A", value: "192.168.1.2" }],
      },
      traffic: {
        monthly: 5000,
        bandwidth: "500GB",
      },
    },
    {
      id: 3,
      name: `api.${BASE_DOMAIN}`,
      status: "error",
      registrationDate: "2024-01-17",
      ssl: {
        active: true,
        expiryDate: "2024-03-17",
        provider: "Let's Encrypt",
        type: "Standard",
      },
      dns: {
        records: [{ type: "A", value: "192.168.1.3" }],
      },
      traffic: {
        monthly: 25000,
        bandwidth: "2.5TB",
      },
    },
  ];

  useEffect(() => {
    setDomains(sampleDomains);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDomains(sampleDomains);
      setIsLoading(false);
    }, 1500);
  };

  const handleDeleteDomain = (domain) => {
    setDomainToDelete(domain);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setDomains(domains.filter((d) => d.id !== domainToDelete.id));
    setIsDeleteModalOpen(false);
    setDomainToDelete(null);
  };

  const handleCopyDomain = (domain) => {
    navigator.clipboard.writeText(domain.name);
    // You could add a toast notification here
    alert(`Copied ${domain.name} to clipboard`);
  };

  const handleStatusFilter = (status) => {
    setFilterStatus(status);
    setShowStatusDropdown(false);
  };

  const handleSort = (sortOption) => {
    setSortBy(sortOption);
    setShowSortDropdown(false);
  };

  // Dropdown menu component
  const DropdownMenu = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="absolute top-full mt-1 right-0 w-48 bg-black/30 backdrop-blur-md border border-white/10 rounded-lg border border-white/10 rounded-lg shadow-lg z-50">
        {children}
      </div>
    );
  };

  const DomainActions = ({ domain }) => {
    const [showActions, setShowActions] = useState(false);

    return (
      <div className="relative flex items-center ">
        <button
          title="Visit Site"
          onClick={() => window.open(`https://${domain.name}`, "_blank")}
          className="w-full px-4 py-2 text-left hover:bg-white/5 flex items-center gap-2"
        >
          <ExternalLink size={16} />
        </button>
        <button
          onClick={() => setShowActions(!showActions)}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          <MoreVertical size={16} />
        </button>
        <DropdownMenu
          isOpen={showActions}
          onClose={() => setShowActions(false)}
        >
          <div className="py-1">
            <button
              onClick={() => handleCopyDomain(domain)}
              className="w-full px-4 py-2 text-left hover:bg-white/5 flex items-center gap-2"
            >
              <Copy size={16} />
              Copy Domain
            </button>
            {/* 
            <button
              onClick={() => setIsSettingsModalOpen(true)}
              className="w-full px-4 py-2 text-left hover:bg-white/5 flex items-center gap-2"
            >
              <Settings size={16} />
              Settings
            </button> */}
            <button
              onClick={() => handleDeleteDomain(domain)}
              className="w-full px-4 py-2 text-left hover:bg-white/5 flex items-center gap-2 text-red-400"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </DropdownMenu>
      </div>
    );
  };

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      active: { color: "text-green-400", icon: CheckCircle },
      pending: { color: "text-yellow-400", icon: Clock },
      error: { color: "text-red-400", icon: XCircle },
    };

    const Icon = statusConfig[status]?.icon || AlertCircle;
    return (
      <span
        className={`flex items-center gap-1.5 ${
          statusConfig[status]?.color || "text-gray-400"
        }`}
      >
        <Icon size={14} />
        <span className="capitalize">{status}</span>
      </span>
    );
  };
  const DomainCard = ({ domain, isSelected, onClick }) => {
    const subdomain = domain.name.replace(`.${BASE_DOMAIN}`, "");
  
    return (
      <div
        onClick={onClick}
        className={`p-4 bg-black/20 backdrop-blur-sm border ${
          isSelected ? "border-[rgba(207,8,140,1)]" : "border-white/10"
        } rounded-lg hover:border-white/20 transition-all cursor-pointer`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <StatusBadge status={domain.status} />
            <h3 className="font-medium">
              <span className="text-[rgba(207,8,140,1)]">{subdomain}</span>
              <span className="text-gray-400">.{BASE_DOMAIN}</span>
            </h3>
          </div>
          <div className="flex items-center gap-2 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(`https://${domain.name}`, "_blank");
              }}
              className="p-2 hover:bg-white/10 rounded-lg"
              title="Visit Site"
            >
              <ExternalLink size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopyDomain(domain);
              }}
              className="p-2 hover:bg-white/10 rounded-lg"
              title="Copy Domain"
            >
              <Copy size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteDomain(domain);
              }}
              className="p-2 hover:bg-white/10 rounded-lg text-red-400"
              title="Delete Domain"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        
        <div className="mt-3 flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Shield size={14} className={domain.ssl.active ? "text-green-400" : "text-red-400"} />
            <span>{domain.ssl.active ? "SSL Active" : "SSL Inactive"}</span>
          </div>
          <div>Created {new Date(domain.registrationDate).toLocaleDateString()}</div>
        </div>
      </div>
    );
  };

  // Filter and sort domains
  const filteredAndSortedDomains = domains
    .filter((domain) => {
      const matchesSearch = domain.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || domain.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "status":
          return a.status.localeCompare(b.status);
        case "date":
          return new Date(b.registrationDate) - new Date(a.registrationDate);
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Subdomain Management</h1>
          <p className="text-gray-400 text-sm">
            Managing {domains.length} subdomains on {BASE_DOMAIN}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            // onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-[rgba(207,8,140,1)] hover:bg-[rgba(207,8,140,0.8)] rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus size={16} />
            <span>New Project</span>
          </button>
          <button
            onClick={handleRefresh}
            className={`p-2 bg-black/30 border border-white/10 rounded-lg hover:bg-white/5 transition-colors ${
              isLoading ? "animate-spin" : ""
            }`}
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search domains..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2"
            />
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            className="w-full flex items-center justify-between gap-2 bg-black/30 border border-white/10 rounded-lg px-4 py-2"
          >
            <div className="flex items-center gap-2">
              <Filter size={18} />
              <span>
                {filterStatus === "all" ? "All Status" : filterStatus}
              </span>
            </div>
            <ChevronDown size={18} />
          </button>
          <DropdownMenu
            isOpen={showStatusDropdown}
            onClose={() => setShowStatusDropdown(false)}
          >
            <div className="py-1">
              {["all", "active", "pending", "error"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusFilter(status)}
                  className="w-full px-4 py-2 text-left hover:bg-white/5 flex items-center gap-2"
                >
                  <StatusBadge status={status === "all" ? "active" : status} />
                  <span className="capitalize">{status}</span>
                </button>
              ))}
            </div>
          </DropdownMenu>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="w-full flex items-center justify-between gap-2 bg-black/30 border border-white/10 rounded-lg px-4 py-2"
          >
            <div className="flex items-center gap-2">
              <BarChart2 size={18} />
              <span>Sort by: {sortBy}</span>
            </div>
            <ChevronDown size={18} />
          </button>
          <DropdownMenu
            isOpen={showSortDropdown}
            onClose={() => setShowSortDropdown(false)}
          >
            <div className="py-1">
              {[
                { value: "name", label: "Name" },
                { value: "status", label: "Status" },
                { value: "date", label: "Date Created" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSort(option.value)}
                  className="w-full px-4 py-2 text-left hover:bg-white/5 flex items-center gap-2"
                >
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </DropdownMenu>
        </div>
      </div>

      {/* Domains Grid */}
      {/* Domains Grid with Details Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Domains List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredAndSortedDomains.map((domain) => (
            <DomainCard
              key={domain.id}
              domain={domain}
              isSelected={selectedDomain?.id === domain.id}
              onClick={() => setSelectedDomain(domain)}
            />
          ))}
          {filteredAndSortedDomains.length === 0 && (
            <div className="text-center py-12 bg-black/30 border border-white/10 rounded-lg">
              <div className="flex justify-center mb-4">
                <Globe className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No domains found</h3>
              <p className="text-gray-400">
                {searchTerm
                  ? `No domains match your search "${searchTerm}"`
                  : "Get started by creating your first subdomain"}
              </p>
            </div>
          )}
        </div>

        {/* Details Panel */}
        <div className="lg:col-span-1">
          {selectedDomain ? (
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 sticky top-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">
                    {selectedDomain.name}
                  </h2>
                  <p className="text-sm text-gray-400">Domain Details</p>
                </div>
                <StatusBadge status={selectedDomain.status} />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-black/30 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Monthly Traffic</p>
                  <p className="text-xl font-medium">
                    {selectedDomain.traffic.monthly.toLocaleString()}
                  </p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Bandwidth</p>
                  <p className="text-xl font-medium">
                    {selectedDomain.traffic.bandwidth}
                  </p>
                </div>
              </div>

              {/* SSL Information */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">SSL Certificate</h3>
                <div className="bg-black/30 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span
                      className={
                        selectedDomain.ssl.active
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {selectedDomain.ssl.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Provider</span>
                    <span>{selectedDomain.ssl.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Expiry</span>
                    <span>
                      {new Date(
                        selectedDomain.ssl.expiryDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* DNS Records */}
              {/* <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">DNS Records</h3>
          <div className="bg-black/30 p-4 rounded-lg space-y-3">
            {selectedDomain.dns.records.map((record, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <span className="text-sm font-medium">{record.type}</span>
                  <span className="text-gray-400 ml-2">{record.value}</span>
                </div>
                <button className="text-[rgba(207,8,140,1)] hover:underline text-sm">
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div> */}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsSettingsModalOpen(true)}
                  className="flex-1 px-4 py-2 bg-[rgba(207,8,140,1)] hover:bg-[rgba(207,8,140,0.8)] rounded-lg transition-colors"
                >
                  Manage Domain
                </button>
                <button
                  onClick={() => handleDeleteDomain(selectedDomain)}
                  className="px-4 py-2 border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-center">
              <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Select a Domain</h3>
              <p className="text-gray-400">
                Click on a domain to view its details
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create Subdomain Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/5 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black/30 backdrop-blur-md border border-white/10  rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New Subdomain</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Handle form submission
                setIsCreateModalOpen(false);
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subdomain Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
                      placeholder="your-subdomain"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      .{BASE_DOMAIN}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    SSL Certificate
                  </label>
                  <select className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2">
                    <option value="standard">Standard SSL</option>
                    <option value="wildcard">Wildcard SSL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    DNS Settings
                  </label>
                  <div className="bg-black/30 border border-white/10 rounded-lg p-3">
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Type"
                        className="bg-black/30 border border-white/10 rounded px-2 py-1"
                      />
                      <input
                        type="text"
                        placeholder="Name"
                        className="bg-black/30 border border-white/10 rounded px-2 py-1"
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        className="bg-black/30 border border-white/10 rounded px-2 py-1"
                      />
                    </div>
                    <button
                      type="button"
                      className="text-sm text-[rgba(207,8,140,1)] hover:underline"
                    >
                      + Add DNS Record
                    </button>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[rgba(207,8,140,1)] rounded-lg hover:bg-[rgba(207,8,140,0.8)]"
                  >
                    Create Subdomain
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 top-0 left-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="  backdrop-blur-sm border border-white/10 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Delete Subdomain</h2>
            <p className="text-gray-400 mb-4">
              Are you sure you want to delete{" "}
              <span className="text-white">{domainToDelete?.name}</span>? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {isSettingsModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black/5 backdrop-blur-md border border-white/10 rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Domain Settings</h2>
              <button
                onClick={() => setIsSettingsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <XCircle size={24} />
              </button>
            </div>
            <div className="space-y-6">
              {/* SSL Settings */}
              <div className="bg-black/30 border border-white/10 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">SSL Configuration</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SSL Status</p>
                      <p className="text-sm text-gray-400">
                        Manage your SSL certificate
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-[rgba(207,8,140,1)] rounded-lg hover:bg-[rgba(207,8,140,0.8)]">
                      Manage SSL
                    </button>
                  </div>
                </div>
              </div>

              {/* DNS Settings */}
              <div className="bg-black/30 border border-white/10 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">DNS Records</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4 font-medium text-sm text-gray-400">
                    <div>Type</div>
                    <div>Name</div>
                    <div>Value</div>
                    <div>Actions</div>
                  </div>
                  {selectedDomain?.dns?.records.map((record, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-4 gap-4 items-center"
                    >
                      <div>{record.type}</div>
                      <div>{record.name || "@"}</div>
                      <div className="truncate">{record.value}</div>
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-white/5 rounded">
                          <Edit size={16} />
                        </button>
                        <button className="p-1 hover:bg-white/5 rounded text-red-400">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="text-sm text-[rgba(207,8,140,1)] hover:underline">
                    + Add DNS Record
                  </button>
                </div>
              </div>

              {/* Traffic Analytics */}
              <div className="bg-black/30 border border-white/10 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">Traffic Analytics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Monthly Visitors</p>
                    <p className="text-2xl font-medium">
                      {selectedDomain?.traffic?.monthly.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Bandwidth Usage</p>
                    <p className="text-2xl font-medium">
                      {selectedDomain?.traffic?.bandwidth}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsSettingsModalOpen(false)}
                className="px-4 py-2 bg-[rgba(207,8,140,1)] rounded-lg hover:bg-[rgba(207,8,140,0.8)]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainsContent;
