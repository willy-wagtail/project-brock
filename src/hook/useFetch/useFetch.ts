import {
  MutableRefObject,
  Reducer,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { FetchAction } from "./FetchAction";
import fetchReducer from "./fetchReducer";
import { FetchState } from "./FetchState";

const useFetch = <T = unknown>(
  url: string,
  typeGuard: (x: any) => x is T
): FetchState<T> => {
  const isMounted: MutableRefObject<boolean> = useRef<boolean>(false);

  const [state, dispatch] = useReducer<Reducer<FetchState<T>, FetchAction<T>>>(
    fetchReducer,
    {
      data: null,
      error: null,
      status: "Idle",
    }
  );

  useEffect(() => {
    isMounted.current = true;

    const init = async () => {
      try {
        const response: Response = await fetch(url);

        if (!response.ok) {
          dispatch({ type: "FetchFailed", error: "ResponseNotOk" });
          return;
        }

        const json = await response.json();

        typeGuard(json)
          ? dispatch({ type: "FetchSucceeded", data: json })
          : dispatch({ type: "FetchFailed", error: "UnexpectedResponseType" });
      } catch (e) {
        dispatch({ type: "FetchFailed", error: "UnknownFetchError" });
      }
    };

    init();

    return () => {
      isMounted.current = false;
    };
  }, [typeGuard, url]);

  return state;
};

export default useFetch;
