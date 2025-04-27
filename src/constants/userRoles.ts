export const USER_ROLES = {
  ADMIN: "admin",
  OWNER: "owner",
  MANAGER: "manager",
  USER: "user",
};

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
