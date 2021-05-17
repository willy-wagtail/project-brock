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
  triggerFetch: () => void;
}

const useFetch = <T = unknown>(
  url: string,
  requestInit: RequestInit,
  responseTypeGuard: (res: unknown) => res is T,
  onError: (error: FetchErrorType) => void,
  triggerOnInit: boolean = false
): UseFetch<T> => {
  const cancelRequest: MutableRefObject<boolean> = useRef<boolean>(false);

  const [state, dispatch] = useReducer<Reducer<FetchState<T>, FetchAction<T>>>(
    fetchReducer,
    {
      status: "Init",
      data: null,
      errorType: null,
      errorMessage: null,
      lastSuccess: null,
    }
  );

  const triggerFetch = (): void => dispatch({ type: "Trigger" });

  const doFetch = async (): Promise<void> => {
    try {
      const response: Response = await fetch(url, requestInit);

      if (!response.ok) {
        dispatch({
          type: "Failed",
          errorType: "ResponseNotOk",
          errorMessage: response.status + " " + response.statusText,
        });
      }

      const data: unknown = await extractResponseData(response);

      responseTypeGuard(data)
        ? dispatch({ type: "Succeeded", data })
        : dispatch({
            type: "Failed",
            errorType: "UnexpectedResponseType",
            errorMessage:
              "HTTP response has failed type guard: " + JSON.stringify(data),
          });
    } catch (e) {
      let errorMessage: string | null = null;

      if (e instanceof Error) {
        errorMessage = e.message;
      } else if (typeof e === "string") {
        errorMessage = e;
      }

      dispatch({
        type: "Failed",
        errorType: "OtherFetchError",
        errorMessage,
      });
    }
  };

  useEffect(() => {
    if (triggerOnInit === true) {
      triggerFetch();
    }
  }, []);

  useEffect(() => {
    if (state.status === "Triggered" && !cancelRequest.current) {
      doFetch();
    }

    return () => {
      cancelRequest.current = true;
    };
  }, [state]);

  useEffect(() => {
    if (isFailedState(state)) {
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
