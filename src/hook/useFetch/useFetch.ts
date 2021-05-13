import {
  MutableRefObject,
  Reducer,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { FetchAction } from "./FetchAction";
import { FetchErrorType } from "./FetchErrorType";
import fetchReducer from "./fetchReducer";
import { FetchState, isFailedState } from "./FetchState";

export interface UseFetch<T = unknown> {
  state: FetchState;
  triggerFetch: (
    url: string,
    requestInit: RequestInit,
    responseTypeGuard: (res: unknown) => res is T
  ) => void;
}

const useFetch = <T = unknown>(
  onError: (error: FetchErrorType) => void
): UseFetch<T> => {
  const cancelRequest: MutableRefObject<boolean> = useRef<boolean>(false);

  const [state, dispatch] = useReducer<Reducer<FetchState, FetchAction>>(
    fetchReducer,
    { status: "Idling" }
  );

  const triggerFetch = (
    url: string,
    requestInit: RequestInit,
    responseTypeGuard: (res: unknown) => res is T
  ): void => {
    dispatch({ type: "Trigger", url, requestInit, responseTypeGuard });
  };

  const doFetch = async () => {
    if (state.status === "Triggered") {
      try {
        const response: Response = await fetch(state.url, state.requestInit);

        if (!response.ok) {
          dispatch({ type: "Failed", errorType: "ResponseNotOk" });
        }

        const data: unknown = await extractResponseData(response);

        state.responseTypeGuard(data)
          ? dispatch({ type: "Succeeded", data })
          : dispatch({ type: "Failed", errorType: "UnexpectedResponseType" });
      } catch (e) {
        dispatch({ type: "Failed", errorType: "OtherFetchError" });
      }
    }
  };

  useEffect(() => {
    doFetch();

    return () => {
      cancelRequest.current = true;
    };
  }, [state]);

  useEffect(() => {
    if (isFailedState(state) && !cancelRequest.current) {
      onError(state.errorType);
    }
  }, [state, onError, cancelRequest]);

  return {
    state,
    triggerFetch,
  };
};

const extractResponseData = async (response: Response): Promise<unknown> => {
  let data: unknown;
  const contentType: string | null = response.headers.get("content-type");

  contentType !== null && contentType.includes("application/json")
    ? (data = await response.json())
    : (data = await response.text());

  return data;
};

export default useFetch;
