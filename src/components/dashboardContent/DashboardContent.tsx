"use client";
import React, { useEffect, useState } from "react";
import {
  Globe,
  Cloud,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  RefreshCw,
  Link,
  Clock,
  Settings,
  HardDrive,
  Activity,
  Shield,
} from "lucide-react";
import { toast } from "sonner";
import { useCloudContext } from "../../context/Context";

// Add this at the top of the file, after imports
const useDeploymentData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/deployments");
      const result = await response.json();

      if (result.success) {
        setData(result.data);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setError(error.message);
      toast.error("Failed to fetch deployment data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error, refetch: fetchData };
};

const DashboardContent = () => {
  const { currentUser, choosenPlan } = useCloudContext();
  const [selectedPeriod, setSelectedPeriod] = useState("24h");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data, isLoading, refetch } = useDeploymentData();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  // Calculate statistics
  const stats = {
    totalDomains: data.length,
    activeDomains: data.filter((d) => d.status === "completed").length,
    failedDomains: data.filter((d) => d.status === "failed").length,
    pendingDomains: data.filter((d) => d.status === "in_progress").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold mb-1">
            {currentUser?.email.split("@")[0]}&apos;s Dashboard
          </h1>
          <p className="text-gray-400 text-sm">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgba(207,8,140,1)]"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button
            onClick={handleRefresh}
            className={`p-2 bg-black/30 border border-white/10 rounded-lg hover:bg-white/5 transition-colors ${
              isRefreshing ? "animate-spin" : ""
            }`}
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      <ServiceStatus stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <WebsiteStatus deployments={data} isLoading={isLoading} />
          <RecentActivities />
        </div>
        <div className="space-y-6">
          <DomainStatus />
        </div>
      </div>
    </div>
  );
};
const ServiceStatus = ({ stats }) => (
  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center gap-3">
    <AlertCircle className="w-5 h-5 text-green-500" />
    <div className="flex-1">
      <h3 className="text-green-500 font-medium">Service Status Overview</h3>
      <p className="text-green-500/80 text-sm">
        {stats.activeDomains} active, {stats.pendingDomains} pending,{" "}
        {stats.failedDomains} failed deployments
      </p>
    </div>
    <button className="px-3 py-1 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-500 text-sm transition-colors">
      View Status
    </button>
  </div>
);

const StatCard = ({
  icon,
  title,
  value,
  trend,
  trendDuration,
  trendUp,
  details,
}) => (
  <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
    <div className="flex items-start justify-between mb-4">
      <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
      <div
        className={`flex items-center gap-1 text-sm ${
          trendUp ? "text-green-400" : "text-red-400"
        }`}
      >
        {trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        {trend}
      </div>
    </div>
    <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-semibold mb-2">{value}</p>
    <p className="text-xs text-gray-500 mb-3">{trendDuration}</p>
    <div className="pt-3 border-t border-white/5 space-y-2">
      {details.map((detail, index) => (
        <div key={index} className="flex justify-between text-sm">
          <span className="text-gray-400">{detail.label}</span>
          <span className="text-white">{detail.value}</span>
        </div>
      ))}
    </div>
  </div>
);
const WebsiteStatus = ({ deployments, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
        <div className="flex items-center justify-center p-4">
          <RefreshCw className="w-6 h-6 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">My Websites</h2>
        <button className="px-3 py-1 text-sm bg-[rgba(207,8,140,1)] hover:bg-[rgba(207,8,140,0.8)] rounded-lg transition-colors">
          Add New Project
        </button>
      </div>
      <div className="space-y-4">
        {deployments.map((site) => (
          <div key={site._id} className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="font-medium">{site.customDomain}</h3>
                  <p className="text-sm text-gray-400">
                    Bucket: {site.bucketName}
                  </p>
                </div>
              </div>
              <div
                className={`px-3 py-1 ${
                  site.status === "completed"
                    ? "bg-green-500/20 text-green-400"
                    : site.status === "failed"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-yellow-500/20 text-yellow-400"
                } rounded-full text-sm`}
              >
                {site.status}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Created</p>
                <p>{new Date(site.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-400">Status</p>
                <p>{site.status === "completed" ? "Active" : site.status}</p>
              </div>
              <div>
                <p className="text-gray-400">Domain Type</p>
                <p>
                  {site.customDomain.includes("neoncloudd.com")
                    ? "Subdomain"
                    : "Custom"}
                </p>
              </div>
            </div>
          </div>
        ))}
        {deployments.length === 0 && (
          <div className="text-center py-6 text-gray-400">
            No websites found
          </div>
        )}
      </div>
    </div>
  );
};

const RecentActivities = () => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/deployments");
        const data = await response.json();

        if (data.success) {
          setActivities(data.data);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
        toast.error("Failed to fetch activities");
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const getActivityIcon = (status) => {
    switch (status) {
      case "completed":
        return <Shield className="w-5 h-5 text-green-400" />;
      case "failed":
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getActivityTitle = (deployment) => {
    switch (deployment.status) {
      case "completed":
        return `Deployment Completed: ${deployment.customDomain}`;
      case "failed":
        return `Deployment Failed: ${deployment.customDomain}`;
      default:
        return `Deployment In Progress: ${deployment.customDomain}`;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <div className="flex items-center justify-center p-4">
          <RefreshCw className="w-6 h-6 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity._id}
            className="flex items-start gap-4 p-3 bg-white/5 rounded-lg"
          >
            <div className="p-2 bg-white/5 rounded-lg">
              {getActivityIcon(activity.status)}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm">
                {getActivityTitle(activity)}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Bucket: {activity.bucketName}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(activity.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
        {activities.length === 0 && (
          <div className="text-center py-6 text-gray-400">
            No recent activities
          </div>
        )}
      </div>
    </div>
  );
};
const DomainStatus = () => {
  const [domains, setDomains] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/deployments");
        const data = await response.json();

        if (data.success) {
          setDomains(data.data);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error("Error fetching domains:", error);
        toast.error("Failed to fetch domains");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDomains();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Domain Status</h2>
        <div className="flex items-center justify-center p-4">
          <RefreshCw className="w-6 h-6 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Domain Status</h2>
      <div className="space-y-4">
        {domains.map((domain) => (
          <div key={domain._id} className="p-3 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{domain.customDomain}</h4>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    domain.status === "completed"
                      ? "bg-green-400"
                      : domain.status === "failed"
                      ? "bg-red-400"
                      : "bg-yellow-400"
                  }`}
                ></span>
                <span
                  className={`text-sm ${
                    domain.status === "completed"
                      ? "text-green-400"
                      : domain.status === "failed"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {domain.status === "completed"
                    ? "Active"
                    : domain.status === "failed"
                    ? "Failed"
                    : "Pending"}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Created: {new Date(domain.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
        {domains.length === 0 && (
          <div className="text-center py-6 text-gray-400">No domains found</div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
