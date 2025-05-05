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
