import { HttpGetError } from "./HttpGetError";

export interface HttpGetSucceeded<T = unknown> {
  type: "HttpGetSucceeded";
  data: T;
}

export interface HttpGetFailed {
  type: "HttpGetFailed";
  error: HttpGetError;
}

export interface HttpGetting {
  type: "HttpGetting";
}

export type HttpGetAction<T = unknown> =
  | HttpGetSucceeded<T>
  | HttpGetFailed
  | HttpGetting;
