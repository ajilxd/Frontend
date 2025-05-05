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
  createdAt?: Date;
  updatedAt?: Date;
  role: string;
  refreshToken?: string;
  companyId: string;
};

export type SubscriptionType = {
  _id: string;
  billingCycle: string;
  amount: string;
  name: string;
  stripe_product_id?: string;
  stripe_price_id?: string;
  isActive: string;
  description: string;
  features: Array<string>;
};

export type OwnerSubscriptionType = {
  name?: string;
  status?: string;
  billingCycle?: string;
  stripe_subscription_id?: string;
  subscription_id?: string;
  next_invoice?: string;
  cancel_at?: string;
  canceled_at?: string;
  created?: string;
  features?: Array<string>;
  amount?: string;
  expires_at?: string;
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
