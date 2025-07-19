import { TeamMemberType } from "@/features/manager/types";

type ServerResponseSuccess<T> = {
  success: true;
  message: string;
  data: T;
};

type ServerResponseFailure = {
  success: false;
  message: string;
  status: number;
};

export type ServerResponseType<T> =
  | ServerResponseSuccess<T>
  | ServerResponseFailure;

export type OwnerLoginResponseType = {
  accessToken: string;
  data: {
    subscription: string;
    stripe_customer_id: string;
    _id: string;
    email: string;
  };
};

export type AddSpaceType = {
  _id: string;
  name: string;
  description: string;
  team: {
    members: string[];
  };
  createdBy: string;
  spaceOwner: string;
  owner: string;
  visibility: string;
  status: string;
  tags: string[];
  companyId: string;
  companyName: string;
  managers: string[];
  createdAt: string;
  updatedAt: string;
};

export type SpaceType = {
  _id: string;
  name: string;
  description: string;
  team: {
    members: TeamMemberType[];
  };
  createdBy: string;
  spaceOwner: string;
  owner: string;
  visibility: string;
  status: string;
  tags: string[];
  companyId: string;
  companyName: string;
  managers: {
    managerId: string;
    managerName?: string;
    managerImage?: string;
  }[];
  createdAt: string;
  updatedAt: string;
};

export type ManagerType = {
  _id: string;
  name: string;
  email: string;
  image?: string;
  spaces?: string[];
  ownerId: string;
  isBlocked?: boolean;
  createdAt?: any;
  updatedAt?: any;
  role: string;
  refreshToken?: string;
  companyId: string;
  bio?: string;
  companyName?: string;
};

export type Features = {
  managerCount: number;
  userCount: number;
  chat: boolean;
  meeting: boolean;
  spaces: number;
};

export interface SubscriptionType {
  _id: string;
  name: string;
  billingCycleType: string;
  isActive: boolean;
  yearlyAmount: number | string;
  monthlyAmount: number | string;
  stripe_product_id?: string;
  description: string;
  stripe_monthly_price_id?: string;
  stripe_yearly_price_id?: string;
  yearlyDiscountPercentage?: number;
  features: Features;
  userCount?: Number;
}

export type OwnerSubscriptionType = {
  name: string;
  status: string;
  billingCycle: string;
  stripe_subscription_id: string;
  subscription_id: string;
  next_invoice?: string;
  cancel_at?: string;
  canceled_at?: string;
  created: string;
  features: Features;
  amount: string;
  expires_at: string;
  invoice?: string;
  cancel_at_period_end?: boolean;
};

export type InvoiceType = {
  total: number;
  currency: string;
  hosted_invoice_url: string;
  invoice_pdf: string;
  customer_email: string;
  name: string;
  subscription_id: string;
  created: string;
  id: string;
};

export type CompanyType = {
  companyName: string;
  websiteURL: string;
  description: string;
  industry: string[];
  ownerId: string;
  _id: string;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  isAvailable?: boolean;
  isBlocked?: boolean;
  role?: string;
  managerId: string;
  refreshToken?: string;
  image?: string;
  ownerId?: string;
  spaces?: string[];
  companyName?: string;
  managerName?: string;
  bio?: string;
  createdAt?: string;
};

// Types for tasks

export type TaskFile = {
  type: string;
  url: string;
  uploadeeId: string;
  uploadeeName: string;
  size: number;
  s3key: string;
};

export type TaskStatusType =
  | "todo"
  | "in_progress"
  | "review"
  | "done"
  | "cancelled";

export const TaskStatus = [
  "todo",
  "in_progress",
  "review",
  "done",
  "cancelled",
];

export type TaskAssigneeType = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

export const TaskPriority = ["low", "medium", "high"];

export type TaskPriorityType = "low" | "medium" | "high";

export type TaskType = {
  _id: string;

  spaceId: string;
  spaceName: string;
  creatorId: string;
  creatorName: string;

  name: string;
  description: string;
  assignee?: TaskAssigneeType[];
  priority: string;
  status: string;
  tags?: string[];
  completed?: boolean;
  completedAt?: string;

  files?: File[];

  archived: boolean;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
};

export type AddTaskType = {
  _id: string;

  spaceId: string;
  spaceName: string;
  creatorId: string;
  creatorName: string;

  name: string;
  description: string;
  assignees: string[];
  priority: string;
  status: string;
  tags?: string[];
  completed?: boolean;
  completedAt?: string;

  files?: File[];

  archived: boolean;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
};

export type DocType = {
  _id?: string;
  spaceid?: string;
  title: string;
  content: string;
  author: string;
  comments?: Record<string, string>;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ChatType = {
  _id: string;
  senderId: string;
  senderName: string;
  senderImageUrl: string;
  room: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type MeetingType = {
  meetingId?: string;
  hostId: string;
  hostName: string;
  spaceId: string;
  isInstant: boolean;
  scheduledDate?: Date | null;
  status: string;
  participants?: [];
};

export type OwnerType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  subscriptionId?: string;
  isVerified: boolean;
  isBlocked: boolean;
  owner?: string;
  stripe_customer_id?: string;
  refreshToken?: string;
  role: string;
  bio: string;
  image: string;
  invitedBy?: string;
  createdAt: string;
  subscription?: OwnerSubscriptionType;
};

export type CompanyMemberP2PChatType = {
  name: string;
  role: string;
  userId: string;
  image: string;
  companyId: string;
  joinedDate?: string;
  blocked?: string;
  lastSeen?: Date;
};

export interface IParticipantMetadata {
  name: string;
  role: string;
  status: string;
  lastSeen: Date;
  userId: string;
  image: string;
}

export interface IUserChatlist {
  chatId: string;
  participants: [string, string];
  createdAt?: Date;
  lastMessage?: string;
  lastMessageTime?: Date;
  participantsMetadata: [IParticipantMetadata, IParticipantMetadata];
}

export type MessageType = "text" | "image" | "audio" | "video" | "file";

export interface IMediaMeta {
  contentType?: string;
  size?: number;
  originalName?: string;
  duration?: number;
  extension?: string;
}

export interface IUserMessage {
  _id: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  type: MessageType;
  content: string;
  mediaMeta?: IMediaMeta;
  createdAt?: Date;
  read?: boolean;
  isDeleted?: boolean;
}

type AssigneeType = {
  id: string;
  name: string;
  email: string;
};

export type EventType = {
  title: string;
  start: Date;
  end: Date;
  id: string;
  assignee: AssigneeType[];
  description: string;
  status: TaskStatusType;
  type: "Task";
  color?: string;
};

export type AccountType = {
  role: "user" | "manager" | "owner";
  name: string;
  userId: string;
  status: "active" | "inactive";
  company: string;
  joinedAt: Date;
  image: string;
};

export interface TransactionType {
  customerId: string;
  customerName: string;
  subscriptionName: string;
  subscribedDate: Date | null;
  expiryDate: Date | null;
  amount: number;
  companyName: string;
  stripeSubsriptionId?: string;
  stripeCustomerId?: string;
  status: string;
  transactionType: string;
  createdAt?: string;
  errorMessage?: string;
  billingCycle?: string;
}
