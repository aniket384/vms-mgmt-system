import {
  auditLogs,
  aiInsights,
  cameras,
  downloads,
  events,
  notifications,
  recordings,
  sharedVideos,
  siteHealth,
  users,
} from "@/mock-data/vms";

function clone<T>(data: T): T {
  return structuredClone(data);
}

export const vmsService = {
  getCameras: () => clone(cameras),
  getUsers: () => clone(users),
  getRecordings: () => clone(recordings),
  getEvents: () => clone(events),
  getAuditLogs: () => clone(auditLogs),
  getDownloads: () => clone(downloads),
  getSharedVideos: () => clone(sharedVideos),
  getNotifications: () => clone(notifications),
  getSiteHealth: () => clone(siteHealth),
  getAiInsights: () => clone(aiInsights),
};
