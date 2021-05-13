export type ResponseNotOk = "ResponseNotOk";

export type UnexpectedResponseType = "UnexpectedResponseType";

export type OtherFetchError = "OtherFetchError";

export type FetchErrorType =
  | ResponseNotOk
  | UnexpectedResponseType
  | OtherFetchError;
