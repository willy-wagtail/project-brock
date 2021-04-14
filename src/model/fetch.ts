/**
 * State
 */

type ResponseNotOk = "ResponseNotOk";

export type IncorrectResponseType = "IncorrectResponseType";

export type FetchError = ResponseNotOk | IncorrectResponseType;

export interface FetchErrorState {
  data: null;
  error: FetchError;
  loading: false;
}

export interface FetchingState {
  data: null;
  error: null;
  loading: true;
}

export interface FetchedState<T> {
  data: T;
  error: null;
  loading: false;
}

export interface FetchInitialState {
  data: null;
  error: null;
  loading: false;
}

export type FetchState<T> =
  | FetchInitialState
  | FetchingState
  | FetchedState<T>
  | FetchErrorState;

/**
 * Events
 */

export interface FetchSucceededEvent<T> {
  type: "FetchSucceeded";
  data: T;
}

export interface FetchFailedEvent {
  type: "FetchFailed";
  error: FetchError;
}

export type FetchEvent<T> = FetchSucceededEvent<T> | FetchFailedEvent;

/**
 * Type Guards
 */

export const isFetchingState = (
  state: FetchState<any>
): state is FetchingState => {
  return state.data === null && state.error === null && state.loading === true;
};
