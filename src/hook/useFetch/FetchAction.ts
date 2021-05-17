import { FetchErrorType } from "./FetchErrorType";

export interface TriggerFetchAction {
  type: "Trigger";
}

export interface FailedFetchAction {
  type: "Failed";
  errorType: FetchErrorType;
  errorMessage: string | null;
}

export interface SucceededFetchAction<T = unknown> {
  type: "Succeeded";
  data: T;
}

export type FetchAction<T = unknown> =
  | TriggerFetchAction
  | FailedFetchAction
  | SucceededFetchAction<T>;
