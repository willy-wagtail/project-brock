import { FetchSucceeded, FetchFailed, FetchAction } from "./FetchAction";
import { FetchState, isFetchingState } from "./FetchState";

const handleFetchSucceeded = <T>(
  previousState: FetchState<T>,
  action: FetchSucceeded<T>
): FetchState<T> => {
  if (isFetchingState(previousState)) {
    return {
      status: "Success",
      data: action.data,
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
  action: FetchFailed
): FetchState<T> => {
  if (isFetchingState(previousState)) {
    return {
      status: "Error",
      data: null,
      error: action.error,
    };
  } else {
    return {
      ...previousState,
    };
  }
};

const fetchReducer = <T>(
  previousState: FetchState<T>,
  action: FetchAction<T>
): FetchState<T> => {
  switch (action.type) {
    case "FetchSucceeded": {
      return handleFetchSucceeded<T>(previousState, action);
    }

    case "FetchFailed": {
      return handleFetchFailed(previousState, action);
    }
  }
};

export default fetchReducer;
