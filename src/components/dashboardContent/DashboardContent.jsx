'use client';
import React, { useState } from "react";
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

const DashboardContent = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("24h");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold mb-1">
            Nur's Dashboard
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

      <ServiceStatus />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Cloud className="w-5 h-5 text-blue-400" />}
          title="Hosting Space"
          value="45.2 GB"
          trend="72%"
          trendDuration="of 100 GB"
          trendUp={true}
          details={[
            { label: "Files", value: "1,234" },
            { label: "Databases", value: "3" },
          ]}
        />
        <StatCard
          icon={<Globe className="w-5 h-5 text-purple-400" />}
          title="Domains"
          value="2"
          trend="Active"
          trendDuration="All domains healthy"
          trendUp={true}
          details={[
            { label: "Primary", value: "1" },
            { label: "Addon", value: "1" },
          ]}
        />
        <StatCard
          icon={<Activity className="w-5 h-5 text-green-400" />}
          title="Website Traffic"
          value="1.2K"
          trend="+15%"
          trendDuration="vs last month"
          trendUp={true}
          details={[
            { label: "Unique Visitors", value: "856" },
            { label: "Avg. Duration", value: "2m 34s" },
          ]}
        />
        <StatCard
          icon={<HardDrive className="w-5 h-5 text-yellow-400" />}
          title="Bandwidth"
          value="45.6 GB"
          trend="30%"
          trendDuration="of 150 GB"
          trendUp={true}
          details={[
            { label: "Download", value: "38.2 GB" },
            { label: "Upload", value: "7.4 GB" },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <WebsiteStatus />
          <RecentActivities />
        </div>
        <div className="space-y-6">
          <DomainStatus />
          <QuickActions />
          <UpcomingRenewals />
        </div>
      </div>
    </div>
  );
};

const ServiceStatus = () => (
  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center gap-3">
    <AlertCircle className="w-5 h-5 text-green-500" />
    <div className="flex-1">
      <h3 className="text-green-500 font-medium">All Services Operational</h3>
      <p className="text-green-500/80 text-sm">
        Your websites and services are running smoothly
      </p>
    </div>
    <button className="px-3 py-1 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-500 text-sm transition-colors">
      View Status
    </button>
  </div>
);

const StatCard = ({ icon, title, value, trend, trendDuration, trendUp, details }) => (
  <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
    <div className="flex items-start justify-between mb-4">
      <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
      <div className={`flex items-center gap-1 text-sm ${
        trendUp ? "text-green-400" : "text-red-400"
      }`}>
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

const WebsiteStatus = () => {
  const websites = [
    {
      domain: "welcome.neoncloud.io",
      status: "active",
      uptime: "99.9%",
      lastBackup: "2 hours ago",
      ssl: "Valid",
      traffic: "1.2k visitors today"
    },
    {
      domain: "blog.neoncloud.io",
      status: "active",
      uptime: "99.8%",
      lastBackup: "4 hours ago",
      ssl: "Valid",
      traffic: "856 visitors today"
    },
  ];

  return (
    <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">My Websites</h2>
        <button className="px-3 py-1 text-sm bg-[rgba(207,8,140,1)] hover:bg-[rgba(207,8,140,0.8)] rounded-lg transition-colors">
          Add New Project
        </button>
      </div>
      <div className="space-y-4">
        {websites.map((site, index) => (
          <div key={index} className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="font-medium">{site.domain}</h3>
                  <p className="text-sm text-gray-400">{site.traffic}</p>
                </div>
              </div>
              <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                {site.status}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Uptime</p>
                <p>{site.uptime}</p>
              </div>
              <div>
                <p className="text-gray-400">Last Backup</p>
                <p>{site.lastBackup}</p>
              </div>
              <div>
                <p className="text-gray-400">SSL Certificate</p>
                <p>{site.ssl}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RecentActivities = () => {
  const activities = [
    {
      type: "backup",
      icon: <Clock className="w-5 h-5 text-blue-400" />,
      title: "Automatic Backup Completed",
      description: "mywebsite.com backup completed successfully",
      time: "2 hours ago"
    },
    {
      type: "security",
      icon: <Shield className="w-5 h-5 text-green-400" />,
      title: "SSL Certificate Renewed",
      description: "SSL certificate for blog.mywebsite.com renewed automatically",
      time: "5 hours ago"
    },
    {
      type: "traffic",
      icon: <Activity className="w-5 h-5 text-purple-400" />,
      title: "Traffic Spike Detected",
      description: "Unusual traffic increase on mywebsite.com",
      time: "12 hours ago"
    },
    {
      type: "update",
      icon: <RefreshCw className="w-5 h-5 text-yellow-400" />,
      title: "System Updates Completed",
      description: "All website components are up to date",
      time: "1 day ago"
    },
    {
      type: "domain",
      icon: <Globe className="w-5 h-5 text-pink-400" />,
      title: "Domain Settings Updated",
      description: "DNS settings changed for mywebsite.com",
      time: "2 days ago"
    }
  ];

  return (
    <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-4 p-3 bg-white/5 rounded-lg">
            <div className="p-2 bg-white/5 rounded-lg">
              {activity.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm">{activity.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DomainStatus = () => {
  const domains = [
    {
      domain: "mywebsite.com",
      expires: "2025-01-15",
      autoRenew: true,
    },
    {
      domain: "blog.mywebsite.com",
      expires: "2025-01-15",
      autoRenew: true,
    },
  ];

  return (
    <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Domain Status</h2>
      <div className="space-y-4">
        {domains.map((domain, index) => (
          <div key={index} className="p-3 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{domain.domain}</h4>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-sm text-green-400">Active</span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Expires: {new Date(domain.expires).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const QuickActions = () => {
  const actions = [
    { icon: <Link size={18} />, label: "File Manager", color: "text-blue-400" },
    { icon: <Shield size={18} />, label: "Security", color: "text-green-400" },
    { icon: <Settings size={18} />, label: "Settings", color: "text-purple-400" },
    { icon: <Clock size={18} />, label: "Backups", color: "text-yellow-400" },
  ];

  return (
    <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <div className={`${action.color}`}>{action.icon}</div>
            <span className="text-sm">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
const UpcomingRenewals = () => {
  const renewals = [
    {
      service: "Hosting Plan",
      expires: "2024-12-15",
      price: "$9.99",
      period: "month",
      autoRenew: true
    },
    {
      service: "Domain Name",
      expires: "2025-01-15",
      price: "$12.99",
      period: "year",
      autoRenew: true
    },
  ];

  return (
    <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Upcoming Renewals</h2>
      <div className="space-y-4">
        {renewals.map((renewal, index) => (
          <div key={index} className="p-3 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-medium">{renewal.service}</h4>
                <p className="text-sm text-gray-400">
                  Expires: {new Date(renewal.expires).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[rgba(207,8,140,1)] font-medium">
                  {renewal.price}/{renewal.period}
                </p>
                <p className="text-xs text-gray-400">
                  {renewal.autoRenew ? "Auto-renewal enabled" : "Auto-renewal disabled"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardContent;
