import { FetchErrorType } from "./FetchErrorType";

export interface TriggerFetchAction<T = unknown> {
  type: "Trigger";
  url: string;
  requestInit: RequestInit;
  responseTypeGuard: (res: unknown) => res is T;
}

export interface FailedFetchAction {
  type: "Failed";
  errorType: FetchErrorType;
}

export interface SucceededFetchAction<T = unknown> {
  type: "Succeeded";
  data: T;
}

export type FetchAction<T = unknown> =
  | TriggerFetchAction<T>
  | FailedFetchAction
  | SucceededFetchAction<T>;
