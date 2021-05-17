import { FetchErrorType } from "./FetchErrorType";

export interface InitialState {
  status: "Init";
  data: null;
  errorType: null;
  errorMessage: null;
  lastSuccess: null;
}

export interface TriggeredState {
  status: "Triggered";
  data: null;
  errorType: null;
  errorMessage: null;
  lastSuccess: Date | null; // todo use luxon or moment
}

export interface FetchingState {
  status: "Fetching";
  data: null;
  errorType: null;
  errorMessage: null;
  lastSuccess: Date | null;
}

export interface SucceededState<T = unknown> {
  status: "Succeeded";
  data: T;
  errorType: null;
  errorMessage: null;
  lastSuccess: Date;
}

export interface FailedState {
  status: "Failed";
  data: null;
  errorType: FetchErrorType;
  errorMessage: string | null;
  lastSuccess: Date | null;
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
