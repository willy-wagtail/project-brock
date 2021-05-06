import { HttpGetError } from "./HttpGetError";

export interface HttpGetErrorState {
  data: null;
  error: HttpGetError;
  status: "Error";
}

export interface HttpGettingState {
  data: null;
  error: null;
  status: "Getting";
}

export interface HttpGetSuccessState<T> {
  data: T;
  error: null;
  status: "Success";
}

export interface HttpGetIdleState {
  data: null;
  error: null;
  status: "Idle";
}

export type HttpGetState<T> =
  | HttpGetIdleState
  | HttpGettingState
  | HttpGetSuccessState<T>
  | HttpGetErrorState;

export const isHttpGettingState = (
  state: HttpGetState<any>
): state is HttpGettingState => {
  return (
    state.data === null && state.error === null && state.status === "Getting"
  );
};
