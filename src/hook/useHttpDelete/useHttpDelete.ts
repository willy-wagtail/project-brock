import {
  MutableRefObject,
  Reducer,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { HttpDeleteAction } from "./HttpDeleteAction";
import { HttpDeleteError } from "./HttpDeleteError";
import httpDeleteReducer from "./httpDeleteReducer";
import { HttpDeleteState, isHttpErrorState } from "./HttpDeleteState";

const useHttpDelete = (
  url: string,
  onError: (error: HttpDeleteError) => void
): HttpDeleteState => {
  const isMounted: MutableRefObject<boolean> = useRef<boolean>(false);

  const [state, dispatch] = useReducer<
    Reducer<HttpDeleteState, HttpDeleteAction>
  >(httpDeleteReducer, {
    error: null,
    status: "Idle",
  });

  const httpGet = async (): Promise<void> => {
    try {
      dispatch({ type: "HttpDeleting" });
      const response: Response = await fetch(url);

      if (!response.ok) {
        dispatch({ type: "HttpDeleteFailed", error: "ResponseNotOk" });
        return;
      }

      dispatch({ type: "HttpDeleteSucceeded"});
    } catch (e) {
      dispatch({ type: "HttpDeleteFailed", error: "UnknownFetchError" });
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
  }, [url]);

  useEffect(() => {
    if (isHttpErrorState(state)) {
      onError(state.error);
    }
  }, [state]);

  return state;
};
