import {
  MutableRefObject,
  Reducer,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { HttpGetAction } from "./HttpGetAction";
import { HttpGetError } from "./HttpGetError";
import httpGetReducer from "./httpGetReducer";
import { HttpGetState, isHttpErrorState } from "./HttpGetState";

export interface UseHttpGet<T = unknown> {
  readonly state: HttpGetState<T>;
  readonly refresh: () => void;
}

const useHttpGet = <T = unknown>(
  url: string,
  typeGuard: (res: unknown) => res is T,
  onError: (error: HttpGetError) => void
): UseHttpGet<T> => {
  const isMounted: MutableRefObject<boolean> = useRef<boolean>(false);

  const [state, dispatch] = useReducer<
    Reducer<HttpGetState<T>, HttpGetAction<T>>
  >(httpGetReducer, {
    data: null,
    error: null,
    status: "Idle",
  });

  const httpGet = async (): Promise<void> => {
    try {
      dispatch({ type: "HttpGetting" });
      const response: Response = await fetch(url);

      if (!response.ok) {
        dispatch({ type: "HttpGetFailed", error: "ResponseNotOk" });
        return;
      }

      const json = await response.json();

      typeGuard(json)
        ? dispatch({ type: "HttpGetSucceeded", data: json })
        : dispatch({ type: "HttpGetFailed", error: "UnexpectedResponseType" });
    } catch (e) {
      dispatch({ type: "HttpGetFailed", error: "UnknownFetchError" });
    }
  };

  const refresh = async () => {
    await httpGet();
  };

  useEffect(() => {
    isMounted.current = true;

    const init = async () => await httpGet();

    init();

    return () => {
      isMounted.current = false;
    };
  }, [typeGuard, url]);

  useEffect(() => {
    if (isHttpErrorState(state)) {
      onError(state.error);
    }
  }, [state]);

  return {
    state,
    refresh,
  };
};

export default useHttpGet;
