import { HttpDeleteError } from "./HttpDeleteError";

export interface HttpDeleteSucceeded {
  type: "HttpDeleteSucceeded";
}

export interface HttpDeleteFailed {
  type: "HttpDeleteFailed";
  error: HttpDeleteError;
}

export interface HttpDeleting {
  type: "HttpDeleting";
}

export type HttpDeleteAction =
  | HttpDeleteSucceeded
  | HttpDeleteFailed
  | HttpDeleting;
