export interface CustomVerifyOptions {
  field: string;
  message: string;
  status?: number;
}

export type Strategy = "local" | "jwt";
