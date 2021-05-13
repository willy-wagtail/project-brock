import {
  FailedFetchAction,
  FetchAction,
  SucceededFetchAction,
  TriggerFetchAction,
} from "./FetchAction";
import { FetchState } from "./FetchState";

const fetchReducer = <T = unknown>(
  previousState: FetchState<T>,
  action: FetchAction<T>
): FetchState<T> => {
  switch (action.type) {
    case "Succeeded": {
      return handleSucceededFetch(previousState, action);
    }

    case "Failed": {
      return handleFailedFetch(previousState, action);
    }

    case "Trigger": {
      return handleTriggerFetch(previousState, action);
    }
  }
};

const handleSucceededFetch = <T>(
  previousState: FetchState<T>,
  action: SucceededFetchAction
): FetchState<T> => {
  return { ...previousState };
};

const handleFailedFetch = <T>(
  previousState: FetchState<T>,
  action: FailedFetchAction
): FetchState<T> => {
  return { ...previousState };
};

const handleTriggerFetch = <T>(
  previousState: FetchState<T>,
  action: TriggerFetchAction<T>
): FetchState<T> => {
  return { ...previousState };
};

export default fetchReducer;
