import { FetchEvent, FetchFailedEvent, FetchState, FetchSucceededEvent, isFetchingState } from "../model/fetch";


const handleFetchSucceeded = <T>(
  previousState: FetchState<T>, 
  event: FetchSucceededEvent<T>
  ): FetchState<T> => {
  if(isFetchingState(previousState)) {
    return {
      loading: false,
      data: event.data,
      error: null
    };
 } else {
   return {
     ...previousState
   };
 }
}

const handleFetchFailed = <T>(
  previousState: FetchState<T>, 
  event: FetchFailedEvent
  ): FetchState<T> => {
  if(isFetchingState(previousState)) {
    return {
      loading: false,
      data: null,
      error: event.error
    };
 } else {
   return {
     ...previousState
   };
 }
}

const fetchReducer = <T>(
  previousState: FetchState<T>, 
  event: FetchEvent<T>
  ): FetchState<T> => {
  switch(event.type) {
    case 'FetchSucceeded': {
      return handleFetchSucceeded<T>(previousState, event);
    }

    case 'FetchFailed': {
      return handleFetchFailed(previousState, event);
    }
  }
};

export default fetchReducer;