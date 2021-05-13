import { FetchErrorType } from "./FetchErrorType";

export interface IdlingState {
  status: "Idling";
}

interface NonIdlingState<T = unknown> {
  url: string;
  requestInit: RequestInit;
  responseTypeGuard: (res: unknown) => res is T;
}

export interface TriggeredState<T = unknown> extends NonIdlingState<T> {
  status: "Triggered";
}

export interface FetchingState<T = unknown> extends NonIdlingState<T> {
  status: "Fetching";
}

export interface SucceededState<T = unknown> extends NonIdlingState<T> {
  status: "Succeeded";
}

export interface FailedState<T = unknown> extends NonIdlingState<T> {
  status: "Failed";
  errorType: FetchErrorType;
}

export type FetchState<T = unknown> =
  | IdlingState
  | TriggeredState<T>
  | FetchingState<T>
  | SucceededState<T>
  | FailedState<T>;

export const isFailedState = (state: FetchState): state is FailedState =>
  state.status === "Failed";
