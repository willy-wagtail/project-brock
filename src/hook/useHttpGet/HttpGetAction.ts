import { HttpGetError } from "./HttpGetError";

export interface HttpGetSucceeded<T = unknown> {
  readonly type: "HttpGetSucceeded";
  readonly data: T;
}

export interface HttpGetFailed {
  readonly type: "HttpGetFailed";
  readonly error: HttpGetError;
}

export interface HttpGetting {
  readonly type: "HttpGetting";
}

export type HttpGetAction<T = unknown> =
  | HttpGetSucceeded<T>
  | HttpGetFailed
  | HttpGetting;
