import { FetchErrorType } from "./FetchErrorType";

export interface TriggerFetchAction {
  readonly type: "Trigger";
}

export interface FailedFetchAction {
  readonly type: "Failed";
  readonly errorType: FetchErrorType;
  readonly errorMessage: string | null;
}

export interface SucceededFetchAction<T = unknown> {
  readonly type: "Succeeded";
  readonly data: T;
}

export type FetchAction<T = unknown> =
  | TriggerFetchAction
  | FailedFetchAction
  | SucceededFetchAction<T>;
