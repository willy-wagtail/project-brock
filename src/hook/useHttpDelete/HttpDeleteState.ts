import { HttpDeleteError } from "./HttpDeleteError";

export interface HttpDeleteErrorState {
  error: HttpDeleteError;
  status: "Error";
}

export interface HttpDeletingState {
  error: null;
  status: "Deleting";
}

export interface HttpDeleteSuccessState {
  error: null;
  status: "Success";
}

export interface HttpDeleteIdleState {
  error: null;
  status: "Idle";
}

export type HttpDeleteState =
  | HttpDeleteIdleState
  | HttpDeletingState
  | HttpDeleteSuccessState
  | HttpDeleteErrorState;

export const isHttpDeletingState = (
  state: HttpDeleteState
): state is HttpDeletingState => {
  return state.status === "Deleting" && state.error === null;
};

export const isHttpErrorState = (
  state: HttpDeleteState
): state is HttpDeleteErrorState => {
  return state.status === "Error" && state.error !== null;
};
