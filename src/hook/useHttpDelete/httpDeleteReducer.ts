import {
  HttpDeleteAction,
  HttpDeleteFailed,
  HttpDeleteSucceeded,
} from "./HttpDeleteAction";
import { HttpDeleteState, isHttpDeletingState } from "./HttpDeleteState";

const handleHttpDeleting = (
  previousState: HttpDeleteState
): HttpDeleteState => {
  if (!isHttpDeletingState(previousState)) {
    return {
      status: "Deleting",
      error: null,
    };
  } else {
    return {
      ...previousState,
    };
  }
};

const handleHttpDeleteSucceeded = (
  previousState: HttpDeleteState,
  action: HttpDeleteSucceeded
): HttpDeleteState => {
  if (isHttpDeletingState(previousState)) {
    return {
      status: "Success",
      error: null,
    };
  } else {
    return {
      ...previousState,
    };
  }
};

const handleHttpDeleteFailed = (
  previousState: HttpDeleteState,
  action: HttpDeleteFailed
): HttpDeleteState => {
  if (isHttpDeletingState(previousState)) {
    return {
      status: "Error",
      error: action.error,
    };
  } else {
    return {
      ...previousState,
    };
  }
};

const httpDeleteReducer = (
  previousState: HttpDeleteState,
  action: HttpDeleteAction
): HttpDeleteState => {
  switch (action.type) {
    case "HttpDeleteSucceeded": {
      return handleHttpDeleteSucceeded(previousState, action);
    }

    case "HttpDeleteFailed": {
      return handleHttpDeleteFailed(previousState, action);
    }

    case "HttpDeleting": {
      return handleHttpDeleting(previousState);
    }
  }
};

export default httpDeleteReducer;
