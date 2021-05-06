import {
  HttpGetSucceeded,
  HttpGetFailed,
  HttpGetAction,
} from "./HttpGetAction";
import { HttpGetState, isHttpGettingState } from "./HttpGetState";

const handleHttpGetting = <T = unknown>(
  previousState: HttpGetState<T>
): HttpGetState<T> => {
  if (!isHttpGettingState(previousState)) {
    return {
      status: "Getting",
      data: null,
      error: null,
    };
  } else {
    return {
      ...previousState,
    };
  }
};

const handleHttpGetSucceeded = <T = unknown>(
  previousState: HttpGetState<T>,
  action: HttpGetSucceeded<T>
): HttpGetState<T> => {
  if (isHttpGettingState(previousState)) {
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

const handleHttpGetFailed = <T = unknown>(
  previousState: HttpGetState<T>,
  action: HttpGetFailed
): HttpGetState<T> => {
  if (isHttpGettingState(previousState)) {
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

const httpGetReducer = <T = unknown>(
  previousState: HttpGetState<T>,
  action: HttpGetAction<T>
): HttpGetState<T> => {
  switch (action.type) {
    case "HttpGetSucceeded": {
      return handleHttpGetSucceeded<T>(previousState, action);
    }

    case "HttpGetFailed": {
      return handleHttpGetFailed(previousState, action);
    }

    case "HttpGetting": {
      return handleHttpGetting(previousState);
    }
  }
};

export default httpGetReducer;
