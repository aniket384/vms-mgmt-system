import type { AiInsight, AuditLog, Camera, ChartPoint, EventItem, Recording, SiteHealth, VmsUser } from "@/types";

export const cameras: Camera[] = [
  { id: "CAM-001", name: "Main Gate ANPR", location: "North Entrance", ipAddress: "10.10.1.21", status: "online", resolution: "4K", storage: "2.4 TB", uptime: 99.8, recording: true },
  { id: "CAM-002", name: "Reception Dome", location: "Lobby", ipAddress: "10.10.1.22", status: "online", resolution: "1440p", storage: "860 GB", uptime: 98.9, recording: true },
  { id: "CAM-003", name: "Warehouse Aisle 4", location: "Warehouse", ipAddress: "10.10.1.23", status: "offline", resolution: "1080p", storage: "1.1 TB", uptime: 81.4, recording: false },
  { id: "CAM-004", name: "Parking East PTZ", location: "Parking", ipAddress: "10.10.1.24", status: "online", resolution: "4K", storage: "3.0 TB", uptime: 99.4, recording: true },
  { id: "CAM-005", name: "Server Room Thermal", location: "Data Center", ipAddress: "10.10.1.25", status: "online", resolution: "1080p", storage: "640 GB", uptime: 99.9, recording: true },
  { id: "CAM-006", name: "Loading Dock", location: "Dock 2", ipAddress: "10.10.1.26", status: "online", resolution: "1440p", storage: "1.8 TB", uptime: 97.2, recording: true },
  { id: "CAM-007", name: "Cafeteria Wide", location: "Level 2", ipAddress: "10.10.1.27", status: "offline", resolution: "1080p", storage: "420 GB", uptime: 76.1, recording: false },
  { id: "CAM-008", name: "Perimeter West", location: "Boundary Wall", ipAddress: "10.10.1.28", status: "online", resolution: "4K", storage: "2.9 TB", uptime: 99.1, recording: true },
];

export const users: VmsUser[] = [
  { id: "USR-001", name: "Aarav Sharma", email: "admin@vms.local", role: "Super Admin", status: "active", lastLogin: "Today, 09:40" },
  { id: "USR-002", name: "Maya Iyer", email: "operator@vms.local", role: "Operator", status: "active", lastLogin: "Today, 08:17" },
  { id: "USR-003", name: "Rohan Mehta", email: "viewer@vms.local", role: "Viewer", status: "active", lastLogin: "Yesterday, 18:22" },
  { id: "USR-004", name: "Neha Kapoor", email: "security.lead@vms.local", role: "Admin", status: "inactive", lastLogin: "Jun 14, 2026" },
];

export const recordings: Recording[] = [
  { id: "REC-90211", cameraName: "Main Gate ANPR", startTime: "2026-06-16 06:00", endTime: "2026-06-16 07:00", duration: "1h 00m", size: "3.2 GB", status: "ready" },
  { id: "REC-90212", cameraName: "Reception Dome", startTime: "2026-06-16 07:00", endTime: "2026-06-16 08:00", duration: "1h 00m", size: "1.4 GB", status: "ready" },
  { id: "REC-90213", cameraName: "Parking East PTZ", startTime: "2026-06-16 08:00", endTime: "2026-06-16 09:00", duration: "1h 00m", size: "3.6 GB", status: "processing" },
  { id: "REC-90214", cameraName: "Server Room Thermal", startTime: "2026-06-15 23:00", endTime: "2026-06-16 00:00", duration: "1h 00m", size: "980 MB", status: "archived" },
];

export const events: EventItem[] = [
  { id: "EVT-1184", type: "Motion Detection", camera: "Loading Dock", severity: "medium", timestamp: "2026-06-16 10:22", status: "open" },
  { id: "EVT-1185", type: "Camera Offline", camera: "Warehouse Aisle 4", severity: "critical", timestamp: "2026-06-16 09:58", status: "acknowledged" },
  { id: "EVT-1186", type: "Storage Warning", camera: "NVR Cluster 01", severity: "high", timestamp: "2026-06-16 09:20", status: "open" },
  { id: "EVT-1187", type: "Login Activity", camera: "Console", severity: "low", timestamp: "2026-06-16 08:55", status: "resolved" },
  { id: "EVT-1188", type: "Tamper Event", camera: "Perimeter West", severity: "high", timestamp: "2026-06-16 08:31", status: "open" },
];

export const auditLogs: AuditLog[] = [
  { id: "AUD-701", user: "Aarav Sharma", action: "Created camera", module: "Cameras", timestamp: "2026-06-16 10:08", ipAddress: "10.10.5.44" },
  { id: "AUD-702", user: "Maya Iyer", action: "Exported recording", module: "Recordings", timestamp: "2026-06-16 09:42", ipAddress: "10.10.5.61" },
  { id: "AUD-703", user: "Rohan Mehta", action: "Viewed playback", module: "Playback", timestamp: "2026-06-16 09:13", ipAddress: "10.10.5.82" },
  { id: "AUD-704", user: "Aarav Sharma", action: "Updated role", module: "Roles", timestamp: "2026-06-15 19:44", ipAddress: "10.10.5.44" },
];

export const cameraStatusData: ChartPoint[] = [
  { name: "Online", value: 6 },
  { name: "Offline", value: 2 },
];

export const recordingStats = [
  { name: "Mon", value: 118 },
  { name: "Tue", value: 142 },
  { name: "Wed", value: 131 },
  { name: "Thu", value: 168 },
  { name: "Fri", value: 176 },
  { name: "Sat", value: 121 },
  { name: "Sun", value: 104 },
];

export const storageUsage = [
  { name: "Video", value: 68 },
  { name: "Snapshots", value: 9 },
  { name: "Metadata", value: 5 },
  { name: "Free", value: 18 },
];

export const downloads = [
  { id: "DL-441", name: "Main Gate 06:00-07:00", progress: 100, status: "Completed" },
  { id: "DL-442", name: "Parking East Incident", progress: 62, status: "Downloading" },
  { id: "DL-443", name: "Warehouse Audit Clip", progress: 0, status: "Failed" },
];

export const sharedVideos = [
  { id: "SH-101", sharedBy: "Aarav Sharma", sharedWith: "investigator@partner.local", expiry: "2026-06-23", status: "Active" },
  { id: "SH-102", sharedBy: "Maya Iyer", sharedWith: "ops@vms.local", expiry: "2026-06-18", status: "Active" },
  { id: "SH-103", sharedBy: "Aarav Sharma", sharedWith: "legal@company.local", expiry: "Expired", status: "Disabled" },
];

export const notifications = [
  "Warehouse Aisle 4 is offline",
  "NVR Cluster 01 crossed 82% storage usage",
  "New shared video link expires in 48 hours",
  "Three motion events require acknowledgement",
];

export const siteHealth: SiteHealth[] = [
  { id: "SITE-01", name: "Corporate HQ", city: "Bengaluru", cameras: 42, online: 40, risk: "medium", storageUsed: 72, responseSla: "02m 14s" },
  { id: "SITE-02", name: "North Logistics Hub", city: "Delhi NCR", cameras: 64, online: 58, risk: "high", storageUsed: 86, responseSla: "04m 48s" },
  { id: "SITE-03", name: "West Data Center", city: "Pune", cameras: 28, online: 28, risk: "low", storageUsed: 61, responseSla: "01m 22s" },
  { id: "SITE-04", name: "Coastal Plant", city: "Chennai", cameras: 53, online: 50, risk: "medium", storageUsed: 79, responseSla: "03m 05s" },
];

export const aiInsights: AiInsight[] = [
  { id: "AI-01", title: "Repeated motion after-hours", summary: "Loading Dock has 3 motion events outside the expected delivery window.", confidence: 91, severity: "high" },
  { id: "AI-02", title: "Camera health degradation", summary: "Warehouse Aisle 4 shows recurring offline intervals over the last 24 hours.", confidence: 87, severity: "high" },
  { id: "AI-03", title: "Storage retention pressure", summary: "NVR Cluster 01 may breach 90% capacity within 36 hours at current recording rate.", confidence: 82, severity: "medium" },
];
