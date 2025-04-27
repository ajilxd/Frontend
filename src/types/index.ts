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
