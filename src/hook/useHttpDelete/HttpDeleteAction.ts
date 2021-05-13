import { HttpDeleteError } from "./HttpDeleteError";

export interface HttpDeleteSucceeded {
  readonly type: "HttpDeleteSucceeded";
}

export interface HttpDeleteFailed {
  readonly type: "HttpDeleteFailed";
  readonly error: HttpDeleteError;
}

export interface HttpDeleting {
  readonly type: "HttpDeleting";
}

export type HttpDeleteAction =
  | HttpDeleteSucceeded
  | HttpDeleteFailed
  | HttpDeleting;
