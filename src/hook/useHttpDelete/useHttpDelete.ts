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

export interface UseHttpDelete {
  readonly state: HttpDeleteState;
  readonly httpDelete: () => void;
}

const useHttpDelete = (
  url: string,
  onError: (error: HttpDeleteError) => void
): UseHttpDelete => {
  const isMounted: MutableRefObject<boolean> = useRef<boolean>(false);

  const [state, dispatch] = useReducer<
    Reducer<HttpDeleteState, HttpDeleteAction>
  >(httpDeleteReducer, {
    error: null,
    status: "Idle",
  });

  const httpDelete = async (): Promise<void> => {
    try {
      dispatch({ type: "HttpDeleting" });

      const response: Response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
      });

      if (!response.ok) {
        dispatch({ type: "HttpDeleteFailed", error: "ResponseNotOk" });
        return;
      }

      dispatch({ type: "HttpDeleteSucceeded" });
    } catch (e) {
      dispatch({ type: "HttpDeleteFailed", error: "UnknownFetchError" });
    }
  };

  useEffect(() => {
    if (isHttpErrorState(state)) {
      onError(state.error);
    }
  }, [state]);

  return {
    state,
    httpDelete,
  };
};

export default useHttpDelete;
