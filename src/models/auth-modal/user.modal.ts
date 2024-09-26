export interface LoginPayload {
  account_name: string;
  password: string;
}

export interface RegisterPayload {
  account_name: string;
  email: string;
  password: string;
}

export interface VerifyPayload {
  email: string;
  codeId: number;
}

export interface UpdateUserPayload {
  email: string;
  image: string;
  address: string;
  phone: number;
  name: string;
  gender: boolean;
}
