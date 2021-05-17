import {
  FailedFetchAction,
  FetchAction,
  SucceededFetchAction
} from "./FetchAction";
import { FetchState, isFetchingState } from "./FetchState";

const fetchReducer = <T = unknown>(
  previousState: FetchState<T>,
  action: FetchAction<T>
): FetchState<T> => {
  switch (action.type) {
    case "Succeeded": {
      return handleSucceededFetch<T>(previousState, action);
    }

    case "Failed": {
      return handleFailedFetch(previousState, action);
    }

    case "Trigger": {
      return handleTriggerFetch(previousState);
    }
  }
};

const handleSucceededFetch = <T>(
  previousState: FetchState<T>,
  action: SucceededFetchAction<T>
): FetchState<T> => {
  if (isFetchingState(previousState)) {
    return {
      status: "Succeeded",
      data: action.data,
      errorType: null,
      errorMessage: null,
      lastSuccess: new Date(),
    };
  } else {
    return { ...previousState };
  }
};

const handleFailedFetch = <T>(
  previousState: FetchState<T>,
  action: FailedFetchAction
): FetchState<T> => {
  if (isFetchingState(previousState)) {
    return {
      status: "Failed",
      data: null,
      errorType: action.errorType,
      errorMessage: action.errorMessage,
      lastSuccess: previousState.lastSuccess,
    };
  } else {
    return { ...previousState };
  }
};

const handleTriggerFetch = <T>(previousState: FetchState<T>): FetchState<T> => {
  return {
    status: "Triggered",
    data: null,
    errorType: null,
    errorMessage: null,
    lastSuccess: previousState.lastSuccess,
  };
};

export default fetchReducer;
