export type Status = "online" | "offline" | "warning" | "active" | "inactive";

export type Camera = {
  id: string;
  name: string;
  location: string;
  ipAddress: string;
  status: "online" | "offline";
  resolution: string;
  storage: string;
  uptime: number;
  recording: boolean;
};

export type UserRole = "Super Admin" | "Admin" | "Operator" | "Viewer" | "Custom Role";

export type VmsUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "active" | "inactive";
  lastLogin: string;
};

export type Recording = {
  id: string;
  cameraName: string;
  startTime: string;
  endTime: string;
  duration: string;
  size: string;
  status: "ready" | "processing" | "archived";
};

export type EventItem = {
  id: string;
  type: string;
  camera: string;
  severity: "low" | "medium" | "high" | "critical";
  timestamp: string;
  status: "open" | "acknowledged" | "resolved";
};

export type AuditLog = {
  id: string;
  user: string;
  action: string;
  module: string;
  timestamp: string;
  ipAddress: string;
};

export type ChartPoint = {
  name: string;
  value: number;
};

export type SiteHealth = {
  id: string;
  name: string;
  city: string;
  cameras: number;
  online: number;
  risk: "low" | "medium" | "high" | "critical";
  storageUsed: number;
  responseSla: string;
};

export type AiInsight = {
  id: string;
  title: string;
  summary: string;
  confidence: number;
  severity: "low" | "medium" | "high";
};
