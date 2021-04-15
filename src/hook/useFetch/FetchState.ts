import { FetchError } from "./FetchError";

export interface FetchErrorState {
  data: null;
  error: FetchError;
  status: "Error";
}

export interface FetchingState {
  data: null;
  error: null;
  status: "Fetching";
}

export interface FetchSuccessState<T> {
  data: T;
  error: null;
  status: "Success";
}

export interface FetchIdleState {
  data: null;
  error: null;
  status: "Idle";
}

export type FetchState<T> =
  | FetchIdleState
  | FetchingState
  | FetchSuccessState<T>
  | FetchErrorState;

export const isFetchingState = (
  state: FetchState<any>
): state is FetchingState => {
  return (
    state.data === null && state.error === null && state.status === "Fetching"
  );
};
