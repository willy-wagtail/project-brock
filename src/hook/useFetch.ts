import { Reducer, useEffect, useReducer } from "react";

/**
 * State
 */

export type ResponseNotOk = "ResponseNotOk";

export type UnexpectedResponseType = "UnexpectedResponseType";

export type UnknownFetchError = "UnknownFetchError";

export type FetchError =
  | ResponseNotOk
  | UnexpectedResponseType
  | UnknownFetchError;

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

export interface FetchIdleState {
  data: null;
  error: null;
  loading: false;
}

export type FetchState<T> =
  | FetchIdleState
  | FetchingState
  | FetchedState<T>
  | FetchErrorState;

/**
 * Events
 */

interface FetchSucceeded<T> {
  type: "FetchSucceeded";
  data: T;
}

interface FetchFailedEvent {
  type: "FetchFailed";
  error: FetchError;
}

type FetchEvent<T> = FetchSucceeded<T> | FetchFailedEvent;

/**
 * Type Guards
 */

export const isFetchingState = (
  state: FetchState<any>
): state is FetchingState => {
  return state.data === null && state.error === null && state.loading === true;
};

/**
 * Reducer
 */

const handleFetchSucceeded = <T>(
  previousState: FetchState<T>,
  event: FetchSucceeded<T>
): FetchState<T> => {
  if (isFetchingState(previousState)) {
    return {
      loading: false,
      data: event.data,
      error: null,
    };
  } else {
    return {
      ...previousState,
    };
  }
};

const handleFetchFailed = <T>(
  previousState: FetchState<T>,
  event: FetchFailedEvent
): FetchState<T> => {
  if (isFetchingState(previousState)) {
    return {
      loading: false,
      data: null,
      error: event.error,
    };
  } else {
    return {
      ...previousState,
    };
  }
};

const fetchReducer = <T>(
  previousState: FetchState<T>,
  event: FetchEvent<T>
): FetchState<T> => {
  switch (event.type) {
    case "FetchSucceeded": {
      return handleFetchSucceeded<T>(previousState, event);
    }

    case "FetchFailed": {
      return handleFetchFailed(previousState, event);
    }
  }
};

/**
 * Hook
 */

// const baseUrl = process.env.REACT_APP_API_BASE_URL;

const useFetch = <T = unknown>(
  url: string,
  typeGuard: (x: any) => x is T
): FetchState<T> => {
  const [state, dispatch] = useReducer<Reducer<FetchState<T>, FetchEvent<T>>>(
    fetchReducer,
    {
      data: null,
      error: null,
      loading: false,
    }
  );

  useEffect(() => {
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
  }, [typeGuard, url]);

  return state;
};

export default useFetch;
