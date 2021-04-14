import { Reducer, useEffect, useReducer } from "react";
import { FetchEvent, FetchState } from "../model/fetch";
import fetchReducer from "../reducer/fetchReducer";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const useFetch = <T>(
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
    async function init() {
      const response: Response = await fetch(baseUrl + url);

      if (!response.ok) {
        dispatch({
          type: "FetchFailed",
          error: "ResponseNotOk",
        });

        return;
      }

      const json = await response.json();

      typeGuard(json)
        ? dispatch({
            type: "FetchSucceeded",
            data: json,
          })
        : dispatch({
            type: "FetchFailed",
            error: "IncorrectResponseType",
          });
    }

    init();
  }, [typeGuard, url]);

  return state;
};

export default useFetch;
