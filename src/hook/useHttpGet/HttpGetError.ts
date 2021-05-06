export type ResponseNotOk = "ResponseNotOk";

export type UnexpectedResponseType = "UnexpectedResponseType";

export type UnknownFetchError = "UnknownFetchError";

export type HttpGetError =
  | ResponseNotOk
  | UnexpectedResponseType
  | UnknownFetchError;
