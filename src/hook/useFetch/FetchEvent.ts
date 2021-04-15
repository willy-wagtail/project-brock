import { FetchError } from "./FetchError";

export interface FetchSucceeded<T> {
  type: "FetchSucceeded";
  data: T;
}

export interface FetchFailed {
  type: "FetchFailed";
  error: FetchError;
}

export type FetchEvent<T> = FetchSucceeded<T> | FetchFailed;
