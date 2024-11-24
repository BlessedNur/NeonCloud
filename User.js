
const mongoose = require('mongoose');

// Sub-schemas
const sslCertificateSchema = new mongoose.Schema({
  active: { type: Boolean, default: false },
  provider: { type: String, default: "Let's Encrypt" },
  type: { type: String, enum: ['Standard', 'Wildcard'], default: 'Standard' },
  expiryDate: { type: Date },
  lastRenewalDate: { type: Date }
});

const dnsRecordSchema = new mongoose.Schema({
  type: { type: String, required: true },
  value: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

const domainSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['active', 'pending', 'error'], default: 'pending' },
  registrationDate: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true },
  autoRenew: { type: Boolean, default: true },
  ssl: sslCertificateSchema,
  dns: {
    records: [dnsRecordSchema]
  },
  traffic: {
    monthly: { type: Number, default: 0 },
    bandwidth: { type: String },
    uniqueVisitors: { type: Number, default: 0 },
    avgDuration: { type: String }
  }
});

const websiteSchema = new mongoose.Schema({
  domain: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive', 'maintenance'], default: 'active' },
  uptime: { type: Number, default: 100 },
  lastBackup: { type: Date },
  ssl: { type: String, enum: ['Valid', 'Invalid', 'Expired'], default: 'Valid' },
  traffic: {
    daily: { type: Number, default: 0 },
    monthly: { type: Number, default: 0 }
  }
});

const activityLogSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['backup', 'security', 'traffic', 'update', 'domain'], 
    required: true 
  },
  title: { type: String, required: true },
  description: { type: String },
  timestamp: { type: Date, default: Date.now }
});

const subscriptionSchema = new mongoose.Schema({
  plan: {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    period: { type: String, enum: ['month', 'year'], required: true },
    features: [String]
  },
  status: { type: String, enum: ['active', 'inactive', 'pending'], default: 'active' },
  startDate: { type: Date },
  expiryDate: { type: Date },
  autoRenew: { type: Boolean, default: true }
});

// Main User Schema
const userSchema = new mongoose.Schema({
  // Basic Information
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  
  // Resource Usage
  resources: {
    hosting: {
      totalSpace: { type: Number, required: true }, // in GB
      usedSpace: { type: Number, default: 0 },
      numberOfFiles: { type: Number, default: 0 },
      numberOfDatabases: { type: Number, default: 0 }
    },
    bandwidth: {
      total: { type: Number, required: true }, // in GB
      used: { type: Number, default: 0 },
      download: { type: Number, default: 0 },
      upload: { type: Number, default: 0 }
    }
  },

  // Domains and Websites
  domains: [domainSchema],
  websites: [websiteSchema],

  // Activity Logs
  activityLogs: [activityLogSchema],

  // Subscription and Billing
  subscription: subscriptionSchema,

  // Settings and Preferences
  settings: {
    notifications: {
      email: { type: Boolean, default: true },
      backup: { type: Boolean, default: true },
      security: { type: Boolean, default: true }
    },
    backupPreferences: {
      frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'daily' },
      retention: { type: Number, default: 30 } // days
    },
    theme: { type: String, default: 'dark' }
  }
}, {
  timestamps: true
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ 'domains.name': 1 });
userSchema.index({ 'activityLogs.timestamp': -1 });

// Export the model
module.exports = mongoose.model('User', userSchema);

