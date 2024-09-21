export interface LoginPayload {
  account_name: string;
  password: string;
}

export interface RegisterPayload {
  account_name: string;
  email: string;
  password: string;
}

export type VerifyPayload = {
  email: string;
  codeId: number;
}
