export const STATUSES = {
  PENDING: "pending",
  ACTIVE: "active",
  BLOCKED: "blocked",
  VERIFIED: "verified",
  UNVERIFIED: "unverified",
  FAILED: "failed",
  SUCCESS: "success",
} as const;

export type StatusType = (typeof STATUSES)[keyof typeof STATUSES];
