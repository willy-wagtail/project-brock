import { FetchErrorType } from "./FetchErrorType";

export interface InitialState {
  readonly status: "Init";
  readonly data: null;
  readonly errorType: null;
  readonly errorMessage: null;
  readonly lastSuccess: null;
}

export interface TriggeredState {
  readonly status: "Triggered";
  readonly data: null;
  readonly errorType: null;
  readonly errorMessage: null;
  readonly lastSuccess: Date | null; // todo use luxon or moment
}

export interface FetchingState {
  readonly status: "Fetching";
  readonly data: null;
  readonly errorType: null;
  readonly errorMessage: null;
  readonly lastSuccess: Date | null;
}

export interface SucceededState<T = unknown> {
  readonly status: "Succeeded";
  readonly data: T;
  readonly errorType: null;
  readonly errorMessage: null;
  readonly lastSuccess: Date;
}

export interface FailedState {
  readonly status: "Failed";
  readonly data: null;
  readonly errorType: FetchErrorType;
  readonly errorMessage: string | null;
  readonly lastSuccess: Date | null;
}

export type FetchState<T = unknown> =
  | InitialState
  | TriggeredState
  | FetchingState
  | SucceededState<T>
  | FailedState;

export const isFailedState = (state: FetchState): state is FailedState =>
  state.status === "Failed";

export const isFetchingState = (state: FetchState): state is FetchingState =>
  state.status === "Fetching";
