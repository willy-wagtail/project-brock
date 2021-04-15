import { FetchSucceeded, FetchFailed, FetchEvent } from "./FetchEvent";
import { FetchState, isFetchingState } from "./FetchState";

const handleFetchSucceeded = <T>(
  previousState: FetchState<T>,
  event: FetchSucceeded<T>
): FetchState<T> => {
  if (isFetchingState(previousState)) {
    return {
      status: 'Success',
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
  event: FetchFailed
): FetchState<T> => {
  if (isFetchingState(previousState)) {
    return {
      status: 'Error',
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

export default fetchReducer;